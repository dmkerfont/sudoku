import { useDynamicFontSizes } from '@/hooks/useDynamicFontSizes';
import { Difficulty } from '@/hooks/useGenerateBoard';
import { HightlightColors } from '@/types/HighlightColors';
import { PenColors } from '@/types/PenColors';
import React from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Icon } from 'react-native-paper';

export interface SettingsModalProps {
    isVisible: boolean;
    penColor: PenColors;
    highlightColor: HightlightColors;
    setPenColor: (color: PenColors) => void;
    setHighlightColor: (color: HightlightColors) => void;
    onRequestClose: VoidFunction;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
    isVisible,
    highlightColor,
    penColor,
    setHighlightColor,
    setPenColor,
    onRequestClose,
}) => {
    const { cellSize, cellFontStyles } = useDynamicFontSizes();

    return (
        <Modal
            visible={isVisible}
            transparent={isVisible}
            animationType="fade"
            onRequestClose={onRequestClose}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={onRequestClose}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Settings</Text>

                    <View style={styles.row}>
                        <Text>Pen Color</Text>

                        {Object.entries(PenColors).map(([key, value]) => (
                            <Pressable
                                key={key}
                                onPress={() => setPenColor(value)}
                            >
                                <View
                                    style={[
                                        styles.button,
                                        {
                                            backgroundColor: highlightColor,
                                            width: cellSize,
                                            height: cellSize,
                                            borderWidth:
                                                value === penColor ? 1 : 0,
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.colorText,
                                            cellFontStyles.cellFontLarge,
                                            {
                                                color: value,
                                            },
                                        ]}
                                    >
                                        1
                                    </Text>
                                </View>
                            </Pressable>
                        ))}
                    </View>

                    <View style={styles.row}>
                        <Text>Highlight Color</Text>

                        {Object.values(HightlightColors).map(value => (
                            <Pressable
                                key={value}
                                onPress={() => setHighlightColor(value)}
                            >
                                <View
                                    style={[
                                        styles.button,
                                        {
                                            backgroundColor: value,
                                            width: cellSize,
                                            height: cellSize,
                                            borderWidth:
                                                value === highlightColor
                                                    ? 1
                                                    : 0,
                                        },
                                    ]}
                                >
                                    {value === highlightColor ? (
                                        <Icon
                                            source={'check'}
                                            size={
                                                cellFontStyles
                                                    .numberSelectorFont
                                                    .fontSize || 36
                                            }
                                            color={penColor}
                                        />
                                    ) : undefined}
                                </View>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16,
        maxWidth: 600,
        width: '90%',
    },
    modalTitle: {
        fontSize: 24,
        paddingBottom: 16,
        fontWeight: 'semibold',
        alignSelf: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    settingName: {
        fontSize: 16,
        fontWeight: '500',
    },
    colorText: {
        fontWeight: '500',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        margin: 8,
    },
});
