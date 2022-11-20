import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Composter = ({ data, remove }) => {
    const [events, setEvents] = useState([]);

    AsyncStorage.getItem('events', (err, v) => {
        if (err || !v) return;
        arr = JSON.parse(v);
        setEvents(arr.filter(event => event.composterID === data.id));
    });

    let avLvll = 0;
    let filled = 0;
    
    events.forEach((event, i) => {
        const d = new Date(event.date * 1000);
        const now = new Date();
        const diff = d - now;
        const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
        const lvl = Math.round(diffDays / 100);
        avLvll += lvl * event.amount;
        filled += event.amount;
    });

    const lvl = avLvll / filled;
    filled /= data.volume;
    let name = '';
    if(lvl >= 100) name = 'b';
    else if(lvl >= 50) name = 'y';
    else if(lvl >= 0) name = 'g';

    if(filled > 80) name += '5';
    else if(filled > 60) name += '4';
    else if(filled > 40) name += '3';
    else if(filled > 20) name += '2';
    else if(filled > 0) name += '1';
    else if(filled === 0) name = 'empty';
    name += '.jpg';
    
    return (
        <List.Accordion
            title={data.name}
            left={(props) => <List.Icon {...props} icon='folder' />}
            style={{ padding: 10 }}
            onLongPress={remove}
        >
            <View style={{ padding: 10 }}>
                <Text>{data.name}</Text>
                <Text>{name}</Text>
                <Image source={require(`../assets/empty.jpg`)} />
                <Text>{data.name}</Text>
                <Text>{data.id}</Text>
                <Text>{data.volume}</Text>
            </View>
        </List.Accordion>
    );
};
