import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import base from '../styles/base';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const art1 = require('../assets/art1.webp');
const art2 = require('../assets/art2.jpg');
const art3 = require('../assets/art3.webp');
const art4 = require('../assets/art4.jpg');
const art5 = require('../assets/art5.jpg');

const articles = [
    {
        title: 'What Is Composting?',
        content:
            'Composting is the natural process of recycling organic matter, such as...',
        source: art1,
    },
    {
        title: 'Why do I need compost?',
        content:
            'Some garden soils can be good for growing plants, however they can vary considerably...',
        source: art2,
    },
    {
        title: 'Some tips',
        content:
            'Most plants you buy from garden centres are already planted in suitable compost so, to encourage...',
        source: art3,
    },
    {
        title: 'Reduces the Waste Stream',
        content:
            'Composting is a great way to recycle the organic waste we generate at home. Food scraps and garden waste combined make up more than...',
        source: art4,
    },
    {
        title: 'Compost Ingredients',
        content:
            'Organisms that decompose organic waste need four key elements to thrive: nitrogen...',
        source: art5,
    },
];

export const ArticlesPage = () => {
    return (
        <ScrollView style={{ padding: 20 }}>
            {articles.map((art, i) => (
                <Card key={i} style={{ marginBottom: 50 }}>
                    <Card.Title title={art.title} />
                    <Card.Content>
                        <Paragraph>{art.content}</Paragraph>
                    </Card.Content>
                    <Card.Cover source={art.source} />
                    <Card.Actions>
                        <Button>read more</Button>
                    </Card.Actions>
                </Card>
            ))}
        </ScrollView>
    );
};
