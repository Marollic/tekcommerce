import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';


const NavigationTabHeader = (props: any) => {
    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer();
    };

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
            <TouchableOpacity onPress={toggleDrawer}>
                <Icon name="list"
                    type='entypo'
                    color='#9921E8'
                    containerStyle={{ marginLeft: 15}}
                />
            </TouchableOpacity>
        </View>
    );
};
export default NavigationTabHeader;