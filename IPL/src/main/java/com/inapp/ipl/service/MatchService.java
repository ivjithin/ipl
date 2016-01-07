package com.inapp.ipl.service;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inapp.ipl.dao.MatchDAO;
import com.inapp.ipl.dto.Match;
import com.inapp.ipl.entities.BattingDetails;
import com.inapp.ipl.entities.BowlingDetails;

@Service
public class MatchService {

	@Autowired
	private MatchDAO matchDAO;

	public boolean saveMatchDetails(Match match) {
		int matchId = matchDAO.saveSummary(match.getSummary());
		BattingDetails battingDetails1 = match.getFirstInnings()
				.getBattingDetails();
		BowlingDetails bowlingDetails1 = match.getFirstInnings()
				.getBowlingDetails();
		BattingDetails battingDetails2 = match.getSecondInnings()
				.getBattingDetails();
		BowlingDetails bowlingDetails2 = match.getSecondInnings()
				.getBowlingDetails();
		battingDetails1.setMatchId(matchId);
		battingDetails2.setMatchId(matchId);
		bowlingDetails1.setMatchId(matchId);
		bowlingDetails2.setMatchId(matchId);
		matchDAO.saveBattingDetails(Arrays.asList(battingDetails1,
				battingDetails2));
		matchDAO.saveBowlingDetails(Arrays.asList(bowlingDetails1,
				bowlingDetails2));
		return true;
	}

}
