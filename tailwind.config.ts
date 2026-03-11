import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                playfair: ['var(--font-playfair)', 'serif'],
                poppins: ['Poppins', 'sans-serif'],
            },
            colors: {
                gold: {
                    300: '#F4E5A1',
                    400: '#E8D88E',
                    500: '#D4AF37',
                    600: '#C19A2E',
                    700: '#A88525',
                },
                navy: {
                    800: '#0F2340',
                    900: '#0A1628',
                },
            },
        },
    },
    plugins: [],
};

export default config;