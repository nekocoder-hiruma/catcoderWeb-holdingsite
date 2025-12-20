import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Code, Palette, Zap, ArrowRight } from 'lucide-react';
import SkillCard from '../components/SkillCard';

const Home = () => {
    const { t } = useTranslation();
    const profilePic = '/assets/profile-picture.webp';

    const skills = [
        { icon: Code, label: t('skills.fullstack'), color: 'text-orange' },
        { icon: Palette, label: t('skills.leadership'), color: 'text-magenta' },
        { icon: Zap, label: t('skills.performance'), color: 'text-purple' }
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 relative">
            {/* Decorative gradient orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange opacity-10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full mb-8 overflow-hidden border-4 border-orange shadow-2xl shadow-orange/30 transition-all hover:scale-105 hover:border-magenta hover:shadow-magenta/30 duration-500 mx-auto">
                    <img
                        src={profilePic}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        width="256"
                        height="256"
                    />
                </div>

                <div className="mb-6 flex gap-6 justify-center">
                    {skills.map((skill, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 group">
                            <skill.icon size={32} className={`${skill.color} group-hover:scale-110 transition-transform`} />
                            <span className="text-sm text-gray-400">{skill.label}</span>
                        </div>
                    ))}
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight">
                    <span className="bg-gradient-to-r from-white via-orange to-magenta bg-clip-text text-transparent">
                        {t('intro.title')}
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed mb-10 whitespace-pre-line text-justify">
                    {t('intro.description')}
                </p>

                {/* Technical Skills Section */}
                <div className="w-full max-w-4xl mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center justify-center gap-2">
                        <span>Skills</span>
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        <SkillCard name="Python" />
                        <SkillCard name="Django" />
                        <SkillCard name="Tailwind" />
                        <SkillCard name="React" />
                        <SkillCard name="Git" />
                        <SkillCard name="PostGreSQL" />
                        <SkillCard name="Docker" />
                        <SkillCard name="AWS" />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/projects" className="group bg-orange text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange/50 flex items-center gap-2 justify-center">
                        {t('nav.projects')}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/history" className="bg-transparent border-2 border-purple text-white px-8 py-4 rounded-full font-bold hover:bg-purple hover:border-purple transition-all">
                        {t('nav.history')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
