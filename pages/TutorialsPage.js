import React from 'react';
import { View, Text } from 'react-native';
import base from '../styles/base';

export const TutorialsPage = () => {
    return (
        <View style={{ padding: 20 }}>
            <Text
                onPress={() => alert('This is the Tutorials page.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}
            >
                Tutorials Page
            </Text>
        </View>
    );
};
