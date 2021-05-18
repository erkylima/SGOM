package com.manuserv.apirest.message.request;

import javax.validation.constraints.NotBlank;

public class EmpresaForm {

	private Long id;
	
	@NotBlank
	private String nome;
	
	@NotBlank
	private String cnpj;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}
	
	
	
}
