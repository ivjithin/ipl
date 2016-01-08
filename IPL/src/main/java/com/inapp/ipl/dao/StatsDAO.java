package com.inapp.ipl.dao;

import java.util.HashMap;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.transform.AliasToEntityMapResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class StatsDAO {

	@Autowired
	private SessionFactory sessionFactory;

	static final String battingSql = "SELECT memberName,imageUrl,teamName,totMatches,totRuns,totBallsFaced,strikeRate,totFours,totSixes"
			+ " from playersStats";
	static final String bowlingSql = "SELECT memberName,imageUrl,teamName,totMatches,totBallsDelivered,totWickets,totCatches,totRunOuts,totRunsGiven,economy"
			+ " from playersStats";

	@SuppressWarnings("unchecked")
	@Transactional
	public Object getleadingRunScorers() throws Exception {
		String sql = battingSql + " order by totRuns desc";

		List<HashMap<String, Object>> aliasToValueMapList = null;
		try {

			Query query = this.sessionFactory
					.getCurrentSession()
					.createSQLQuery(sql)
					.setResultTransformer(
							AliasToEntityMapResultTransformer.INSTANCE);

			aliasToValueMapList = query.list();

		} catch (Exception e) {
			throw e;
		}

		return aliasToValueMapList;
	}

	@SuppressWarnings("unchecked")
	@Transactional
	public Object getMostNoOfSixes() throws Exception {
		String sql = battingSql + " order by totSixes desc";

		List<HashMap<String, Object>> aliasToValueMapList = null;
		try {

			Query query = this.sessionFactory
					.getCurrentSession()
					.createSQLQuery(sql)
					.setResultTransformer(
							AliasToEntityMapResultTransformer.INSTANCE);

			aliasToValueMapList = query.list();

		} catch (Exception e) {
			throw e;
		}

		return aliasToValueMapList;
	}

	@SuppressWarnings("unchecked")
	@Transactional
	public Object getMostNoOfFours() throws Exception {
		String sql = battingSql + " order by totFours desc";

		List<HashMap<String, Object>> aliasToValueMapList = null;
		try {

			Query query = this.sessionFactory
					.getCurrentSession()
					.createSQLQuery(sql)
					.setResultTransformer(
							AliasToEntityMapResultTransformer.INSTANCE);

			aliasToValueMapList = query.list();

		} catch (Exception e) {
			throw e;
		}

		return aliasToValueMapList;
	}

	@SuppressWarnings("unchecked")
	@Transactional
	public Object gethighestStrikeRate() throws Exception {
		String sql = battingSql + " where totBallsFaced > 10 order by strikeRate desc";

		List<HashMap<String, Object>> aliasToValueMapList = null;
		try {

			Query query = this.sessionFactory
					.getCurrentSession()
					.createSQLQuery(sql)
					.setResultTransformer(
							AliasToEntityMapResultTransformer.INSTANCE);

			aliasToValueMapList = query.list();

		} catch (Exception e) {
			throw e;
		}

		return aliasToValueMapList;
	}
	
	@SuppressWarnings("unchecked")
	@Transactional
	public Object getLeadingWicketTakers() throws Exception {
		String sql = bowlingSql + " order by totWickets desc";

		List<HashMap<String, Object>> aliasToValueMapList = null;
		try {

			Query query = this.sessionFactory
					.getCurrentSession()
					.createSQLQuery(sql)
					.setResultTransformer(
							AliasToEntityMapResultTransformer.INSTANCE);

			aliasToValueMapList = query.list();

		} catch (Exception e) {
			throw e;
		}

		return aliasToValueMapList;
	}
	
	@SuppressWarnings("unchecked")
	@Transactional
	public Object getBestEconomy() throws Exception {
		String sql = bowlingSql + " order by economy";

		List<HashMap<String, Object>> aliasToValueMapList = null;
		try {

			Query query = this.sessionFactory
					.getCurrentSession()
					.createSQLQuery(sql)
					.setResultTransformer(
							AliasToEntityMapResultTransformer.INSTANCE);

			aliasToValueMapList = query.list();

		} catch (Exception e) {
			throw e;
		}

		return aliasToValueMapList;
	}
	
	
	@SuppressWarnings("unchecked")
	@Transactional
	public Object getMVP() throws Exception {
		String sql = "select memberName,imageUrl,teamName,totMatches,totRuns,totFours,totSixes,totWickets,totCatches,totRunOuts,point from"
				+ " playersStats order by point desc";

		List<HashMap<String, Object>> aliasToValueMapList = null;
		try {

			Query query = this.sessionFactory
					.getCurrentSession()
					.createSQLQuery(sql)
					.setResultTransformer(
							AliasToEntityMapResultTransformer.INSTANCE);

			aliasToValueMapList = query.list();

		} catch (Exception e) {
			throw e;
		}

		return aliasToValueMapList;
	}
	
}
