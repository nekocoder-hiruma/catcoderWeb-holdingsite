import { useState, useEffect } from 'react';

const assetCache = new Map();

const usePublicAsset = (basePath, fileName, extensions = ['png', 'jpg', 'jpeg', 'webp', 'svg']) => {
    const [assetPath, setAssetPath] = useState(null);

    useEffect(() => {
        if (!fileName) return;

        const cacheKey = `${basePath}${fileName}`;
        if (assetCache.has(cacheKey)) {
            setAssetPath(assetCache.get(cacheKey));
            return;
        }

        let isMounted = true;

        // Sanitize filename for safer matching (remove special chars, keep alphanumeric)
        // We try variations: exact, lowercase, alphanumeric only
        const variations = [
            fileName,
            fileName.toLowerCase(),
            fileName.toLowerCase().replace(/[^a-z0-9]/g, '')
        ];

        const tryLoadImage = (varIndex, extIndex) => {
            if (varIndex >= variations.length) return;

            const currentName = variations[varIndex];
            const ext = extensions[extIndex];
            const path = `${basePath}${currentName}.${ext}`;

            const img = new Image();
            img.src = path;

            img.onload = () => {
                if (isMounted) {
                    setAssetPath(path);
                    assetCache.set(cacheKey, path);
                }
            };

            img.onerror = () => {
                // If current extension fails, try next extension
                if (extIndex < extensions.length - 1) {
                    tryLoadImage(varIndex, extIndex + 1);
                } else {
                    // If all extensions fail for this variation, try next variation
                    tryLoadImage(varIndex + 1, 0);
                }
            };
        };

        tryLoadImage(0, 0);

        return () => {
            isMounted = false;
        };
    }, [basePath, fileName]); // Removed extensions from dependency array to prevent re-runs

    return assetPath;
};

export default usePublicAsset;
