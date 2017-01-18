package com.mgoes.tweetreader.business;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ejb.Singleton;

import com.mgoes.tweetreader.domain.Tweet;

import twitter4j.User;

@Singleton
public class RespositorioTweetsBusiness {

	private List<Tweet> tweets = new ArrayList<Tweet>();
	
	private User[] topFiveSeguidores = new User[5];
	
	private Map<String, Integer> mapLangPtPorHashtag = new HashMap<String, Integer>();

	public List<Tweet> getTweets() {
		return tweets;
	}

	public User[] getTopFiveSeguidores() {
		return topFiveSeguidores;
	}

	public void setTopFive(User user, int index) {
		this.topFiveSeguidores[index] = user;
	}

	public Map<String, Integer> getMapLangPtPorHashtag() {
		return mapLangPtPorHashtag;
	}
	
	

}
