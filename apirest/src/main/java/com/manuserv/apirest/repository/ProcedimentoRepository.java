package com.manuserv.apirest.repository;

import com.manuserv.apirest.models.Procedimento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcedimentoRepository extends JpaRepository<Procedimento, Long>{
    
}
