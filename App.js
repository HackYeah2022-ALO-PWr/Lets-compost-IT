import React from 'react';
import { Provider } from 'react-native-paper';
import { MainContainer } from './navigation';

export const App = () => {
    return (
        <Provider>
            <MainContainer />
        </Provider>
    );
};
