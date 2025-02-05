module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'wood-dark': 'var(--wood-dark)',
        'wood-medium': 'var(--wood-medium)',
        'wood-light': 'var(--wood-light)',
        'sunlight': 'var(--sunlight)',
        'cabin-shadow': 'var(--cabin-shadow)',
      },
    },
  },
  plugins: [],
} 