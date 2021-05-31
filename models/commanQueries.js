const db = require("../config/db");

exports.creteAdminTable = async () => {
	const table = await db.schema.createTable("admin", (table) => {
		table.increments();
		table.string("name").notNullable();
		table.string("email").unique("email").notNullable();
		table.string("password").notNullable();
		table.string("contact").notNullable();
		table.string("address").notNullable();
		table.timestamp("created_at").defaultTo(db.fn.now());
	});
	console.log(table);
};

exports.creteProductTable = async () => {
	const table = await db.schema.createTable("products", (table) => {
		table.increments();
		table.string("name").unique("name").notNullable();
		table.string("image").notNullable();
		table.integer("price").notNullable();
		table.integer("stock").notNullable();
		table.string("category_id").notNullable();
		table.string("category_name").notNullable();
		table.string("shortIntro").notNullable();
		table.string("description").notNullable();
		table.integer("status").notNullable();
		table.timestamp("created_at").defaultTo(db.fn.now());
		table
			.foreign("category_id")
			.references("id")
			.inTable("categories")
			.onDelete("SET NULL");
	});
	console.log(table);
};

exports.creteCategoryTable = async () => {
	const table = await db.schema.createTable("categories", (table) => {
		table.increments();
		table.string("category_name").unique("category_name").notNullable();
		table.string("image").notNullable();
		table.integer("count").notNullable();
		table.integer("available").notNullable();
		table.timestamp("created_at").defaultTo(db.fn.now());
	});
	console.log(table);
};

exports.creteOrderTable = async () => {
	const table = await db.schema.createTable("orders", (table) => {
		table.increments();
		table.string("order_id").unique("order_id").notNullable();
		table.string("date").notNullable();
		table.string("time").notNullable();
		table.text("items").notNullable();
		table.integer("total").notNullable();
		table.integer("confirmed").notNullable();
		table.integer("status").notNullable();
		table.string("customer_name").notNullable();
		table.string("contact").notNullable();
		table.string("address").notNullable();
		table.integer("order_type").notNullable();
		table.integer("paid").notNullable();
		table.string("rzpayment_id");
		table.string("rzsignature");
		table.datetime("created_at").defaultTo(db.fn.now());
	});
	console.log(table);
};

exports.printTableData = async (tablename) => {
	const information = await db.select("*").from(tablename);
	console.log(information);
};
exports.deleteTableData = async (tablename) => {
	const result = await db(tablename).del();
	console.log(result);
};
exports.dropTable = async (tablename) => {
	const result = await db.schema.dropTable(tablename);
	console.log(result);
};
