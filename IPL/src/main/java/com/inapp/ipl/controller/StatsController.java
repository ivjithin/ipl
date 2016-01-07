package com.inapp.ipl.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.inapp.ipl.service.StatsService;
import com.inapp.ipl.utils.Response;

@Controller
@RequestMapping(value = "/stats")
public class StatsController {
	
	@Autowired StatsService statsService;
	
	@RequestMapping(value="/leadingRunScorers",method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Response getleadingRunScorers() throws Exception{
		Response customeResponse= new Response();
		customeResponse.put(Response.RESULT, statsService.getleadingRunScorers());	
		customeResponse.put(Response.STATUS,Response.STATUS_CODE_200);
		return customeResponse;
		
	}
	
	@RequestMapping(value="/mostNoOfSixes",method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Response getMostNoOfSixes() throws Exception{
		Response customeResponse= new Response();
		customeResponse.put(Response.RESULT, statsService.getMostNoOfSixes());	
		customeResponse.put(Response.STATUS,Response.STATUS_CODE_200);
		return customeResponse;
		
	}
	
	@RequestMapping(value="/mostNoOfFours",method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Response getMostNoOfFours() throws Exception{
		Response customeResponse= new Response();
		customeResponse.put(Response.RESULT, statsService.getMostNoOfFours());	
		customeResponse.put(Response.STATUS,Response.STATUS_CODE_200);
		return customeResponse;
		
	}
	
	@RequestMapping(value="/highestStrikeRate",method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Response gethighestStrikeRate() throws Exception{
		Response customeResponse= new Response();
		customeResponse.put(Response.RESULT, statsService.gethighestStrikeRate());	
		customeResponse.put(Response.STATUS,Response.STATUS_CODE_200);
		return customeResponse;
		
	}
	@RequestMapping(value="/leadingWicketTakers",method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Response getLeadingWicketTakers() throws Exception{
		Response customeResponse= new Response();
		customeResponse.put(Response.RESULT, statsService.getLeadingWicketTakers());	
		customeResponse.put(Response.STATUS,Response.STATUS_CODE_200);
		return customeResponse;
		
	}
	@RequestMapping(value="/bestEconomy",method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Response getBestEconomy() throws Exception{
		Response customeResponse= new Response();
		customeResponse.put(Response.RESULT, statsService.getBestEconomy());	
		customeResponse.put(Response.STATUS,Response.STATUS_CODE_200);
		return customeResponse;
		
	}
	
	@RequestMapping(value="/mvp",method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Response getMVP() throws Exception{
		Response customeResponse= new Response();
		customeResponse.put(Response.RESULT, statsService.getMVP());	
		customeResponse.put(Response.STATUS,Response.STATUS_CODE_200);
		return customeResponse;
		
	}
	
	
}
