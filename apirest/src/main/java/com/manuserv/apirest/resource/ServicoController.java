package com.manuserv.apirest.resource;

import com.manuserv.apirest.repository.EmpresaRepository;
import com.manuserv.apirest.repository.CarroRepository;
import com.manuserv.apirest.repository.ServicoRepository;
import java.util.List;
import java.util.stream.LongStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/servicos"})
public class ServicoController {
    
    @Autowired
    private ServicoRepository repository;

    public ServicoController(ServicoRepository repository) {
        this.repository = repository;
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
