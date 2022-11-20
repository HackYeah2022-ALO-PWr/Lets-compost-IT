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

const CreateDeleteModal = ({ visible, setVisible, remove }) => {
    return (
        <Modal visible={visible} onDismiss={setVisible}>
            <View style={{ marginLeft: 50, padding: 20 }}>
                <Button
                    mode='contained'
                    onPress={() => {
                        remove();
                        setVisible(false);
                    }}
                >
                    Remove
                </Button>
            </View>
        </Modal>
    );
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
        <Modal presentationStyle='fullScreen' visible={visible} onDismiss={setVisible}>
            <View style={{ marginLeft: 50, padding: 20 }}>
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
                    mode='contained'
                    onPress={() => {
                        create({
                            date: new Date().valueOf() / 1000,
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
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('events', (err, v) => {
            if (err || !v) return;
            setEvents(
                JSON.parse(v).filter((event) => event.composterID === data.id),
            );
        });
    }, []);

    let avLvll = 0;
    let filled = 0;
    let cnratio = 0;
    events.forEach((event, i) => {
        const d = new Date(event.date * 1000);
        const now = new Date();
        const diff = Math.abs(d.getTime() - now.getTime());
        const diffDays = diff / (1000 * 3600 * 24);
        const lvl = Math.round(diffDays / 100);
        cnratio += dupa[event.type] * event.amount;
        avLvll += lvl * event.amount;
        filled += event.amount;
    });

    let lvl = avLvll / filled;
    cnratio /= filled;
    filled = Math.round((filled / data.volume) * 100);
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
            onLongPress={() => setDeleteModalOpen(true)}
        >
            <View style={{marginBottom: -200, marginLeft: -50}}>
                <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15}}>Capacity: {data.volume}kg</Text>
                <Image
                    resizeMode='center'
                    style={{ width: '100%', maxHeight: 210}}
                    source={imgs[name]}
                />
                <Text>Filled in {filled}%</Text>
                <Text>Progress {Math.min(100, lvl) || 0}%</Text>
                <Text>C:N ratio {cnratio || 1}:1</Text>
                <Text>(carbon to nitrogen ratio)</Text>
                <Button onPress={() => setModalOpen(true)}>Add material</Button>
                <CreateComposterEventModal
                    composterID={data.id}
                    create={(data) => {
                        setEvents((old) => [...old, data]);
                        AsyncStorage.setItem('events', JSON.stringify(events));
                    }}
                    setVisible={setModalOpen}
                    visible={modalOpen}
                />

                <CreateDeleteModal
                    remove={remove}
                    setVisible={setDeleteModalOpen}
                    visible={deleteModalOpen}
                />
            </View>
        </List.Accordion>
    );
};
