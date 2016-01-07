package com.inapp.ipl.dto;

import javax.xml.bind.annotation.XmlRootElement;
import com.inapp.ipl.entities.BattingDetails;
import com.inapp.ipl.entities.BowlingDetails;

@XmlRootElement
public class Innings {
	private BattingDetails battingDetails;
	private BowlingDetails bowlingDetails;
	
	public BattingDetails getBattingDetails() {
		return battingDetails;
	}
	public void setBattingDetails(BattingDetails battingDetails) {
		this.battingDetails = battingDetails;
	}
	public BowlingDetails getBowlingDetails() {
		return bowlingDetails;
	}
	public void setBowlingDetails(BowlingDetails bowlingDetails) {
		this.bowlingDetails = bowlingDetails;
	}
	
	
}
