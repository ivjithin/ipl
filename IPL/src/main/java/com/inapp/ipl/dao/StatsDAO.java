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
	SessionFactory sessionFactory;

	static final String battingSql = "SELECT sum(runs) as tot_runs,sum(balls) as tot_balls, (sum(runs)*100)/(sum(balls)) as strikeRate, "
			+ "sum(fours) as tot_fours,sum(sixes) as tot_sixes FROM matchBattingDetails group by memberId ";

	@SuppressWarnings("unchecked")
	@Transactional
	public Object getleadingRunScorers() throws Exception {
		String sql = battingSql + " order by sum(runs)";

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
		String sql = battingSql + " order by sum(sixes)";

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
		String sql = battingSql + " order by sum(fours)";

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
		String sql = battingSql + " having sum(balls)> 10 order by (sum(runs)*100)/(sum(balls))";

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
