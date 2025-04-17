import { useState } from "react";
import { LayoutChangeEvent, StyleSheet, TextStyle } from "react-native";

export interface DynamicFontSizes {
    cellFontLarge: TextStyle;
    cellFontMedium: TextStyle;
    cellPencilMarkFont: TextStyle;
}

export interface UseDynamicFontSizesObject {
    onCellLayoutEvent: (event: LayoutChangeEvent) => void;
    cellFontSizes: ReturnType<typeof StyleSheet.create<DynamicFontSizes>>;
}

export const UseDynamicFontSizes = (): UseDynamicFontSizesObject => {
    const [cellSize, setCellSize] = useState(0);

    const onCellLayoutEvent = (event: LayoutChangeEvent) => {
        setCellSize(event.nativeEvent.layout.height);
    };

    const largeFont = cellSize / 2;
    const mediumFont = largeFont * 3 / 4;
    const pencilMarkSize = largeFont * .4;

    console.log(`cellSize: ${cellSize}, largeFont: ${largeFont}, mediumFont: ${mediumFont}, pencilMarks: ${pencilMarkSize}`);

    const cellFontSizes = StyleSheet.create({
        cellFontLarge: {
            fontSize: largeFont,
            lineHeight: largeFont
        },
        cellFontMedium: {
            fontSize: mediumFont,
            lineHeight: mediumFont
        },
        cellPencilMarkFont: {
            fontSize: pencilMarkSize,
            lineHeight: pencilMarkSize
        }
    });

    return {
        cellFontSizes,
        onCellLayoutEvent
    }
}