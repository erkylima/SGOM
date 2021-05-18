package com.manuserv.apirest.resource;

import com.manuserv.apirest.message.request.ProcedimentoForm;
import com.manuserv.apirest.message.response.ResponseMessage;
import com.manuserv.apirest.models.Procedimento;
import com.manuserv.apirest.models.TipoServico;
import com.manuserv.apirest.repository.ProcedimentoRepository;
import com.manuserv.apirest.repository.TipoServicoRepository;

import lombok.extern.log4j.Log4j2;

import java.util.List;
import java.util.Optional;

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
@RequestMapping({"/procedimentos"})
public class ProcedimentoController {
    
    @Autowired
    private ProcedimentoRepository repository;
    
    @Autowired
    private TipoServicoRepository repositoryTipo; 
    

    public ProcedimentoController(ProcedimentoRepository repository) {
        this.repository = repository;
    }
         
    @GetMapping("/{tiposervico_id}/list")
    public List<?> findPorTipoServico(@PathVariable Long tiposervico_id){
       return repository.findByTiposervicoId(tiposervico_id);
    }
    
    @PostMapping("/add")
    public ResponseEntity<?> adicionarProcedimento(@Valid @RequestBody ProcedimentoForm procedimentoform){

    	if (procedimentoform.getNome().isEmpty() && procedimentoform.getOrdem()>0) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Todos os campos precisam ser preenchidos!"),
					HttpStatus.BAD_REQUEST);
		}
    	
    	Long id = new Long(0);
    	Optional<TipoServico> tiposervico = repositoryTipo.findById(procedimentoform.getTiposervico().getId());
    	Procedimento procedimento = new Procedimento(id, tiposervico.get(), procedimentoform.getOrdem(), procedimentoform.getNome());
    	
    	repository.save(procedimento);
    	return new ResponseEntity<>(new ResponseMessage("Procedimento criada com sucesso!"), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    Procedimento getProcedimento(@PathVariable Long id) {
      
      return repository.findById(id).get();
    }
    
    @DeleteMapping("/{id}")
    void delete(@PathVariable Long id) {      
    	repository.deleteById(id);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> editProcedimento(@PathVariable Long id, @Valid @RequestBody ProcedimentoForm procedimentoform){

    	if (procedimentoform.getNome().isEmpty() && procedimentoform.getOrdem()>0) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Todos os campos precisam ser preenchidos!"),
					HttpStatus.BAD_REQUEST);
		}
    	Procedimento procedimento = repository.findById(id).get();
    	procedimento.setNome(procedimentoform.getNome());
    	procedimento.setOrdem(procedimentoform.getOrdem());
    	repository.save(procedimento);
    	return new ResponseEntity<>(new ResponseMessage("Procedimento editada com sucesso!"), HttpStatus.OK);
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
