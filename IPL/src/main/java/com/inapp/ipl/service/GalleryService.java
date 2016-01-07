package com.inapp.ipl.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.inapp.ipl.utils.ServiceConstants;

@Service(ServiceConstants.GALLERY_SERVICE)
public class GalleryService {

	@Value("${ipl.gallery.images.path}")
	private String galleryImgPath;
	
	public List<String> getGalleryImages(){
		
		List<String> fileList= new ArrayList<String>();
		
		try{
			File userDir=new File(galleryImgPath);			
			File[] allfiles=userDir.listFiles();			
			if(null!=allfiles){
				for (File file : allfiles){
					fileList.add(file.getName());
				}
			}
		}catch(Exception e){		
			
		}
		
		return fileList;
	}
}
