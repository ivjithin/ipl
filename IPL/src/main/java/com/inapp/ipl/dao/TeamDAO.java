package com.inapp.ipl.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class TeamDAO {
	@Autowired
	private SessionFactory hbsession;
	
	@Transactional
	public List<Object> getTeamMembers(String teamId)
	{
		System.out.println("in DAo");
		return new ArrayList<Object>();
		
	}

}
