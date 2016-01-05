package com.inapp.ipl.utils;

import java.util.Properties;

/**
 * This is the enum used to get the message code and message string. 
 * Each instance of enum should be defined in the msg.properties file.
 * 
 * The message code and message string will be assigned to the enum
 * instance at runtime.
 * 
 * @author arun
 * @date 04-Jul-2015
 * @project EOZAPI
 */
public enum MSG {

	/**
	 * Define message here. Each value and code should be defined in 
	 * msg.properties.
	 * 
	 * Eg: NOT_FOUND = 404, Not found
	 */
	/* Begin */
	
	NOT_FOUND,
	INVALID_REQUEST,
	SUCCESS,
	INVALID_USER,
	SERVER_ERROR;

	/* End */
	
	/* Stores the message from msg.properties */
	private String value;
	
	/* Stores the code from msg.properties */
	private int code = 0;

	/* msg.properties file reference */
	private static Properties msgProperties;
	

	/**
	 * This function assigns the message from msg.properties file 
	 * into value
	 * 
	 * @author arun
	 * @date 04-Jul-2015 *
	 */
	private void initMsg() {
		if (msgProperties == null) {
			msgProperties = new Properties();
			try {
				msgProperties.load(MSG.class.getClassLoader()
						.getResourceAsStream("msg.properties"));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		String codeAndMessage[] = ((String) msgProperties.getProperty(this
				.toString())).split(",", 2);
		code = Integer.parseInt(codeAndMessage[0]);
		value = codeAndMessage[1];
	}

	

	/**
	 * Returns the message 
	 * 
	 * @author arun
	 * @date 04-Jul-2015
	 * @return *
	 */
	public String getValue() {
		if (value == null) {
			initMsg();
		}
		return value;
	}

	/**
	 * Returns the code 
	 * 
	 * @author arun
	 * @date 04-Jul-2015
	 * @return *
	 */
	public int getCode() {
		if (code == 0) {
			initMsg();
		}
		return code;
	}
}
