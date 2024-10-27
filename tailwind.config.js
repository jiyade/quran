/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            lora: ['Lora', 'serif'],
            amiri: ['Amiri', 'serif']
        },

        extend: {
            colors: {
                main: '#f7fcfa',
                'main-text': '#333333',
                'sub-text': '#115740'
            }
        }
    },
    plugins: []
}
