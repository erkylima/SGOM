package com.manuserv.apirest.resource;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.manuserv.apirest.models.Usuario;
import com.manuserv.apirest.repository.UsuarioRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.extern.log4j.Log4j2;

import java.security.Principal;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.catalina.mapper.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@Log4j2
@RequestMapping({"/usuarios"})
public class UsuarioController {
    
	@Value("${jwt.secret}")
    private String secret;
	
    @Autowired
    private UsuarioRepository repository;

    public UsuarioController(UsuarioRepository repository) {
        this.repository = repository;
    }
    
    @PostMapping("/login")
    public ObjectNode login(@Parameter(hidden=true) @RequestBody Usuario user) {
    	Optional<Usuario> usuario = repository.findByUsername(user.getUsername());
//    	log.info("Usuario: " + usuario.getEmail());
//    	log.info("Senha: " + usuario.getPassword());
//    	log.info("Tokens: " + generateToken(usuario));
    	ObjectNode map = JsonNodeFactory.instance.objectNode();
        map.put("usuario", usuario.get().getUsername());
        return map;
//    	return "{\"usuario\":\"" + usuario.getUsername() + "\" ,\n \"token\":\"" + usuario.getToken() + "\"}";
		
    }
}

        
    
        
//@Bean
//    CommandLineRunner init(UsuarioRepository repository) {
//        return args -> {
//            repository.deleteAll();
//            long id = 1;
//            LongStream.range(1, 2)
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

