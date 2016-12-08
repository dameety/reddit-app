var Observable = require("data/observable");
var ObservableArray = require("data/observable-array");
var http = require("http");
var moment = require("moment");
var frameModule = require("ui/frame")



var viewModel = new Observable.Observable({    
	mainTitle: 'Hello User',
	allItems: new ObservableArray.ObservableArray([])
});
 

exports.onNavigatingTo = function (args) {
	var page = args.object;
	page.bindingContext = page.navigationContext;

}



exports.goBackHome = function () {
	frameModule.topmost().goBack();
}