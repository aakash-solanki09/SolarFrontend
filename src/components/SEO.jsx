import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
    const siteTitle = "Vishwamangal Solar";
    const defaultDescription = "Leading provider of sustainable solar energy solutions. Residential, commercial, and industrial solar installations.";
    const defaultKeywords = "solar panels, solar energy, renewable energy, solar installation, sustainable power";
    const defaultImage = "https://vishwamangalsolar.com/og-image.jpg"; // Replace with actual default image URL
    const siteUrl = "https://vishwamangalsolar.com"; // Replace with actual domain

    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const fullDescription = description || defaultDescription;
    const fullKeywords = keywords || defaultKeywords;
    const fullImage = image || defaultImage;
    const fullUrl = url ? `${siteUrl}${url}` : siteUrl;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={fullDescription} />
            <meta name="keywords" content={fullKeywords} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={fullDescription} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:site_name" content={siteTitle} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={fullDescription} />
            <meta name="twitter:image" content={fullImage} />
        </Helmet>
    );
};

export default SEO;
