var models = require('../models/index');
var config = require('../config');
var async = require('async');
var mongoose = require('mongoose');

exports.index = function(req, res) {
	res.send({
		message: 'Invalid url!'
	});
};

exports.getSimplifyCustomer = function(req, res) {
	var Simplify = require("simplify-commerce"),
	    client = Simplify.getClient({
	        publicKey: config.simplifyCommerce.public_key,
	        privateKey: config.simplifyCommerce.private_key
	    });
	var userModel = models.userModel;

	userModel.findOne({uEmail: req.body.email}, function(err, user) {
		if(!err) {
			if(user) {
				client.customer.create({
				    email: user.uEmail,
				    name: user.uFirstName + ' ' + user.uLastName,
				    card: {
				       expMonth: req.body.expMonth,
				       expYear: req.body.expYear,
				       cvc: req.body.cvc,
				       number: req.body.number
				    }
				}, function(errData, data){
				 
				    if(errData){
				        console.error("Error Message: " + errData.data.error.message);
				        // handle the error
				        return;
				    }
				    user.u_MCustomerId = data.card.customer.id

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
				});
			} else {
				res.send({});
			}
		} else {
			res.send({
				'Error': err
			});
		}
	});
};

exports.testPayment = function(req, res) {
	var Simplify = require("simplify-commerce"),
	    client = Simplify.getClient({
	        publicKey: config.simplifyCommerce.public_key,
	        privateKey: config.simplifyCommerce.private_key
	    });	
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

	var tempCustomerObj = {};

	tempCustomerObj.firstName = 
	tempCustomerObj.middleName =
	tempCustomerObj.lastName = req.body.uLastName;
	tempCustomerObj.email = req.body.uEmail;
	tempCustomerObj.address = req.body.uAddress;
	tempCustomerObj.contactNo = req.body.uContactNo;
	tempCustomerObj.city = req.body.uCity;
	tempCustomerObj.photo = req.body.uPhoto;
	tempCustomerObj.utype = req.body.uType;
	tempCustomerObj.vaCardNumber = req.body.vaCardNumber;

	console.log(tempCustomerObj);

	userModel.find({},function (err, user) {
		if (!err) {
			if (user) {
				var user = new userModel({
					uFirstName: req.body.uFirstName,
					uMiddleName:  req.body.uMiddleName,
					uLastName: req.body.uLastName,
					uEmail: req.body.uEmail,
					uAddress: req.body.uAddress,
					uContactNo: req.body.uContactNo,
					uCity: req.body.uCity,
					uPhoto: req.body.uPhoto,
					uType: req.body.uType,
					u_VACardNumber: req.body.vaCardNumber
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
					'Error': 'User already exists!'
				});
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