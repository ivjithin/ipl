package com.inapp.ipl.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.inapp.ipl.entities.BattingDetails;
import com.inapp.ipl.entities.BowlingDetails;
import com.inapp.ipl.entities.MatchDetails;

@Repository
public class MatchDAO {
	@Autowired
	private SessionFactory sessionFactory;

	@Transactional
	public int saveSummary(MatchDetails summary) {
		int id = (Integer) sessionFactory
				.getCurrentSession().save(summary);
		return id;
	}

	@Transactional
	public void saveBattingDetails(List<BattingDetails> battingDetails,
			int matchId) {
		for (BattingDetails details : battingDetails) {
			details.setMatchId(matchId);
			sessionFactory.getCurrentSession().save(details);
		}

	}

	@Transactional
	public void saveBowlingDetails(List<BowlingDetails> bowlingDetails,
			int matchId) {
		for (BowlingDetails details : bowlingDetails) {
			details.setMatchId(matchId);
			sessionFactory.getCurrentSession().save(details);
		}

	}

}
