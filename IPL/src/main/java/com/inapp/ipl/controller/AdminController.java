package com.inapp.ipl.controller;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.inapp.ipl.service.AdminService;


@Controller
@RequestMapping(value = "/admin")
public class AdminController {
	
	
	@Autowired
    ServletContext context;
	
	@Autowired
	AdminService adminService;
	
	
	
}
