import sharedConfig from "@acs/tailwind-config";
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Pick<Config, "content" | "presets" | "theme"> = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	presets: [sharedConfig],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					"var(--font-sans-variable)",
					"var(--font-sans-static)",
					...fontFamily.sans,
				],
			},
		},
	},
};

export default config;
