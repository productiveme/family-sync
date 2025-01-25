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
        primary: '#3b82f6',
        secondary: '#6b7280',
        accent: {
          DEFAULT: '#f43f5e',
        },
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
