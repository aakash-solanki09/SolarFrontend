/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    active: 'var(--color-primary-active)',
                    light: 'var(--color-primary-light)',
                    clarity: 'var(--color-primary-clarity)',
                    inverse: 'var(--color-primary-inverse)',
                    foreground: 'var(--primary-foreground)'
                },
                secondary: {
                    DEFAULT: 'var(--color-secondary)',
                    active: 'var(--color-secondary-active)',
                    light: 'var(--color-secondary-light)',
                    clarity: 'var(--color-secondary-clarity)',
                    inverse: 'var(--color-secondary-inverse)',
                    foreground: 'var(--secondary-foreground)'
                },
                accent: {
                    DEFAULT: 'var(--accent-color)',
                    foreground: 'var(--accent-foreground)'
                },
                solar: {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#f59e0b',
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                },
                header: {
                    DEFAULT: 'var(--header-bg, #ffffff)',
                    foreground: 'var(--header-text, #000000)',
                    border: 'var(--header-border, transparent)',
                    hover: 'var(--header-hover-bg, #f3f4f6)',
                    'hover-foreground': 'var(--header-hover-text, #111827)'
                },
                footer: {
                    DEFAULT: 'var(--footer-bg, #111827)',
                    foreground: 'var(--footer-text, #ffffff)',
                    hover: 'var(--footer-hover-bg, #374151)',
                    'hover-foreground': 'var(--footer-hover-text, #ffffff)'
                },
                body: {
                    DEFAULT: 'var(--body-bg, #f3f4f6)',
                    foreground: 'var(--body-text, #1f2937)'
                },
                card: {
                    DEFAULT: 'var(--card-bg, #ffffff)',
                    foreground: 'var(--card-text, #1f2937)',
                    border: 'var(--card-border, transparent)'
                }
            }
        },
    },
    plugins: [],
}
