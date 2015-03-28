var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

module.exports = function () {

	this.collection = 'users';

	this.schema = mongoose.Schema({
		user_firstName: {
			type: String
		},		
		user_lastName: {
			type: String
		},
		user_address: {
			type: String
		},
		user_contactNo: {
			type: String
		},
		user_email: {
			type: String
		},
		user_city: {
			type: String
		},
		user_photo: {
			type: String
		},
		user_type: {
			type: String
		},
		user_middleName: {
			type: String
		}
	});

	this.schema.statics.toEntity = function(rawModel) {
		return {
			'user_id': rawModel._id,
			'user_firstName': rawModel.user_firstName,
			'user_lastName': rawModel.user_lastName,
			'user_address': rawModel.user_address,
			'user_contactNo': rawModel.user_contactNo,
			'user_email': rawModel.user_email,
			'user_city': rawModel.user_city,
			'user_photo': rawModel.user_photo,
			'user_type': rawModel.user_type,
			'user_middleName': rawModel.user_middleName
		};
	};

	this.schema.index({
		user_email: 1
	});
	
	this.schema.set('autoIndex', false);

	return this;
};