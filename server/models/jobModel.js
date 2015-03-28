var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = function() {
	this.collection = 'jobs';

	this.schema = mongoose.Schema({
		job_id: {
			type: String	
		},
		job_name: {
			type: String
		},
		job_description: {
			type: String
		},
		Job_priority: {
			type: String
		},
		job_price: {
			type: String
		},
		mom_id: {
			type: String
		},
		status: {
			type: String
		},
		archived: {
			type: Boolean,
			default: false
		}
	});

	this.schema.statics.toEntity = function(rawModel) {
		return {
			'job_id': rawModel._id,
			'job_name': rawModel.job_name,
			'job_description': rawModel.job_description,
			'job_priority': rawModel.job_priority,
			'job_price': rawModel.job_price,
			'mom_id': rawModel.mom_id,
			'archived': rawModel.archived
		};
	};

	this.schema.index({
		mom_email: 1
	});
	
	this.schema.set('autoIndex', false);

	return this;
};