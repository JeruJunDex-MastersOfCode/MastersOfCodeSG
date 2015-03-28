var models = require('../models/index');
var config = require('../config');
var querystring = require('querystring');
var async = require('async');
var mongoose = require('mongoose');
var __ = require('underscore');
var Q = require('q');

exports.index = function(req, res) {
	res.send({
		message: 'Invalid url!'
	});
};

exports.getAllUsers = function(req,res) {
	var userModel = models.userModel;

	userModel.find({}, function(err, users) {
		if(!err){
			var entities = [];
			for (var i in users) {
				var entity = userModel.toEntity(users[i]);
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

exports.getUser = function(req, res) {
	var userModel = models.userModel;
	var user_id = req.params.user_id;

	userModel.findOne({
		user_id: user_id
	}, function (err, user) {
		if (!err) {
			if (user) {
				var entity = userModel.toEntity(user);
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

exports.signup = function(req,res) {
	var userModel = models.userModel;

	/*if (!req.body.user_firstname || !req.body.user_lastname || !req.body.user_address || !req.body.user_contactNo || !req.body.user_email || !req.body.user_city) {
		res.send({
			'error': "One or more required fields are missing"
		});
		return;
	}*/
	/*TODO: session check*/

	userModel.find({},function (err, user) {
		if (!err) {
			if (user) {
					var user = new userModel({					
						user_firstName: req.body.user_firstName,
						user_lastName: req.body.user_lastName,
						user_address: req.body.user_address,
						user_contactNo: req.body.user_contactNo,
						user_email: req.body.user_email,
						user_city: req.body.user_city,
						user_photo: req.body.user_photo,
						user_type: req.body.user_type,
						user_middleName: req.body.user_middleName
					});

					user.save(function (err) {
						if (!err) {
							var entity = userModel.toEntity(user);
							res.send(entity);
						} else {
							console.log(err);
							res.send({
								'error': err
							});
						}
					});
			} else {
				res.send({
					'error': 'User already exists!'
				})
			}
		} else {
			console.log(err);
			res.send({
				'error': err
			});
		}
	});
};

exports.login = function(req, res) {

};

exports.editProfile = function(req, res){

};

exports.addPhoto = function(req, res) {

};