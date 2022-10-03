/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,ts,tsx'],
	theme: {
		extend: {
			colors: {
				brightRed: 'hsl(12,88%,59%)',
				darkBlue: 'hsl(228,39%,23%)',
			},
		},
		screens: {
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px',
		},
	},
	plugins: [],
};
