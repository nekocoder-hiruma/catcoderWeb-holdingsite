import React from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from '../components/ProjectCard';
import useTranslatedContent from '../../../hooks/useTranslatedContent';

const Projects = () => {
    const { t } = useTranslation();
    const projectsData = useTranslatedContent('projects');

    const professionalProjects = projectsData.filter(p => p.isProfessional);
    const sideProjects = projectsData.filter(p => !p.isProfessional);

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-12 text-center text-white">
                {t('nav.projects')}
            </h1>

            {/* Professional Projects Section */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold text-orange mb-8 pb-3 border-b-2 border-orange/30">
                    {t('projects.professional')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {professionalProjects.map((project) => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </div>
            </div>

            {/* Side Projects Section */}
            <div>
                <h2 className="text-2xl font-bold text-magenta mb-8 pb-3 border-b-2 border-magenta/30">
                    {t('projects.side')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sideProjects.map((project) => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
