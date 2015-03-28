var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

module.exports = function () {

	this.collection = 'users';

	this.schema = mongoose.Schema({
		uFirstName: {
			type: String
		},		
		uMiddleName: {
			type: String
		},
		uLastName: {
			type: String
		},
		uEmail: {
			type: String
		},
		uAddress: {
			type: String
		},
		uContactNo: {
			type: String
		},
		uCity: {
			type: String
		},
		uPhoto: {
			type: String
		},
		uType: {
			type: String
		},
		u_MCustomerId: {
			type: String
		},
		u_VACardNumber : {
			type: String
		}
	});

	this.schema.statics.toEntity = function(rawModel) {
		return {
			'uId': rawModel._id,
			'uFirstName': rawModel.uFirstName,
			'uMiddleName': rawModel.uMiddleName,
			'uLastName': rawModel.uLastName,
			'uEmail': rawModel.uEmail,
			'uAddress': rawModel.uAddress,
			'uContactNo': rawModel.uContactNo,
			'uCity': rawModel.uCity,
			'uPhoto': rawModel.uPhoto,
			'uType': rawModel.uType,
			'u_MCustomerId': rawModel.u_MCustomerId,
			'u_VACardNumber': rawModel.u_VACardNumber

		};
	};

	this.schema.index({
		uEmail: 1
	});
	
	this.schema.set('autoIndex', false);

	return this;
};