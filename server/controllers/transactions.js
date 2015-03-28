var models = require('../models/index');
var config = require('../config');
var async = require('async');
var mongoose = require('mongoose');
var parser = require('xml2json');
var request = require('request');
var http = require('http');
var fs = require('fs');

exports.index = function(req, res) {
	res.send({
		message: 'Invalid URL'
	});
};

exports.startTransaction = function(req, res) {

};

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

		userModel.findOne({uEmail: req.body.uEmail}, function(err, user) {
			if(!err) {
				if(user) {
					console.log('User >> ' + user);
					taskModel.find({})
						.where('taskOwner').equals(user.uId)
						.exec(function(err, task) {
							console.log('Task >> ' + task);
							transactionModel.findOne({taskId: task.taskId}, function(err, transaction) {
								var totalAmount = task.taskRate - (task.taskRate * transaction.transFixedRate);
								console.log('Total Amount >> ' + totalAmount);

								client.payment.create({
									customer: user.u_MCustomerId,
									amount : totalAmount,
									currency : "USD"
								}, function(errData, data) {
									if(errData) {
										console.error(errData.data.error.message);
										return;
									}
									console.log(data);
									callback(data);
								});
							});
					});
				}
			}
		});
	}

	function moneySend(callback) {
		var xmlTemplate = require('request.xml');

		var chars =  {
		    '<': '&lt;',
		    '>': '&gt;',
		    '(': '&#40;',
		    ')': '&#41;',
		    '#': '&#35;',
		    '&': '&amp;',
		    '"': '&quot;',
		    "'": '&apos;'
		};

		var options = {
		    object: false,
		    reversible: true,
		    coerce: true,
		    sanitize: true,
		    trim: true,
		    arrayNotation: false
		};
	}
};

exports.test = function(req, res) {
	/*var chars =  {
	    '<': '&lt;',
	    '>': '&gt;',
	    '(': '&#40;',
	    ')': '&#41;',
	    '#': '&#35;',
	    '&': '&amp;',
	    '"': '&quot;',
	    "'": '&apos;'
	};

	var options = {
	    object: false,
	    reversible: true,
	    coerce: true,
	    sanitize: true,
	    trim: true,
	    arrayNotation: false
	};

	var xmlFile = 'request.xml';

	var jsonObj = parser.toJson(xmlFile);
	console.log(jsonObj);
	res.send(jsonObj);*/

	/*var returnJSONResults = function(baseName, queryName) {
		var XMLPath = "request.xml";
		var rawJSON = loadXMLDoc(XMLPath);
		function loadXMLDoc(filePath) {
		var fs = require('fs');
		var xml2js = require('xml2js');
		var json;
		try {
		    var fileData = fs.readFileSync(filePath, 'ascii');

		    var parser = new xml2js.Parser();
		    parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
		    json = JSON.stringify(result);
		    console.log(result);
		});

		console.log("File '" + filePath + "/ was successfully read.\n");
		return json;
		} catch (ex) {console.log(ex)}
		}
		}();*/
	var xmlPath = "request2.xml";

	request({
		url: 'http://dmartin.org:8028/moneysend/v2/transfer?Format=XML',
		method: 'post',
		headers: {
			'Content-Type': 'application/xml'
		},
		body: xmlPath
	}, function(error, response, body) {
		console.log(response);
		res.send(body);
	});
}

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