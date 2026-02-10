module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(195, 72%, 46%)',
        accent: 'hsl(175, 95%, 38%)',
        bg: 'hsl(210, 38%, 98%)',
        surface: 'hsl(212, 28%, 97%)',
        muted: 'hsl(220, 14%, 61%)',
        success: 'hsl(156, 56%, 41%)',
        danger: 'hsl(8, 74%, 54%)',
      },
      borderRadius: {
        'card': '1rem',
        'control': '0.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(12 20 40 / 0.05)',
        md: '0 4px 20px rgb(12 20 40 / 0.06)',
        lg: '0 12px 30px rgba(12,20,40,0.08)',
      }
    },
  },
  plugins: [],
}





