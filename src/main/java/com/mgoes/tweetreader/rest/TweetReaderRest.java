//package com.mgoes.tweetreader.rest;
//
//import javax.ejb.Singleton;
//import javax.inject.Inject;
//import javax.ws.rs.Consumes;
//import javax.ws.rs.GET;
//import javax.ws.rs.Path;
//import javax.ws.rs.PathParam;
//import javax.ws.rs.Produces;
//import javax.ws.rs.core.MediaType;
//import javax.ws.rs.core.Response;
//import javax.ws.rs.core.Response.Status;
//
//import org.slf4j.Logger;
//
//import com.mgoes.tweetreader.business.BusinessException;
//
//
//@Singleton
//@Path("info")
//@Consumes({MediaType.APPLICATION_JSON})
//@Produces({MediaType.APPLICATION_JSON})
//public class TweetReaderRest {
//
//	@Inject
//	Logger log;	
//	
//	@GET
//	@Path("users-top-five")
//	public Response buscaTopFiveUsuariosSeguidores(){
//		log.info("Invocado buscaTopFiveUsuariosSeguidores.");
//		
//		
//		try{
//			//
//		} catch (BusinessException ex){
//			log.error("Erro TweetReaderRest - NOT_FOUND.");
//			log.error(ex.getMessage());
//			return Response.status(Status.NOT_FOUND).build();
//		} catch (Exception ex){
//			log.error("Erro TweetReaderRest - BAD_REQUEST.");
//			log.error(ex.getMessage());
//			return Response.status(Status.BAD_REQUEST).build();
//		}
//
//		log.info("Finalizado buscaTopFiveUsuariosSeguidores.");
//		return Response.ok(null).build();		
//	}
//	
//	@GET
//	@Path("tweets-lang-pt")
//	public Response buscaTotalTweetsPorLangPt() {
//		log.info("Invocado buscaTotalTweetsPorLangPt.");
//		
//		
//		try{
//			//
//		} catch (BusinessException ex){
//			log.error("Erro TweetReaderRest - NOT_FOUND.");
//			log.error(ex.getMessage());
//			return Response.status(Status.NOT_FOUND).build();
//		} catch (Exception ex){
//			log.error("Erro TweetReaderRest - BAD_REQUEST.");
//			log.error(ex.getMessage());
//			return Response.status(Status.BAD_REQUEST).build();
//		}
//
//		log.info("Finalizado buscaTotalTweetsPorLangPt.");
//		return Response.ok(null).build();		
//	}
//
//	@GET
//	@Path("tweets-por-hora")
//	public Response buscaTotalTweetsPorHora(@PathParam("id") Integer id) {
//		log.info("Invocado buscaTotalTweetsPorHora.");
//		
//		
//		try{
//			//
//		} catch (BusinessException ex){
//			log.error("Erro TweetReaderRest - NOT_FOUND.");
//			log.error(ex.getMessage());
//			return Response.status(Status.NOT_FOUND).build();
//		} catch (Exception ex){
//			log.error("Erro TweetReaderRest - BAD_REQUEST.");
//			log.error(ex.getMessage());
//			return Response.status(Status.BAD_REQUEST).build();
//		}
//
//		log.info("Finalizado buscaTotalTweetsPorHora.");
//		return Response.ok(null).build();		
//	}
//}