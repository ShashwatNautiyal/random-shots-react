/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
				satisfy: ['"Satisfy", cursive', ...defaultTheme.fontFamily.sans],
			},
			screens: {
				sm: "576px",
			},
		},
	},
	darkMode: "class",
	plugins: [],
};
