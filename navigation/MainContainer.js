import { useCallback } from 'react';
import { Image } from 'react-native';
import {
    NavigationContainer,
    useNavigation,
    DrawerActions,
} from '@react-navigation/native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { IconButton } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CalendarPage, MyCompostersPage, ArticlesPage } from '../pages';

const homeName = 'Home';
const detailsName = 'Details';
const settingsName = 'Settings';

const MenuIcon = () => {
    const navigation = useNavigation();
    const openDrawer = useCallback(() => {
        navigation.dispatch(DrawerActions.openDrawer());
    }, []);

    return <IconButton icon='menu' size={24} onPress={openDrawer} />;
};

const MenuContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            {/* <Image
                resizeMode='cover'
                style={{ width: '100%', height: 500 }}
                source={require('../assets/composter.png')}
            /> */}
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

export const MainContainer = () => {
    const Drawer = createDrawerNavigator();

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Drawer.Navigator
                    screenOptions={{
                        headerShown: true,
                        headerLeft: () => <MenuIcon />,
                        unmountOnBlur: true,
                    }}
                    drawerContent={(props) => <MenuContent {...props} />}
                >
                    <Drawer.Screen name='History' component={CalendarPage} />
                    <Drawer.Screen
                        name='My Composters'
                        component={MyCompostersPage}
                    />
                    <Drawer.Screen name='Articles' component={ArticlesPage} />
                </Drawer.Navigator>
            </NavigationContainer>
            <StatusBar style='auto' />
        </SafeAreaProvider>
    );
};
