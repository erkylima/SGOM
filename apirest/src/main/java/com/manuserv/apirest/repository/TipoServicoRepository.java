package com.manuserv.apirest.repository;

import com.manuserv.apirest.models.TipoServico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TipoServicoRepository extends JpaRepository<TipoServico, Long>{
 
	TipoServico findByNome(String nome);	
	
}
