package com.inapp.ipl.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@Entity
@Table(name = "matchBowlingDetails")
public class BowlingDetails {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int matchId;
	private int innings;
	@OneToOne
	@JoinColumn(name = "teamId")
	private Team teamId;	
	@OneToOne
	@JoinColumn(name = "memberId")
	private Member memberId;
	private int overs;
	private int maiden;
	private int runsGiven;
	private int wickets;
	private double economy;
	private int balls;
	private int dotBalls;
	private int catches;
	private int runout;
	
	
	public int getDotBalls() {
		return dotBalls;
	}
	public void setDotBalls(int dotBalls) {
		this.dotBalls = dotBalls;
	}
	public double getEconomy() {
		return economy;
	}
	public void setEconomy(double economy) {
		this.economy = economy;
	}
	public int getBalls() {
		return balls;
	}
	public void setBalls(int balls) {
		this.balls = balls;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getMatchId() {
		return matchId;
	}
	public void setMatchId(int matchId) {
		this.matchId = matchId;
	}
	public int getInnings() {
		return innings;
	}
	public void setInnings(int innings) {
		this.innings = innings;
	}
	public Team getTeamId() {
		return teamId;
	}
	public void setTeamId(Team teamId) {
		this.teamId = teamId;
	}
	public Member getMemberId() {
		return memberId;
	}
	public void setMemberId(Member memberId) {
		this.memberId = memberId;
	}
	public int getOvers() {
		return overs;
	}
	public void setOvers(int overs) {
		this.overs = overs;
	}
	public int getMaiden() {
		return maiden;
	}
	public void setMaiden(int maiden) {
		this.maiden = maiden;
	}
	public int getRunsGiven() {
		return runsGiven;
	}
	public void setRunsGiven(int runsGiven) {
		this.runsGiven = runsGiven;
	}
	public int getWickets() {
		return wickets;
	}
	public void setWickets(int wickets) {
		this.wickets = wickets;
	}
	public int getCatches() {
		return catches;
	}
	public void setCatches(int catches) {
		this.catches = catches;
	}
	public int getRunout() {
		return runout;
	}
	public void setRunout(int runout) {
		this.runout = runout;
	}
	
	
}
