package com.manuserv.apirest.repository;

import com.manuserv.apirest.models.Carro;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CarroRepository extends JpaRepository<Carro, Long>{
	
	
	List<Carro> findByEmpresaId(Long id);
	Carro findByPlaca(String placa);
	Carro findByAno(String ano);
	
}
