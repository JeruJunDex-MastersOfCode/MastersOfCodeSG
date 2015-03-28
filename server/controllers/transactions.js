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
		message: 'Invalid URL'
	});
};

exports.startTransaction = function(req, res) {

};

exports.checkout = function(req, res) {

};

exports.endTransaction = function(req, res) {

};

exports.getAllUserTransactions = function(req, res) {

};