const db = require("../config/db");
const errors = require("../config/sqliteErrors");

class Query {
	constructor(name, database) {
		this.name = name;
		this.database = database;
	}
	async getAll() {
		try {
			const result = await db.select("*").from(this.database);

			return result.length > 0
				? successResponse(result)
				: failResponse(`No ${this.name} Found`);
		} catch (err) {
			return {
				response: false,
				message: err,
			};
		}
	}
	async create(payload) {
		delete payload["authid"];
		try {
			const result = await db(this.database).insert(payload);
			return result
				? successResponse(result)
				: failResponse(`${this.name} creation failed`);
		} catch (err) {
			return {
				response: false,
				message: err,
			};
		}
	}
	async getById(id) {
		try {
			const result = await db
				.select("*")
				.where("id", id)
				.from(this.database);
			return result && result.length === 1
				? successResponse(result[0])
				: failResponse(`No ${this.name} found`);
		} catch (err) {
			return {
				response: false,
				message: err,
			};
		}
	}
	async update(id, payload) {
		try {
			delete payload["authid"];
			delete payload["id"];
			delete payload["created_at"];
			delete payload["count"];

			const result = await db(this.database)
				.where("id", id)
				.update(payload);
			return result
				? successResponse(result)
				: failResponse(`${this.name} Faild to update`);
		} catch (err) {
			return {
				response: false,
				message: err,
			};
		}
	}
	async delete(id) {
		try {
			const result = await db(this.database).where("id", id).del();
			return result
				? successResponse(result)
				: failResponse(`${this.name} unable to delete`);
		} catch (err) {
			return {
				response: false,
				message: err,
			};
		}
	}
}

const successResponse = (data) => ({ response: true, data: data });
const failResponse = (message) => {
	throw message;
};

module.exports = Query;
