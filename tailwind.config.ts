import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // UTAMV Custom Colors - Rigorous Academic Palette
        ivory: {
          DEFAULT: "#F5F1E8",
          light: "#FAF7F0",
          dark: "#E8E4D9",
        },
        platinum: {
          DEFAULT: "#E5E4E2",
          light: "#F5F5F4",
          dark: "#D4D3D1",
          subtle: "rgba(229, 228, 226, 0.1)",
        },
        navy: {
          deep: "#0A1128",
          medium: "#1A365D",
          light: "#2D527F",
        },
        teal: {
          DEFAULT: "#008080",
          light: "#4DB8B0",
          dark: "#006666",
        },
        silver: {
          DEFAULT: "#C0C0C0",
          light: "#D4D4D4",
          dark: "#A8A8A8",
          metallic: "#B0BEC5",
        },
        charcoal: {
          DEFAULT: "#36454F",
          light: "#52606D",
          dark: "#1F2933",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Merriweather", "Georgia", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1.5rem",
        "2xl": "2rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-platinum": {
          "0%, 100%": { boxShadow: "0 0 20px -5px rgba(229, 228, 226, 0.45)" },
          "50%": { boxShadow: "0 0 40px -5px rgba(229, 228, 226, 0.75)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.8s ease-out forwards",
        "slide-up": "slide-up 0.8s ease-out forwards",
        "slide-in-right": "slide-in-right 0.8s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-platinum": "pulse-platinum 3s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
      },
      backgroundImage: {
        "platinum-gradient": "linear-gradient(135deg, #E5E4E2 0%, #F5F5F4 50%, #D4D3D1 100%)",
        "navy-gradient": "linear-gradient(135deg, #0A1128 0%, #1A365D 100%)",
        "academic-gradient": "linear-gradient(135deg, #F5F1E8 0%, #E8E4D9 50%, #D4D4D4 100%)",
        "shimmer-gradient": "linear-gradient(90deg, transparent, rgba(229, 228, 226, 0.3), transparent)",
      },
      boxShadow: {
        "platinum": "0 10px 30px -10px rgba(229, 228, 226, 0.3)",
        "navy": "0 10px 30px -10px rgba(10, 17, 40, 0.2)",
        "elegant": "0 20px 40px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
