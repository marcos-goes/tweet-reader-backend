//package com.mgoes.tweetreader.util;
//
//import javax.enterprise.context.ApplicationScoped;
//import javax.enterprise.context.RequestScoped;
//import javax.enterprise.inject.Disposes;
//import javax.enterprise.inject.Produces;
//import javax.persistence.EntityManager;
//import javax.persistence.EntityManagerFactory;
//import javax.persistence.PersistenceUnit;
//
//@ApplicationScoped
//public class EntityManagerProducer {
//
//	@PersistenceUnit
//    private EntityManagerFactory factory;
//	
//	@RequestScoped
//	@Produces
//	public EntityManager criaEntityManager() {
//		return factory.createEntityManager();
//	}
//
//	public void finaliza(@Disposes EntityManager em) {
//		if(em.isOpen())
//			em.close();
//	}
//}
