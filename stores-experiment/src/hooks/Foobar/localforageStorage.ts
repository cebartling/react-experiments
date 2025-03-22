import localforage from 'localforage';
import {StateStorage} from "zustand/middleware";

export const localforageStorage = (key: string): StateStorage => ({
    getItem: async (_key: string): Promise<string | null> => {
        const value = await localforage.getItem<string>(key);
        return value ?? null;
    },
    setItem: async (_key: string, value: string): Promise<void> => {
        await localforage.setItem(key, value);
    },
    removeItem: async (_key: string): Promise<void> => {
        await localforage.removeItem(key);
    },
});

