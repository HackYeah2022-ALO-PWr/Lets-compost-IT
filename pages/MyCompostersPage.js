import React from 'react';
import { View, Text } from 'react-native';

export const MyCompostersPage = () => {
    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
            <Text
                onPress={() => alert('This is the My Composters page.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}
            >
                My Composters Page
            </Text>
        </View>
    );
};
