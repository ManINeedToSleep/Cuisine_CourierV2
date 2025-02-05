import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      scale: {
        '102': '1.02',
      },
      colors: {
        'wood-dark': 'var(--wood-dark)',
        'wood-medium': 'var(--wood-medium)',
        'wood-light': 'var(--wood-light)',
        'sunlight': 'var(--sunlight)',
        'cabin-shadow': 'var(--cabin-shadow)',
        'spice-red': 'var(--spice-red)',
        'herb-green': 'var(--herb-green)',
      },
    },
  },
  plugins: [],
};

export default config;
