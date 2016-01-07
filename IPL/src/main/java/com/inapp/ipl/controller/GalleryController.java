package com.inapp.ipl.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.inapp.ipl.service.GalleryService;
import com.inapp.ipl.utils.Response;

@RestController
public class GalleryController {
	@Autowired
	private GalleryService galleryService;
	@RequestMapping(value = "/public/galleryImgs", method = RequestMethod.GET)
	public Response getGalleryImgs() {
		Response customeResponse= new Response();
		customeResponse.put(Response.RESULT, galleryService.getGalleryImages());			
		return	customeResponse;
	}
}
