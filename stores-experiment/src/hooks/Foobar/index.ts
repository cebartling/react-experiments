import { useSyncExternalStore } from 'react';
import { FoobarState } from './types';
import { getSnapshot, subscribe } from './store';

// Custom hook that provides the full state
export function useFoobar(): FoobarState {
    return useSyncExternalStore(subscribe, getSnapshot);
}
