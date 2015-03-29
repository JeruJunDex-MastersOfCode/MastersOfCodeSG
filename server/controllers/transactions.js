var models = require('../models/index');
var config = require('../config');
var async = require('async');
var mongoose = require('mongoose');
var parser = require('xml2json');
var request = require('request');

exports.index = function(req, res) {
	res.send({
		message: 'Invalid URL'
	});
};

exports.getAllTransactions = function(req, res) {
	var transactionModel = models.transactionModel;

	transactionModel.find({}, function(err, transactions) {
		if(!err){
			var entities = [];
			for (var i in transactions) {
				var entity = userModel.toEntity(transactions[i]);
				entities.push(entity);
			}
			res.send(entities);
		} else {
			console.log(err);
			res.send({
				'error': err
			});
		}
	})
};

exports.getTransacation = function(req, res) {
	var userModel = models.userModel,
		taskModel = models.taskModel,
		transactionModel = models.transactionModel;

	var taskId = req.params.taskId;

	userModel.findOne({taskId: taskId}, function(err, transaction) {
		if(!err) {
			if(transaction) {
				var entity = transactionModel.toEntity(taskId);
				res.send(entity);
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

exports.newTransaction = function(req, res) {
	var transactionModel = models.transactionModel;

	var taskId = req.params.taskId;

	transactionModel.findOne({taskId: taskId}, function(err, transaction) {
		if(!err) {
			if(transaction) {
				console.log(err);
				res.send({
					'Error': err
				});
			} else {
				var transaction = new transactionModel({
					transStatus: 'New',
					transFixedRate: 100,
					taskId: taskId
				});

				transaction.save(function(err) {
					if(!err) {
						var entity = transactionModel.toEntity(transaction);
						res.send(entity);
					} else {
						console.log(err);
						res.send({
							'Error': 'Error saving!'
						});
					}
				});
			} 
		} else {
				console.log(err);
				res.send({
					'Error': err
				});
			} 
	});
};

exports.updateTransaction = function(req, res) {

};

exports.testRoute = function(req, res) {
	/*var Simplify = require("simplify-commerce"),
	    client = Simplify.getClient({
	        publicKey: config.simplifyCommerce.public_key,
	        privateKey: config.simplifyCommerce.private_key
	    });

	var userModel = models.userModel,
		taskModel = models.taskModel,
		transactionModel = models.transactionModel;

	client.payment.create({
		customer: 'ee8Mr9ax',
		amount : 1000,
		currency : "USD"
	}, function(errData, data) {
		if(errData) {
			console.error(errData.data.error.message);
			return;
		}
		console.log(data);
		res.send(data);
	});*/

	/*var xmlPath = "request5.xml";

		request({
			url: 'http://dmartin.org:8028/moneysend/v2/transfer?Format=XML',
			method: 'post',
			headers: {
				'Content-Type': 'application/xml'
			},
			body: xmlPath
		}, function(error, response, body) {
			console.log(response);
			callback(response);
		});*/

	async.parallel([
			function(callback) {
				var xmlPath = "request2.xml";

				request({
					url: 'http://dmartin.org:8028/moneysend/v2/transfer?Format=XML',
					method: 'post',
					headers: {
						'Content-Type': 'application/xml'
					},
					body: xmlPath
				}, function(error, response, body) {
					// console.log(response);
					console.log(body);
					callback(response);
				});
			},
			function(callback) {
				var Simplify = require("simplify-commerce"),
				    client = Simplify.getClient({
				        publicKey: config.simplifyCommerce.public_key,
				        privateKey: config.simplifyCommerce.private_key
				    });

				var userModel = models.userModel,
					taskModel = models.taskModel,
					transactionModel = models.transactionModel;

				client.payment.create({
					customer: 'ee8Mr9ax',
					amount : 1000,
					currency : "USD"
				}, function(errData, data) {
					if(errData) {
						console.error(errData.data.error.message);
						return;
					}
					// console.log(data);
					callback(data);
				});
			}
		], function(err, results) {
			console.log(results[1]);
			res.send(results[0]);
	});
}

exports.checkout = function(req, res) {

	function simplifyPayment(callback) {
		var Simplify = require("simplify-commerce"),
		    client = Simplify.getClient({
		        publicKey: config.simplifyCommerce.public_key,
		        privateKey: config.simplifyCommerce.private_key
		    });

		var userModel = models.userModel,
			taskModel = models.taskModel,
			transactionModel = models.transactionModel;

		var uId = req.params.uId;

		userModel.findOne({uId: uId}, function(err, user) {
			if(!err) {
				if(user) {
					console.log('User >> ' + user);
					var userCustomerId = user.u_MCustomerId;
					taskModel.findOne({taskOwner:uId}, function(err, task) {
						if(!err) {
							if(task) {
								var taskId = task.taskId;
								console.log('Task: ' + taskId + ' >> ' + 'Customer Id: ' + userCustomerId);

								transactionModel.findOne({taskId: taskId}, function(err, transaction) {
									var totalAmount = task.taskRate - (task.taskRate * transaction.transFixedRate);

									client.payment.create({
										customer: userCustomerId,
										amount : totalAmount,
										currency : "USD"
									}, function(errData, data) {
										if(errData) {
											console.error(errData.data.error.message);
											return;
										}
										console.log(data);
										res.send(data);
									});
								});
								
							}
						}
					});
				}
			}
		});
	}

	function moneySend(callback) {
		var xmlPath = "request5.xml";

		request({
			url: 'http://dmartin.org:8028/moneysend/v2/transfer?Format=XML',
			method: 'post',
			headers: {
				'Content-Type': 'application/xml'
			},
			body: xmlPath
		}, function(error, response, body) {
			console.log(response);
			callback(response);
		});
	}

	async.parallel([
		async.apply(simplifyPayment),
		async.apply(moneySend)
		], function(err, results) {
			var s = results[0];
			var m = results[1];

			console.log('s > ' + s);
			res.send(m);
	});
};

exports.endTransaction = function(req, res) {

};

exports.getAllUserTransactions = function(req, res) {

};

/*function () {
	var referenceID;
        require('crypto').randomBytes(48, function(ex, buf) {
            referenceID = buf.toString('hex');
        });

        client.payment.create({
            amount : "100000",
            token : request.body.simplifyToken,
            description : "We bought something awesome",
            reference : referenceID,
            currency : "USD"
        }, function(errData, data){

            if(errData){
                console.error("Error Message: " + errData.data.error.message);
                if (data.paymentStatus) {
                        response.status(200).send("Payment processed with status: " + data.paymentStatus);
                }
                // handle the error
                return;
            }

            if (data.paymentStatus) {
                console.log("Payment Status: " + data.paymentStatus);
            } else {
                console.log("Payment Status was not available.");
            }
            response.status(200).send("Payment processed with status: " + data.paymentStatus);
        });
}*/