import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function normalizePhoneNumber(phoneNumber: string): string {
	const digits = phoneNumber.replace(/\D/g, "");

	if (digits.startsWith("0098")) {
		return `0${digits.slice(4)}`;
	}
	if (digits.startsWith("98")) {
		return `0${digits.slice(2)}`;
	}
	if (digits.startsWith("9") && digits.length === 10) {
		return `0${digits}`;
	}
	if (digits.startsWith("09") && digits.length === 11) {
		return digits;
	}

	return digits;
}
