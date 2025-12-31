import React from 'react';
import { useTranslation } from 'react-i18next';
import { Briefcase, GraduationCap, Star, FolderGit2 } from 'lucide-react';
import usePublicAsset from '../../../hooks/usePublicAsset';

const TimelineItem = ({ year, title, company, logo, description, type, additionalInfo, projects, contributions }) => {
    const { t } = useTranslation();
    // Try to load company/school logo using explicit logo name
    const logoSrc = logo ? usePublicAsset('/assets/companies/', logo) : null;

    const iconColor = type === 'work' ? 'text-orange' : 'text-magenta';
    const borderColor = type === 'work' ? 'border-orange' : 'border-magenta';
    const companyColor = type === 'work' ? 'text-maroon' : 'text-purple';
    const bgHover = type === 'work' ? 'hover:bg-navy-800/50' : 'hover:bg-navy-800/30';

    return (
        <div className={`group ${bgHover} p-6 rounded-lg transition-all duration-300 border border-navy-700 hover:border-${type === 'work' ? 'orange' : 'magenta'} mb-6 cursor-default`}>
            {/* Header Section */}
            <div className="mb-4">
                {type === 'work' ? (
                    <>
                        {/* Work: Job title (Duration) */}
                        <h3 className="text-xl font-bold text-white group-hover:text-orange transition-colors mb-1">
                            {title} <span className="text-gray-400 text-base font-normal">({year})</span>
                        </h3>
                        {/* Company name */}
                        <div className={`${companyColor} font-semibold text-lg`}>{company}</div>
                    </>
                ) : (
                    <>
                        {/* Education: Degree (Year) */}
                        <h3 className="text-xl font-bold text-white group-hover:text-magenta transition-colors mb-1">
                            {title} <span className="text-gray-400 text-base font-normal">({year})</span>
                        </h3>
                        {/* School Name */}
                        <div className={`${companyColor} font-semibold text-lg`}>{company}</div>
                    </>
                )}
            </div>

            {/* Logo and Description Section */}
            <div className="flex gap-6 mb-4">
                {/* Logo or Icon */}
                <div className={`flex-shrink-0 w-16 h-16 rounded-lg ${logoSrc ? 'bg-white' : 'bg-navy-800'} border-2 ${borderColor} flex items-center justify-center group-hover:scale-105 transition-transform duration-300 p-2`}>
                    {logoSrc ? (
                        <img
                            src={logoSrc}
                            alt={`${company} logo`}
                            className="w-full h-full object-contain"
                            width="64"
                            height="64"
                        />
                    ) : type === 'work' ? (
                        <Briefcase size={32} className={iconColor} />
                    ) : (
                        <GraduationCap size={32} className={iconColor} />
                    )}
                </div>

                {/* Description */}
                <div className="flex-grow">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line text-justify">{description}</p>
                </div>
            </div>

            {/* Key Projects for Work */}
            {type === 'work' && projects && projects.length > 0 && (
                <div className="mt-4 pt-4 border-t border-navy-700/50">
                    <div className="flex items-center gap-2 mb-3">
                        <FolderGit2 size={18} className="text-orange" />
                        <h4 className="text-sm font-semibold text-orange">{t('timeline.notableProjects')}</h4>
                    </div>
                    <ul className="space-y-2 ml-6">
                        {projects.map((project, idx) => (
                            <li key={idx} className="text-gray-400 text-sm leading-relaxed whitespace-pre-line text-justify flex gap-2">
                                <span className="text-orange">•</span>
                                <span>{project}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Key Contributions for Work */}
            {type === 'work' && contributions && contributions.length > 0 && (
                <div className="mt-4 pt-4 border-t border-navy-700/50">
                    <div className="flex items-center gap-2 mb-3">
                        <FolderGit2 size={18} className="text-orange" />
                        <h4 className="text-sm font-semibold text-orange">{t('timeline.notableContributions')}</h4>
                    </div>
                    <ul className="space-y-2 ml-6">
                        {contributions.map((contribution, idx) => (
                            <li key={idx} className="text-gray-400 text-sm leading-relaxed whitespace-pre-line text-justify flex gap-2">
                                <span className="text-orange">•</span>
                                <span>{contribution}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Additional Activities for Education */}
            {type === 'education' && additionalInfo && (
                <div className="mt-4 pt-4 border-t border-navy-700/50">
                    <div className="flex items-center gap-2 mb-3">
                        <Star size={18} className="text-magenta" />
                        <h4 className="text-sm font-semibold text-magenta">{t('timeline.additionalActivities')}</h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line text-justify ml-6">{additionalInfo}</p>
                </div>
            )}
        </div>
    );
};

export default TimelineItem;
