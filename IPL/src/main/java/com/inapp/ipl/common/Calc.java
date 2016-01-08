package com.inapp.ipl.common;

public class Calc {

	public static int gettotalNoOfBalls(double over){
		long iPart;
		double fPart;
		iPart = (long) over;
		int balls = (int) (iPart*6 + ((over - iPart)*10));
		return balls;
	}
	
	public static double getTotalOvers(int balls){
		double overs= 0.0;
		int iPart = balls / 6;
		double fPart = balls%6;
		overs = iPart + (fPart/10);
		return overs;
	}

}
