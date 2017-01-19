package com.mgoes.tweetreader.rest;

import java.util.List;

import javax.ejb.Singleton;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.slf4j.Logger;

import com.mgoes.tweetreader.business.LeitorTwitterBusiness;
import com.mgoes.tweetreader.domain.DescricaoQtdeVO;

import twitter4j.User;


@Singleton
@Path("info")
@Consumes({MediaType.APPLICATION_JSON})
@Produces({MediaType.APPLICATION_JSON})
public class TweetReaderRest {

	@Inject
	Logger log;
	
	@Inject
	LeitorTwitterBusiness business;
	
	@GET
	@Path("users-top-five")
	public Response buscaTopFiveUsuariosSeguidores(){
		log.info("Invocado buscaTopFiveUsuariosSeguidores.");
		
		
		List<User> retorno = null;
		try{
			retorno = business.buscaTopFiveUsuariosSeguidores();

		} catch (Exception ex){
			log.error("Erro TweetReaderRest - BAD_REQUEST.");
			log.error(ex.getMessage());
			return Response.status(Status.BAD_REQUEST).build();
		}

		log.info("Finalizado buscaTopFiveUsuariosSeguidores.");
		return Response.ok(retorno).build();		
	}
	
	@GET
	@Path("tweets-lang-pt")
	public Response buscaTotalTweetsPorLangPt() {
		log.info("Invocado buscaTotalTweetsPorLangPt.");
		
		
		List<DescricaoQtdeVO> retorno = null;
		try{
			retorno = business.buscaTotalTweetsPorLangPt();

		} catch (Exception ex){
			log.error("Erro TweetReaderRest - BAD_REQUEST.");
			log.error(ex.getMessage());
			return Response.status(Status.BAD_REQUEST).build();
		}

		log.info("Finalizado buscaTotalTweetsPorLangPt.");
		return Response.ok(retorno).build();		
	}

	@GET
	@Path("tweets-por-hora")
	public Response buscaTotalTweetsPorHora() {
		log.info("Invocado buscaTotalTweetsPorHora.");
		
		
		List<DescricaoQtdeVO> retorno = null;
		try{
			retorno = business.buscaTotalTweetsPorHora();
		} catch (Exception ex){
			log.error("Erro TweetReaderRest - BAD_REQUEST.");
			log.error(ex.getMessage());
			return Response.status(Status.BAD_REQUEST).build();
		}

		log.info("Finalizado buscaTotalTweetsPorHora.");
		return Response.ok(retorno).build();		
	}
}