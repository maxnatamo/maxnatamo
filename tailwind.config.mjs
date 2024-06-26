/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
    theme: {
        extend: {
            screens: {
                print: { raw: 'print' }
            },
            colors: {
                primary: "#1658A6"
            }
        },
    },
    plugins: [],
}