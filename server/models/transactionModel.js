var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = function() {
	this.collection = 'transaction';

	this.schema = mongoose.schema({
		transaction_id: {
			type: String	
		},
		transaction_name: {
			type: String,
			required: true
		},
		transaction_description: {
			type: String,
			required: true
		},
		transaction_price: {
			type: String,
			required: true
		},
		transaction_priority: {
			type: String,
			required: true
		},
		transaction_status {
			type: String,
			required: true
		},
		mom_id: {
			type: String,
			required: true
		},
		mom_email: {
			type: String,
			required: true
		},
		va_id: {
			type: String,
			required: true
		},
		va_email: {
			type: String,
			required: true
		}
	});

	this.schema.statics.toEntity = function(rawModel) {
		return {
			'transaction_id': rawModel.transaction_id,
			'transaction_name': rawModel.transaction_name,
			'transaction_description': rawModel.transaction_description,
			'transaction_price': rawModel.transaction_price,
			'transaction_priority': rawModel.transaction_priority,
			'transaction_status': rawModel.transaction_status,
			'mom_id': rawModel.mom_id,
			'mom_email': rawModel.mom_email,
			'va_id': rawModel.va_id,
			'va_eamil': rawModel.va_eamil
		};
	};

	this.schema.index({
		transaction_id: 1
	});
	
	this.schema.set('autoIndex', false);

	return this;
};