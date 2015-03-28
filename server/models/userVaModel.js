var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = function () {

	this.collection = 'usersVa';

	this.schema = mongoose.Schema({
		va_firstName: {
			type: String,
			required: true
		},
		va_middleName: {
			type: String,
			required: true,
		},
		va_lastName: {
			type: String,
			required: true
		},
		va_address: {
			type: String,
			required: true
		},
		va_contactNo: {
			type: String,
			required: true
		},
		va_email: {
			type: String,
			required: true
		},
		va_city: {
			type: String,
			required: true
		},
		va_photo: {
			type: String
		}
	});

	this.schema.statics.toEntity = function(rawModel) {
		return {
			'va_id': rawModel.va_id,
			'va_firstName': rawModel.va_firstName,
			'va_lastName': rawModel.va_lastName,
			'va_address': rawModel.va_address,
			'va_contactNo': rawModel.va_contactNo,
			'va_email': rawModel.va_email,
			'va_city': rawModel.va_city,
			'va_photo': rawModel.va_photo
		};
	};

	this.schema.index({
		va_email: 1
	});
	
	this.schema.set('autoIndex', false);

	return this;
};