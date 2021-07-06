package com.manuserv.apirest.repository;

import com.manuserv.apirest.models.Empresa;
import com.manuserv.apirest.models.Servico;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ServicoRepository extends JpaRepository<Servico, Long>{
    
	
	List<Servico> findByCarroId(Long id);
	


	
}
