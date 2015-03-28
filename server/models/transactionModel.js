var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = function() {
	this.collection = 'transaction';

	this.schema = mongoose.Schema({
		transaction_id: {
			type: String	
		},
		transaction_name: {
			type: String
		},
		transaction_description: {
			type: String
		},
		transaction_price: {
			type: String
		},
		transaction_priority: {
			type: String
		},
		transaction_status: {
			type: String
		},
		mom_id: {
			type: String
		},
		mom_email: {
			type: String
		},
		va_id: {
			type: String
		},
		va_email: {
			type: String
		}
	});

	this.schema.statics.toEntity = function(rawModel) {
		return {
			'transaction_id': rawModel._id,
			'transaction_name': rawModel.transaction_name,
			'transaction_description': rawModel.transaction_description,
			'transaction_price': rawModel.transaction_price,
			'transaction_priority': rawModel.transaction_priority,
			'transaction_status': rawModel.transaction_status,
			'mom_id': rawModel.mom_id,
			'va_id': rawModel.va_id
		};
	};

	this.schema.index({
		transaction_id: 1
	});
	
	this.schema.set('autoIndex', false);

	return this;
};