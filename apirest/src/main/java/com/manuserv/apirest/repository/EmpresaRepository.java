package com.manuserv.apirest.repository;

import com.manuserv.apirest.models.Empresa;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpresaRepository extends JpaRepository<Empresa, Long>{
    
	Empresa findByNome(String nome);

    
}
