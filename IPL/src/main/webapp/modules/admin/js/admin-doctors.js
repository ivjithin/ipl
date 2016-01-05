var adminDoctor=(function(){
	var load=true,		
	    doctorPanelheading="#doctor-panel-heading",
	    doctorId="#doctorId",
	    formId="#saveUpateDoctorForm",
	    imgSrcPrefix="doctor-img-",
		imageDtls={size:10240000,title:"10 MB"},
		imageArr={},
	    removedImgArr=[],
	    lastImgIndex=0,
	    drConsultCal='#dr-consult-cal',
		starttime=null,
		endtime=null;
	
	var resetDoctorHandler=function(){
		var id=$(doctorId).val();
		$(formId+" .inp-dt").each(function(){
			$(this).val("");
		});	
		$(formId+" .inp-dt-date-picker").each(function(){
			$(this).val("");
		});
		$(formId+" .inp-dt-ref").each(function(){
			$(this).val("0");
		});
		$(formId+" .inp-dt-switch").each(function(){
			$(this).bootstrapSwitch('state',true);
		});	
		$("#doctorDepartments").trigger("chosen:updated");
		$("#doctor-upimg-container").html("");
		imageArr={};
	    removedImgArr=[];
	    lastImgIndex=0;
	    $("#dr-qualifications").tagsinput('removeAll');
		$(doctorId).val(0);
		// For edit mode
		if(!!id&&id*1!=0){
			getDoctor(id);
		}		
	};
	var getImagePaths=function(){
		var result={},
			imgNameArr=[];
		$("#doctor-upimg-container img").each(function(){
			imgNameArr.push($(this).data("upload-img-name"));
		});
		result["imgNameArr"]=imgNameArr;
		result["lastImgIndex"]=lastImgIndex;
		return JSON.stringify(result);
	}
	var saveOrUpdateDoctorHandler=function(e){
		e.preventDefault();
		var formData=new FormData(),
		    saveDoctorDts={},
 			apiObj=SM_ADMIN.api["addDoctor"];
		$(formId+" .inp-dt").each(function(){
			saveDoctorDts[$(this).prop("name")]=$(this).val();
		});
		$(formId+" .inp-dt-date-picker").each(function(){
			saveDoctorDts[$(this).prop("name")]=$(this).val()+" 00:00:00";
		});
		$(formId+" .inp-dt-ref").each(function(){
			var obj={};
			obj[$(this).data('key')]=$(this).val()
			saveDoctorDts[$(this).prop("name")]=obj;
		});		
		$(formId+" .inp-dt-switch").each(function(){
			saveDoctorDts[$(this).prop("name")]=$(this).bootstrapSwitch('state');
		});	
		saveDoctorDts["imagePath"]=getImagePaths();
		formData.append("doctorDtls",JSON.stringify(saveDoctorDts));
		formData.append("deletedImgs",JSON.stringify(removedImgArr));
		for(var i in imageArr){
			formData.append(i,imageArr[i]);
		}
		apiObj['data']=formData;
		
		//$("#saveUpateDeptForm .depName.smap-fm-er").show();
		SMAPCom.ajaxService.invoke(apiObj).done(function(res) {
			if(SMAPCom.exceptionHandler.isLoginSessionExpire(res)){	
				SMAPCom.showMessage.formMsg({status:"true",msg:"Doctor details updated successfully"});
				window.location.hash="doctors";
			}else{
				
			}					
		}).fail(SMAPCom.exceptionHandler.ajaxFailure);/**/
	};	
	var addDoctorUpImgContainer=function(upstatus){		
		var index=$("#doctor-upimg-container .doctor-upimgHolder").size()+1,
		    imgSrcId=imgSrcPrefix+index,
		    html= "<div class='col-sm-6 col-md-3 doctor-upimgHolder'><div class='thumbnail'>" +
      			  "<a class='close removeDoctorImgbtn' href='javascript:void(0)'>×</a>" +
      			  "<img id='"+imgSrcId+"' src='' alt='Generic placeholder thumbnail' data-index='"+index+"' data-up-status='"+upstatus+"'>" +
      			  "</div></div>";								         	      
		$("#doctor-upimg-container").append(html);		
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
				index=addDoctorUpImgContainer(true),
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
			$( "#doctor-upimg-container" ).sortable();
		    $( "#doctor-upimg-container" ).disableSelection();
		},500);	
	};
	var removeDoctorImgHandler=function(){
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
	
	var populateDoctor=function(doctorDtls){
		$(formId+" .inp-dt").each(function(){
			$(this).val(doctorDtls[$(this).prop("name")]);
		});	
		$(formId+" .inp-dt-date-picker").each(function(){
			$(this).val(moment(new Date(doctorDtls[$(this).prop("name")])).format('DD-MM-YYYY'));
		});
		$(formId+" .inp-dt-ref").each(function(){
			$(this).val(doctorDtls[$(this).prop("name")][$(this).data('key')]);
		});
		$(formId+" .inp-dt-switch").each(function(){
			$(this).bootstrapSwitch('state',doctorDtls[$(this).prop("name")]);		
		});			
		$("#dr-qualifications").tagsinput('add', doctorDtls["qualifications"]);
		$("#doctorDepartments").trigger("chosen:updated");
		var imageDtls=doctorDtls["imagePath"],
			doctorId=doctorDtls.id;
		if(!!imageDtls){
			imageDtls=JSON.parse(imageDtls);
			var imgNameArr=imageDtls.imgNameArr;
			lastImgIndex=imageDtls.lastImgIndex;			
			for(var i in imgNameArr){
				var upImgName=imgNameArr[i],
				 index=addDoctorUpImgContainer(false),
				 imgId="#"+imgSrcPrefix+index;
				 $(imgId).prop("src","../../admin/image/doctor_imgs/"+doctorId+"_"+upImgName);
				 $(imgId).data("upload-img-name",upImgName);
			}
			setTimeout(function(){
				$( "#doctor-upimg-container" ).sortable();
			    $( "#doctor-upimg-container" ).disableSelection();
			},500);	
		}	
	};
	
	var getDoctor=function(id){
		var apiObj= jQuery.extend({}, SM_ADMIN.api["getDoctors"]),
			url=apiObj.url;
		apiObj.url=url+id;			
		SMAPCom.ajaxService.invoke(apiObj).done(function(res) {	
			populateDoctor(res.resData);
		}).fail(SMAPCom.exceptionHandler.ajaxFailure);
	};
	
	var showDoctorDepartments=function(){		
		SMAPCom.ajaxService.invoke(SM_ADMIN.api["getDepartmentsIdNameList"]).done(function(res) {
			if(SMAPCom.exceptionHandler.isLoginSessionExpire(res)){	
				var selectHtml="<option value='0'> Select Department</option>";
				for(var i in res.resData){
					var dept=res.resData[i];
					selectHtml+="<option value='"+dept[0]+"'>"+dept[1]+"</option>";
				}
				$("#doctorDepartments").html(selectHtml);	
				$("#doctorDepartments").trigger("chosen:updated");
			}					
		}).fail(SMAPCom.exceptionHandler.ajaxFailure);/**/
	};
	
	var events=function(){		
		 $('#dr-tab-dtls a[data-toggle="tab"]').on('shown.bs.tab', function (e) {			    
			var _this=$(this),
				id=_this.prop("id"),
				doctorId=$("#doctorId").val();
				if(!!doctorId&&doctorId*1!==0){
					if("dr-consult-dtls-tab"===id){
						$(drConsultCal).fullCalendar('render');
						adminDoctorConsultTime.init();
						adminDoctorConsultTime.loadCurrentMonthDrConsultTimeEvents();
				    }					
				}else{
					if("dr-consult-dtls-tab"===id){
						$('.nav-tabs a[href="#dr-general-dtls"]').focus();
						$('.nav-tabs a[href="#dr-general-dtls"]').tab('show');
						SMAPCom.showMessage.formMsg({status:false,msg:"Please initially save Doctor general details "});
					}
				}			   
		 });
	};
	var showDoctorAddPage=function(args){
		showDoctorDepartments();
		$('.nav-tabs a[href="#dr-general-dtls"]').tab('show');
		if(!!args&&"id" in args){
			$(doctorPanelheading).html("Edit");
			$(doctorId).val(0);
			resetDoctorHandler();
			getDoctor(args.id);
		}else{
			$(doctorPanelheading).html("Add");
			$(doctorId).val(0);
			resetDoctorHandler();
							
		}
		initDoctor();		
	};
	var renderDoctorsTable=function(drsData){		
		if("drs" in SM_ADMIN.dataTable&&"show" in SM_ADMIN.dataTable["drs"]){
			if(drsData.length!==0){
				SM_ADMIN.dataTable["drs"].dtFn.fnClearTable();	
				SM_ADMIN.dataTable["drs"].dtFn.fnAddData(drsData);	
			}			
		}else{	
			SM_ADMIN.dataTable["drs"]={"dtFn":null,show:false};
			$.fn.dataTableExt.sErrMode = 'throw';
			SM_ADMIN.dataTable["drs"].dtFn=$('#doctors-table').dataTable({
				"bDestroy": true,
			    "aaData": drsData,
		        "aoColumns": [
		            {
		            	"mDataProp": "id"   	 
			    	}, {
				    	"mDataProp": "id",
			    		"mRender": function ( _this, type, rowData ,i ) {
			    			return rowData.firstName+" "+rowData.lastName;
			    		}
			    	},{
					    "mDataProp": "deptName"  
			    	}, {
				        "mDataProp": "emailId" 					    	 	 
			    	}, {
			        "mDataProp": "isActive",
			        	"mRender": function ( _this, type, rowData ,i ) {
			        		return !!_this?"Active":"Inactive";
			        	},
			    	},{
			    	"mDataProp": "id",
			    		"mRender": function ( _this, type, rowData ,i ) {
			    			var actionHtml="<a href='#doctors/add?id="+rowData.id+"'><i class='fa fa-pencil-square-o'></i> Edit</a> ";
			    			return actionHtml;
			    		}
			      }]
			});
			 var oSettings = SM_ADMIN.dataTable["drs"].dtFn.fnSettings();
		     oSettings._iDisplayLength = 10; 	
		     SM_ADMIN.dataTable["drs"].show=true;
		 }	
	};	
	var showDoctors=function(){	
		SMAPCom.ajaxService.invoke(jQuery.extend({}, SM_ADMIN.api["getDoctorDepartmentList"])).done(function(res) {	
			renderDoctorsTable(res.resData);
		}).fail(SMAPCom.exceptionHandler.ajaxFailure);
	};
	
	var initDoctor=function(){		
		if(load){
			 load=false;
			 $("#dr-qualifications").tagsinput({confirmKeys: [13, 32, 44]});
			 $('#dr-registrationDate').datetimepicker({maxDate: new Date(),format: 'DD-MM-YYYY'});			 
			 $("#doctorStatus").bootstrapSwitch();
			 $("#doctorDepartments").chosen({ allow_single_deselect: true });
			 
			 adminDoctorConsultTime.init();
			 events();
		 }
	};
		
	return {
		showDoctors:showDoctors,
		showDoctorAddPage:showDoctorAddPage,
		saveOrUpdateDoctorHandler:saveOrUpdateDoctorHandler,
		resetDoctorHandler:resetDoctorHandler,
		uploadImgHandler:uploadImgHandler,
		removeDoctorImgHandler:removeDoctorImgHandler
	};
})();


var adminDoctorConsultTime=(function(){
    var drConsultCal='#dr-consult-cal',
    	formId="#dr-consult-time-form";
    
    var validateConsultTimeForm=function(drConsultDtls){
    	var errorMsg=null;
    	// Validation Date Range 
    	if(!drConsultDtls["startDate"]||" 00:00:00"===(drConsultDtls["startDate"]+"")){
    		errorMsg="Please enter Date Range";
    	}else if(!drConsultDtls["endDate"]||" 00:00:00"===drConsultDtls["endDate"]+""){
    		if(drConsultDtls["consultType"]*1==1){
    			errorMsg="Please enter Date Range";
    		}
    	}else {
    		if(drConsultDtls["consultType"]==1){
        		var startDate=moment(drConsultDtls["startDate"], "DD-MM-YYYY HH:mm:ss"),
        	    endDate=moment(drConsultDtls["endDate"], "DD-MM-YYYY HH:mm:ss"),
        	    duration = moment.duration(endDate.diff(startDate));        	 
            	if(duration.asMilliseconds()<=0){
            		errorMsg="Start Date should be greater than End Date ";
            	}	
    		}	
    	}
    	// Validation Time
    	if(errorMsg==null){
    		if(!drConsultDtls["startTime"]){
        		errorMsg="Please enter Start Time";
        	}else if(!drConsultDtls["endTime"]){
        		errorMsg="Please enter End Time";
        	}else{       
        		var startTime=moment(drConsultDtls["startTime"], "HH:mm"),
	        	    endTime=moment(drConsultDtls["endTime"], "HH:mm"),
	        	    duration = moment.duration(endTime.diff(startTime));        	 
	        	if(duration.asMilliseconds()<=0){
	        		errorMsg="Start Time should be greater than End Time ";
	        	}
        	}
    	}
    	if(errorMsg==null){
			if (!drConsultDtls["weekDays"]&&drConsultDtls["consultType"] == 1) {
				errorMsg = "Please chose  week days ";
			} else if (!drConsultDtls["fee"]) {
				errorMsg = "Please enter Fee";
			} else if (isNaN(drConsultDtls["fee"])) {
				errorMsg = "Please enter valid Fee (only numberic values are allowed)";
			}
    	}    	
    	if(errorMsg){
    		SMAPCom.showMessage.modalformMsg({status:false,"msg":errorMsg},"#doctorConsultTimeModal");
    	}
    	return errorMsg;
    };
    
    
	var addDrConsultTimeEvent=function(){
		var drConsultDtls={},
			apiObj= jQuery.extend({}, SM_ADMIN.api["saveDoctorConsultTime"]),
			doctorId=$("#doctorId").val();
		
		$(formId+" .inp-dt").each(function(){
			drConsultDtls[$(this).prop("name")]=$(this).val();
		});
		$(formId+" .inp-dt-time").each(function(){
			drConsultDtls[$(this).prop("name")]= moment($(this).val(), ["h:mm A"]).format("HH:mm");;
		});
		$(formId+" .inp-dt-date-picker").each(function(){
			drConsultDtls[$(this).prop("name")]=$(this).val()+" 00:00:00";
		});	
		$(formId+" .inp-dt-switch").each(function(){
			drConsultDtls[$(this).prop("name")]=$(this).bootstrapSwitch('state')*1;
		});	
		if(drConsultDtls["consultType"]==0){
			drConsultDtls["endDate"]=drConsultDtls["startDate"];
		}
		drConsultDtls["doctor"] ={"id":doctorId*1};
		drConsultDtls["weekDays"] = $("input[name='drConsultWeekDays']:checked").map(function(){ return $(this).val().toString(); }).get().join(",");	
		if(validateConsultTimeForm(drConsultDtls)==null){		
			apiObj["data"]=JSON.stringify(drConsultDtls);	
			SMAPCom.ajaxService.invoke(apiObj).done(function(res) {
				if(SMAPCom.exceptionHandler.isLoginSessionExpire(res)){	
					SMAPCom.showMessage.formMsg({status:"true",msg:"Doctor consulation details updated successfully"});
					loadCurrentMonthDrConsultTimeEvents();
					$('#doctorConsultTimeModal').modal('hide');
				}				
			}).fail(SMAPCom.exceptionHandler.ajaxFailure);
		}		
	};

	var resetDrConsultTimeEvent=function(){
		$(formId+" .inp-dt").each(function(){
			$(this).val("");
		});
		$(formId+" .inp-dt-time").each(function(){
			$(this).val("");
		});
		$(formId+" .inp-dt-date-picker").each(function(){
			$(this).val("");
		});
		$('#drConsultType').bootstrapSwitch('state', true);
		$("#drConsultTimeId").val(0);
		changeDrConsultTimeEvent(null,true);
	};
	
	var changeDrConsultTimeEvent=function(event, state){
		  $("input[name='drConsultWeekDays']:checked").prop('checked', false);
		  if(state){
			  $("#drConsultWeekDaysHolder").fadeIn('slow');
			  $("#drConsultStartDateLabel").html("Date Range");
			  $('#doctorConsultTimeModal #drConsultEndDate').show();
		  }else{
			  $("#drConsultWeekDaysHolder").fadeOut('slow');
			  $("#drConsultStartDateLabel").html("Select Date");
			  $('#doctorConsultTimeModal #drConsultEndDate').hide();
		  }
		
	};
	var showDrConsultTimeEventModal=function(){
		$('#drConsultType').bootstrapSwitch('state', true);
		 $('#doctorConsultTimeModal').modal('show');
	};
	
	var renderDrConsultTimeEvents=function(eventsArr,monthStartDate,monthEndDate){
		$(drConsultCal).fullCalendar( 'removeEvents');
		var events=[];
		for(var i in eventsArr){
			var obj=jQuery.extend({},eventsArr[i]),			
			    evStartDate=moment(obj.startDate, "MMM DD, YYYY hh:mm:ss A")._d,
			    evEndDate=moment(obj.endDate, "MMM DD, YYYY hh:mm:ss P").add(1,'days')._d,
			    currDate =null,
			    lastDate=null;
			monthStartDate=moment(monthStartDate, "DD-MM-YYYY hh:mm:ss");
			monthEndDate=moment(monthEndDate, "DD-MM-YYYY hh:mm:ss");
			if(monthStartDate.diff(evStartDate) < 0){
				currDate = moment(obj.startDate, "MMM DD, YYYY hh:mm:ss A").clone().startOf('day');
			}else{
				currDate =monthStartDate.clone();
			}
			if(monthEndDate.diff(evEndDate) < 0){
				lastDate =monthEndDate.clone();
			}else{
				lastDate = moment(obj.endDate, "MMM DD, YYYY hh:mm:ss P").add(1,'days').clone().startOf('day');
			}

		    while(currDate.diff(lastDate) < 0) {
		    	var event={},
		    		_thisDate=jQuery.extend({},currDate.clone()),
		    		weekDays=obj.weekDays;
		        event["title"]="Consult Time"; 
				event["start"]=_thisDate._d;
				event["end"]=_thisDate._d;
				event["allDay"]=true;
				event["data_obj"]=jQuery.extend({},obj);
				if(weekDays.indexOf(_thisDate.format('d'))>-1){
					events.push(event);
				}			
			    currDate.add( 1,'days')
		    }

		}
		$(drConsultCal).fullCalendar('addEventSource',events);		
	};
	
	var loadDrConsultTimeEvents=function(startDate,endDate){
		var drConsultReqDtls={},
			apiObj= jQuery.extend({}, SM_ADMIN.api["getDoctorConsultTimeList"]),
			doctorId=$("#doctorId").val();		
			drConsultReqDtls["doctorId"]=doctorId*1;
			drConsultReqDtls["startDate"]=startDate;
			drConsultReqDtls["endDate"]=endDate;		
			apiObj["data"]=JSON.stringify(drConsultReqDtls);	
		SMAPCom.ajaxService.invoke(apiObj).done(function(res) {
			if(SMAPCom.exceptionHandler.isLoginSessionExpire(res)){	
				renderDrConsultTimeEvents(res.resData,startDate,endDate);
			}				
		}).fail(SMAPCom.exceptionHandler.ajaxFailure);		
	};
	
	var loadCurrentMonthDrConsultTimeEvents=function(){		
		var date = 	$(drConsultCal).fullCalendar('getDate')._d,
    	startDate = moment(date).startOf('month').format('DD-MM-YYYY HH:mm:ss'),				
    	endDate = moment(date).endOf('month').format('DD-MM-YYYY HH:mm:ss');
		loadDrConsultTimeEvents(startDate,endDate);
	}
	
	var populateDoctorConsultTimeModal=function(drConsultTimeDtls){
		$(formId+" .inp-dt").each(function(){
			$(this).val(drConsultTimeDtls[$(this).prop("name")]);
		});
		$(formId+" .inp-dt-time").each(function(){
			$(this).val(moment(drConsultTimeDtls[$(this).prop("name")],["HH:mm"]).format("h:mm A"));
		});
		$(formId+" .inp-dt-date-picker").each(function(){
			$(this).val(moment(drConsultTimeDtls[$(this).prop("name")],"MMM DD, YYYY hh:mm:ss A").format("DD-MM-YYYY"));
		});	
		$(formId+" .inp-dt-switch").each(function(){
			$(this).bootstrapSwitch('state',!!drConsultTimeDtls[$(this).prop("name")]);
		});	
		if(!!drConsultTimeDtls["weekDays"]){
			var weekDaysArr = drConsultTimeDtls["weekDays"].split(',');
			for(var i in weekDaysArr){
				$("#drConsultWeekDaysHolder input[value='"+weekDaysArr[i]+"']").prop('checked', true);
			} 		
		}	
        $('#doctorConsultTimeModal').modal('show');	
	};
	
	var initCalendar=function(){
		 // intializing Full calendar
		 var calendar = $(drConsultCal).fullCalendar({
				header: {
					left: 'prev,next today',
					center: 'title',
					//right: 'month,agendaWeek,agendaDay'
					right: 'month'
				},
				height: 500,
				defaultView: 'month',
				editable: true,
			    selectable: true,
			    editable:true,
				select: function(start, end, allDay) {
		          var startDate = moment(start).format('DD-MM-YYYY');
		          	  endDate = moment(end).format('DD-MM-YYYY');
		           $('#doctorConsultTimeModal #drConsultStartDate').val(startDate);
		           //$('#doctorConsultTimeModal #drConsultEndDate').val(endDate);
		           $("#drConsultStartDateLabel").html("Select Date");
		           $('#doctorConsultTimeModal #drConsultEndDate').hide();
		           $('#drConsultType').bootstrapSwitch('state', false);
		           $('#doctorConsultTimeModal').modal('show');
			    },
			    viewRender: function (view, element) {
			    	var date = 	view.calendar.getDate()._d ,
			    	startDate = moment(date).startOf('month').format('DD-MM-YYYY HH:mm:ss'),				
			    	endDate = moment(date).endOf('month').format('DD-MM-YYYY HH:mm:ss');
			    	adminDoctorConsultTime.loadDrConsultTimeEvents(startDate,endDate);
			    },
			    eventClick: function(calEvent, jsEvent, view) {
			    	populateDoctorConsultTimeModal(calEvent.data_obj);
			    },
			    eventResize:function( event, delta, revertFunc, jsEvent, ui, view ) { 
			    	console.log(" eventResize ");
			    }
		    });		
	};
	
	var init=function(){
		 $("#drConsultType").bootstrapSwitch();
		 $('#drConsultStartDate').datetimepicker({format: 'DD-MM-YYYY'});
		 $('#drConsultEndDate').datetimepicker({format: 'DD-MM-YYYY'});
		 $('#drConsultStartTime').datetimepicker({format: 'hh:mm A'});
		 $('#drConsultEndTime').datetimepicker({format: 'hh:mm A'});
		 initCalendar();
		 $('#doctorConsultTimeModal').on('hidden.bs.modal', function () {
			 resetDrConsultTimeEvent();
		 });
	};
	
	return {
		init:init,
		showDrConsultTimeEventModal:showDrConsultTimeEventModal,
		addDrConsultTimeEvent:addDrConsultTimeEvent,
		resetDrConsultTimeEvent:resetDrConsultTimeEvent,
		changeDrConsultTimeEvent:changeDrConsultTimeEvent,
		loadDrConsultTimeEvents:loadDrConsultTimeEvents,
		loadCurrentMonthDrConsultTimeEvents:loadCurrentMonthDrConsultTimeEvents
	}
	
})();


