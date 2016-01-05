var adminHospital=(function(){
	"use strict";
	var formId="#saveUpateHospitalForm",
	    imgSrcPrefix="hosp-img-",
		imageDtls={size:10240000,title:"10 MB"},
		imageArr={},
	    removedImgArr=[],
	    lastImgIndex=0;
	
	var getImagePaths=function(){
		var result={},
			imgNameArr=[];
		$("#hosp-upimg-container img").each(function(){
			imgNameArr.push($(this).data("upload-img-name"));
		});
		result["imgNameArr"]=imgNameArr;
		result["lastImgIndex"]=lastImgIndex;
		return JSON.stringify(result);
	}
	var resetSaveHospitalFormHandler=function(){	
		$(formId+" .inp-dt").each(function(){
			$(this).val("");
		});
		imageArr={};
	    removedImgArr=[];
	    lastImgIndex=0;
		$("#hosp-upimg-container").html("");
		loadHospitalDtls();
	};
	
	var saveOrUpdateHospitalHandler=function(e){
		e.preventDefault();
		var formData=new FormData(),
			saveHospDts={},
 			reqData={},
 			apiObj=SM_ADMIN.api["saveHospital"];
		$(formId+" .inp-dt").each(function(){
			saveHospDts[$(this).prop("name")]=$(this).val();
		});		
		saveHospDts["imagePath"]=getImagePaths();
		reqData["reqData"]=saveHospDts;			
		reqData=JSON.stringify(reqData);		
		formData.append("details",reqData);
		formData.append("deletedImgs",JSON.stringify(removedImgArr));
		for(var i in imageArr){
			formData.append(i,imageArr[i]);
		}
		apiObj['data']=formData;		
		SMAPCom.ajaxService.invoke(apiObj).done(function(res) {
			if(SMAPCom.exceptionHandler.isLoginSessionExpire(res)){
				if(!!res.status){
					SMAPCom.showMessage.formMsg({status:"true",msg:"Hospital details updated successfully"});
				}
			}					
		}).fail(SMAPCom.exceptionHandler.ajaxFailure);
	};	
	var addHospUpImgContainer=function(upstatus){		
		var index=$("#hosp-upimg-container .hosp-upimgHolder").size()+1,
		    imgSrcId=imgSrcPrefix+index,
		    html= "<div class='col-sm-6 col-md-3 hosp-upimgHolder'><div class='thumbnail'>" +
      			  "<a class='close removeHospImgbtn' href='javascript:void(0)'>×</a>" +
      			  "<img id='"+imgSrcId+"' src='' alt='Generic placeholder thumbnail' data-index='"+index+"' data-up-status='"+upstatus+"'>" +
      			  "</div></div>";								         	      
		$("#hosp-upimg-container").append(html);		
		return index;
	};	
	var uploadImgHandler=function(e){
		var _this=$(this),
			data=e.originalEvent.target.files[0],
			name=data.name,
			fileType=data.type.toLowerCase(),
		 	fileSize=data.size,
		 	invalidImageFormet =null;	
		if(fileSize>imageDtls.size){
			invalidImageFormet="Image should be less than "+imageDtls.title;			
		}else if(fileType.indexOf("image")>-1){		
			var fileEx=name.split('.').pop(),
				index=addHospUpImgContainer(true),
				imgId="#"+imgSrcPrefix+index,
				upImgObj={},
				upImgName=imgSrcPrefix+(new Date()).getTime()+"-"+lastImgIndex+"."+fileEx;				
			imageArr[upImgName]=data;			
			SMAPCom.imagePreview(data,imgId);	
			$(imgId).data("upload-img-name",upImgName);
			lastImgIndex++;
		}else{			
			invalidImageFormet = "Invalid Image File ";				
		}	
		setTimeout(function(){
			_this.val("")
			$( "#hosp-upimg-container" ).sortable();
		    $( "#hosp-upimg-container" ).disableSelection();
		},500);	
	};
	var removeHospImgHandler=function(){
		var _this=$(this),
			upImgName=_this.siblings('img').data("upload-img-name"),
			upStatus=_this.siblings('img').data("up-status"),
			index=_this.siblings('img').data("index");
		if(!!upStatus){
			delete imageArr[upImgName];
		}else{
			removedImgArr.push(upImgName);
		}
		_this.parent().parent().remove();
	};
	var populateHospitalDtls=function(hospObj){
		$(formId+" .inp-dt").each(function(){
			$(this).val(hospObj[$(this).prop("name")]);
		});	
		$("#hosp-upimg-container").html("");
		var imageDtls=hospObj["imagePath"];
		if(!!imageDtls){
			imageDtls=JSON.parse(imageDtls);
			var imgNameArr=imageDtls.imgNameArr;
			lastImgIndex=imageDtls.lastImgIndex;			
			for(var i in imgNameArr){
				var upImgName=imgNameArr[i],
				 index=addHospUpImgContainer(false),
				 imgId="#"+imgSrcPrefix+index;
				 $(imgId).prop("src","../../admin/image/hospital_imgs/"+upImgName);
				 $(imgId).data("upload-img-name",upImgName);
			}
			setTimeout(function(){
				$( "#hosp-upimg-container" ).sortable();
			    $( "#hosp-upimg-container" ).disableSelection();
			},500);	
		}	
	};
	var loadHospitalDtls=function(){
		var apiObj=SM_ADMIN.api["getHospitalDetails"];
		SMAPCom.ajaxService.invoke(apiObj).done(function(res) {
			if(SMAPCom.exceptionHandler.isLoginSessionExpire(res)){
				populateHospitalDtls(res.resData);		
			}				
		}).fail(SMAPCom.exceptionHandler.ajaxFailure);		
	};	
	var init=function(){
		loadHospitalDtls();
	};	
	return {
		saveOrUpdateHospitalHandler:saveOrUpdateHospitalHandler,
		resetSaveHospitalFormHandler:resetSaveHospitalFormHandler,
		uploadImgHandler:uploadImgHandler,
		removeHospImgHandler:removeHospImgHandler,
		init:init
	}
	
})();

