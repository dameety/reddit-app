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

function loadProgramming () {
	http.getJSON("https://www.reddit.com/r/programming/.json")
	.then(function (response) {
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
	
	loadProgramming();
}

exports.toggleDrawer = function (args) {
	drawer.toggleDrawerState();
}

exports.gotoHome = function (args) {
	drawer.closeDrawer();
	frameModule.topmost().navigate({
        moduleName: "./views/home/home",
        animated: true,  
        transition: {
            duration: 100,
            curve: "easeIn",
            name: "slideUp",
        },
        clearHistory: true
    });
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
        clearHistory: true

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
        clearHistory: true

    });
}
  
// navigate to get full story on clicked 
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