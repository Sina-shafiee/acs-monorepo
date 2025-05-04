export enum UserStatus {
	ACTIVE = 1,
	DISABLED = 2,
	BLOCKED = 3,
}

export enum KYCVerificationStatus {
	PENDING = 1,
	VERIFIED = 2,
	REJECTED = 3,
}

export enum KYCVerificationLogStatus {
	SUCCESS = 1,
	FAILED = 2,
}

export enum KYCVerificationLevel {
	LEVEL_1 = 1,
	LEVEL_2 = 2,
}

export enum KYCVerificationMethod {
	API = 1,
	MANUAL = 2,
}

export enum AccountListingStatus {
	PENDING = 1,
	ACTIVE = 2,
	PROCESSING = 3,
	SOLD = 4,
	REJECTED = 5,
	CANCELLED = 6,
}

export enum GameAttributeType {
	TEXT = 1,
	NUMBER = 2,
	BOOLEAN = 3,
}

export enum GamePlatform {
	PC = 1,
	MOBILE = 2,
}

export enum AccountOrderStatus {
	PENDING = 1,
	COMPLETED = 2,
	FAILED = 3,
	CANCELLED = 4,
}

export enum PaymentProvider {
	ZARINPAL_GATEWAY = 1,
	WALLET = 2,
}

export enum PaymentStatus {
	PENDING = 1,
	COMPLETED = 2,
	FAILED = 3,
	CANCELLED = 4,
	REFUNDED = 5,
}

export enum ChatStatus {
	ACTIVE = 1,
	READ_ONLY = 2,
	ARCHIVED = 3,
}

export enum ChatMemberRole {
	ADMIN = 1,
	MEMBER = 2,
}
