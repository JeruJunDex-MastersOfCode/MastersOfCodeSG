var models = require('../models/index');
var config = require('../config');
var request = require('request');
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
	var models = models.userModel;

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

};

exports.signup = function(req,res) {

};

exports.login = function(req, res) {

};

exports.editProfile = function(req, res){

};

exports.addPhoto = function(req, res) {

};