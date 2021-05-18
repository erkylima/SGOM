package com.manuserv.apirest.models;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Builder
@Table(name="ms_procedimento")
public class Procedimento implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    private TipoServico tiposervico;
    
    @Column(name="ordem")
    private int ordem;
    
    @Column(name="nome")
    private String nome;    
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }   

    public TipoServico getTiposervico() {
        return tiposervico;
    }

    public void setTiposervico(TipoServico tiposervico) {
        this.tiposervico = tiposervico;
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
    
    
   
    @Override
    public String toString() {
        return super.toString(); //To change body of generated methods, choose Tools | Templates.
    }

	public Procedimento(Long id, TipoServico tiposervico, int ordem, String nome) {
		this.id = id;
		this.tiposervico = tiposervico;
		this.ordem = ordem;
		this.nome = nome;
	}    
    
    
}
