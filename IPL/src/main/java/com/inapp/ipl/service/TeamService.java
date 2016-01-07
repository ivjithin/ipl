package com.inapp.ipl.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inapp.ipl.dao.TeamDAO;
import com.inapp.ipl.entities.Member;


@Service
public class TeamService {
	@Autowired 
	private TeamDAO teamDAO;
	public List<Member> getTeamMembers(int teamId)
	{		
		return teamDAO.getTeamMembers(teamId);
		
	}

}
