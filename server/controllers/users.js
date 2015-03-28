var models = require('../models/index');
var config = require('../config');
var querystring = require('querystring');
var async = require('async');
var mongoose = require('mongoose');
var __ = require('underscore');
var Q = require('q');

var Simplify = require("simplify-commerce"),
    client = Simplify.getClient({
        publicKey: config.simplifyCommerce.public_key,
        privateKey: config.simplifyCommerce.private_key
    });

var tempObj = {};

exports.index = function(req, res) {
	res.send({
		message: 'Invalid url!'
	});
};

exports.testRoute = function(req, res) {

	client.customer.create({
	    email : "customer@mastercard.com",
	    name : "Customer TEST",
	    card : {
	       expMonth : "11",
	       expYear : "19",
	       cvc : "123",
	       number : "5555555555554444"
	    }
	}, function(errData, data){
	 
	    if(errData){
	        console.error("Error Message: " + errData.data.error.message);
	        // handle the error
	        return;
	    }
	 
	    console.log("Success Response: " + JSON.stringify(data));
	    tempObj.customerId = data.card.customer.id;
	    tempObj.cardExpMonth = data.card.expMonth;
	    tempObj.expYear = data.card.expYear;
	    tempObj.cardNumber = data.card.number;
	    console.log('Customer id > ' + tempObj.customerId);
	    res.send(data);
	});
};

exports.testPayment = function(req, res) {
	console.log(tempObj);
	client.payment.create({
		customer: tempObj.customerId,
		amount : "2500",
		currency : "USD"
	}, function(errData, data) {
		if(errData) {
			console.error(errData.data.error.message);
			return;
		}
		console.log(data);
		res.send(data);
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