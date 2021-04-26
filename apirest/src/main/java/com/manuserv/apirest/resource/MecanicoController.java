package com.manuserv.apirest.resource;

import com.manuserv.apirest.repository.MecanicoRepository;
import com.manuserv.apirest.repository.UsuarioRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/mecanicos"})
public class MecanicoController {
    
    @Autowired
    private MecanicoRepository repository;

    public MecanicoController(MecanicoRepository repository) {
        this.repository = repository;
    }
    
    @GetMapping
    public List findAll(){
       return repository.findAll();
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
