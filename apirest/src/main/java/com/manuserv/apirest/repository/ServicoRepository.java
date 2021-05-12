package com.manuserv.apirest.repository;

import com.manuserv.apirest.models.Servico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServicoRepository extends JpaRepository<Servico, Long>{
    
}
