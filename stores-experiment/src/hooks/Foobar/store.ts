import { create } from 'zustand/index';
import { persist } from 'zustand/middleware';
import type { FoobarState } from './types';
import { localforageStorage } from './localforageStorage';

const foobarStore = create<FoobarState>()(
    persist(
        (set) => ({
            foo: 'hello',
            bar: 42,
            setFoo: (value) => set({ foo: value }),
            setBar: (value) => set({ bar: value }),
        }),
        {
            name: 'foobar-indexeddb',
            // @ts-expect-error - localforageStorage is not a valid StateStorage
            storage: localforageStorage('foobar-indexeddb'),
            // @ts-expect-error - override persistence to only persist foo and bar
            partialize: (state) => ({
                foo: state.foo,
                bar: state.bar,
            }),
        }
    )
);

// Create a snapshot getter
export const getSnapshot = () => foobarStore.getState();

// Create a subscribe function for useSyncExternalStore
export const subscribe = (callback: () => void) => foobarStore.subscribe(callback);
