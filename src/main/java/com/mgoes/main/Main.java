package com.mgoes.main;

import java.rmi.RemoteException;

import javax.xml.rpc.ServiceException;

import twitter4j.Query;
import twitter4j.QueryResult;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.conf.ConfigurationBuilder;

public class Main {

	public static void main(String[] args) throws RemoteException, ServiceException, TwitterException {

		ConfigurationBuilder cb = new ConfigurationBuilder();
		cb.setDebugEnabled(true)
		  .setOAuthConsumerKey("5MA5USRXwFQ4FTEAWxLBVEAai")
		  .setOAuthConsumerSecret("dm5EBJuTnRF8XHmHfdrsCd1QwPtZWRFNbeKxVdKJuu1KgMlk6o")
		  .setOAuthAccessToken("4367188223-3b3fnidvTDazdfNP1PBM8HQvYZteV50nGnTjc6R")
		  .setOAuthAccessTokenSecret("fwbxyJs15Ta0L9OgDldHIrrzCvxcDlGYWWO0RWY0ltce4");
		TwitterFactory tf = new TwitterFactory(cb.build());
		Twitter twitter = tf.getInstance();
		
		
		Query query = new Query("%23riodejaneiro");
		query.setCount(100);
		QueryResult result = twitter.search(query);
		
		
		
		for(Status status : result.getTweets()){
			System.out.println(status.getId() + " - " + status.getText());
		}

	}

}
