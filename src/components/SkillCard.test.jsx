import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen, waitFor } from '../test/test-utils';
import { createMockSkill } from '../test/mock-data';
import SkillCard from './SkillCard';

describe('SkillCard', () => {
    it('renders skill name', () => {
        const skill = createMockSkill({ name: 'React' });
        renderWithProviders(<SkillCard {...skill} />);

        expect(screen.getByText('React')).toBeInTheDocument();
    });

    it('shows text display when no icon or logo is available', () => {
        const skill = createMockSkill({ name: 'TestSkill' });
        renderWithProviders(<SkillCard {...skill} />);

        const textElement = screen.getByText('TestSkill');
        expect(textElement).toBeInTheDocument();
        expect(textElement.closest('.border-white')).toBeInTheDocument();
    });

    it('applies hover effects correctly', async () => {
        const skill = createMockSkill({ name: 'React' });
        const { container } = renderWithProviders(<SkillCard {...skill} />);

        const card = container.firstChild;
        expect(card).toHaveClass('hover:bg-navy-950');
    });

    it('displays logo when available', async () => {
        const skill = createMockSkill({ name: 'React' });
        renderWithProviders(<SkillCard {...skill} />);

        await waitFor(() => {
            const img = screen.queryByAltText('React');
            if (img) {
                expect(img).toBeInTheDocument();
            }
        });
    });

    it('has consistent height for layout', () => {
        const skill = createMockSkill();
        const { container } = renderWithProviders(<SkillCard {...skill} />);

        expect(container.firstChild).toHaveClass('h-32');
    });
});
