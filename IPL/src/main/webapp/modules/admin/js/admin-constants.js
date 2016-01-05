
var contextPath="../../";
var SM_ADMIN = {
	api:{
		"getDashboardDetails":{
			url:contextPath+ "admin/getDashboardDetails",
			contentType:'application/json',		
		},
		"getHospitalDetails":{
			url:contextPath+ "admin/getHospitalDetails",
			contentType:'application/json',		
		},	
		"saveHospital":{
			url:contextPath+ "admin/saveHospitalDetails",
			   cache: false,
			    contentType: false,
			    processData: false,
			type:"POST"			
		},	
		"getDept":{
			url:contextPath+ "admin/getDepartment/",
			contentType:'application/json',
			type:"GET"			
		},	
		"getDepartmentsIdNameList":{
			url:contextPath+ "admin/getDepartmentsIdNameList",
			contentType:'application/json'		
		},	
		"getDoctors":{
			url:contextPath+ "admin/getDoctorDetails/",
			contentType:'application/json',
			type:"GET"			
		},	
		"getDoctorDepartmentList":{
			url:contextPath+ "admin/getDoctorDepartmentList",
			contentType:'application/json',
			type:"GET"			
		},
		"saveDept":{
			url:contextPath+ "admin/addDepartment",
			contentType:'application/json',
			type:"POST"			
		},
		"addDoctor":{
			url:contextPath+ "admin/addDoctor",
			   cache: false,
			    contentType: false,
			    processData: false,
			type:"POST"			
		},
		"saveDoctorConsultTime":{
			url:contextPath+ "admin/saveDoctorConsultTime",
			contentType:'application/json',
			type:"POST"			
		},
		"getDoctorConsultTimeList":{
			url:contextPath+ "admin/getDoctorConsultTimeList",
			contentType:'application/json',
			type:"POST"			
		},
	},		
	PAGE : {
		"dashboard":{
			el : "#smap-dashboard",
			url : "dashboard.html",
			fn : adminDashboard.showDashboardPage
		},
		"hospitals/details" : {
			el : "#smap-hospitals-details",
			url : "hospitals-details.html",
			fn : adminHospital.init
		},
		"departments" : {
			el : "#smap-departments-list",
			url : "departments-list.html",
			fn : adminDept.showDepts,
		},
		"departments/add" : {
			el : "#smap-departments-add",
			url : "departments-add.html",
			fn : adminDept.showDeptAddPage,
		},
		"doctors" : {
			el : "#smap-doctors-list",
			url : "doctors-list.html",
			fn : adminDoctor.showDoctors,
		},
		"doctors/add" : {
			el : "#smap-doctors-add",
			url : "doctors-add.html",
			fn : adminDoctor.showDoctorAddPage,
		}
	},
	MODAL:{
		"doctor-consult-time-modal":{
			el : "#doctors-consulttime-modal",
			url : "doctors-consulttime-modal.html"		
		}
	},
	dataTable:{}
};


