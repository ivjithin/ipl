package com.inapp.ipl.dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.inapp.ipl.entities.MatchDetails;
import com.inapp.ipl.entities.Member;


@Repository
public class TeamDAO {
	@Autowired
	private SessionFactory hbsession;
	private static final String GET_TEAM_MEMBERS_BY_ID="from Member where  team.id=:teamId";	
	private static final String GET_ALL_MATHCS="from MatchDetails";
	@Transactional
	public List<Member> getTeamMembers(int teamId)
	{
		List<Member> listMembers = null;
		  try {
			  Query query = this.hbsession
	                    .getCurrentSession()
	                    .createQuery(GET_TEAM_MEMBERS_BY_ID);
			  query.setParameter("teamId",teamId);			  
			  listMembers = query.list(); 
		  }catch(Exception e){
			 e.printStackTrace();
		  }
		return listMembers;
		
	}
	@Transactional
	public List<MatchDetails> getAllMatches() {
		List<MatchDetails> listMatch = null;
		  try {
			  Query query = this.hbsession
	                    .getCurrentSession()
	                    .createQuery(GET_ALL_MATHCS);
			  	  
			  listMatch = query.list(); 
		  }catch(Exception e){
			 e.printStackTrace();
		  }
		return listMatch;
	}

}
