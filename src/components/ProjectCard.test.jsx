import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '../test/test-utils';
import { createMockProject } from '../test/mock-data';
import ProjectCard from './ProjectCard';

describe('ProjectCard', () => {
    it('renders project title and description', () => {
        const project = createMockProject();
        renderWithProviders(<ProjectCard {...project} />);

        expect(screen.getByText('Test Project')).toBeInTheDocument();
        expect(screen.getByText('A test project description')).toBeInTheDocument();
    });

    it('renders all tags', () => {
        const project = createMockProject({ tags: ['React', 'Vite', 'Testing'] });
        renderWithProviders(<ProjectCard {...project} />);

        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('Vite')).toBeInTheDocument();
        expect(screen.getByText('Testing')).toBeInTheDocument();
    });

    it('shows GitHub link when URL is provided', () => {
        const project = createMockProject({ githubUrl: 'https://github.com/test' });
        renderWithProviders(<ProjectCard {...project} />);

        const githubLink = screen.getByTitle('View Code');
        expect(githubLink).toBeInTheDocument();
        expect(githubLink).toHaveAttribute('href', 'https://github.com/test');
    });

    it('shows live demo link when URL is provided', () => {
        const project = createMockProject({ liveUrl: 'https://demo.com' });
        renderWithProviders(<ProjectCard {...project} />);

        const liveLink = screen.getByTitle('Live Demo');
        expect(liveLink).toBeInTheDocument();
        expect(liveLink).toHaveAttribute('href', 'https://demo.com');
    });

    it('hides GitHub link when URL is not provided', () => {
        const project = createMockProject({ githubUrl: null });
        renderWithProviders(<ProjectCard {...project} />);

        expect(screen.queryByTitle('View Code')).not.toBeInTheDocument();
    });

    it('hides live demo link when URL is not provided', () => {
        const project = createMockProject({ liveUrl: null });
        renderWithProviders(<ProjectCard {...project} />);

        expect(screen.queryByTitle('Live Demo')).not.toBeInTheDocument();
    });

    it('hides links when URLs are "#"', () => {
        const project = createMockProject({ githubUrl: '#', liveUrl: '#' });
        renderWithProviders(<ProjectCard {...project} />);

        expect(screen.queryByTitle('View Code')).not.toBeInTheDocument();
        expect(screen.queryByTitle('Live Demo')).not.toBeInTheDocument();
    });

    it('shows folder icon when no image is available', () => {
        const project = createMockProject();
        const { container } = renderWithProviders(<ProjectCard {...project} />);

        // Check for folder icon container
        const folderContainer = container.querySelector('.bg-navy-700');
        expect(folderContainer).toBeInTheDocument();
    });

    it('applies hover border color on card', () => {
        const project = createMockProject();
        const { container } = renderWithProviders(<ProjectCard {...project} />);

        expect(container.firstChild).toHaveClass('hover:border-orange');
    });
});
