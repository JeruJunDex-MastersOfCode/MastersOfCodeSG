var models = require('../models/index');
var config = require('../config');
var querystring = require('querystring');
var async = require('async');
var mongoose = require('mongoose');
var __ = require('underscore');
var Q = require('q');
// var SimplifyCommerce = require('../public/js/lib/simplify');


exports.index = function(req, res) {
	res.send({
		message: 'Invalid URL'
	});
};

exports.testRoute = function(req, res) {
	/*var referenceID;
	require('crypto').randomBytes(48, function(ex, buf) {
        referenceID = buf.toString('hex');
    });*/

	/*SimplifyCommerce.generateToken({
		key: 'sbpb_YWRjMDA1ZDMtMzQzYS00MWViLThiMzctN2EwYjM0ZmMyZDY3',
		card: {
			number: 5555555555554444,
			cvc: 123,


		}
	})*/
var Simplify = require('simplify-commerce'),
	client = Simplify.getClient({
		publicKey: config.simplifyCommerce.public_key,
		privateKey: config.simplifyCommerce.private_key
	});

	client.payment.create({
	    amount : "1000",
	    token : "f21da65e-f0ab-45cb-b8e6-40b493c3671f",
	    description : "payment description",
	    currency : "USD"
	}, function(errData, data){
	    if(errData){
	        console.error("Error Message: " + errData.data.error.message);
	        // handle the error
	        // return;
	    }
	    console.log("Payment Status: " + data.paymentStatus);
	    res.send(data);
	});
}

exports.startTransaction = function(req, res) {

};

exports.checkout = function(req, res) {

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