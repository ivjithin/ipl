package com.inapp.ipl.dto;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import com.inapp.ipl.entities.BattingDetails;
import com.inapp.ipl.entities.BowlingDetails;

@XmlRootElement
public class Innings {
	private List<BattingDetails> battingDetails;
	private List<BowlingDetails> bowlingDetails;
	public List<BattingDetails> getBattingDetails() {
		return battingDetails;
	}
	public void setBattingDetails(List<BattingDetails> battingDetails) {
		this.battingDetails = battingDetails;
	}
	public List<BowlingDetails> getBowlingDetails() {
		return bowlingDetails;
	}
	public void setBowlingDetails(List<BowlingDetails> bowlingDetails) {
		this.bowlingDetails = bowlingDetails;
	}

	
}
