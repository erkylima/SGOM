package com.manuserv.apirest.message.request;

import com.manuserv.apirest.models.Empresa;

public class CarroForm {

	private Long id;
	
    private Empresa empresa;

	private String modelo;
	private String placa;

	private int ano;
	private String marca;
	

	public CarroForm(Long id, Empresa empresa, String modelo, String placa, int ano, String marca) {
		this.id = id;
		this.empresa = empresa;
		this.modelo = modelo;
		this.placa = placa;
		this.ano = ano;
		this.marca = marca;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getAno() {
		return ano;
	}

	public void setAno(int ano) {
		this.ano = ano;
	}

	public String getModelo() {
		return modelo;
	}

	public void setModelo(String modelo) {
		this.modelo = modelo;
	}

	public String getPlaca() {
		return placa;
	}

	public void setPlaca(String placa) {
		this.placa = placa;
	}

	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}

	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}


	
	
}
