package com.manuserv.apirest.resource;

import com.manuserv.apirest.message.request.EmpresaForm;
import com.manuserv.apirest.message.request.TipoServicoForm;
import com.manuserv.apirest.message.response.ResponseMessage;
import com.manuserv.apirest.models.Empresa;
import com.manuserv.apirest.models.TipoServico;
import com.manuserv.apirest.models.Usuario;
import com.manuserv.apirest.repository.TipoServicoRepository;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/tipo_servicos"})
public class TipoServicoController {
    
    @Autowired
    private TipoServicoRepository repository;

    public TipoServicoController(TipoServicoRepository repository) {
        this.repository = repository;
    }
         

    @GetMapping("/list")
    public List findAll(){
       return repository.findAll();
    }    
    
    @PostMapping("/add")
    public ResponseEntity<?> adicionarEmpresa(@Valid @RequestBody TipoServicoForm tiposervicoform){

    	if (tiposervicoform.getNome().isEmpty() && tiposervicoform.getDescricao().isEmpty()) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Todos os campos precisam ser preenchidos!"),
					HttpStatus.BAD_REQUEST);
		}
    	
    	Long id = new Long(0);
    	TipoServico tiposervico = new TipoServico(id,tiposervicoform.getNome(),tiposervicoform.getDescricao());
    	
    	repository.save(tiposervico);
    	return new ResponseEntity<>(new ResponseMessage("Empresa criada com sucesso!"), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    TipoServico getTipoServico(@PathVariable Long id) {
      
      return repository.findById(id).get();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> editEmpresa(@PathVariable Long id, @Valid @RequestBody TipoServicoForm tiposervicoform){

    	if (tiposervicoform.getNome().isEmpty() && tiposervicoform.getDescricao().isEmpty()) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Todos os campos precisam ser preenchidos!"),
					HttpStatus.BAD_REQUEST);
		}
    	TipoServico tiposervico = repository.findById(id).get();
    	tiposervico.setNome(tiposervicoform.getNome());
    	tiposervico.setDescricao(tiposervicoform.getDescricao());
    	repository.save(tiposervico);
    	return new ResponseEntity<>(new ResponseMessage("TipoServico editada com sucesso!"), HttpStatus.OK);
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
