package com.manuserv.apirest.message.response;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public class JwtResponse {
	
	private String token;
	private String type = "Bearer";
	private String username;
	private String nome;
	private Collection<? extends GrantedAuthority> authorities;
	private String empresaId;
	
	public JwtResponse(String accessToken, String username, String nome, Collection<? extends GrantedAuthority> authorities, String empresaId) {
		this.token = accessToken;
		this.username = username;
		this.nome = nome;
		this.authorities = authorities;
		this.empresaId = empresaId;
	}

	public String getAccessToken() {
		return token;
	}

	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}

	public String getTokenType() {
		return type;
	}
	
	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

	public String getEmpresaId() {
		return empresaId;
	}

	public void setEmpresaId(String empresaId) {
		this.empresaId = empresaId;
	}
    
    
    
}
