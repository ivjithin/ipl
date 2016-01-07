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
@Table(name = "matches")
public class MatchDetails {
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String matchNo;
	@OneToOne
	@JoinColumn(name = "team1")
	private Team team1;
	@OneToOne
	@JoinColumn(name = "team2")
	private Team team2;
	private String matchType;
	private int toss;
	private int firstIngsTeam;
	private int firstIngsScore;
	private int firstIngsWicket;
	private double firstIngsOver;
	private int firstIngsExtras;
	private int scndIngsTeam;
	private int scndIngsScore;
	private int scndIngsWicket;
	private double scndIngsOver;
	private int scndIngsExtras;
	private int winner;
	private String result;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getMatchNo() {
		return matchNo;
	}
	public void setMatchNo(String matchNo) {
		this.matchNo = matchNo;
	}
	public Team getTeam1() {
		return team1;
	}
	public void setTeam1(Team team1) {
		this.team1 = team1;
	}
	public Team getTeam2() {
		return team2;
	}
	public void setTeam2(Team team2) {
		this.team2 = team2;
	}
	public String getMatchType() {
		return matchType;
	}
	public void setMatchType(String matchType) {
		this.matchType = matchType;
	}
	public int getToss() {
		return toss;
	}
	public void setToss(int toss) {
		this.toss = toss;
	}
	public int getFirstIngsTeam() {
		return firstIngsTeam;
	}
	public void setFirstIngsTeam(int firstIngsTeam) {
		this.firstIngsTeam = firstIngsTeam;
	}
	public int getFirstIngsScore() {
		return firstIngsScore;
	}
	public void setFirstIngsScore(int firstIngsScore) {
		this.firstIngsScore = firstIngsScore;
	}
	public int getFirstIngsWicket() {
		return firstIngsWicket;
	}
	public void setFirstIngsWicket(int firstIngsWicket) {
		this.firstIngsWicket = firstIngsWicket;
	}
	public double getFirstIngsOver() {
		return firstIngsOver;
	}
	public void setFirstIngsOver(double firstIngsOver) {
		this.firstIngsOver = firstIngsOver;
	}
	public int getFirstIngsExtras() {
		return firstIngsExtras;
	}
	public void setFirstIngsExtras(int firstIngsExtras) {
		this.firstIngsExtras = firstIngsExtras;
	}
	public int getScndIngsTeam() {
		return scndIngsTeam;
	}
	public void setScndIngsTeam(int scndIngsTeam) {
		this.scndIngsTeam = scndIngsTeam;
	}
	public int getScndIngsScore() {
		return scndIngsScore;
	}
	public void setScndIngsScore(int scndIngsScore) {
		this.scndIngsScore = scndIngsScore;
	}
	public int getScndIngsWicket() {
		return scndIngsWicket;
	}
	public void setScndIngsWicket(int scndIngsWicket) {
		this.scndIngsWicket = scndIngsWicket;
	}
	public double getScndIngsOver() {
		return scndIngsOver;
	}
	public void setScndIngsOver(double scndIngsOver) {
		this.scndIngsOver = scndIngsOver;
	}
	public int getScndIngsExtras() {
		return scndIngsExtras;
	}
	public void setScndIngsExtras(int scndIngsExtras) {
		this.scndIngsExtras = scndIngsExtras;
	}
	public int getWinner() {
		return winner;
	}
	public void setWinner(int winner) {
		this.winner = winner;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}

	
}
