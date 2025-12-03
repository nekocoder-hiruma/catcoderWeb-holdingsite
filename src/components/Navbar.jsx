import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe } from 'lucide-react';

const Navbar = () => {
    const logo = '/assets/catcoder-logo.svg';
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const [isOpen, setIsOpen] = React.useState(false);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    const navLinks = [
        { path: '/', label: t('nav.home') },
        { path: '/history', label: t('nav.history') },
        { path: '/projects', label: t('nav.projects') },
        { path: '/contact', label: t('nav.contact') },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-navy text-white sticky top-0 z-50 shadow-lg backdrop-blur-sm bg-opacity-90">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <img src={logo} alt="CatCoder Logo" className="h-8 w-auto brightness-0 invert" />
                            <span className="font-bold text-xl text-orange">CatCoder</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive(link.path)
                                        ? 'bg-maroon text-white'
                                        : 'text-gray-300 hover:bg-navy-700 hover:text-white'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Language Switcher (Desktop) */}
                    <div className="hidden md:flex items-center space-x-2">
                        <Globe size={16} />
                        <button onClick={() => changeLanguage('en')} className={`text-sm ${i18n.language === 'en' ? 'text-orange' : 'text-gray-300'}`}>EN</button>
                        <span className="text-gray-500">|</span>
                        <button onClick={() => changeLanguage('cn')} className={`text-sm ${i18n.language === 'cn' ? 'text-orange' : 'text-gray-300'}`}>CN</button>
                        <span className="text-gray-500">|</span>
                        <button onClick={() => changeLanguage('jp')} className={`text-sm ${i18n.language === 'jp' ? 'text-orange' : 'text-gray-300'}`}>JP</button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-navy-700 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-navy border-t border-navy-700">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.path)
                                    ? 'bg-maroon text-white'
                                    : 'text-gray-300 hover:bg-navy-700 hover:text-white'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="pt-4 pb-4 border-t border-navy-700">
                        <div className="flex items-center justify-center space-x-4">
                            <button onClick={() => changeLanguage('en')} className={`${i18n.language === 'en' ? 'text-orange' : 'text-gray-300'}`}>EN</button>
                            <button onClick={() => changeLanguage('cn')} className={`${i18n.language === 'cn' ? 'text-orange' : 'text-gray-300'}`}>CN</button>
                            <button onClick={() => changeLanguage('jp')} className={`${i18n.language === 'jp' ? 'text-orange' : 'text-gray-300'}`}>JP</button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
