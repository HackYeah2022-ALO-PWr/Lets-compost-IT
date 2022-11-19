import React from 'react';
import { View, Text } from 'react-native';
import { List } from 'react-native-paper';

export const Composter = ({ data }) => {
    return (
        <List.Accordion
            title={data.name}
            left={(props) => <List.Icon {...props} icon='folder' />}
            id={data.id}
            style={{ padding: 10 }}
        >
            <View style={{ padding: 10 }}>
                <Text>{data.name}</Text>
            </View>
        </List.Accordion>
    );
};
