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
	private int memberId;
	private int overs;
	private int maiden;
	private int runsGiven;
	private int wickets;
	private int catches;
	private int runout;
}
