import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../test/test-utils';
import { createMockHistoryItem } from '../test/mock-data';
import TimelineItem from './TimelineItem';

describe('TimelineItem', () => {
    describe('Work History', () => {
        it('renders work title and company', () => {
            const workItem = createMockHistoryItem('work');
            renderWithProviders(<TimelineItem {...workItem} />);

            expect(screen.getByText(/Senior Developer/)).toBeInTheDocument();
            expect(screen.getByText('Tech Company')).toBeInTheDocument();
        });

        it('renders work description', () => {
            const workItem = createMockHistoryItem('work');
            renderWithProviders(<TimelineItem {...workItem} />);

            expect(screen.getByText('Test work description')).toBeInTheDocument();
        });

        it('renders projects list when provided', () => {
            const workItem = createMockHistoryItem('work');
            renderWithProviders(<TimelineItem {...workItem} />);

            expect(screen.getByText('Project A')).toBeInTheDocument();
            expect(screen.getByText('Project B')).toBeInTheDocument();
        });

        it('does not render projects section when empty', () => {
            const workItem = createMockHistoryItem('work', { projects: [] });
            const { container } = renderWithProviders(<TimelineItem {...workItem} />);

            expect(container.textContent).not.toContain('Key Projects');
        });

        it('applies work-specific styling', () => {
            const workItem = createMockHistoryItem('work');
            const { container } = renderWithProviders(<TimelineItem {...workItem} />);

            expect(container.querySelector('.hover\\:border-orange')).toBeInTheDocument();
        });
    });

    describe('Education History', () => {
        it('renders degree and institution', () => {
            const eduItem = createMockHistoryItem('education');
            renderWithProviders(<TimelineItem {...eduItem} />);

            expect(screen.getByText(/Bachelor of Science/)).toBeInTheDocument();
            expect(screen.getByText('University')).toBeInTheDocument();
        });

        it('renders education description', () => {
            const eduItem = createMockHistoryItem('education');
            renderWithProviders(<TimelineItem {...eduItem} />);

            expect(screen.getByText(/Test education description/)).toBeInTheDocument();
        });

        it('renders additional info when provided', () => {
            const eduItem = createMockHistoryItem('education');
            const { container } = renderWithProviders(<TimelineItem {...eduItem} />);

            // The additional info is rendered in a single paragraph with whitespace-pre-line
            const text = container.textContent;
            expect(text).toContain("Dean's List");
            expect(text).toContain('Research Assistant');
        });

        it('applies education-specific styling', () => {
            const eduItem = createMockHistoryItem('education');
            const { container } = renderWithProviders(<TimelineItem {...eduItem} />);

            expect(container.querySelector('.hover\\:border-magenta')).toBeInTheDocument();
        });
    });

    describe('Common Behavior', () => {
        it('displays year in title', () => {
            const item = createMockHistoryItem('work', { year: '2024' });
            renderWithProviders(<TimelineItem {...item} />);

            expect(screen.getByText(/\(2024\)/)).toBeInTheDocument();
        });

        it('has default cursor style', () => {
            const item = createMockHistoryItem('work');
            const { container } = renderWithProviders(<TimelineItem {...item} />);

            expect(container.firstChild).toHaveClass('cursor-default');
        });

        it('applies hover effects', () => {
            const item = createMockHistoryItem('work');
            const { container } = renderWithProviders(<TimelineItem {...item} />);

            expect(container.firstChild).toHaveClass('hover:bg-navy-800/50');
        });
    });
});
