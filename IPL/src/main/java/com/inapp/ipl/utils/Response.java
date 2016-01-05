package com.inapp.ipl.utils;

import java.util.HashMap;

public class Response extends HashMap<String, Object>{

	private static final long serialVersionUID = -5005589573333103869L;
	
	public static final String CODE = "code";
	public static final String MESSAGE = "message";
	public static final String RESULT = "result";
	public static final String STATUS_CODE_400 = "400";
	public static final String STATUS_CODE_200 = "200";
	public static final String FAIL_MESSAGE = "Request was invalid.";
	public static final String SUCCESS_MESSAGE = "Successful";
	public static final String STATUS = "status";
	public static final String VALIDATION_MSG = "validation_msg";
	
	public Response()	{
		this.put(STATUS, true);
		this.put(MESSAGE, SUCCESS_MESSAGE);
	}
}
