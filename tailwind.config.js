/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				brutal: {
					black: '#000000',
					white: '#ffffff',
					bg: '#f4f4f4',
				},
				admin: {
					blue: '#1A56DB', // The specific blue seen in the inventory screenshot
				}
			},
			fontFamily: {
				display: ['"Space Grotesk"', 'sans-serif'],
				body: ['"Noto Sans"', 'sans-serif'],
			},
			borderRadius: {
				lg: '0px',
				md: '0px',
				sm: '0px',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
				'zoom-in': {
					'0%': { transform: 'scale(1)' },
					'100%': { transform: 'scale(1.05)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-up': 'fade-up 0.8s ease-out forwards',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'scale-in': 'scale-in 0.6s ease-out forwards',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
