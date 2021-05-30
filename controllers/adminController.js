const admindb = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");

exports.login = async (req, res) => {
	try {
		util.promisify(bcrypt.compare);
		util.promisify(jwt.sign);
		const userInfo = await admindb.getByEmail(req.body.email);
		if (userInfo.response) {
			const passwordcheck = await bcrypt.compare(
				req.body.password,
				userInfo.data.password,
			);
			console.log('check',passwordcheck)
			if (passwordcheck) {
				let token = jwt.sign(
					{
						userid: userInfo.data.id,
						username: userInfo.data.email,
					},
					process.env.JWT_SECRET,
					{ expiresIn: "10h" }
				);
				successResponse(res, 200, token);
			} else {
				failResponse(404, "Password is Wrong");
			}
		} else {
			failResponse(403, "No Email Found");
		}
	} catch (err) {
		console.log(err);
		res.status(err.statuscode).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.getAll = async (req, res) => {
	try {
		const query = await admindb.getAll();
		// console.log("Query:::", query);
		query.response
			? successResponse(res, 200, query.data)
			: failResponse(404, query.message);
	} catch (err) {
		console.log(err);
		res.status(err.statuscode).json({
			status: "fail",
			message: err.message,
		});
	}
};
exports.getBy = async (req, res) => {
	try {
		const query = await admindb.getByEmail(req.params.email);
		// console.log("Query:::", query);
		query.response
			? successResponse(res, 200, query.data)
			: failResponse(404, query.message);
	} catch (err) {
		console.log(err);
		res.status(err.statuscode).json({
			status: "fail",
			message: err.message,
		});
	}
};
exports.deleteBy = async (req, res) => {
	try {
		const query = await admindb.delete(req.params.id);
		// console.log("Query:::", query);
		query.response
			? successResponse(res, 200, query.data)
			: failResponse(404, query.message);
	} catch (err) {
		console.log(err);
		res.status(err.statuscode).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.create = async (req, res) => {
	try {
		util.promisify(bcrypt.hash);
		let obj = {
			...req.body,
		};
		let hashedpassword = await bcrypt.hash(req.body.password, 10);
		obj.password = hashedpassword;
		const query = await admindb.create(obj);
		query.response
			? successResponse(res, 201, query.data)
			: failResponse(404, query.message);
	} catch (err) {
		console.log(err);
		res.status(err.statuscode).json({
			status: "fail",
			message: err.message,
		});
	}
};

const successResponse = (res, statuscode, data) => {
	res.status(statuscode).json({
		status: "success",
		data: data,
	});
};
const failResponse = (statuscode, message) => {
	throw {
		statuscode: statuscode,
		message: message,
	};
};
