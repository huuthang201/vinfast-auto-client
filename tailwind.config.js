/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0d1f3c',
          accent: '#00b4d8',
          muted: '#4c5b74',
        },
        surface: {
          DEFAULT: '#f5f7fb',
          card: '#ffffff',
          subtle: '#eef2f7',
        },
        warning: '#f97316',
        success: '#16a34a',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 40px rgba(15, 23, 42, 0.08)',
      },
      borderRadius: {
        xl: '1.5rem',
      },
    },
  },
  plugins: [],
};
