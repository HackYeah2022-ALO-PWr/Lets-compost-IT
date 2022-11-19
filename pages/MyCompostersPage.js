import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Portal, FAB, List, Divider } from 'react-native-paper';
import base from '../styles/base';

import { Composter } from '../components';

export const MyCompostersPage = () => {
    return (
        <View style={{ padding: 20 }}>
            <Text
                onPress={() => alert('This is the My Composters page.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}
            >
                My Composters
            </Text>

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

            <Divider style={{ width: '100%' }} />

            {/* <FAB.Group icon='plus' actions={[]} onStateChange={() => {}} /> */}
        </View>
    );
};
