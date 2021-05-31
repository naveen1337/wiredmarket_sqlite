const Query = require("../models/queryModel");

exports.orderProductObjWorker = async (items) => {
	try {
		let orderProductObj = [];
		const productConnect = new Query("Product", "products");
		for (item of items) {
			const productQuery = await productConnect.getById(item.id);
			if (!productQuery.response) {
				throw "No Product Found";
			}
			let productObj = {
				id: productQuery.data.id,
				name: productQuery.data.name,
				shortIntro: productQuery.data.shortIntro,
				price: productQuery.data.price,
				quantity: item.quantity,
				totalprice: productQuery.data.price * item.quantity,
			};
			orderProductObj.push(productObj);
		}
		return orderProductObj;
	} catch {
		return false;
	}
};

exports.orderObjWorker = async (products, payload) => {
	try {
		let total = 0;
		for (item of products) {
			total += item.totalprice;
		}
		let orderObj = {
			order_id: `WMS${Date.now()}`,
			date: Date().toString().split(" ").splice(0, 4).join("-"),
			time: Date().toString().split(" ")[4],
			items: JSON.stringify(products),
			total: total,
			confirmed: payload.order_type === 0 ? 1 : 0,
			order_type:payload.order_type,
			status: 0,
			customer_name: payload.customer_name,
			contact: payload.contact,
			address: payload.address,
			paid: 0,
			rzpayment_id: null,
			rzsignature: null,
		};
		console.log(orderObj)
		return orderObj
	} catch {
		return false;
	}
};
