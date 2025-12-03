/**
 * Mock data factories for tests (DRY principle)
 * Centralized test data generation
 */

export const createMockProject = (overrides = {}) => ({
    id: 'test-project-1',
    title: 'Test Project',
    description: 'A test project description',
    tags: ['React', 'Testing'],
    githubUrl: 'https://github.com/test/project',
    liveUrl: 'https://test-project.com',
    isProfessional: true,
    ...overrides,
});

export const createMockHistoryItem = (type = 'work', overrides = {}) => ({
    id: `test-${type}-1`,
    type,
    year: '2020-2023',
    title: type === 'work' ? 'Senior Developer' : 'Bachelor of Science',
    company: type === 'work' ? 'Tech Company' : 'University',
    description: `Test ${type} description`,
    ...(type === 'work' ? { projects: ['Project A', 'Project B'] } : {}),
    ...(type === 'education' ? { additionalInfo: ['Dean\'s List', 'Research Assistant'] } : {}),
    ...overrides,
});

export const createMockSkill = (overrides = {}) => ({
    name: 'React',
    icon: null,
    ...overrides,
});

export const mockProjects = [
    createMockProject({ id: 'proj-1', isProfessional: true }),
    createMockProject({ id: 'proj-2', isProfessional: false, title: 'Side Project' }),
];

export const mockHistory = [
    createMockHistoryItem('work', { id: 'work-1' }),
    createMockHistoryItem('education', { id: 'edu-1' }),
];
