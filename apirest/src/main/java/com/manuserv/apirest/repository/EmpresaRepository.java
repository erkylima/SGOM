/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.manuserv.apirest.repository;

import com.manuserv.apirest.models.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author kiinh
 */
public interface EmpresaRepository extends JpaRepository<Empresa, Long>{
    
    
    
}
