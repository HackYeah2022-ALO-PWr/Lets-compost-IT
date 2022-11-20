import { useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import {
    Portal,
    FAB,
    List,
    Divider,
    Modal,
    TextInput,
    Button,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as uuid from 'uuid';
import 'react-native-get-random-values';
import base from '../styles/base';

import { Composter } from '../components';
import { FormControl, Input, NumberInput } from 'native-base';

const CreateComposterModal = ({ visible, setVisible, create }) => {
    const [name, setName] = useState('');
    const [volume, setVolume] = useState(10);

    return (
        <Modal visible={visible} onDismiss={setVisible}>
            <View style={{ padding: 20 }}>
                <TextInput
                    placeholder='Composter name'
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    placeholder='Composter capacity [kg]'
                    keyboardType='numeric'
                    value={volume}
                    onChangeText={setVolume}
                />
                <Button
                    onPress={() => {
                        create({ id: uuid.v4(), name, volume });
                        setName('');
                        setVolume(10);
                    }}
                >
                    Create
                </Button>
            </View>
        </Modal>
    );
};

export const MyCompostersPage = () => {
    const [composters, setComposters] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);

    const createComposter = (data) => {
        setComposters((old) => [...old, data]);
    };

    useEffect(() => {
        AsyncStorage.getItem('composters', (err, v) => {
            if (err || !v) return;
            setComposters(JSON.parse(v));
        });
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('composters', JSON.stringify(composters));
    }, [composters]);

    return (
        <View style={{ padding: 20, height: '100%' }}>
            <Text
                onPress={() => alert('This is the My Composters page.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}
            >
                My Composters
            </Text>

            {composters.length > 0 && (
                <ScrollView style={{ marginTop: 20 }}>
                    {composters.map((data) => (
                        <Composter
                            data={data}
                            key={data.id}
                            remove={() =>
                                setComposters((old) =>
                                    old.filter((c) => c.id !== data.id),
                                )
                            }
                        />
                    ))}
                </ScrollView>
            )}

            <FAB.Group
                style={{ position: 'absolute', right: 0, bottom: 0 }}
                icon='plus'
                actions={[]}
                onStateChange={() => {}}
                onPress={() => setVisibleModal(true)}
            />
            <CreateComposterModal
                visible={visibleModal}
                setVisible={setVisibleModal}
                create={(data) => {
                    createComposter(data);
                    setVisibleModal(false);
                }}
            />
        </View>
    );
};
