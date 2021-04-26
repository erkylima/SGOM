package com.manuserv.apirest.repository;

import com.manuserv.apirest.models.Administrador;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AdministradorRepository extends JpaRepository<Administrador, Long>{
    
}
