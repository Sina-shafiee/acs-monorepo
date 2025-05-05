import localFont from "next/font/local";

export const sansVariable = localFont({
	src: [
		{
			path: "../assets/fonts/sans/sansV.woff2",
			weight: "100 900",
			style: "noraml",
		},
	],
	display: "swap",
	variable: "--font-sans-variable",
});

export const sansStatic = localFont({
	src: [
		{
			path: "../assets/fonts/sans/static/sansV-Regular.woff",
			weight: "400",
			style: "normal",
		},
		{
			path: "../assets/fonts/sans/static/sansV-Bold.woff",
			weight: "700",
			style: "normal",
		},
	],
	display: "swap",
	variable: "--font-sans-static",
});
