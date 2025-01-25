const darkenColor = color => {
  return (
    '#' +
    color
      .replace('#', '')
      .match(/.{2}/g)
      .map(hex => Math.max(0, parseInt(hex, 16) - 25))
      .map(dec => dec.toString(16).padStart(2, '0'))
      .join('')
  )
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./client/index.html', './client/**/*.{js,jsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        DEFAULT: '#E2DBBE',
        DEFAULT: '#D5D6AA',
        accent: {
          DEFAULT: '#9DBBAE',
        },
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        background: {
          DEFAULT: 'var(--background)',
          card: 'var(--background-card)',
        },
        text: {
          DEFAULT: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
        },
        border: 'var(--border-color)',
      },
    },
  },
  plugins: [],
}
