package com.manuserv.apirest.resource;

import com.manuserv.apirest.message.request.ProcedimentoForm;
import com.manuserv.apirest.message.request.ServicoForm;
import com.manuserv.apirest.message.request.TipoServicoForm;
import com.manuserv.apirest.message.response.ResponseMessage;
import com.manuserv.apirest.models.Carro;
import com.manuserv.apirest.models.Procedimento;
import com.manuserv.apirest.models.Servico;
import com.manuserv.apirest.models.TipoServico;
import com.manuserv.apirest.repository.CarroRepository;
import com.manuserv.apirest.repository.ServicoRepository;
import com.manuserv.apirest.repository.TipoServicoRepository;

import jdk.internal.org.jline.utils.Log;
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
@RequestMapping({"/servicos"})
public class ServicoController {
    
    @Autowired
    private ServicoRepository repository;
    
    @Autowired
    private CarroRepository carroRepository;
    
    @Autowired
    private TipoServicoRepository tipoServicoRepository;

    public ServicoController(ServicoRepository repository) {
        this.repository = repository;
    }
         
    @GetMapping("/{carro_id}/list")
    public List<?> findPorCarro(@PathVariable Long carro_id){
       return (List<?>) repository.findByCarroId(carro_id);
    }
    
    @PostMapping("/add")
    public ResponseEntity<?> adicionarServico(@Valid @RequestBody ServicoForm servicoform){
    	if (servicoform.getCarro().getId().toString().equals("0") && servicoform.getTipoServico().getId().toString().equals("0")) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Todos os campos precisam ser preenchidos!"),
					HttpStatus.BAD_REQUEST);
		}
    	
    	Long id = new Long(0);

    	Carro carro = carroRepository.findById(servicoform.getCarro().getId()).get();
    	TipoServico tipoServico = tipoServicoRepository.findById(servicoform.getTipoServico().getId()).get();
    	Servico servico = new Servico(id, carro, tipoServico, servicoform.getPreco());
    	
    	repository.save(servico);
    	return new ResponseEntity<>(new ResponseMessage("TipoServico criada com sucesso!"), HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    Servico getServico(@PathVariable Long id) {
      
      return repository.findById(id).get();
    }

    @DeleteMapping("/{id}")
    void delete(@PathVariable Long id) {      
    	repository.deleteById(id);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> editServico(@PathVariable Long id, @Valid @RequestBody ServicoForm servicoForm){
    	if (!(servicoForm.getCarro().getId() > 0) && !(servicoForm.getId() > 0)) {

			return new ResponseEntity<>(new ResponseMessage("Fail -> Todos os campos precisam ser preenchidos!"),
					HttpStatus.BAD_REQUEST);
		}
    	Carro carro = carroRepository.findById(servicoForm.getCarro().getId()).get();
    	TipoServico tipoServico = tipoServicoRepository.findById(servicoForm.getTipoServico().getId()).get();
    	
    	Servico servico = repository.findById(servicoForm.getId()).get();
    	servico.setPreco(servicoForm.getPreco());
    	servico.setTipoServico(tipoServico);   
    	
    	repository.save(servico);
    	return new ResponseEntity<>(new ResponseMessage("Procedimento editada com sucesso!"), HttpStatus.OK);
    }
}
