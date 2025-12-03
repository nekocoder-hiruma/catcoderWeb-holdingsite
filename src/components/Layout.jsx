import React from 'react';
import Navbar from './Navbar';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-navy via-navy-800 to-navy-900 text-white">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {children}
            </main>
            <footer className="bg-navy-900 border-t border-navy-700 py-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex gap-6">
                            <a href="https://github.com/nekocoder-hiruma" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange transition-colors">
                                <Github size={24} />
                            </a>
                            <a href="https://linkedin.com/in/waikeatnekocoder" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-magenta transition-colors">
                                <Linkedin size={24} />
                            </a>
                        </div>
                        <div className="text-center text-gray-400 text-sm flex items-center gap-2">
                            <span>&copy; {new Date().getFullYear()} CatCoder.</span>
                            <span>Built with</span>
                            <Heart size={16} className="text-maroon fill-maroon animate-pulse" />
                            <span>using React & Tailwind</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
