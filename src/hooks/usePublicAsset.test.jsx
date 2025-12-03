import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import usePublicAsset from './usePublicAsset';

describe('usePublicAsset', () => {
    let mockImage;

    beforeEach(() => {
        // Mock Image constructor
        mockImage = {
            onload: null,
            onerror: null,
            src: '',
        };

        global.Image = class {
            constructor() {
                return mockImage;
            }
        };
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('returns null initially', () => {
        const { result } = renderHook(() =>
            usePublicAsset('/assets/skills/', 'React')
        );

        expect(result.current).toBeNull();
    });

    it('returns path when image loads successfully', async () => {
        const { result } = renderHook(() =>
            usePublicAsset('/assets/skills/', 'React')
        );

        // Simulate successful image load
        setTimeout(() => {
            if (mockImage.onload) mockImage.onload();
        }, 0);

        await waitFor(() => {
            expect(result.current).toBe('/assets/skills/React.png');
        });
    });

    it('tries multiple extensions', async () => {
        const { result } = renderHook(() =>
            usePublicAsset('/assets/skills/', 'Python', ['svg', 'png'])
        );

        // First extension fails
        setTimeout(() => {
            if (mockImage.onerror) mockImage.onerror();
        }, 0);

        // Second extension succeeds
        setTimeout(() => {
            if (mockImage.onload) mockImage.onload();
        }, 10);

        await waitFor(() => {
            expect(result.current).toBeTruthy();
        });
    });

    it('tries lowercase variations', async () => {
        const { result } = renderHook(() =>
            usePublicAsset('/assets/skills/', 'PostgreSQL')
        );

        // Exact name fails
        setTimeout(() => {
            if (mockImage.onerror) mockImage.onerror();
        }, 0);

        // Lowercase succeeds
        setTimeout(() => {
            if (mockImage.onload) mockImage.onload();
        }, 10);

        await waitFor(() => {
            expect(result.current).toBeTruthy();
        });
    });

    it('handles missing images gracefully', async () => {
        const { result } = renderHook(() =>
            usePublicAsset('/assets/skills/', 'NonexistentSkill', ['png'])
        );

        // Simulate all attempts failing
        setTimeout(() => {
            if (mockImage.onerror) mockImage.onerror();
        }, 0);

        await waitFor(
            () => {
                expect(result.current).toBeNull();
            },
            { timeout: 2000 }
        );
    });

    it('returns null when fileName is empty', () => {
        const { result } = renderHook(() =>
            usePublicAsset('/assets/skills/', '')
        );

        expect(result.current).toBeNull();
    });

    it('updates when fileName changes', async () => {
        const { result, rerender } = renderHook(
            ({ fileName }) => usePublicAsset('/assets/skills/', fileName),
            { initialProps: { fileName: 'React' } }
        );

        // Load first image
        setTimeout(() => {
            if (mockImage.onload) mockImage.onload();
        }, 0);

        await waitFor(() => {
            expect(result.current).toBeTruthy();
        });

        // Change fileName
        rerender({ fileName: 'Vue' });

        // Load new image
        setTimeout(() => {
            if (mockImage.onload) mockImage.onload();
        }, 10);

        await waitFor(() => {
            expect(result.current).toBeTruthy();
        });
    });
});
