import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Button, List, Modal, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDown from 'react-native-paper-dropdown';
import { dupa } from '../dupa';

const imgs = {
    b1: require('../assets/b1.png'),
    b2: require('../assets/b2.png'),
    b3: require('../assets/b3.png'),
    b4: require('../assets/b4.png'),
    b5: require('../assets/b5.png'),
    y1: require('../assets/y1.png'),
    y2: require('../assets/y2.png'),
    y3: require('../assets/y3.png'),
    y4: require('../assets/y4.png'),
    y5: require('../assets/y5.png'),
    g1: require('../assets/g1.png'),
    g2: require('../assets/g2.png'),
    g3: require('../assets/g3.png'),
    g4: require('../assets/g4.png'),
    g5: require('../assets/g5.png'),
    empty: require('../assets/empty.png'),
};

const CreateComposterEventModal = ({
    visible,
    setVisible,
    create,
    composterID,
}) => {
    const [type, setType] = useState('');
    const [amount, setAmount] = useState(10);
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <Modal visible={visible} onDismiss={setVisible}>
            <View style={{ padding: 20 }}>
                <DropDown
                    label='Type'
                    visible={showDropdown}
                    showDropDown={() => setShowDropdown(true)}
                    onDismiss={() => setShowDropdown(false)}
                    value={type}
                    setValue={setType}
                    list={Object.keys(dupa).map((t) => ({
                        label: t,
                        value: t,
                    }))}
                />
                <TextInput
                    placeholder='Ingredients amount [kg]'
                    keyboardType='numeric'
                    value={amount}
                    onChangeText={setAmount}
                />
                <Button
                    onPress={() => {
                        create({
                            date: new Date().valueOf(),
                            composterID,
                            type,
                            amount,
                        });
                        setVisible(false);
                        setType('');
                        setAmount(10);
                    }}
                >
                    Add
                </Button>
            </View>
        </Modal>
    );
};

export const Composter = ({ data, remove }) => {
    const [events, setEvents] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('events', (err, v) => {
            if (err || !v) return;
            setEvents(
                JSON.parse(v).filter((event) => event.composterID === data.id),
            );
        });
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    let avLvll = 0;
    let filled = 0;
    let cnratio = 0;

    events.forEach((event, i) => {
        const d = new Date(event.date * 1000);
        const now = new Date();
        const diff = d - now;
        const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
        const lvl = Math.round(diffDays / 100);
        cnratio += dupa[event.type] * event.amount;
        avLvll += lvl * event.amount;
        filled += event.amount;
    });

    const lvl = avLvll / filled;
    cnratio /= filled;
    filled /= data.volume;
    let name = '';
    if (lvl >= 100) name = 'b';
    else if (lvl >= 50) name = 'y';
    else if (lvl >= 0) name = 'g';

    if (filled > 80) name += '5';
    else if (filled > 60) name += '4';
    else if (filled > 40) name += '3';
    else if (filled > 20) name += '2';
    else if (filled > 0) name += '1';
    else if (filled === 0) name = 'empty';

    return (
        <List.Accordion
            title={data.name}
            left={(props) => <List.Icon {...props} icon='folder' />}
            style={{ padding: 10 }}
            onLongPress={remove}
        >
            <View style={{ padding: 10 }}>
                <Text>{data.name}</Text>
                <Text>{name}</Text>
                <Image
                    resizeMode='center'
                    style={{ width: '100%', marginVertical: -120 }}
                    source={imgs[name]}
                />
                <Text>{data.id}</Text>
                <Text>{data.volume}</Text>
                <Text>Filled in {filled}%</Text>
                <Text>Progress {lvl || 0}%</Text>
                <Text>C:N ratio {cnratio || 1}:1</Text>
                <Button onPress={() => setModalOpen(true)}>Add material</Button>

                <CreateComposterEventModal
                    composterID={data.id}
                    create={(data) => setEvents((old) => [...old, data])}
                    setVisible={setModalOpen}
                    visible={modalOpen}
                />
            </View>
        </List.Accordion>
    );
};
