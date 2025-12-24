/**
 * Applies the theme configuration to the document root by setting CSS variables.
 * @param {Object} theme - The theme configuration object containing primary and secondary colors.
 */
export const applyTheme = (theme) => {
  if (typeof window !== 'undefined' && theme) {
    const root = document.documentElement;
    console.log('Applying Theme:', theme); // Debug log

    // Merge with defaults to ensure all sections exist
    const defaults = {
        primary: { default: '#2563eb', active: '#1d4ed8', light: '#dbeafe', clarity: '#2563eb33', inverse: '#ffffff' },
        secondary: { default: '#f8fafc', active: '#f1f5f9', light: '#e2e8f0', clarity: '#f8fafc33', inverse: '#0f172a' },
        header: { background: '#ffffff', text: '#000000', border: 'transparent' },
        footer: { background: '#111827', text: '#ffffff' },
        body: { background: '#f3f4f6', text: '#1f2937' },
        card: { background: '#ffffff', text: '#1f2937', border: 'transparent' },
        button: { background: '#f59e0b', text: '#000000', border: 'transparent', hoverBackground: '#fbbf24', hoverText: '#000000', hoverBorder: 'transparent' },
        accent: { color: '#fcd34d' }
    };

    const mergedTheme = {
        ...defaults,
        ...theme,
        header: { ...defaults.header, ...theme.header },
        footer: { ...defaults.footer, ...theme.footer },
        body: { ...defaults.body, ...theme.body },
        card: { ...defaults.card, ...theme.card },
        button: { ...defaults.button, ...theme.button },
        accent: { ...defaults.accent, ...theme.accent },
        primary: { ...defaults.primary, ...theme.primary },
        secondary: { ...defaults.secondary, ...theme.secondary }
    };

    // Apply Primary Colors
    if (mergedTheme.primary) {
      root.style.setProperty('--color-primary', mergedTheme.primary.default);
      root.style.setProperty('--color-primary-light', mergedTheme.primary.light);
      root.style.setProperty('--color-primary-active', mergedTheme.primary.active);
      root.style.setProperty('--color-primary-clarity', mergedTheme.primary.clarity);
      root.style.setProperty('--color-primary-inverse', mergedTheme.primary.inverse);
      
      // Additional variables mapping to Synetal/Shadcn standards
      root.style.setProperty('--accent-color', mergedTheme.primary.default);
      root.style.setProperty('--text-dynamic-black', mergedTheme.primary.inverse);
      root.style.setProperty('--text-dynamic-white', '#ffffff');

      // HSL for newer Shadcn components
      const activeHsl = hexToHsl(mergedTheme.primary.inverse);
      root.style.setProperty('--foreground', activeHsl);
      root.style.setProperty('--primary-foreground', activeHsl);
    }

    // Apply Secondary Colors
    if (mergedTheme.secondary) {
      root.style.setProperty('--color-secondary', mergedTheme.secondary.default);
      root.style.setProperty('--color-secondary-light', mergedTheme.secondary.light);
      root.style.setProperty('--color-secondary-active', mergedTheme.secondary.active);
      root.style.setProperty('--color-secondary-clarity', mergedTheme.secondary.clarity);
      root.style.setProperty('--color-secondary-inverse', mergedTheme.secondary.inverse);
    }

    // Apply Header Colors
    if (mergedTheme.header) {
      root.style.setProperty('--header-bg', mergedTheme.header.background);
      root.style.setProperty('--header-text', mergedTheme.header.text);
      if (mergedTheme.header.border) root.style.setProperty('--header-border', mergedTheme.header.border);
      if (mergedTheme.header.hoverBackground) root.style.setProperty('--header-hover-bg', mergedTheme.header.hoverBackground);
      if (mergedTheme.header.hoverText) root.style.setProperty('--header-hover-text', mergedTheme.header.hoverText);
    }

    // Apply Footer Colors
    if (mergedTheme.footer) {
      root.style.setProperty('--footer-bg', mergedTheme.footer.background);
      root.style.setProperty('--footer-text', mergedTheme.footer.text);
      if (mergedTheme.footer.hoverBackground) root.style.setProperty('--footer-hover-bg', mergedTheme.footer.hoverBackground);
      if (mergedTheme.footer.hoverText) root.style.setProperty('--footer-hover-text', mergedTheme.footer.hoverText);
    }

    // Apply Body Colors
    if (mergedTheme.body) {
      root.style.setProperty('--body-bg', mergedTheme.body.background);
      root.style.setProperty('--body-text', mergedTheme.body.text);
    }

    // Apply Card Colors
    if (mergedTheme.card) {
      root.style.setProperty('--card-bg', mergedTheme.card.background);
      root.style.setProperty('--card-text', mergedTheme.card.text);
      if (mergedTheme.card.border) root.style.setProperty('--card-border', mergedTheme.card.border);
    }

    // Apply Button Colors
    if (mergedTheme.button) {
      root.style.setProperty('--btn-bg', mergedTheme.button.background);
      root.style.setProperty('--btn-text', mergedTheme.button.text);
      if (mergedTheme.button.border) root.style.setProperty('--btn-border', mergedTheme.button.border);
      
      root.style.setProperty('--btn-hover-bg', mergedTheme.button.hoverBackground);
      root.style.setProperty('--btn-hover-text', mergedTheme.button.hoverText);
      if (mergedTheme.button.hoverBorder) root.style.setProperty('--btn-hover-border', mergedTheme.button.hoverBorder);
    }

    // Apply Accent Color
    if (mergedTheme.accent) {
      root.style.setProperty('--color-accent', mergedTheme.accent.color);
    }
  }
};

export function hexToRgb(hex) {
  if (!hex) return '';
  const cleanHex = hex.replace('#', '');
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

export function hexToHsl(hex) {
  if (!hex) return '';
  const cleanHex = hex.replace('#', '');
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h /= 6;
  }

  const hDeg = Math.round(h * 360);
  const sPct = Math.round(s * 100);
  const lPct = Math.round(l * 100);

  return `${hDeg} ${sPct}% ${lPct}%`;
}
