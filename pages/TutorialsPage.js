import React from 'react';
import { View, Text } from 'react-native';

export const TutorialsPage = () => {
    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
            <Text
                onPress={() => alert('This is the Tutorials page.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}
            >
                Tutorials Page
            </Text>
        </View>
    );
};
