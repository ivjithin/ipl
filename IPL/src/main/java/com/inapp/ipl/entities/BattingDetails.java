package com.inapp.ipl.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "matchBattingDetails")
public class BattingDetails {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int matchId;
	private int innings;
	@OneToOne
	@JoinColumn(name = "teamId")
	private Team teamId;
	private int isBatted;
	private int battingOrder;
	private int memberId;
	private int runs;
	private int balls;
	private int fours;
	private int sixes;
	private int wicketStatus;
	private String wicketDescription;
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
	public int getIsBatted() {
		return isBatted;
	}
	public void setIsBatted(int isBatted) {
		this.isBatted = isBatted;
	}
	public int getBattingOrder() {
		return battingOrder;
	}
	public void setBattingOrder(int battingOrder) {
		this.battingOrder = battingOrder;
	}
	public int getMemberId() {
		return memberId;
	}
	public void setMemberId(int memberId) {
		this.memberId = memberId;
	}
	public int getRuns() {
		return runs;
	}
	public void setRuns(int runs) {
		this.runs = runs;
	}
	public int getBalls() {
		return balls;
	}
	public void setBalls(int balls) {
		this.balls = balls;
	}
	public int getFours() {
		return fours;
	}
	public void setFours(int fours) {
		this.fours = fours;
	}
	public int getSixes() {
		return sixes;
	}
	public void setSixes(int sixes) {
		this.sixes = sixes;
	}
	public int getWicketStatus() {
		return wicketStatus;
	}
	public void setWicketStatus(int wicketStatus) {
		this.wicketStatus = wicketStatus;
	}
	public String getWicketDescription() {
		return wicketDescription;
	}
	public void setWicketDescription(String wicketDescription) {
		this.wicketDescription = wicketDescription;
	}
	
	
	

}
