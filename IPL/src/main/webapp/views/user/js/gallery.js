var contextPath="";
(function(window) {
	   "use strict";	
	   

	var _root, admin = {	
		loadGalleryImages:function(){
			var apiObj={
					url:contextPath+ "../../public/galleryImgs",
					method:'GET'
				//	contentType:'application/json',			
			};
		
			IPLCom.ajaxService.invoke(apiObj).done(function(res) {
					console.log(" res",res)			
			}).fail(IPLCom.exceptionHandler.ajaxFailure);
			
		},	
		boostrapComponentsFn : function(){
			

		},setEvents : function() {

		
		},
		load : function() {
			_root.setEvents();
			_root.boostrapComponentsFn();
			_root.loadGalleryImages();
			

		},
		init : function() {
			_root = this;		
			_root.load();
			
		}	
	}
	document.addEventListener('DOMContentLoaded', admin.init.bind(admin));

})(this);