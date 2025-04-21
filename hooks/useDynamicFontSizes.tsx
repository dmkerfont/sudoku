import { StyleSheet, TextStyle } from 'react-native';
import { useBoardSizeContext as useBoardSizeContext } from './context/BoardSizeContext';

export interface DynmamicFontStyles {
    cellFontLarge: TextStyle;
    cellFontMedium: TextStyle;
    cellPencilMarkFont: TextStyle;
}

export interface UseDynamicFontSizesObject {
    cellFontStyles: DynmamicFontStyles;
    cellSize: number; // TODO: check if used
}

export const useDynamicFontSizes = (): UseDynamicFontSizesObject => {
    const { cellSize } = useBoardSizeContext();

    const largeFont = cellSize / 2;
    const mediumFont = (largeFont * 3) / 4;
    const pencilMarkSize = largeFont * 0.4;

    const cellFontStyles = StyleSheet.create({
        cellFontLarge: {
            fontSize: largeFont,
            lineHeight: largeFont,
        },
        cellFontMedium: {
            fontSize: mediumFont,
            lineHeight: mediumFont,
        },
        cellPencilMarkFont: {
            fontSize: pencilMarkSize,
            lineHeight: pencilMarkSize,
        },
    });

    return {
        cellFontStyles,
        cellSize,
    };
};
