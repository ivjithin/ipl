package com.inapp.ipl.dto;

import javax.xml.bind.annotation.XmlRootElement;

import com.inapp.ipl.entities.MatchDetails;

@XmlRootElement
public class Match {
	private MatchDetails summary;
	private Innings firstInnings;
	private Innings secondInnings;
	public MatchDetails getSummary() {
		return summary;
	}
	public void setSummary(MatchDetails summary) {
		this.summary = summary;
	}
	public Innings getFirstInnings() {
		return firstInnings;
	}
	public void setFirstInnings(Innings firstInnings) {
		this.firstInnings = firstInnings;
	}
	public Innings getSecondInnings() {
		return secondInnings;
	}
	public void setSecondInnings(Innings secondInnings) {
		this.secondInnings = secondInnings;
	}
	
	
}
