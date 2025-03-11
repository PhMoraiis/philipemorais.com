import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
    	container: {
    		center: true,
    		padding: '2rem',
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	fontFamily: {
    		Relative: [
    			'Relative'
    		],
    		RelativeBd: [
    			'Relative Bold'
    		],
    		RelativeBk: [
    			'Relative Book'
    		],
    		Atelier: [
    			'Atelier'
    		],
    		Formatek: [
    			'Formatek'
    		]
    	},
    	extend: {
    		colors: {
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			ring2: 'hsl(var(--ring2))',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			success: {
    				DEFAULT: 'hsl(var(--success))',
    				foreground: 'hsl(var(--success-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				accent: 'hsl(var(--sidebar-accent))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
    			scrollX: {
    				from: {
    					left: 'translateX(0)'
    				},
    				to: {
    					transform: 'translateX(-100 %)'
    				}
    			},
    			shine: {
    				from: {
    					backgroundPosition: '0 0'
    				},
    				to: {
    					backgroundPosition: '-200% 0'
    				}
    			},
    			'text-shake': {
    				'15%': {
    					transform: 'translateX(5px)'
    				},
    				'30%': {
    					transform: 'translateX(-5px)'
    				},
    				'50%': {
    					transform: 'translateX(3px)'
    				},
    				'80%': {
    					transform: 'translateX(2px)'
    				},
    				'100%': {
    					transform: 'translateX(0)'
    				}
    			},
    			flip: {
    				to: {
    					transform: 'rotate(360deg)'
    				}
    			},
    			rotate: {
    				to: {
    					transform: 'rotate(90deg)'
    				}
    			},
    			'background-gradient': {
    				'0%, 100%': {
    					transform: 'translate(0, 0)',
    					animationDelay: 'var(--background-gradient-delay, 0s)'
    				},
    				'20%': {
    					transform: 'translate(calc(100% * var(--tx-1, 1)), calc(100% * var(--ty-1, 1)))'
    				},
    				'40%': {
    					transform: 'translate(calc(100% * var(--tx-2, -1)), calc(100% * var(--ty-2, 1)))'
    				},
    				'60%': {
    					transform: 'translate(calc(100% * var(--tx-3, 1)), calc(100% * var(--ty-3, -1)))'
    				},
    				'80%': {
    					transform: 'translate(calc(100% * var(--tx-4, -1)), calc(100% * var(--ty-4, -1)))'
    				}
    			},
    			'shiny-text': {
    				'0%, 90%, 100%': {
    					'background-position': 'calc(-100% - var(--shiny-width)) 0'
    				},
    				'30%, 60%': {
    					'background-position': 'calc(100% + var(--shiny-width)) 0'
    				}
    			},
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			},
    			ripple: {
    				'0%, 100%': {
    					transform: 'translate(-50%, -50%) scale(1)'
    				},
    				'50%': {
    					transform: 'translate(-50%, -50%) scale(0.9)'
    				}
    			}
    		},
    		animation: {
    			scrollX: 'scrollX 40s linear infinite',
    			shine: 'shine 4s linear infinite',
    			'text-shake': 'text-shake 1s ease 1',
    			flip: 'flip 6s infinite steps(2, end)',
    			rotate: 'rotate 3s linear infinite both',
    			'background-gradient': 'background-gradient var(--background-gradient-speed, 15s) cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite',
    			'shiny-text': 'shiny-text 8s infinite',
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
