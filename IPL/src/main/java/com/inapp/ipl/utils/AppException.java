package com.inapp.ipl.utils;

import com.inapp.ipl.utils.MSG;

public class AppException extends Exception {
	private static final long serialVersionUID = 1L;
	private MSG msg;
	
	
	
	public AppException(MSG msg) {
		this.msg = msg;
	}
	
	public String getMsg() {
		return this.msg.getValue();
	}
	
	public int getStatusCode() {
		return this.msg.getCode();
	}
}
