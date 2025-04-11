import { EraserButton } from "@/components/EraserButton";
import { NumberSelector } from "@/components/NumberSelector";
import { PencilMarkButton } from "@/components/PencilMarkButton";
import { SudokuBox } from "@/components/SudokuBox";
import { WinnerModal } from "@/components/WinnerModal";
import { useGameState } from "@/hooks/useGameState";
import { ActivityIndicator, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const gameState = useGameState();
  
  if(gameState.isLoading){
    return (
      <View style={styles.pageContainer}>
        <ActivityIndicator/>
      </View>
    );
  }

  return (
    <View style={styles.pageContainer}>
      <View style={styles.headerButtonsContainer}>
        <TouchableOpacity style={styles.flex1} onPress={gameState.initializeGame}>
          <Text style={styles.headerButton}>New Board</Text>
        </TouchableOpacity>        
        
        <TouchableOpacity style={styles.flex1} onPress={gameState.resetGame}>
          <Text style={styles.headerButton}>Reset</Text>
        </TouchableOpacity>        

        <TouchableOpacity style={styles.flex1} onPress={gameState.validateBoard}>
          <Text style={styles.headerButton}>Validate</Text>
        </TouchableOpacity>        
      </View>

      <View style={{flexDirection: 'row', height: '80%'}}>        
        <View style={styles.gameBoard}>
          <SudokuBox boxNumber={0} gameState={gameState}/>
          <SudokuBox boxNumber={1} gameState={gameState}/>
          <SudokuBox boxNumber={2} gameState={gameState}/>
          <SudokuBox boxNumber={3} gameState={gameState}/>
          <SudokuBox boxNumber={4} gameState={gameState}/>
          <SudokuBox boxNumber={5} gameState={gameState}/>
          <SudokuBox boxNumber={6} gameState={gameState}/>
          <SudokuBox boxNumber={7} gameState={gameState}/>
          <SudokuBox boxNumber={8} gameState={gameState}/>
        </View>

        <NumberSelector 
          onNumberSelect={gameState.selectNumber}
          selectedNumber={gameState.selectedNumber}
          style={styles.marginLeft16}
        /> 

        <View style={[styles.column, styles.marginLeft16]}>
          <EraserButton onEraserToggle={gameState.toggleEraser} isSelected={gameState.isEraserEnabled}/>
          <PencilMarkButton onPencilMarkToggle={gameState.togglePencilMarks} isSelected={gameState.pencilMarksEnabled}/>
        </View>
      </View>

      <WinnerModal show={gameState.showWinner} onNewGamePress={gameState.initializeGame}/>

    </View>    
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  gameBoard: {
    aspectRatio: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',

    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
  },
  marginLeft16: {
    marginLeft: 16,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  flex1: {
    flex: 1
  },
  headerButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '40%'
  },
  marginHorizontal16: {
    marginHorizontal: 16
  },
  headerButton: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    flex: 1,
    textAlign: 'center'
  },
});
