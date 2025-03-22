import { beforeEach, describe, expect, it, vi } from 'vitest';
import localforage from 'localforage';
import { localforageStorage } from './localforageStorage';

describe('localforageStorage', () => {
    const key = 'testKey';
    const storage = localforageStorage(key);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('retrieves an item from localforage', async () => {
        const value = 'testValue';
        vi.spyOn(localforage, 'getItem').mockResolvedValue(value);

        const result = await storage.getItem(key);

        expect(result).toBe(value);
        expect(localforage.getItem).toHaveBeenCalledWith(key);
    });

    it('returns null if the item does not exist in localforage', async () => {
        vi.spyOn(localforage, 'getItem').mockResolvedValue(null);

        const result = await storage.getItem(key);

        expect(result).toBeNull();
        expect(localforage.getItem).toHaveBeenCalledWith(key);
    });

    it('sets an item in localforage', async () => {
        const value = 'testValue';
        // @ts-expect-error - localforage types are not up to date
        vi.spyOn(localforage, 'setItem').mockResolvedValue();

        await storage.setItem(key, value);

        expect(localforage.setItem).toHaveBeenCalledWith(key, value);
    });

    it('removes an item from localforage', async () => {
        vi.spyOn(localforage, 'removeItem').mockResolvedValue();

        await storage.removeItem(key);

        expect(localforage.removeItem).toHaveBeenCalledWith(key);
    });
});
