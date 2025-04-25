import { useBoardSizeContext } from '@/hooks/context/BoardSizeContext';
import {
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';
import { EraserButton } from './EraserButton';
import { PencilMarkButton } from './PencilMarkButton';
import { GameState } from '@/hooks/useGameState';
import { useDynamicFontSizes } from '@/hooks/useDynamicFontSizes';
import { HamburgerMenuButton } from './HamburgerMenuButton';

export interface ButtonsContainerProps {
    isMobileLayout: boolean;
    gameState: GameState;
    onMenuButtonPressed: VoidFunction;
}

export const ButtonsContainer: React.FC<ButtonsContainerProps> = ({
    gameState,
    isMobileLayout,
    onMenuButtonPressed,
}) => {
    const { boardSize } = useBoardSizeContext();
    const { cellFontStyles } = useDynamicFontSizes();

    const buttonMargin = 2;
    const buttonsPerRow = 6;
    const containerPadding = 2;

    // at some certain aspect ratio the buttons and board began to wiggle, reducing button size seems to have helped.
    const wiggleRoom = 2;

    const buttonSize =
        Math.floor(
            (boardSize -
                containerPadding * 2 -
                buttonsPerRow * (buttonMargin * 2)) /
                buttonsPerRow
        ) - wiggleRoom;

    const numberButtons: JSX.Element[] = [];
    for (let i = 1; i <= 9; i++) {
        const totalCount = gameState.getSelectedNumberCount(i);
        const isSelected = gameState.selectedNumber === i;

        numberButtons.push(
            <Pressable
                onPress={() => gameState.selectNumber(i)}
                style={[
                    styles.numberButton,
                    totalCount === 9 ? styles.disabled : undefined,
                    {
                        width: buttonSize,
                        margin: buttonMargin,
                    },
                    ,
                    isSelected ? styles.selected : undefined,
                ]}
                key={i}
            >
                <Text
                    selectable={false}
                    style={[
                        cellFontStyles.cellFontLarge,
                        isSelected
                            ? [
                                  styles.selectedText,
                                  cellFontStyles.numberSelectorFont,
                              ]
                            : undefined,
                    ]}
                >
                    {i}
                </Text>
                <Text
                    style={cellFontStyles.cellPencilMarkFont}
                    selectable={false}
                >{`(${totalCount})`}</Text>
            </Pressable>
        );
    }

    return (
        <View
            style={[
                styles.buttonsContainer,
                isMobileLayout
                    ? {
                          width: boardSize,
                          alignSelf: 'center',
                          flexDirection: 'row',
                          padding: containerPadding,
                      }
                    : {
                          flexDirection: 'column',
                          alignItems: 'center',
                          padding: containerPadding,
                          maxHeight: boardSize,
                          alignSelf: 'center',
                      },
            ]}
        >
            {numberButtons}

            <EraserButton
                onEraserToggle={gameState.toggleEraser}
                isSelected={gameState.isEraserEnabled}
                style={{
                    margin: buttonMargin,
                    height: buttonSize,
                    width: buttonSize,
                }}
            />

            <PencilMarkButton
                onPencilMarkToggle={gameState.togglePencilMarks}
                isSelected={gameState.pencilMarksEnabled}
                style={{
                    margin: buttonMargin,
                    height: buttonSize,
                    width: buttonSize,
                }}
            />

            <HamburgerMenuButton
                onHamburgerMenuPress={onMenuButtonPressed}
                style={{
                    margin: buttonMargin,
                    height: buttonSize,
                    width: buttonSize,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonsContainer: {
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    tertiaryButton: {
        padding: 12,
        backgroundColor: '#bbb',
        margin: 6,
        borderRadius: 6,
        minWidth: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    numberButton: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: 'gray',
        boxSizing: 'border-box',
    },
    disabled: {
        backgroundColor: '#D3D3D3',
    },
    selectedText: {
        fontWeight: '600',
    },
    selected: {
        backgroundColor: '#B9FCFF',
    },
});
