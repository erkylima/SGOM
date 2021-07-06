package com.manuserv.apirest.message.request;

import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;

import com.manuserv.apirest.models.Carro;
import com.manuserv.apirest.models.TipoServico;

public class ServicoForm {

	private Long id;
	
	@NotBlank
    private Carro carro;
    
    @NotBlank
    private TipoServico tipoServico;
   
    private double preco;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Carro getCarro() {
		return carro;
	}

	public void setCarro(Carro carro) {
		this.carro = carro;
	}

	public TipoServico getTipoServico() {
		return tipoServico;
	}

	public void setTipoServico(TipoServico tipoServico) {
		this.tipoServico = tipoServico;
	}

	public double getPreco() {
		return preco;
	}

	public void setPreco(double preco) {
		this.preco = preco;
	}

    

	
	
}
