package com.manuserv.apirest.message.request;

import javax.validation.constraints.NotBlank;

import com.manuserv.apirest.models.Empresa;

public class UsuarioForm {

	private Long id;
	
	@NotBlank
	private String nome;
	
	@NotBlank
	private Empresa empresa;

	@NotBlank 
	private String email;
	
	@NotBlank 
	private String username;
	
	@NotBlank 
	private String password;
	
	@NotBlank
	private String authorities;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAuthorities() {
		return authorities;
	}

	public void setAuthorities(String authorities) {
		this.authorities = authorities;
	}
	
	
	
	
	
	
}
