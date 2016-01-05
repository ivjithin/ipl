package com.inapp.ipl.dao;


import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.inapp.ipl.utils.RepositoryConstants;

@Repository(RepositoryConstants.ADMIN_DAO)
public class AdminDAOImpl implements AdminDAO{
	
	@Autowired
	private SessionFactory sessionFactory;

}
