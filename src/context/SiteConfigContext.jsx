import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { applyTheme } from '../utils/themeUtils';

const SiteConfigContext = createContext();

export const useSiteConfig = () => {
    return useContext(SiteConfigContext);
};

export const SiteConfigProvider = ({ children }) => {
    const [siteConfig, setSiteConfig] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchSettings = async () => {
        try {
            const { data } = await api.get('/api/site-settings');
            setSiteConfig(data);
            if (data.appTheme) {
                const completeTheme = {
                    ...data.appTheme,
                    header: { background: '#ffffff', text: '#000000', ...data.appTheme.header },
                    footer: { background: '#111827', text: '#ffffff', ...data.appTheme.footer },
                    body: { background: '#f3f4f6', text: '#1f2937', ...data.appTheme.body },
                    card: { background: '#ffffff', text: '#1f2937', ...data.appTheme.card },
                };
                applyTheme(completeTheme);
            }
        } catch (error) {
            console.error('Failed to fetch site settings:', error);
            // Optional: Set default theme if fetch fails
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const updateSiteConfig = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        const { data } = await api.put('/api/site-settings', formData, config);
        setSiteConfig(data);
        if (data.appTheme) {
            const completeTheme = {
                ...data.appTheme,
                header: { background: '#ffffff', text: '#000000', ...data.appTheme.header },
                footer: { background: '#111827', text: '#ffffff', ...data.appTheme.footer },
                body: { background: '#f3f4f6', text: '#1f2937', ...data.appTheme.body },
                card: { background: '#ffffff', text: '#1f2937', ...data.appTheme.card },
            };
            applyTheme(completeTheme); // Apply immediately
        }
        return data;
    };

    const resetSiteConfig = async () => {
        const { data } = await api.post('/api/site-settings/reset');
        setSiteConfig(data);
        if (data.appTheme) {
            applyTheme(data.appTheme);
        }
        return data;
    };

    return (
        <SiteConfigContext.Provider value={{ siteConfig, loading, updateSiteConfig, resetSiteConfig }}>
            {children}
        </SiteConfigContext.Provider>
    );
};
