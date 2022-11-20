import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-native-paper';
import { MainContainer } from './navigation';

export const App = () => {
    return (
        <NativeBaseProvider>
            <Provider>
                <MainContainer />
            </Provider>
        </NativeBaseProvider>
    );
};
