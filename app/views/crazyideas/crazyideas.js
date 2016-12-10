var Observable = require("data/observable");
var ObservableArray = require("data/observable-array");
var http = require("http");
var moment = require("moment");
var frameModule = require("ui/frame")
var drawer;
var page;


var viewModel = new Observable.Observable({    
	allItems: new ObservableArray.ObservableArray([]),
});
 
 
//load all stories under crazy ideas
function loadCrazyIdeas () {
	http.getJSON("https://www.reddit.com/r/CrazyIdeas/.json")
	.then(function (response) {
		console.log("crazy ideas loaded")
		//push each item to the allItems array
		response.data.children.map(function (item) {
			item.data.friendlyTime= moment(item.data.created_utc * 1000).fromNow();
			viewModel.allItems.push(item.data);
		})
	})
} 


exports.onNavigatingTo = function (args) {
	page = args.object;
	page.bindingContext = viewModel;
	drawer = page.getViewById("drawer");
	
	loadCrazyIdeas();
}

exports.toggleDrawer = function (args) {
	drawer.toggleDrawerState();
}

exports.gotoHome = function (args) {
	drawer.closeDrawer();
	frameModule.topmost().navigate({
        moduleName: "./views/storylist/storylist",
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


// get the fullstory on the story clicked
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