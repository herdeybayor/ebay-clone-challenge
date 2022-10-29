/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                ebayDark: "#0f1217",
                primary: "#372948",
                secondary: "#251B37",
                accent: "#FFCACA",
                accent2: "#FFECEF",
            },
        },
    },
    plugins: [require("tailwind-scrollbar")],
};
