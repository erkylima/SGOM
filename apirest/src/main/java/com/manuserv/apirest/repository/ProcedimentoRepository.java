package com.manuserv.apirest.repository;

import com.manuserv.apirest.models.Carro;
import com.manuserv.apirest.models.Procedimento;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcedimentoRepository extends JpaRepository<Procedimento, Long>{
    
	List<Procedimento> findByTiposervicoId(Long id);
	
}
