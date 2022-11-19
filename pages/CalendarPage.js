import React from 'react';
import { View, Text } from 'react-native';
import { Portal, FAB } from 'react-native-paper';
import base from '../styles/base';

export const CalendarPage = () => {
    return (
        <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
            <Text
                onPress={() => alert('This is the Calendar page.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}
            >
                Calendar Page
            </Text>
            <Portal>
                <FAB icon='plus' />
            </Portal>
        </View>
    );
};
