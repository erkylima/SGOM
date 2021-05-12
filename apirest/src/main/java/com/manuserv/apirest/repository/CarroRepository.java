package com.manuserv.apirest.repository;

import com.manuserv.apirest.models.Carro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarroRepository extends JpaRepository<Carro, Long>{
    
}
