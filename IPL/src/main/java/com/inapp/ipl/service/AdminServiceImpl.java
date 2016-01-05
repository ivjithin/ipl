package com.inapp.ipl.service;

import java.io.File;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.inapp.ipl.dao.AdminDAO;
import com.inapp.ipl.entity.Department;
import com.inapp.ipl.entity.Doctor;
import com.inapp.ipl.entity.DoctorConsultTime;
import com.inapp.ipl.entity.Hospital;
import com.inapp.ipl.utils.DateDeserializer;
import com.inapp.ipl.utils.DateSerializer;
import com.inapp.ipl.utils.FileUpload;
import com.inapp.ipl.utils.ServiceConstants;

@Service(ServiceConstants.ADMIN_SERVICE)
public class AdminServiceImpl implements AdminService {

	@Autowired
	AdminDAO adminDAO;

	

}
