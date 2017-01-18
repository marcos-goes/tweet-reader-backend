package com.mgoes.tweetreader.domain;

import twitter4j.Status;

public class Tweet {
	
	private String hashtag;
	
	private Status status;

	public String getHashtag() {
		return hashtag;
	}

	public void setHashtag(String hashtag) {
		this.hashtag = hashtag;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}	

	public Tweet(){
		
	}
	
	public Tweet(String hashtag, Status status){
		this.hashtag = hashtag;
		this.status = status;
	}
}
