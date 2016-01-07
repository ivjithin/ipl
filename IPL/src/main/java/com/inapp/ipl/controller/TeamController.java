package com.inapp.ipl.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.inapp.ipl.service.TeamService;
import com.inapp.ipl.utils.Response;

@RestController
@RequestMapping(value="/team")
public class TeamController {
	
	@Autowired 
	private TeamService teamService;
	
	@RequestMapping(value="/members/{teamId}",method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Response getTeamMembers(@PathVariable int teamId)
	{
		Response customeResponse= new Response();
		customeResponse.put(Response.RESULT, teamService.getTeamMembers(teamId));	
		return customeResponse;
		
	}
	
	@RequestMapping(value="/allmatches",method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Response getAllMatches()
	{
		Response customeResponse= new Response();
		customeResponse.put(Response.RESULT, teamService.getAllMatches());	
		return customeResponse;
		
	}
	
}
