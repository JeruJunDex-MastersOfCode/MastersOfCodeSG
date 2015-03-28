var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = function() {
	this.collection = 'jobs';

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
}