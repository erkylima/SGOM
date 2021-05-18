package com.manuserv.apirest.resource;

import com.manuserv.apirest.message.request.CarroForm;
import com.manuserv.apirest.message.request.EmpresaForm;
import com.manuserv.apirest.message.response.ResponseMessage;
import com.manuserv.apirest.models.Carro;
import com.manuserv.apirest.models.Empresa;
import com.manuserv.apirest.models.Usuario;
import com.manuserv.apirest.repository.CarroRepository;
import com.manuserv.apirest.repository.EmpresaRepository;

import lombok.extern.log4j.Log4j2;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@RequestMapping({"/carros"})
public class CarroController {
    
    @Autowired
    private CarroRepository repository;
    
    @Autowired
    private EmpresaRepository repositoryEmp;
    
    public CarroController(CarroRepository repository) {
        this.repository = repository;
    }
    
    @GetMapping("/{empresa_id}/list")
    public List<?> findPorEmpresa(@PathVariable Long empresa_id){
       return repository.findByEmpresaId(empresa_id);
    }   
    
    @PostMapping("/add")
    public ResponseEntity<?> adicionarCarro(@Valid @RequestBody CarroForm carroform){
    	if (carroform.getPlaca().isEmpty()  && carroform.getModelo().isEmpty()) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Todos os campos precisam ser preenchidos!"),
					HttpStatus.BAD_REQUEST);
		}

    	Optional<Empresa> empresa = repositoryEmp.findById(carroform.getEmpresa().getId());
    	    	
    	Carro carro = new Carro(carroform.getId(),empresa.get(),carroform.getModelo(),carroform.getPlaca(), carroform.getAno(), carroform.getMarca());
    	
    	repository.save(carro);
    	return new ResponseEntity<>(new ResponseMessage("Carro criado com sucesso!"), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    Carro getCarro(@PathVariable Long id) {
      
      return repository.findById(id).get();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> editCarro(@PathVariable Long id, @Valid @RequestBody CarroForm carroform){
    	
    	if (!repository.existsById(id) && !repositoryEmp.existsById(carroform.getEmpresa().getId())) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Carro não encontrado!"),
					HttpStatus.BAD_REQUEST);
		}
    	Carro carro = repository.findById(id).get();
    	carro.setAno(carroform.getAno());
    	carro.setMarca(carroform.getMarca());
    	carro.setModelo(carroform.getModelo());
    	carro.setPlaca(carroform.getPlaca());
    	repository.save(carro);
    	return new ResponseEntity<>(new ResponseMessage("Carro editado com sucesso!"), HttpStatus.OK);
    } 
//@Bean
//    CommandLineRunner init(UsuarioRepository repository) {
//        return args -> {
//            repository.deleteAll();
//            long id = 1;
//            LongStream.range(1, 11)
//                    .mapToObj(i -> {
//                        Usuario c = new Usuario();
//                        c.setNome("Érky Lima");
//                        c.setEmail("erkylima@gmail.com");
//                        c.setId(id);
//                        c.setPerfil(1);
//                        c.setSenha("1234");
//                        c.setUsuario("erky");
//                        return c;
//                    })
//                    .map(v -> repository.save(v))
//                    .forEach(System.out::println);
//        };
//    };
}
