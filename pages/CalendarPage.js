import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base from '../styles/base';
import { ScrollView } from 'native-base';
import { Card } from 'react-native-paper';

export const CalendarPage = () => {
    const [composters, setComposters] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('events', (err, v) => {
            if (err || !v) return;
            setEvents(JSON.parse(v));
        });

        AsyncStorage.getItem('composters', (err, v) => {
            if (err || !v) return;
            setComposters(JSON.parse(v));
        });
    }, []);

    return (
        <View style={{ padding: 20, height: '100%' }}>
            <Text
                onPress={() => alert('This is the Calendar page.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}
            >
                Calendar
            </Text>

            {events.length > 0 && (
                <ScrollView style={{ marginTop: 20 }}>
                    {events
                        .sort((a, b) => b.date - a.date)
                        .map((data, idx) => {
                            const composter = composters.find(
                                (c) => c.id == data.composterID,
                            );

                            if (!composter) return null;

                            return (
                                <Card key={idx}>
                                    <Card.Title
                                        title={`You added some ${data.type} to ${composter.name}`}
                                    />
                                    <Text>Amount: {data.amount} kg</Text>
                                    <Text>
                                        Date:{' '}
                                        {new Date(data.date).toLocaleString()}
                                    </Text>
                                </Card>
                            );
                        })}
                </ScrollView>
            )}
        </View>
    );
};
