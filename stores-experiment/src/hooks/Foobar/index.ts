import {useSyncExternalStore} from 'react';
import {create} from 'zustand';

// Define the state shape
interface FoobarState {
    foo: string;
    bar: number;
    setFoo: (value: string) => void;
    setBar: (value: number) => void;
}

const foobarStore = create<FoobarState>((set) => ({
    foo: 'hello',
    bar: 42,
    setFoo: (value) => set({foo: value}),
    setBar: (value) => set({bar: value}),
}));

// Create a snapshot getter
const getSnapshot = () => foobarStore.getState();

// Create a subscribe function for useSyncExternalStore
const subscribe = (callback: () => void) => foobarStore.subscribe(callback);

// Custom hook that provides the full state
export function useFoobar(): FoobarState {
    return useSyncExternalStore(subscribe, getSnapshot);
}
