import React from 'react';
import { View, Text } from 'react-native';
import base from '../styles/base';

export const CalendarPage = () => {
    return (
        <View style={base.centered}>
            <Text
                onPress={() => alert('This is the Calendar page.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}
            >
                Calendar Page
            </Text>
        </View>
    );
};
