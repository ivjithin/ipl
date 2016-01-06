package com.inapp.ipl.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inapp.ipl.dao.TeamDAO;

@Service
public class TeamService {
	@Autowired 
	private TeamDAO teamDAO;
	public List<Object> getTeamMembers(String teamId)
	{		
		return teamDAO.getTeamMembers(teamId);
		
	}

}
