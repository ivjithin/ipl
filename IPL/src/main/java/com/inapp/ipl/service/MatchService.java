package com.inapp.ipl.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inapp.ipl.dao.MatchDAO;
import com.inapp.ipl.dao.TeamDAO;
import com.inapp.ipl.dto.Match;
import com.inapp.ipl.entities.BattingDetails;
import com.inapp.ipl.entities.BowlingDetails;
import com.inapp.ipl.entities.MatchDetails;

@Service
public class MatchService {

	@Autowired
	private TeamDAO teamDAO;
	@Autowired
	private MatchDAO matchDAO;

	public boolean saveMatchDetails(Match match) {
		int matchId = matchDAO.saveSummary(match.getSummary());
		List<BattingDetails> battingDetails1 = match.getFirstInnings()
				.getBattingDetails();
		List<BowlingDetails> bowlingDetails1 = match.getFirstInnings()
				.getBowlingDetails();
		List<BattingDetails> battingDetails2 = match.getSecondInnings()
				.getBattingDetails();
		List<BowlingDetails> bowlingDetails2 = match.getSecondInnings()
				.getBowlingDetails();
		battingDetails1.addAll(battingDetails2);
		bowlingDetails1.addAll(bowlingDetails2);
		matchDAO.saveBattingDetails(battingDetails1,matchId);
		matchDAO.saveBowlingDetails(bowlingDetails1,matchId);
		return true;
	}

	public List<MatchDetails> getAllMatches() {
		return teamDAO.getAllMatches();
	}

	public  <T> T[] concat(T[] first, T[] second) {
		T[] result = Arrays.copyOf(first, first.length + second.length);
		System.arraycopy(second, 0, result, first.length, second.length);
		return result;
	}
}
