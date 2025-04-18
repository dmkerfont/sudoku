import { createContext, ReactNode, useContext, useState } from 'react';

export type CellSizeContextType = {
    cellSize: number;
    setCellSize: React.Dispatch<React.SetStateAction<number>>;
};

const CellSizeContext = createContext<CellSizeContextType | undefined>(
    undefined
);

export const CellSizeContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [cellSize, setCellSize] = useState<number>(0);

    return (
        <CellSizeContext.Provider value={{ cellSize, setCellSize }}>
            {children}
        </CellSizeContext.Provider>
    );
};

export const useCellSizeContext = (): CellSizeContextType => {
    const context = useContext(CellSizeContext);
    if (!context) {
        throw new Error(
            'useCellSizeContext must be used within a CellSizeContextProvider'
        );
    }
    return context;
};
