package com.manuserv.apirest.message.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class RecoveryPasswordForm {

    @NotBlank
    @Size(min=3, max = 60)
    private String email;
    
    @NotBlank
    @Size(min=3, max = 60)
    private String cnpj;

    @NotBlank
    @Size(min=3, max = 60)
    private String novaSenha;
    

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public String getNovaSenha() {
		return novaSenha;
	}

	public void setNovaSenha(String novaSenha) {
		this.novaSenha = novaSenha;
	}
    
    
	
}
