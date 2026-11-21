/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        noite: '#2c0137',
        profundo: '#3f0f63',
        roxo: '#5a2a8f',
        lilas: '#c9b5ee',
        'lilas-claro': '#ece4f9',
        nevoa: '#f7f3fc',
        tinta: '#22102f',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope Variable"', 'Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        suave: '0 1px 2px rgba(44, 1, 55, 0.06), 0 10px 28px -14px rgba(44, 1, 55, 0.22)',
        elevada: '0 2px 4px rgba(44, 1, 55, 0.08), 0 22px 44px -18px rgba(44, 1, 55, 0.35)',
      },
      keyframes: {
        agulha: {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
        brilho: {
          '0%': { opacity: '0', transform: 'scale(0.6)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        subir: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        agulha: 'agulha 1.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        brilho: 'brilho 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both',
        subir: 'subir 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
