package com.inapp.ipl.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.inapp.ipl.dto.Match;
import com.inapp.ipl.service.MatchService;
import com.inapp.ipl.utils.Response;

@Controller
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
	
}
