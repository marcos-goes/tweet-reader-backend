package com.mgoes.tweetreader.schedule;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.inject.Inject;

import com.mgoes.tweetreader.business.LeitorTwitterBusiness;

@Singleton
@Startup
public class ConsultaTweetsSchedule {

	@Inject
	LeitorTwitterBusiness business;
	
	@PostConstruct
	//@Schedule(hour="12", minute="00", second="00", persistent=false)
	public void consultarTweets(){
		try {
			business.consultaTweets();
			business.consultaTopFiveSeguidores();
			business.consultaLangPtPorHashtag();
			business.consultaTotalTweetsPorHora();
		} catch (Exception e) {
			e.printStackTrace();
			// Não faz nada para não derrubar a aplicação.
		}
	}
}
