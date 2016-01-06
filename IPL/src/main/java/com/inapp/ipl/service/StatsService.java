package com.inapp.ipl.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inapp.ipl.dao.StatsDAO;

@Service
public class StatsService {
	
	@Autowired StatsDAO statsDAO;

	public Object getleadingRunScorers() throws Exception {
		return statsDAO.getleadingRunScorers();
	}

	public Object getMostNoOfSixes() throws Exception{
		return statsDAO.getMostNoOfSixes();
	}

	public Object getMostNoOfFours() throws Exception{
		return statsDAO.getMostNoOfFours();
	}

	public Object gethighestStrikeRate() throws Exception  {
		return statsDAO.gethighestStrikeRate();
	}

}
