import { useEffect } from 'react';
import { useSiteConfig } from '../../context/SiteConfigContext';

const DynamicFavicon = () => {
    const { siteConfig } = useSiteConfig();

    const logoUrl = siteConfig?.appLogo?.favicon || siteConfig?.appLogo?.primary;
    const appName = siteConfig?.appName;

    useEffect(() => {
        if (logoUrl) {
            // Check if current favicon is already set to avoid unnecessary DOM updates
            const currentLink = document.querySelector("link[rel*='icon']");
            if (currentLink && currentLink.href.includes(logoUrl)) {
                return;
            }

            // 1. Remove ALL existing favicon links
            const existingIcons = document.querySelectorAll("link[rel*='icon']");
            existingIcons.forEach(icon => icon.remove());

            // 2. Create a fresh link tag
            const newLink = document.createElement('link');
            newLink.rel = 'icon';
            newLink.href = logoUrl;
            document.head.appendChild(newLink);
        }

        if (appName) {
            document.title = appName;
        }
    }, [logoUrl, appName]);

    return null;
};

export default DynamicFavicon;
