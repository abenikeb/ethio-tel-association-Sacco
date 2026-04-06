import type { Config } from "tailwindcss";
const config: Config = {
	content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: { navy: "#102a43", cooperative: "#087f5b", gold: "#d9a441" },
		},
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
