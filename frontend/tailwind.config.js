/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                lapis: '#1e40af',
            },
            fontFamily: {
                inter: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
