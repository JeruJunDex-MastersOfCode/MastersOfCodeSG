var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = function() {

	this.collection = 'transaction';

	this.schema = mongoose.schema({
		job_id: {
			type: String	
		},
		job_name: {
			type: String,
			required: true,
		},
		job_description: {
			type: String,
			required: true
		},
		job_price: {
			type: String,
			required: true,
		},
		mom_id: {
			type: String,
			required: true
		},
		mom_email: {
			type: String,
			required: true
		}
	});

	this.schema.statics.toEntity = function(rawModel) {
		return {
			'job_id': rawModel.job_id,
			'job_name': rawModel.job_name,
			'job_description': rawModel.job_description,
			'job_price': rawModel.job_price,
			'mom_id': rawModel.mom_id,
			'mom_email': rawModel.mom_email
		};
	};

	this.schema.index({
		mom_email: 1
	});
	
	this.schema.set('autoIndex', false);

	return this;
};