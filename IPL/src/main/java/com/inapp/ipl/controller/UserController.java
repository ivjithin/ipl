package com.inapp.ipl.controller;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.inapp.ipl.dto.Login;



@Controller
public class UserController {
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String UserLogin(@ModelAttribute(value = "login") Login login,
			BindingResult result) {
		return	"redirect:modules/admin/login.html";
	}
}

