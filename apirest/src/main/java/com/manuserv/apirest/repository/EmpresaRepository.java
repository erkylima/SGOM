package com.manuserv.apirest.repository;

import com.manuserv.apirest.models.Empresa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Long>{
    
	Empresa findByNome(String nome);
	Empresa findByCnpj(String cnpj);
	

    
}
