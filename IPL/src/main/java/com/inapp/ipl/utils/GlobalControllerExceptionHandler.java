package com.inapp.ipl.utils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
/**
 * This class is responsible for handling any Exception occured in 
 * the controller.
 * 
 * @author arun
 * @date 18-Jun-2015
 * 
 */
@ControllerAdvice
public class GlobalControllerExceptionHandler {

	Logger log = Logger.getLogger(GlobalControllerExceptionHandler.class);
	
	/**
	 * This method will execute when any exception occured in the 
	 * Controller. It will return a failed message
	 * 
	 * { "code" : 400,
	 *   "message" : "Request was invalid."
	 * }
	 * 
	 * @author arun
	 * @date 18-Jun-2015
	 * @param HttpServletRequest req
	 * @param Throwable e
	 * @return Response
	 */
	@ExceptionHandler(Throwable.class)
	@ResponseBody
	@ResponseStatus (value = HttpStatus.BAD_REQUEST) 
	public Response handleException(HttpServletRequest req, Throwable e) {
		log.error(e.getMessage(), e);
		Response response = new Response();
		response.put(Response.CODE, Response.STATUS_CODE_400);
		response.put(Response.MESSAGE, Response.FAIL_MESSAGE);
		response.put(Response.STATUS, false);
		return response;		
	}
	
	@ExceptionHandler(AppException.class)
	@ResponseBody
	public Response handleAPIException(HttpServletResponse res, AppException e) {
		log.error(e.getMessage(), e);
		res.setStatus(e.getStatusCode());
		Response response = new Response();
		response.put(Response.CODE, e.getStatusCode());
		response.put(Response.MESSAGE, e.getMsg());
		response.put(Response.STATUS, false);
		return response;		
	}
	
	@ExceptionHandler(UsernameNotFoundException.class)
	@ResponseBody
	public Response handleUsernameNotFoundException(HttpServletResponse res, UsernameNotFoundException e) {
		log.error(e.getMessage(), e);
		//res.setStatus(e.getStatusCode());
		Response response = new Response();
		//response.put(Response.CODE_FIELD, e.getStatusCode());
		//response.put(Response.MESSAGE_FIELD, e.getMsg());
		response.put("login_status","user not found");
		response.put(Response.STATUS, false);
		return response;		
	}
	
	@ExceptionHandler(AuthenticationException.class)
	@ResponseBody
	public Response handleBadCredentialsException(HttpServletResponse res, AuthenticationException  e) {
		log.error(e.getMessage(), e);
		//res.setStatus(e.getStatusCode());
		Response response = new Response();
		response.put(Response.CODE, "401");
		response.put(Response.MESSAGE, " ");
		response.put("login_status","BadCredentials");
		response.put(Response.STATUS, false);
		return response;		
	}
	
	
}
