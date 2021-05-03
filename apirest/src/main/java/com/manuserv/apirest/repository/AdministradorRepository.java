package com.manuserv.apirest.repository;

import com.manuserv.apirest.models.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdministradorRepository extends JpaRepository<Empresa, Long>{
    
}
