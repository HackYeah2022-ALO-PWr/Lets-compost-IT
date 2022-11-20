import React from 'react';
import { View, Text } from 'react-native';
import base from '../styles/base';

export const ArticlesPage = () => {
    return (
        <View style={{ padding: 20 }}>
            <Text
                onPress={() => alert('This is the Tutorials page.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}
            >
                Articles
            </Text>
        </View>
    );
};
