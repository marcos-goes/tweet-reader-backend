package com.mgoes.tweetreader.domain;

public class DescricaoQtdeVO {

	private String descricao;
	
	private Integer quantidade;

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Integer getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}
	
	public DescricaoQtdeVO(){
		
	}
	
	public DescricaoQtdeVO(String descricao, Integer quantidade){
		this.descricao = descricao;
		this.quantidade = quantidade;
	}
}
