import { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Portal, FAB, List, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base from '../styles/base';

import { Composter } from '../components';

export const MyCompostersPage = () => {
    const [composters, setComposters] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('composters', (err, v) => {
            if (err) return;
            setComposters(JSON.parse(v));
        });
    }, []);

    return (
        <View style={{ padding: 20 }}>
            <Text
                onPress={() => alert('This is the My Composters page.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}
            >
                My Composters
            </Text>

            {composters && (
                <ScrollView style={{ marginTop: 20 }}>
                    {Array.from({ length: 10 }).map((_, idx) => (
                        <Composter
                            data={{
                                id: `composter-${idx + 1}`,
                                name: `Composter ${idx + 1}`,
                            }}
                        />
                    ))}
                </ScrollView>
            )}

            {/* <FAB.Group icon='plus' actions={[]} onStateChange={() => {}} /> */}
        </View>
    );
};
