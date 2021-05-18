package com.manuserv.apirest.repository;

import com.manuserv.apirest.models.Usuario;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    	
	Optional<Usuario> findByUsername(String username);
	Usuario findByEmail(String username);
	Usuario findByEmpresaId(Long id);
	Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    
}
