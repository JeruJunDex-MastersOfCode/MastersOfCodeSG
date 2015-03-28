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
	var taskModel = models.taskModel;

	taskModel.find({}, function(err, jobs) {
		if(!err) {
			var entities = [];
			for(var i in jobs) {
				var entity =  taskModel.toEntity(jobs[i]);
				entities.push(entity);
			}
			res.send(entities)
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

	taskModel.findOne({job_id: req.body.job_id}, function(err, job) {
		if(!err) {
			if(job) {
				var entity = taskModel.toEntity(job);
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

	var job_id = req.params.job_id;

	taskModel.findOne({job_id: job_id}, function(err, job) {
		if(!err) {
			if(job) {
				var tempJob = {};
				tempJob.job_name = req.body.job_name;
				tempJob.job_description = req.body.job_description;
				tempJob.job_price = req.body.job_price;
				tempJob.job_priority = req.body.job_priority;
				tempJob.mom_id = mom_body.mom_id;
				job.save(function(err) {
					if(err) {
						var entity = taskModel.toEntity(tempJob);
						res.send(entity);
					} else {
						res.send({
							'Error': err
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