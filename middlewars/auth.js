const jwt = require("jsonwebtoken");

module.exports = checkauth = async (authreq, authres, next) => {
	try {
		const token = authreq.headers.authorization.split(" ")[1];
		if (token) {
			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if (err) {
					throw "Expired Token";
				} else {
					authreq.body.authid = decoded.userid;
					next();
				}
			});
		} else {
			throw "Invalid Token";
		}
	} catch (err) {
		console.log(err)
		authres.status(403).json({
			status: "fail",
			message:"Authorization Faild",
		});
	}
};
