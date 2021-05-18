package com.manuserv.apirest.message.request;

import com.manuserv.apirest.models.TipoServico;

public class ProcedimentoForm {

	private Long id;
	
    private TipoServico tiposervico;

	private int ordem;
	private String nome;

	

	public ProcedimentoForm(Long id, TipoServico tiposervico, int ordem, String nome) {
		this.id = id;
		this.tiposervico = tiposervico;
		this.ordem = ordem;
		this.nome = nome;

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getOrdem() {
		return ordem;
	}

	public void setOrdem(int ordem) {
		this.ordem = ordem;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public TipoServico getTiposervico() {
		return tiposervico;
	}

	public void setTiposervico(TipoServico tiposervico) {
		this.tiposervico = tiposervico;
	}

	 


	
	
}
