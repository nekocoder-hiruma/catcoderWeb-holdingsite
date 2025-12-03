import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import useTranslatedContent from './useTranslatedContent';

// Mock dynamic imports
vi.mock('../content/en/history.json', () => ({
    default: [
        { id: '1', type: 'work', title: 'Developer', company: 'Company A' },
        { id: '2', type: 'education', title: 'Degree', company: 'University' },
    ],
}));

vi.mock('../content/en/projects.json', () => ({
    default: [
        { id: '1', title: 'Project 1', isProfessional: true },
        { id: '2', title: 'Project 2', isProfessional: false },
    ],
}));

function Wrapper({ children }) {
    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

describe('useTranslatedContent', () => {
    it('loads content successfully', async () => {
        const { result } = renderHook(() => useTranslatedContent('history'), {
            wrapper: Wrapper,
        });

        await waitFor(() => {
            expect(result.current).toHaveLength(2);
        });

        expect(result.current[0]).toHaveProperty('title', 'Developer');
        expect(result.current[1]).toHaveProperty('title', 'Degree');
    });

    it('returns empty array initially', () => {
        const { result } = renderHook(() => useTranslatedContent('history'), {
            wrapper: Wrapper,
        });

        expect(result.current).toEqual([]);
    });

    it('loads projects data', async () => {
        const { result } = renderHook(() => useTranslatedContent('projects'), {
            wrapper: Wrapper,
        });

        await waitFor(() => {
            expect(result.current).toHaveLength(2);
        });

        expect(result.current[0]).toHaveProperty('isProfessional', true);
        expect(result.current[1]).toHaveProperty('isProfessional', false);
    });

    it('handles missing translations gracefully', async () => {
        const { result } = renderHook(
            () => useTranslatedContent('nonexistent'),
            { wrapper: Wrapper }
        );

        await waitFor(() => {
            expect(result.current).toEqual([]);
        });
    });
});
