package com.manuserv.apirest.message.request;
import javax.validation.constraints.*;

public class SignUpForm {
	
	@NotBlank
	private String empresa;
	
    @NotBlank
    @Size(min = 3, max = 50)
    private String name;

    @NotBlank
    @Size(min = 3, max = 50)
    private String username;
    
    @NotBlank
    private int cnpj;

	@NotBlank
    @Size(max = 60)
    @Email
    private String email;
    
	@NotBlank	
    private String role;
    
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
    
    

	public String getEmpresa() {
		return empresa;
	}

	public void setEmpresa(String empresa) {
		this.empresa = empresa;
	}

	public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public int getCnpj() {
		return cnpj;
	}

	public void setCnpj(int cnpj) {
		this.cnpj = cnpj;
	}

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getRole() {
    	return this.role;
    }
    
    public void setRole(String role) {
    	this.role = role;
    }
}
