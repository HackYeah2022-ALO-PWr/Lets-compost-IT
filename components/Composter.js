import React from 'react';
import { View, Text } from 'react-native';
import { List } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Composter = ({ data, remove }) => {
    return (
        <List.Accordion
            title={data.name}
            left={(props) => <List.Icon {...props} icon='folder' />}
            style={{ padding: 10 }}
            onLongPress={remove}
        >
            <View style={{ padding: 10 }}>
                <Text>{data.name}</Text>
                <Text>{data.id}</Text>
                <Text>{data.volume}</Text>
            </View>
        </List.Accordion>
    );
};
