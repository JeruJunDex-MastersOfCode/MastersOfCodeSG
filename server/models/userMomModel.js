var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = function () {

	this.collection = 'users';

	this.schema = mongoose.Schema({
		mom_firstName: {
			type: String,
			required: true
		},
		mom_middleName: {
			type: String,
			required: true,
		},
		mom_lastName: {
			type: String,
			required: true
		},
		mom_address: {
			type: String,
			required: true
		},
		mom_contactNo: {
			type: String,
			required: true
		},
		mom_email: {
			type: String,
			required: true
		},
		mom_city: {
			type: String,
			required: true
		},
		mom_photo: {
			type: String
		}
	});

	this.schema.statics.toEntity = function(rawModel) {
		return {
			'mom_id': rawModel._id,
			'mom_firstName': rawModel.mom_firstName,
			'mom_lastName': rawModel.mom_lastName,
			'mom_address': rawModel.mom_address,
			'mom_contactNo': rawModel.mom_contactNo,
			'mom_email': rawModel.mom_email,
			'mom_city': rawModel.mom_city,
			'mom_photo': rawModel.mom_photo
		};
	};

	this.schema.index({
		mom_email: 1
	});
	
	this.schema.set('autoIndex', false);

	return this;
};