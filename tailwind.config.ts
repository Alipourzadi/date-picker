/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        hairlineFamily: ["fa-Hairline", "en-Light", "sans-serif"],
        thinFamily: ["fa-Thin", "en-Light", "sans-serif"],
        lightFamily: ["fa-Light", "en-Light", "sans-serif"],
        regularFamily: ["fa-Regular", "en-Regular", "sans-serif"],
        mediumFamily: ["fa-Medium", "en-Medium", "sans-serif"],
        boldFamily: ["fa-Bold", "en-Bold", "sans-serif"],
        heavyFamily: ["fa-Heavy", "en-Bold", "sans-serif"],
        fatFamily: ["fa-Fat", "en-Fat", "sans-serif"],
        mono: ["RobotoMono"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          from: {
            transform: "translateY(50px)",
            opacity: 0,
          },
          to: {
            transform: " translateY(0)",
            opacity: 1,
          },
        },
        "slide-in": {
          from: {
            transform: "translateZ(-1400px)",
            opacity: 0,
          },
          to: {
            transform: " translateZ(0)",
            opacity: 1,
          },
        },
        "slide-x": {
          from: {
            transform: "translateZ(-1400px)",
            opacity: 0,
          },
          to: {
            transform: " translateZ(0)",
            opacity: 1,
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
        "slide-in":
          "slide-in 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
