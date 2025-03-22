import {create} from "zustand/index";
import type {FoobarState} from "./types";

export const foobarStore = create<FoobarState>((set) => ({
    foo: 'hello',
    bar: 42,
    setFoo: (value) => set({foo: value}),
    setBar: (value) => set({bar: value}),
}));

// Create a snapshot getter
export const getSnapshot = () => foobarStore.getState();

// Create a subscribe function for useSyncExternalStore
export const subscribe = (callback: () => void) => foobarStore.subscribe(callback);
