var Observable = require("data/observable");
var ObservableArray = require("data/observable-array");
var http = require("http");
var moment = require("moment");
var frameModule = require("ui/frame")
var drawer;
var page;


var viewModel = new Observable.Observable({    
	allItems: new ObservableArray.ObservableArray([]),
	newItems: new ObservableArray.ObservableArray([])
});
 
exports.onNavigatingTo = function (args) {
	page = args.object;
	page.bindingContext = viewModel;
	drawer = page.getViewById("drawer");
	loadReddit();
}

exports.toggleDrawer = function (args) {
	drawer.toggleDrawerState();
}

exports.gotoCrazyIdeas = function (args) {
	drawer.closeDrawer();
	frameModule.topmost().navigate({
        moduleName: "./views/crazyideas/crazyideas",
        animated: true,  
        transition: {
            duration: 100,
            curve: "easeIn",
            name: "slideUp",
        },
    });
}

exports.gotoProgramming = function (args) {
	drawer.closeDrawer();
	frameModule.topmost().navigate({
        moduleName: "./views/programming/programming",
        animated: true,
        transition: {
            duration: 100,
            curve: "easeIn",
            name: "slideUp",
        },
    });
}

exports.gotoBusiness = function (args) {
	drawer.closeDrawer();
	frameModule.topmost().navigate({
        moduleName: "./views/businees/businees",
        animated: true,
        transition: {
            duration: 100,
            curve: "easeIn",
            name: "slideUp",
        },
    });
}

function loadReddit() {
	http.getJSON("https://www.reddit.com/.json")
	.then(function (response) {
		//push each item to the allItems array
		response.data.children.map(function (item) {
			item.data.friendlyTime= moment(item.data.created_utc * 1000).fromNow();
			viewModel.allItems.push(item.data);
		})
	})
}

exports.storyTap = function (args) {
	frameModule.topmost().navigate({
        moduleName: "./views/fullstory/fullstory",
        animated: true,
        transition: {
            duration: 100,
            curve: "easeIn",
            name: "slide",
        },
        context: args.view.bindingContext
    });
}