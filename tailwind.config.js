// tailwind.config.js
module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class', // Enable dark mode
    theme: {
      extend: {
        // Customize your dark mode styles
        colors: {
          primary: '#4F46E5',
          secondary: '#8B5CF6',
        },
      },
    },
    variants: {},
    plugins: [],
  };
  