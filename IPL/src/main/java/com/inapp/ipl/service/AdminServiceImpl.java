package com.inapp.ipl.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inapp.ipl.dao.AdminDAO;
import com.inapp.ipl.utils.ServiceConstants;

@Service(ServiceConstants.ADMIN_SERVICE)
public class AdminServiceImpl implements AdminService {

	@Autowired
	AdminDAO adminDAO;

	

}
