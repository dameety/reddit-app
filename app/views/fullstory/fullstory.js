var Observable = require("data/observable");
var ObservableArray = require("data/observable-array");
var http = require("http");
var moment = require("moment");
var frameModule = require("ui/frame")
var SocialShare = require("nativescript-social-share");
var page;


var viewModel; 

exports.onNavigatingTo = function (args) {
	page = args.object;
	viewModel = page.navigationContext;
	page.bindingContext = viewModel;
}

exports.shareTap = function (args) {
	SocialShare.shareText("Check out this page from reddit: " + viewModel.url);
}


// back to story list
exports.goBackHome = function () {
	frameModule.topmost().goBack();
}
