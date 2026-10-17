/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        ink: '#111827',
        paper: '#ffffff',
        muted: '#6b7280',
        line: '#e5e7eb',
        accent: '#2563eb',
      },
    },
  },
  plugins: [],
};
