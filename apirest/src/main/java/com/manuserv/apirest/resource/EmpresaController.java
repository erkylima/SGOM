package com.manuserv.apirest.resource;

import com.manuserv.apirest.message.request.EmpresaForm;
import com.manuserv.apirest.message.response.ResponseMessage;
import com.manuserv.apirest.models.Empresa;
import com.manuserv.apirest.models.Usuario;
import com.manuserv.apirest.repository.EmpresaRepository;
import com.manuserv.apirest.repository.UsuarioRepository;

import lombok.extern.log4j.Log4j2;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Log4j2
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping({"/empresas"})
public class EmpresaController {
    
    @Autowired
    private EmpresaRepository repository;
    
   @Autowired
   private UsuarioRepository repositoryUsuario;


    public EmpresaController(EmpresaRepository repository) {
        this.repository = repository;
    }
    
    @GetMapping("/list")
    public List findAll(){
       return repository.findAll();
    }    
    
    @PostMapping("/add")
    public ResponseEntity<?> adicionarEmpresa(@Valid @RequestBody EmpresaForm empresaform){

    	if (empresaform.getNome().isEmpty() && empresaform.getNome().isEmpty()) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Todos os campos precisam ser preenchidos!"),
					HttpStatus.BAD_REQUEST);
		}
    	
    	Long id = new Long(0);
    	Empresa empresa = new Empresa(id,empresaform.getNome(),empresaform.getCnpj());
    	
    	repository.save(empresa);
    	return new ResponseEntity<>(new ResponseMessage("Empresa criada com sucesso!"), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    Empresa getEmpresa(@PathVariable Long id) {
      
      return repository.findById(id).get();
    }
    
    @DeleteMapping("/{id}")
    void delete(@PathVariable Long id) {      
    	repository.deleteById(id);
    }   
    
    @PutMapping("/{id}")
    public ResponseEntity<?> editEmpresa(@PathVariable Long id, @Valid @RequestBody EmpresaForm empresaform){

    	if (empresaform.getNome().isEmpty() && empresaform.getNome().isEmpty()) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Todos os campos precisam ser preenchidos!"),
					HttpStatus.BAD_REQUEST);
		}
    	Empresa empresa = repository.findById(id).get();
    	empresa.setNome(empresaform.getNome());
    	empresa.setCnpj(empresaform.getCnpj());
    	Usuario usuario = repositoryUsuario.findByEmpresaId(id);
    	usuario.setNome(empresa.getNome());
    	repositoryUsuario.save(usuario);
    	repository.save(empresa);
    	return new ResponseEntity<>(new ResponseMessage("Empresa editada com sucesso!"), HttpStatus.OK);
    }
    
//@Bean
//    CommandLineRunner init(EmpresaRepository repository) {
//        return args -> {
//            repository.deleteAll();
//            LongStream.range(1, 11)
//                    .mapToObj(i -> {
//                        Empresa c = new Empresa();
//                        c.setNome("Contact " + i);
//                        c.setCpnj("5411541");
//                        return c;
//                    })
//                    .map(v -> repository.save(v))
//                    .forEach(System.out::println);
//        };
//    }
}
