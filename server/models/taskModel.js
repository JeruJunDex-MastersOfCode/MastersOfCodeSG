var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = function() {
	this.collection = 'tasks';

	this.schema = mongoose.Schema({
		taskId: {
			type: String	
		},
		taskName: {
			type: String
		},
		taskDescription: {
			type: String
		},
		taskPriority: {
			type: String
		},
		taskRate: {
			type: String
		},
		taskOwner: {
			type: String
		},
		taskAssignee: {
			type: String
		},
		taskStatus: {
			type: String
		},
		taskComments: [{
			messageFrom: {
				type: String
			},
			message: {
				type: String
			}
		}]
	});

	this.schema.statics.toEntity = function(rawModel) {
		return {
			'taskId': rawModel._id,
			'taskName': rawModel.taskName,
			'taskDescription': rawModel.taskDescription,
			'taskPriority': rawModel.taskPriority,
			'taskRate': rawModel.taskRate,
			'taskOwner': rawModel.taskOwner,
			'taskAssignee': rawModel.taskAssignee,
			'taskStatus': rawModel.taskStatus,
			'taskComments': {
		        "messageFrom" : rawModel.taskOwner,
		        "message" : rawModel.taskAssignee
		    }
		};
	};

	this.schema.index({
		uEmail: 1
	});
	
	this.schema.set('autoIndex', false);

	return this;
};