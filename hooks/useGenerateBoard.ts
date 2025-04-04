import { CellState } from "@/types/CellState";
import { useGridUtilities } from "./useGridUtilities";
import { useRef } from "react";
import { Cell } from "@/types/Cell";

export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';

export interface UseGenerateBoardObj {
  generate: (difficulty: Difficulty) => CellState[][];
};

export const useGenerateBoard = (): UseGenerateBoardObj => {  
  const GridUtilities = useGridUtilities();

  const isGridFull = (grid: CellState[][]): boolean => {
    for(let r = 0; r < 9; r++){
      for(let c = 0; c < 9; c++){
        if(grid[r][c].value === 0){
          return false;
        }
      }
    }

    return true;
  }

  const initEmptyGrid = (): CellState[][] => {
    const grid: CellState[][] = [];
    for (let r = 0; r < 9; r++){
      grid[r] = [];
      for (let c = 0; c < 9; c++){
        grid[r][c] = {
          box: GridUtilities.getBoxNumber(r, c),
          row: r,
          column: c,
          pencilMarks: [],
          showError: false,
          value: 0
        };
      }
    }

    return grid;
  }
  
  const solutionsCountRef = useRef<number>(0);

  /** Recursively tries all combinations of numbers to solve a grid.
      Returns true if the grid is solved. Trying all numbers 1-9 unsuccessfully
      will revert cell back to 0.
   */
  const solveGrid = (grid: CellState[][]): boolean => {
    for(let cell = 0; cell < 81; cell++){
      let r = Math.floor(cell/9);
      let c = cell % 9;

      if(grid[r][c].value == 0){
        // Try 1-9
        for(let num = 1; num < 10; num++){
          const boxNumber = GridUtilities.getBoxNumber(r, c);
          
          const boxCells = GridUtilities.getBoxCells(grid, boxNumber);
          const rowCells = GridUtilities.getRowCells(grid, r);
          const columnCells = GridUtilities.getColumnCells(grid, c);

          const existsAlready = [...boxCells, ...rowCells, ...columnCells].find(c => c.value === num) !== undefined;
          if(!existsAlready){
            // Valid choice... so far, try it out
            grid[r][c].value == num;
            
            if(isGridFull(grid)){
              solutionsCountRef.current++;
              break;
            }
            else {
              // Recursively continue solving the grid.
              if(solveGrid(grid)){                
                return true;
              }
            }
          }
          break;
        }
      }
      
      grid[r][c].value = 0;
    }
    return false;
  }


  return {
    generate: (): CellState[][] => {
      const grid = initEmptyGrid();

      solutionsCountRef.current = 0;

      solveGrid(grid);

      return grid;
    }
  }
};

/*
#A backtracking/recursive function to check all possible combinations of numbers until a solution is found
def solveGrid(grid):
  global counter
  #Find next empty cell
  for i in range(0,81):
    row=i//9
    col=i%9
    if grid[row][col]==0:
      for value in range (1,10):
        # check not in row, column, or box
        grid[row][col]=value
        if checkGrid(grid):
          counter+=1
          break
        else:
          if solveGrid(grid):
            return True
      break
  grid[row][col]=0  

numberList=[1,2,3,4,5,6,7,8,9]
#shuffle(numberList)

#A backtracking/recursive function to check all possible combinations of numbers until a solution is found
def fillGrid(grid):
  global counter
  #Find next empty cell
  for i in range(0,81):
    row=i//9
    col=i%9
    if grid[row][col]==0:
      shuffle(numberList)      
      for value in numberList:
        #Check that this value has not already be used on this row
        if not(value in grid[row]):
          #Check that this value has not already be used on this column
          if not value in (grid[0][col],grid[1][col],grid[2][col],grid[3][col],grid[4][col],grid[5][col],grid[6][col],grid[7][col],grid[8][col]):
            #Identify which of the 9 squares we are working on
            square=[]
            if row<3:
              if col<3:
                square=[grid[i][0:3] for i in range(0,3)]
              elif col<6:
                square=[grid[i][3:6] for i in range(0,3)]
              else:  
                square=[grid[i][6:9] for i in range(0,3)]
            elif row<6:
              if col<3:
                square=[grid[i][0:3] for i in range(3,6)]
              elif col<6:
                square=[grid[i][3:6] for i in range(3,6)]
              else:  
                square=[grid[i][6:9] for i in range(3,6)]
            else:
              if col<3:
                square=[grid[i][0:3] for i in range(6,9)]
              elif col<6:
                square=[grid[i][3:6] for i in range(6,9)]
              else:  
                square=[grid[i][6:9] for i in range(6,9)]
            #Check that this value has not already be used on this 3x3 square
            if not value in (square[0] + square[1] + square[2]):
              grid[row][col]=value
              if checkGrid(grid):
                return True
              else:
                if fillGrid(grid):
                  return True
      break
  grid[row][col]=0             
    
#Generate a Fully Solved Grid
fillGrid(grid)
drawGrid(grid) 
myPen.getscreen().update()
sleep(1)


#Start Removing Numbers one by one

#A higher number of attempts will end up removing more numbers from the grid
#Potentially resulting in more difficiult grids to solve!
attempts = 5 
counter=1
while attempts>0:
  #Select a random cell that is not already empty
  row = randint(0,8)
  col = randint(0,8)
  while grid[row][col]==0:
    row = randint(0,8)
    col = randint(0,8)
  #Remember its cell value in case we need to put it back  
  backup = grid[row][col]
  grid[row][col]=0
  
  #Take a full copy of the grid
  copyGrid = []
  for r in range(0,9):
     copyGrid.append([])
     for c in range(0,9):
        copyGrid[r].append(grid[r][c])
  
  #Count the number of solutions that this grid has (using a backtracking approach implemented in the solveGrid() function)
  counter=0      
  solveGrid(copyGrid)   
  #If the number of solution is different from 1 then we need to cancel the change by putting the value we took away back in the grid
  if counter!=1:
    grid[row][col]=backup
    #We could stop here, but we can also have another attempt with a different cell just to try to remove more numbers
    attempts -= 1
  
  myPen.clear()
  drawGrid(grid) 
  myPen.getscreen().update()

print("Sudoku Grid Ready")

*/