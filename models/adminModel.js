const db = require("../config/db")
const errors = require("../config/sqliteErrors")

exports.getAll = async () =>{
	try{
		const result = await db.select("*").from('admin')
		return result.length > 0 ? successResponse(result) : failResponse('No Data fond')
	}
	catch(err){
		return{
			response:false,
			message:err
		}
	}
		
}

exports.create = async (payload) =>{
	try{
		const result = await db("admin").insert(payload)
		return result ? successResponse(result) : failResponse('Insertion Failed')
	}
	catch(err){
		console.log(err)
		return{
			response:false,
			message:err
		}
	}
		
}

exports.getByEmail = async (email) =>{
	try{
		const result = await db.select("*").where("email",email).from('admin')
		return (result && result.length === 1) ? successResponse(result[0]) : failResponse('No Data Found')
	}
	catch(err){
		console.log(err)
		return{
			response:false,
			message:err
		}
	}
		
}

exports.delete = async (id) =>{
	try{
		const result = await db("admin").where("id",id).del()
		return result ? successResponse(result) : failResponse('Deletion Failed')
	}
	catch(err){
		console.log(err)
		return{
			response:false,
			message:err
		}
	}
}


const successResponse = (data) => ({response:true,data:data})
const failResponse = (message) => {
	throw message
}