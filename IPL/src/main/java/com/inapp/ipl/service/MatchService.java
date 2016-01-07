package com.inapp.ipl.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inapp.ipl.dao.TeamDAO;
import com.inapp.ipl.dto.Match;
import com.inapp.ipl.entities.MatchDetails;

@Service
public class MatchService {
	
@Autowired
private TeamDAO teamDAO;
	public boolean saveMatchDetails(Match match) {
		// TODO Auto-generated method stub
		return true;
	}

	public List<MatchDetails> getAllMatches() {
		return teamDAO.getAllMatches();
	}
}
