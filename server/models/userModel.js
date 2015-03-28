var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = function () {

	this.collection = 'users';

	this.schema = mongoose.Schema({
		user_firstName: {
			type: String,
			required: true
		},
		user_middleName: {
			type: String,
			required: true
		},
		user_lastName: {
			type: String,
			required: true
		},
		user_address: {
			type: String,
			required: true
		},
		user_contactNo: {
			type: String,
			required: true
		},
		user_email: {
			type: String,
			required: true
		},
		user_city: {
			type: String,
			required: true
		},
		user_photo: {
			type: String
		},
		user_type: {
			type: String
		}
	});

	this.schema.statics.toEntity = function(rawModel) {
		return {
			'user_id': rawModel.user_id,
			'user_firstName': rawModel.user_firstName,
			'user_lastName': rawModel.user_lastName,
			'user_address': rawModel.user_address,
			'user_contactNo': rawModel.user_contactNo,
			'user_email': rawModel.user_email,
			'user_city': rawModel.user_city,
			'user_photo': rawModel.user_photo,
			'user_type': rawModel.user_type
		};
	};

	this.schema.index({
		user_email: 1
	});
	
	this.schema.set('autoIndex', false);

	return this;
};