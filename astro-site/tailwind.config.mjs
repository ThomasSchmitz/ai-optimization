/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  
  darkMode: 'class', // Use class-based dark mode
  
  theme: {
    extend: {
      colors: {
        // Tron: Ares Inspired Palette (Dark Mode)
        dark: {
          bg: '#050a10',
          'bg-alt': '#0b101a',
          card: '#111827',
          border: 'rgba(255, 34, 34, 0.3)',
        },
        
        // Light Mode Palette
        light: {
          bg: '#f8fbfd',
          'bg-alt': '#edf5f9',
          card: '#ffffff',
          border: 'rgba(0, 136, 170, 0.3)',
        },
        
        // Brand Colors
        primary: {
          DEFAULT: '#ff2222', // Ares Red Neon (dark mode)
          light: '#0088aa',   // Deep Electric Cyan (light mode)
        },
        secondary: {
          DEFAULT: '#40f6ff', // Classic Cyan Neon (dark mode)
          light: '#d95f00',   // Vibrant Orange (light mode)
        },
        accent: {
          DEFAULT: '#ffffff', // Pure White (dark mode)
          light: '#005f7a',   // Dark Cyan (light mode)
        },
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      
      boxShadow: {
        'glow-primary': '0 0 12px rgba(255, 34, 34, 0.6), 0 0 24px rgba(255, 34, 34, 0.3)',
        'glow-primary-lg': '0 0 20px rgba(255, 34, 34, 0.8), 0 0 40px rgba(255, 34, 34, 0.4)',
        'glow-secondary': '0 0 12px rgba(64, 246, 255, 0.6), 0 0 24px rgba(64, 246, 255, 0.3)',
        'glow-text': '0 0 10px rgba(255, 34, 34, 0.6), 0 0 20px rgba(255, 34, 34, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 34, 34, 0.1)',
        'card-lg': '0 0 20px rgba(255, 34, 34, 0.3), 0 0 10px rgba(255, 34, 34, 0.2), 0 8px 16px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 0 25px rgba(255, 34, 34, 0.4), 0 0 15px rgba(255, 34, 34, 0.25), 0 12px 20px rgba(0, 0, 0, 0.5)',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 34, 34, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 34, 34, 0.8), 0 0 30px rgba(255, 34, 34, 0.6)' },
        },
      },
      
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#f8fafc',
            a: {
              color: '#ff2222',
              '&:hover': {
                color: '#40f6ff',
              },
            },
          },
        },
      },
    },
  },
  
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
