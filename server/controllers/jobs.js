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

exports.getJobs = function(req, res) {
	var jobModel = models.jobModel;

	jobModel.find({}, function(err, jobs) {
		if(!err) {
			var entities = [];
			for(var i in jobs) {
				var entity =  jobModel.toEntity(jobs[i]);
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

exports.getJob = function(req, res) {
	var jobModel = models.jobModel;

	jobModel.findOne({job_id: req.body.job_id}, function(err, job) {
		if(!err) {
			if(job) {
				var entity = jobModel.toEntity(job);
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

exports.addJob = function(req, res) {
	var jobModel =  models.jobModel;
	var userModel = models.userModel;

	var mom_id = req.params.mom_id;

	var tempJob = {};

	tempJob.job_name = req.body.job_name;
	tempJob.job_description = req.body.job_description;
	tempJob.job_price = req.body.job_price;
	tempJob.job_priority = req.body.job_priority;

	jobModel.find({}, function(err, jobs) {
		if(!err) {
			if(jobs) {
				jobs.save(function(err) {
					if(!err) {
						var entity = jobModel.toEntity(tempJob);
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

exports.editJob = function(req, res){

};

exports.archiveJob = function(req, res) {

};