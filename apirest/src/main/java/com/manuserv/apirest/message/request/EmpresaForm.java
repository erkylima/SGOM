package com.manuserv.apirest.message.request;

import javax.validation.constraints.NotBlank;

public class EmpresaForm {

	private Long id;
	
	@NotBlank
	private String nome;
	
	@NotBlank
	private String cnpj;

	@NotBlank 
	private String email;
	
	@NotBlank 
	private String usuario;
	
	@NotBlank 
	private String senha;
	
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}
	
	
	
	
}
