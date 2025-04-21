import { useDynamicFontSizes } from '@/hooks/useDynamicFontSizes';
import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { Icon } from 'react-native-paper';

export interface HamburgerMenuButtonProps {
    onHamburgerMenuPress: VoidFunction;
    style?: StyleProp<ViewStyle>;
}

export const HamburgerMenuButton: React.FC<HamburgerMenuButtonProps> = ({
    onHamburgerMenuPress,
    style,
}) => {
    const { cellFontStyles } = useDynamicFontSizes();

    return (
        <TouchableOpacity
            onPress={onHamburgerMenuPress}
            style={[buttonStyle, style]}
        >
            <Icon
                source={'menu'}
                size={cellFontStyles.numberSelectorFont.fontSize || 36}
                color={'#808080'}
            />
        </TouchableOpacity>
    );
};

const buttonStyle: ViewStyle = {
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
};
