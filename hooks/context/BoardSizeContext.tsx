import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

export type BoardSizeContextType = {
    boardSize: number;
    cellSize: number;
    setBoardSize: React.Dispatch<React.SetStateAction<number>>;
};

const BoardSizeContext = createContext<BoardSizeContextType | undefined>(
    undefined
);

export const BoardSizeContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [cellSize, setCellSize] = useState<number>(0);
    const [boardSize, setBoardSize] = useState<number>(0);

    useEffect(() => {
        // 9 cells per row
        setCellSize(boardSize / 9);
    }, [boardSize]);

    return (
        <BoardSizeContext.Provider
            value={{ boardSize, setBoardSize, cellSize }}
        >
            {children}
        </BoardSizeContext.Provider>
    );
};

export const useBoardSizeContext = (): BoardSizeContextType => {
    const context = useContext(BoardSizeContext);
    if (!context) {
        throw new Error(
            'useCellSizeContext must be used within a CellSizeContextProvider'
        );
    }
    return context;
};
