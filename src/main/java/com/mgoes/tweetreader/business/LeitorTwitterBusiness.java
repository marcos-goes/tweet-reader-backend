package com.mgoes.tweetreader.business;

import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;
import java.util.SortedSet;
import java.util.TreeSet;

import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import javax.inject.Inject;

import org.slf4j.Logger;

import com.mgoes.tweetreader.domain.DescricaoQtdeVO;
import com.mgoes.tweetreader.domain.Tweet;
import com.mgoes.tweetreader.util.ConstantesConfig;

import twitter4j.Query;
import twitter4j.QueryResult;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterFactory;
import twitter4j.User;
import twitter4j.conf.Configuration;
import twitter4j.conf.ConfigurationBuilder;

@Stateless
public class LeitorTwitterBusiness {
	
	@Inject
	Logger log;
	
	@Inject
	RespositorioTweetsBusiness repositorio;
	
	private Configuration configTwitter = null;
		
	public void consultaTweets(){
		log.info("Invocado consultaTweets.");		
		
		try {
			
			if(this.configTwitter == null)
				configuraClientRest();
			
			Twitter twitter = new TwitterFactory(this.configTwitter).getInstance();
			
			
			for(String hashtag : ConstantesConfig.TWEETS_HASHTAGS){
				
				log.info("buscando: #" + hashtag);
				
				String hashtagEncoded = ConstantesConfig.TWEET_QUERY_ENCODED + hashtag;
				Query query = new Query(hashtagEncoded);
				query.setCount(ConstantesConfig.TWEETS_COUNT);
				
				QueryResult result = twitter.search(query);
				for(Status status : result.getTweets()){
					repositorio.getTweets().add(new Tweet(hashtag, status));
					log.info("Adicionado: " + status.getText());
				}
			}			
			
		} catch (Exception ex){
			ex.printStackTrace();
		}

		log.info("Finalizado consultaTweets.");
	}

	
	@PostConstruct
	private void configuraClientRest(){
		ConfigurationBuilder configBuilder = new ConfigurationBuilder();
		configBuilder.setDebugEnabled(true)		
			.setOAuthConsumerKey(ConstantesConfig.CONSUMER_KEY)
			.setOAuthConsumerSecret(ConstantesConfig.CONSUMER_SECRET)
			.setOAuthAccessToken(ConstantesConfig.ACCESS_TOKEN)
			.setOAuthAccessTokenSecret(ConstantesConfig.ACCESS_TOKEN_SECRET);
		
		this.configTwitter = configBuilder.build();
	}

	
	public void consultaTopFiveSeguidores(){
		log.info("Invocado consultaTopFiveSeguidores.");
		
		for(Tweet tweet : repositorio.getTweets()){
			
			User userAtual = tweet.getStatus().getUser();
			
			for(int i=0; i<5; i++){
				User topFiveUser = repositorio.getTopFiveSeguidores()[i];
				
				if(userAtual.equals(topFiveUser))
					break;
				
				if(topFiveUser==null){
					repositorio.setTopFive(userAtual, i);
					break;
				}
				
				if(userAtual.getFollowersCount() > topFiveUser.getFollowersCount()){
					repositorio.setTopFive(userAtual, i);
					userAtual = topFiveUser;
				}
			}
			
		}
		
		log.info(".:: Top Five ::.");
		for(int i=0; i<5; i++){
			User topFiveUser = repositorio.getTopFiveSeguidores()[i];
			
			log.info("   " + (i+1) + "o. @" + topFiveUser.getScreenName() + " [" + topFiveUser.getName() + "]: " + topFiveUser.getFollowersCount());
		}
		
		log.info("Finalizado consultaTopFiveSeguidores.");
	}
	
	public void consultaLangPtPorHashtag(){
		log.info("Invocado consultaLangPtPorHashtag.");
		
		for(Tweet tweet : repositorio.getTweets()){
			
			if(tweet.getStatus().getLang().toLowerCase().equals("pt")){
				Integer contador = repositorio.getMapLangPtPorHashtag().get(tweet.getHashtag());
				
				if(contador==null){
					repositorio.getMapLangPtPorHashtag().put(tweet.getHashtag(), 1);
				} else {
					contador++;
					repositorio.getMapLangPtPorHashtag().replace(tweet.getHashtag(), contador);
				}				
			}
			
		}
		
		log.info(".:: Lang=pt por Hashtag ::.");
		
		for(Entry<String, Integer> entry : repositorio.getMapLangPtPorHashtag().entrySet()){
			log.info("   #" + entry.getKey() + ": " + entry.getValue());
		}
		
		log.info("Finalizado consultaLangPtPorHashtag.");
	}
	
	public void consultaTotalTweetsPorHora(){
		log.info("Invocado consultaTotalTweetsPorHora.");
		
		for(Tweet tweet : repositorio.getTweets()){
			
			Integer hora = tweet.getStatus().getCreatedAt().getHours();
			
			Integer contador = repositorio.getMapTweetsPorHora().get(hora);
			
		
			if(contador==null){
				repositorio.getMapTweetsPorHora().put(hora, 1);
			} else {
				contador++;
				repositorio.getMapTweetsPorHora().replace(hora, contador);
			}				

			
		}
		
		log.info(".:: Tweets por hora ::.");
		
		SortedSet<Integer> keys = new TreeSet<Integer>(repositorio.getMapTweetsPorHora().keySet());
		for(Integer key : keys)
			log.info("   Hora " + key + ": " + repositorio.getMapTweetsPorHora().get(key));
		
		log.info("Finalizado consultaTotalTweetsPorHora.");
	}
	
	
	public List<User> buscaTopFiveUsuariosSeguidores(){
		List<User> usuariosTopFive = new ArrayList<User>();
		
		for(User usuario : repositorio.getTopFiveSeguidores())
			usuariosTopFive.add(usuario);
		
		return usuariosTopFive;
	}
	
	public List<DescricaoQtdeVO> buscaTotalTweetsPorLangPt(){
		List<DescricaoQtdeVO> lista = new ArrayList<DescricaoQtdeVO>();
		
		for(Entry<String, Integer> entry : repositorio.getMapLangPtPorHashtag().entrySet()){
			lista.add(new DescricaoQtdeVO("#" + entry.getKey(), entry.getValue()));
		}
				
		return lista;
	}
	
	public List<DescricaoQtdeVO> buscaTotalTweetsPorHora(){
		List<DescricaoQtdeVO> lista = new ArrayList<DescricaoQtdeVO>();
		
		SortedSet<Integer> keys = new TreeSet<Integer>(repositorio.getMapTweetsPorHora().keySet());
		for(Integer key : keys)
			lista.add(new DescricaoQtdeVO(key.toString(), repositorio.getMapTweetsPorHora().get(key)));

		return lista;
	}
	
}
