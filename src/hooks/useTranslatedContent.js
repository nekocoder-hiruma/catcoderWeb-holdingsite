import { useTranslation } from 'react-i18next';

// Static imports for all languages
// English
import enHistory from '../content/en/history.json';
import enProjects from '../content/en/projects.json';

// Chinese
import cnHistory from '../content/cn/history.json';
import cnProjects from '../content/cn/projects.json';

// Japanese
import jpHistory from '../content/jp/history.json';
import jpProjects from '../content/jp/projects.json';

const contentMap = {
    en: {
        history: enHistory,
        projects: enProjects
    },
    cn: {
        history: cnHistory,
        projects: cnProjects
    },
    jp: {
        history: jpHistory,
        projects: jpProjects
    }
};

const useTranslatedContent = (fileName) => {
    const { i18n } = useTranslation();

    // Get content for current language, fallback to English
    const currentLangContent = contentMap[i18n.language] || contentMap['en'];
    const data = currentLangContent[fileName];

    // Fallback to English if specific file missing in target language
    if (!data && i18n.language !== 'en') {
        return contentMap['en'][fileName] || [];
    }

    return data || [];
};

export default useTranslatedContent;
