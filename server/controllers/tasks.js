var models = require('../models/index');
var config = require('../config');
var querystring = require('querystring');
var async = require('async');
var mongoose = require('mongoose');
var __ = require('underscore');
var Q = require('q');

exports.index = function(req, res) {
	res.send({
		api: 'Invalid url!'
	});
};

exports.getAllTasks = function(req, res) {
	var  taskModel = models.taskModel;

	taskModel.find({}, function(err, tasks) {
		if(!err){
			var entities = [];
			for (var i in tasks) {
				var entity = taskModel.toEntity(tasks[i]);
				entities.push(entity);
			}
			res.send(entities);
		} else {
			console.log(err);
			res.send({
				'error': err
			});
		}
	});
};

exports.getTask = function(req, res) {
	var taskModel = models.taskModel;

	taskModel.findOne({
		_id: req.params.taskId
	}, function (err, task) {
		if (!err) {
			if (task) {
				var entity = taskModel.toEntity(task);
				res.send(entity);
			} else {
				res.send({});
			}
		} else {
			console.log(err);
			res.send({
				'error': err
			});
		}
	});
};

exports.addTask = function(req, res) {
	var taskModel =  models.taskModel;

	var uid = req.params.uid;

	if(req.body.taskName == null || req.body.taskName == undefined) {
		res.send({
			'error': 'Job name is required!'
		});
		return;
	}

	if(req.body.taskRate == null || req.body.taskRate == undefined) {
		res.send({
			'error': 'Job name is required!'
		});
		return;
	}	

	taskModel.find({},function (err, task) {
		if(!err) {
			if(task) {
				var task = new taskModel({					
					taskName: req.body.taskName,
					taskDescription: req.body.taskDescription,
					taskRate: req.body.taskRate,
					taskPriority: req.body.taskPriority,
					taskOwner: req.body.taskOwner,
					taskAssignee: req.body.taskAssignee,
					taskStatus: req.body.taskStatus,
					taskComments: {
				        messageFrom : req.body.messageFrom,
				        message : req.body.message
				    }
				});


				task.save(function(err) {
					if(!err) {
						var entity = taskModel.toEntity(task);
						res.send(entity);
					} else {
						res.send({
							'error': err
						});
					}
				});
			} else {
				res.send({});
			}
		} else {
			console.log(err);
			res.send({
				'error': err
			});
		}
	});

};

exports.editTask = function(req, res){
	var taskModel = models.taskModel;

	taskModel.findOne({
		_id: req.params.taskId
	}, function (err, task) {
		if (!err) {				
				if (task) {
					task.taskName = req.body.taskName;
					task.taskDescription = req.body.taskDescription;
					task.taskRate = req.body.taskRate;
					task.taskPriority = req.body.taskPriority;
					task.taskOwner = req.body.taskOwner;
					task.taskAssignee = req.body.taskAssignee;
					task.taskStatus = req.body.taskStatus;
					task.taskComments = {
				        messageFrom : req.body.messageFrom,
				        message : req.body.message
				    };

				task.save(function (err) {
					if (!err) {
						var entity = taskModel.toEntity(task);
						res.send(entity);
					} else {
						console.log(err);
						res.send({
							'error': err
						});
					}
				});
			} else {
				res.send({});
			}
		} else {
			console.log(err);
			res.send({
				'Error': err
			});
		}
	});

};

exports.updateStatus = function(req, res) {

};