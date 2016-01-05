var adminDept=(function(){
	var deptpanelheading="#dept-panel-heading",
	    deptId="#deptId",
	    formId="#saveUpateDeptForm";
	
	var resetDeptHandler=function(){
		var id=$(deptId).val();
		$(formId+" .inp-dt").each(function(){
			$(this).val("");
		});		
		$(formId+" .inp-dt-switch").each(function(){
			$(this).bootstrapSwitch('state',true);
		});	
		$(deptId).val(0);
		if(!!id&&id*1!=0){
			getDept(id);
		}
		
	};
	
	var saveOrUpdateDeptHandler=function(e){
		e.preventDefault();
		var saveDeptDts={},
 			reqData={},
 			apiObj=SM_ADMIN.api["saveDept"];
		$(formId+" .inp-dt").each(function(){
			saveDeptDts[$(this).prop("name")]=$(this).val();
		});		
		$(formId+" .inp-dt-switch").each(function(){
			saveDeptDts[$(this).prop("name")]=$(this).bootstrapSwitch('state');
		});		
		reqData["reqData"]=saveDeptDts;			
		reqData=JSON.stringify(reqData);		
		apiObj['data']=reqData;
		
		//$("#saveUpateDeptForm .depName.smap-fm-er").show();
		SMAPCom.ajaxService.invoke(apiObj).done(function(res) {
			if(!!res.status){
				SMAPCom.showMessage.formMsg({status:"true",msg:"Department details updated successfully"});
				window.location.hash="departments";

			}else{
				
			}					
		}).fail(SMAPCom.exceptionHandler.ajaxFailure);
	};
	

	var renderDeptsTable=function(deptsData){		
		if(("depts" in SM_ADMIN.dataTable)&&!!SM_ADMIN.dataTable["depts"].show){
			if(deptsData.length!==0){
				SM_ADMIN.dataTable["depts"].dtFn.fnClearTable();	
				SM_ADMIN.dataTable["depts"].dtFn.fnAddData(deptsData);	
			}			
		}else{	
			SM_ADMIN.dataTable["depts"]={"dtFn":null,show:false};
			$.fn.dataTableExt.sErrMode = 'throw';
			SM_ADMIN.dataTable["depts"].dtFn=$('#depts-table').dataTable({
				"bDestroy": true,
			    "aaData": deptsData,
		        "aoColumns": [
		            {
		        	"mDataProp": "id"
			    	}, {
			        "mDataProp": "depName"    	 
			    	}, {
			        "mDataProp": "isActive",
			        	"mRender": function ( _this, type, rowData ,i ) {
			        		return !!_this?"Active":"Inactive";
			        	},
			    	},{
			    	"mDataProp": "id",
			    		"mRender": function ( _this, type, rowData ,i ) {
			    			var actionHtml="<a href='#departments/add?id="+rowData.id+"'><i class='fa fa-pencil-square-o'></i> Edit</a> ";
			    			return actionHtml;
			    		}
			      }]
			});
			 var oSettings = SM_ADMIN.dataTable["depts"].dtFn.fnSettings();
		     oSettings._iDisplayLength = 10; 	
		     SM_ADMIN.dataTable["depts"].show=true;
		 }	
	};
	
	var showDepts=function(){
		var apiObj= jQuery.extend({}, SM_ADMIN.api["getDept"]),
			url=apiObj.url;
		apiObj.url=url+"0";			
		SMAPCom.ajaxService.invoke(apiObj).done(function(res) {	
			renderDeptsTable(res.resData);
		}).fail(SMAPCom.exceptionHandler.ajaxFailure);
	};
	
	var populateDept=function(dept){
		$(formId+" .inp-dt").each(function(){
			$(this).val(dept[$(this).prop("name")]);
		});	
		$(formId+" .inp-dt-switch").each(function(){
			$(this).bootstrapSwitch('state',dept[$(this).prop("name")]);		
		});	
		
	};
	
	var getDept=function(id){
		var apiObj= jQuery.extend({}, SM_ADMIN.api["getDept"]),
			url=apiObj.url;
		apiObj.url=url+id;			
		SMAPCom.ajaxService.invoke(apiObj).done(function(res) {	
			populateDept(res.resData[0]);
		}).fail(SMAPCom.exceptionHandler.ajaxFailure);
	};
	
	var showDeptAddPage=function(args){
		if(!!args&&"id" in args){
			$(deptpanelheading).html("Edit");
			getDept(args.id);
		}else{
			$(deptpanelheading).html("Add");
			$(deptId).val(0)
			resetDeptHandler();				
		}
		initDept();		
	};
	
	var initDept=function(){
		$("#deptStatus").bootstrapSwitch();
	};
	
	return {
		showDepts:showDepts,
		showDeptAddPage:showDeptAddPage,
		saveOrUpdateDeptHandler:saveOrUpdateDeptHandler,
		resetDeptHandler:resetDeptHandler
	};
})();


