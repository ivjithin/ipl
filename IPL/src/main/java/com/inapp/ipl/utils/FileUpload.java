package com.inapp.ipl.utils;

import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.Iterator;
import java.util.Properties;

import javax.imageio.ImageIO;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;


public class FileUpload {


	
	public byte[] getImage(String dir,String image) throws Exception{
		
		Properties prop = new Properties();			
		prop.load(FileUpload.class.getClassLoader().getResourceAsStream("config.properties"));					
		String dirPath = prop.getProperty("upload.files.path");			
		
		String[] imageArr = image.split(java.util.regex.Pattern.quote("."));
		String type = imageArr[imageArr.length - 1];	
		
		String[] imagePartsArr = image.split(java.util.regex.Pattern.quote("_"));
		String serverImage="";
		for(String part:imagePartsArr){
			serverImage+=File.separator+part;
		}
		
		String imagePath = dirPath+ File.separator + dir+ serverImage;	
		if(!new File(imagePath).exists()){
			imagePath = prop.getProperty("default.image.path");		
			type="jpg";
		}
		BufferedImage img1 = null;
		img1 = ImageIO.read(new File(imagePath));
		ByteArrayOutputStream bao = new ByteArrayOutputStream();
		ImageIO.write(img1, type, bao);
		
		return bao.toByteArray();
	}
	
	
	
	public static void saveFile(MultipartHttpServletRequest fileRequest,String imageDir) throws Exception{
		
		if(null!=fileRequest){			
			Properties prop = new Properties();			
			prop.load(FileUpload.class.getClassLoader().getResourceAsStream("config.properties"));					
			String dirPath = prop.getProperty("upload.files.path")+imageDir+File.separator;	
			File dir = new File(dirPath);
			if (!dir.exists()){
				dir.mkdirs();
			}				
			Iterator<String> uploadedFilenames=fileRequest.getFileNames();
			while (uploadedFilenames.hasNext()) {
			    String uploadedFilename=(String)uploadedFilenames.next();
			    MultipartFile file=fileRequest.getFile(uploadedFilename);
				byte[] bytes = file.getBytes();				
				File serverFile = new File(dirPath +File.separator+ file.getName());					
				BufferedOutputStream stream = new BufferedOutputStream(
						new FileOutputStream(serverFile));
				stream.write(bytes);
				stream.close();
			}	
		}
	}
	public static void deleteFile(String fileDir,String fileName) throws Exception{
		Properties prop = new Properties();			
		prop.load(FileUpload.class.getClassLoader().getResourceAsStream("config.properties"));					
		String filePath = prop.getProperty("upload.files.path")+fileDir+File.separator+fileName;	
		File dir = new File(filePath);
		boolean result=dir.delete();
	}
	
	public static String uploadFile(String name,String path,MultipartFile[] files,String [] originalImg,String [] deletedImg) 
			throws Exception{
		Properties prop = new Properties();
		StringBuilder sb = new StringBuilder();
		try {
			prop.load(FileUpload.class.getClassLoader().getResourceAsStream(
					"config.properties"));
			String file_path = prop.getProperty("image_filePath");
			if(null != deletedImg && deletedImg.length > 0 ){
				for(int i=0 ;i<deletedImg.length ;i++){
					String delImg = deletedImg [i];
					File img = new File(file_path + File.separator + path+File.separator+delImg);
					if(img.exists()) img.delete();
				}
			}
			if(null != originalImg && originalImg.length > 0 ){
				for (String n : originalImg) { 
				    if (sb.length() > 0) sb.append(',');
				    sb.append(n);
				   // sb.append("'").append(n).append("'");
				}
			}
			if (null != files && files.length > 0) {
				String[] nameArray = new String [files.length];
				for (int i = 0; i < files.length; i++) {
					MultipartFile file = files[i];
					byte[] bytes = file.getBytes();
					// Creating the directory to store file

					File dir = new File(file_path + File.separator + path);
					if (!dir.exists())
						dir.mkdirs();
					if(!path.equals("doctors")){
						name = name+"_"+i;
					}
						nameArray[i] = name;
					
					// Create the file on server
					File serverFile = new File(dir +File.separator+ name);					
					BufferedOutputStream stream = new BufferedOutputStream(
							new FileOutputStream(serverFile));
					stream.write(bytes);
					stream.close();
				}
				
				for (String n : nameArray) { 
				    if (sb.length() > 0) sb.append(',');
				    sb.append(n);
				    sb.append("'").append(n).append("'");
				}
				
			}
			
		} catch (Exception e) {
			throw e ;

		}
		return sb.toString();
	}

}
