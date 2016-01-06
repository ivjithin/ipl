(function(window) {
	   "use strict";	
	   
	
	   
	
	var _root, admin = {	
		boostrapComponentsFn : function(){
			
			
		},windowResizeHandler:function(){
			
		},getURLHash:function(){	
			return !!window.location.hash?
					window.location.hash.substr(1).toLowerCase():"";
		},URLHashChangeHandler:function(){					
			var hash=_root.getURLHash();
			pageHandler.showPage(hash);			
		},
		el : {
			body:$("body"),
			window:$(window),
			
			pageWrapper:$("#page-wrapper"),

			
		},	
		setEvents : function() {
			_root.el.window.on('hashchange', _root.URLHashChangeHandler);
			_root.el.window.on('resize', _root.windowResizeHandler);
		
		},
		load : function() {
			_root.setEvents();
			
			//_root.indexPageSetUp();
		},
		init : function() {
			_root = this;
		
			_root.load();
			
		}	
	}
	document.addEventListener('DOMContentLoaded', admin.init.bind(admin));
	window.publicModule = {
				
	}
})(this);