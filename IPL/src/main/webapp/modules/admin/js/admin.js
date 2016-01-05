(function(window) {
	   "use strict";	   
	var pageHandler=(function(){
		
		var loadModalFunction=function(pageObj,callback){
        	$(pageObj.el).data("load-status",true);
        	if(null!=callback&& typeof callback === 'function'){        		
        		pageObj.fn.apply(this, pageObj.args);
        	}				
		};
		var loadModal=function(pageObj){
			$(pageObj.el).load("partials/"+pageObj.url, function(response, status, xhr){
	            if(status === "success"){
	            	loadModalFunction(pageObj,pageObj.fn);		   
	            }else{
	            	SMAPCom.exceptionHandler.ajaxFailure(statusTxt, xhr);
	            }
	        }).error(SMAPCom.exceptionHandler.ajaxFailure);	
		};

		var loadFunction=function(pageObj,callback){
			$(".app-sub-content").addClass("hidden");
        	$(pageObj.el).removeClass("hidden");
        	$(pageObj.el).data("load-status",true);
        	if(null!=callback&& typeof callback === 'function'){        		
        		pageObj.fn.apply(this, pageObj.args);
        	}				
		};
		
		var loadPage=function(pageObj){
			var loadStatus= $(pageObj.el).data("load-status");
			if(!!loadStatus){		
				loadFunction(pageObj,pageObj.fn,pageObj.args);
			}else{
				$(pageObj.el).load("partials/"+pageObj.url, function(response, status, xhr){
		            if(status === "success"){
		            	loadFunction(pageObj,pageObj.fn);		   
		            }else{
		            	SMAPCom.exceptionHandler.ajaxFailure(statusTxt, xhr);
		            }
		        }).error(SMAPCom.exceptionHandler.ajaxFailure);
			}  			
		};	
		
		var showPage=function(hash){		
			var parmId=SMAPCom.URL.queryParam("id");
			if(!!hash&&hash.indexOf("?")>-1){
				hash=hash.split("?")[0]	
			}
			var pageObj=jQuery.extend({}, SM_ADMIN.PAGE[hash]);
			if(!!parmId){
				pageObj["args"]=[{"id":parmId}];
			}
			loadPage(pageObj);
		};		
		return {showPage:showPage,loadModal:loadModal}
		
	})();   
	   
	
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
			document:$(document),
			
			pageWrapper:$("#page-wrapper"),
			pageModalWrapper:$("#page-modal-wrapper"),
			// Departments
			saveUpateDeptForm:"#saveUpateDeptForm",
			resetDeptBtn:"#resetDeptBtn",
			// Hospitals
			hospimgupbtn:"#hosp-img-upbtn",
			saveUpateHospitalForm:"#saveUpateHospitalForm",
			resetSaveHospitalFormBtn:"#resetSaveHospitalFormBtn",
			removeHospImgbtn:".removeHospImgbtn",
			//Doctors
			saveUpateDoctorForm:"#saveUpateDoctorForm",
			resetDoctorBtn:"#resetDoctorBtn",
			doctorImgUpbtn:"#doctor-img-upbtn",
			removeDoctorImgbtn:".removeDoctorImgbtn",
			// Doctors Consultations
			saveDrConsultTimeBtn:"#saveDrConsultTimeBtn",
			resetDrConsultTimeBtn:"#resetDrConsultTimeBtn",
			drConsultType:"#drConsultType",
			addDoctorConsultationTime:"#addDoctorConsultationTime"
			
		},	
		setEvents : function() {
			_root.el.window.on('hashchange', _root.URLHashChangeHandler);
			_root.el.window.on('resize', _root.windowResizeHandler);
			
			_root.el.document.ajaxStart(function(){
				//SMAPCom.showMessage.showLoader();
			});

			_root.el.document.ajaxComplete(function(){
				//SMAPCom.showMessage.hideLoader();
			});
			
			// Departments
			_root.el.pageWrapper.on('submit',_root.el.saveUpateDeptForm,adminDept.saveOrUpdateDeptHandler);
			_root.el.pageWrapper.on('click',_root.el.resetDeptBtn,adminDept.resetDeptHandler);
			// Hospitals
			_root.el.pageWrapper.on("change",_root.el.hospimgupbtn,adminHospital.uploadImgHandler);
			_root.el.pageWrapper.on('submit',_root.el.saveUpateHospitalForm,adminHospital.saveOrUpdateHospitalHandler);
			_root.el.pageWrapper.on('click',_root.el.resetSaveHospitalFormBtn,adminHospital.resetSaveHospitalFormHandler);
			_root.el.pageWrapper.on('click',_root.el.removeHospImgbtn,adminHospital.removeHospImgHandler);
			
			// Doctors
			_root.el.pageWrapper.on('submit',_root.el.saveUpateDoctorForm,adminDoctor.saveOrUpdateDoctorHandler);
			_root.el.pageWrapper.on('click',_root.el.resetDoctorBtn,adminDoctor.resetDoctorHandler);
			_root.el.pageWrapper.on("change",_root.el.doctorImgUpbtn,adminDoctor.uploadImgHandler);
			_root.el.pageWrapper.on('click',_root.el.removeDoctorImgbtn,adminDoctor.removeDoctorImgHandler);
			// Doctors Consultations
			_root.el.pageWrapper.on('click',_root.el.addDoctorConsultationTime,adminDoctorConsultTime.showDrConsultTimeEventModal);
			_root.el.pageModalWrapper.on('click',_root.el.saveDrConsultTimeBtn,adminDoctorConsultTime.addDrConsultTimeEvent);
			_root.el.pageModalWrapper.on('click',_root.el.resetDrConsultTimeBtn,adminDoctorConsultTime.resetDrConsultTimeEvent);
			_root.el.pageModalWrapper.on("switchChange.bootstrapSwitch",_root.el.drConsultType,adminDoctorConsultTime.changeDrConsultTimeEvent);
			

		},
		load : function() {
			_root.setEvents();			
			pageHandler.loadModal(jQuery.extend({}, SM_ADMIN.MODAL["doctor-consult-time-modal"]));
		},
		init : function() {
			_root = this;
			var hash=_root.getURLHash();
			if(!!hash){
				pageHandler.showPage(hash);	
			}else{
				window.location.hash="dashboard";
			}			
			_root.load();			
		}	
	}
	document.addEventListener('DOMContentLoaded', admin.init.bind(admin));
	window.publicModule = {
				
	}
})(this);