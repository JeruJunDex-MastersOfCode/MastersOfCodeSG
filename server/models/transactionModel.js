var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

module.exports = function() {
	this.collection = 'transaction';

	this.schema = mongoose.Schema({
		transId: {
			type: String	
		},
		transStatus: {
			type: String
		},
		transFixedRate: {
			type: Number,
			default: 100
		},
		taskId: {
			type: String
		},
	});

	this.schema.statics.toEntity = function(rawModel) {
		return {
			'transId': rawModel._id,
			'transStatus': rawModel.transStatus,
			'transFixedRate': rawModel.transFixedRate,
			'taskId': rawModel.taskId
		};
	};

	this.schema.index({
		transId: 1
	});
	
	this.schema.set('autoIndex', false);

	return this;
};