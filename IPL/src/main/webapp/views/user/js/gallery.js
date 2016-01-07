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
					
					var html="";
					var imgAr=res.result;
					for(var i in imgAr){
						var obj =imgAr[i];
						
						html+="<a class='fancybox' href='../../assets/galleryImgs/"+obj+"' data-fancybox-group='gallery' title=''><img style='width:100px; height:100px;' src='../../assets/galleryImgs/"+obj+"' alt='' /></a>";
					}
					$("#imgContainer").html(html);
					
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