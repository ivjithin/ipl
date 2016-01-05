package com.inapp.ipl.utils;

import java.util.Arrays;

import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;

/**
 * This is the logger class and is implemented using Spring AOP.
 * 
 * @author 
 * @date 13-Sep-2015
 * @project 
 */

@Aspect
public class LoggingAspect {

	private static Logger log = Logger.getLogger(LoggingAspect.class);

	private long beginTime;

	/**
	 * This method log before entering into a function of the controller
	 * 
	 * @author 
	 * @date 13-Sep-2015 
	 * @param joinPoint
	 *            *
	 */
	@Before("execution(* com.app.smartApp.controller.*.*(..))")
	private void logBeforeController(JoinPoint joinPoint) {
		beginTime = System.currentTimeMillis();
	}

	/**
	 * This method log after the execution of a function of the controller
	 * 
	 * @author 
	 * @date 13-Sep-2015
	 * @param joinPoint
	 *            *
	 */
	@After("execution(* com.app.smartApp.controller.*.*(..))")
	private void logAfterController(JoinPoint joinPoint) {
		log.info((System.currentTimeMillis() - beginTime) + " ms "
				+ joinPoint.getTarget().getClass() + "."
				+ joinPoint.getSignature().getName());
	}

	/**
	 * This method log after an exception is thrown
	 * 
	 * @author 
	 * @date 13-Sep-2015
	 * @param joinPoint
	 *            *
	 */
	@AfterThrowing(pointcut = "execution(* com.app.smartApp.controller.*.*(..))", throwing = "e")
	private void logAfterExceptionOccured(JoinPoint joinPoint, Throwable e) {
		Signature signature = joinPoint.getSignature();
		String stuff = signature.toString();
		String arguments = Arrays.toString(joinPoint.getArgs());
		System.out.println("arguements"+arguments);
		log.error("@Exception:" + joinPoint.getTarget().getClass() + "."
				+ joinPoint.getSignature().getName() + " with Arg: "
				+ arguments + "\nand the full toString: " + stuff
				+ "\nthe exception is: " + e.getMessage(), e);
	}

}
