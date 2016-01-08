package com.inapp.ipl.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.inapp.ipl.dto.Match;
import com.inapp.ipl.service.MatchService;
import com.inapp.ipl.utils.Response;

@RestController
@RequestMapping("/match")
public class MatchDetailsController {
	
@Autowired
private MatchService matchService;
	
	@RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public Response likeRestaurant(@RequestBody Match match)
			throws Exception {
		Response customResponse= new Response();
		customResponse.put(Response.RESULT,matchService.saveMatchDetails(match));	
		customResponse.put(Response.STATUS,Response.STATUS_CODE_200);
		return customResponse;
	}
	@RequestMapping(method = RequestMethod.GET,  produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getAllMatches() {
		Response customeResponse = new Response();
		customeResponse.put(Response.RESULT, matchService.getAllMatches());
		return customeResponse;

	}
	@RequestMapping(value= "/{id}" ,method = RequestMethod.GET,  produces = MediaType.APPLICATION_JSON_VALUE)
	public Response getMatch(@PathVariable("id") int id) {
		Response customeResponse = new Response();
		customeResponse.put(Response.RESULT, matchService.getMatchDetails(id));
		return customeResponse;

	}
}
