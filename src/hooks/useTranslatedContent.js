import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const useTranslatedContent = (fileName) => {
    const { i18n } = useTranslation();
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Try to load content for the current language
                // Vite requires extension to be static
                const content = await import(`../content/${i18n.language}/${fileName}.json`);
                setData(content.default);
            } catch (error) {
                try {
                    // Fallback to English if translation not found
                    const content = await import(`../content/en/${fileName}.json`);
                    setData(content.default);
                } catch (fallbackError) {
                    console.error(`Failed to load content for ${fileName}`, fallbackError);
                    setData([]);
                }
            }
        };

        loadData();
    }, [i18n.language, fileName]);

    return data;
};

export default useTranslatedContent;
