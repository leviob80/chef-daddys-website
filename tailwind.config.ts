import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        crimson: '#C0141C',
        'crimson-dark': '#9A0F16',
        flame: '#E8651A',
        ember: '#F5A623',
        'brand-black': '#111111',
        charcoal: '#1A1A1A',
        'charcoal-light': '#2D2D2D',
        smoke: '#F5F0EB',
        'smoke-dark': '#E8E0D8',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Playfair Display', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-up-delay-1': 'fadeUp 0.8s ease-out 0.2s forwards',
        'fade-up-delay-2': 'fadeUp 0.8s ease-out 0.4s forwards',
        'fade-up-delay-3': 'fadeUp 0.8s ease-out 0.6s forwards',
        'flame-pulse': 'flamePulse 2s ease-in-out infinite',
        'flicker': 'flicker 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        flamePulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(232, 101, 26, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(232, 101, 26, 0.8)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
          '25%, 75%': { opacity: '0.95' },
        },
      },
      backgroundImage: {
        'wood-grain': "url('/textures/wood-grain.png')",
        'smoke-overlay': 'linear-gradient(135deg, rgba(17,17,17,0.95) 0%, rgba(26,26,26,0.9) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
