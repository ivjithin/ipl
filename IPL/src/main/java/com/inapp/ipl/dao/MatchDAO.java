package com.inapp.ipl.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.inapp.ipl.entities.BattingDetails;
import com.inapp.ipl.entities.BowlingDetails;
import com.inapp.ipl.entities.MatchDetails;

@Repository
public class MatchDAO {
private SessionFactory sessionFactory;
	@Transactional
	public int saveSummary(MatchDetails summary) {
		MatchDetails details = (MatchDetails) sessionFactory.getCurrentSession().save(summary);
		return details.getId();		
	}

	@Transactional
	public void saveBattingDetails(List<BattingDetails> asList) {
		sessionFactory.getCurrentSession().save(asList);
		
	}

	@Transactional
	public void saveBowlingDetails(List<BowlingDetails> asList) {
		sessionFactory.getCurrentSession().save(asList);
		
		
	}

}
