import React from 'react';
import { Github, ExternalLink, Folder } from 'lucide-react';
import usePublicAsset from '../../../hooks/usePublicAsset';

const ProjectCard = ({ title, description, tags, githubUrl, liveUrl }) => {
    const tagColors = ['text-rose-700', 'text-amber-700', 'text-orange', 'text-yellow-700'];
    const imageSrc = usePublicAsset('/assets/projects/', title);

    const hasGithub = githubUrl && githubUrl !== '#';
    const hasLive = liveUrl && liveUrl !== '#';

    return (
        <div className="group bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl overflow-hidden border-2 border-navy-700 hover:border-orange transition-all duration-300 select-none cursor-default flex flex-col h-full">
            {/* Image or Icon Header */}
            <div className="w-full h-48 overflow-hidden relative bg-navy-800 flex items-center justify-center">
                {imageSrc ? (
                    <>
                        <img
                            src={imageSrc}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent opacity-60"></div>
                    </>
                ) : (
                    <div className="w-16 h-16 bg-navy-700 rounded-lg flex items-center justify-center group-hover:bg-orange group-hover:scale-110 transition-all duration-300">
                        <Folder size={32} className="text-orange group-hover:text-navy transition-colors" />
                    </div>
                )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-orange transition-colors">{title}</h3>

                    {/* Links */}
                    <div className="flex gap-4">
                        {hasGithub && (
                            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange transition-colors hover:scale-110 transform cursor-pointer" title="View Code">
                                <Github size={20} />
                            </a>
                        )}
                        {hasLive && (
                            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-magenta transition-colors hover:scale-110 transform cursor-pointer" title="Live Demo">
                                <ExternalLink size={20} />
                            </a>
                        )}
                    </div>
                </div>

                <p className="text-gray-400 mb-6 leading-relaxed whitespace-pre-line text-justify flex-grow">
                    {description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-navy-700/50">
                    {tags.map((tag, index) => (
                        <span key={index} className={`text-xs font-mono px-3 py-2 bg-navy-700 rounded-full ${tagColors[index % tagColors.length]} border border-current/20 hover:bg-current/10 transition-colors`}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
