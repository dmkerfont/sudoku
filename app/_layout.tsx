import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: true,
                    headerTitle: 'Sudoku Solver!',
                    headerTitleAlign: 'center',
                }}
            />
        </Stack>
    );
}
