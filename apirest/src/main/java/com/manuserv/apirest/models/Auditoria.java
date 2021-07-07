package com.manuserv.apirest.models;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@NoArgsConstructor
@Table(name="ms_auditoria")
public class Auditoria implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
//    @OneToMany
//    @JoinColumn(name = "empresa_id")
//    private Set<Carro> carro;
    
    @Column(name="tabela")
    private String tabela;
    
    @Column(name="acao")
    private String acao;
    
    @Column(name="usuario")
    private String usuario;
    
    @Column(name="data_acao")
    private Date data_acao; 
    
    @Column(name="antes")
    private String antes;
    
    @Column(name="depois")
    private String depois;
    
}
