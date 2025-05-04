import { reset, seed } from "drizzle-seed";
import { env } from "../config/env";
import db, { pool } from "./index";
import * as schema from "./schema";

if (!env.DB_SEEDING) {
	throw new Error("You must set DB_SEEDING to true when running seeds");
}

async function seedData() {
	await reset(db, schema);
	await seed(db, schema).refine((f) => ({
		user: {
			count: 20,
			columns: {
				phoneNumber: f.phoneNumber(),
			},
			with: {
				session: 1,
			},
		},
		accountAttribute: {
			count: 0,
		},
	}));
	await pool.end();
}

seedData();
