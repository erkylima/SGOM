package com.manuserv.apirest.resource;

import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.manuserv.apirest.message.request.ServicoForm;
import com.manuserv.apirest.message.request.UsuarioForm;
import com.manuserv.apirest.message.response.ResponseMessage;
import com.manuserv.apirest.models.Carro;
import com.manuserv.apirest.models.Empresa;
import com.manuserv.apirest.models.Servico;
import com.manuserv.apirest.models.TipoServico;
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
import javax.validation.Valid;
import org.apache.catalina.User;
import org.apache.catalina.mapper.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
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
@CrossOrigin
@Log4j2
@RequestMapping({ "/usuarios" })
public class UsuarioController {

	@Value("${jwt.secret}")
	private String secret;

	@Autowired
	private UsuarioRepository repository;

	public UsuarioController(UsuarioRepository repository) {
		this.repository = repository;
	}

	@PostMapping("/login")
	public ObjectNode login(@Parameter(hidden = true) @RequestBody Usuario user) {
		Optional<Usuario> usuario = repository.findByUsername(user.getUsername());
//    	log.info("Usuario: " + usuario.getEmail());
//    	log.info("Senha: " + usuario.getPassword());
//    	log.info("Tokens: " + generateToken(usuario));
		ObjectNode map = JsonNodeFactory.instance.objectNode();
		map.put("usuario", usuario.get().getUsername());
		return map;
//    	return "{\"usuario\":\"" + usuario.getUsername() + "\" ,\n \"token\":\"" + usuario.getToken() + "\"}";

	}

	@GetMapping("/{empresa_id}/list")
	public List<?> findPorEmpresa(@PathVariable Long empresa_id) {
		return (List<?>) repository.findByEmpresaId(empresa_id);
	}

	@PostMapping("/add")
	public ResponseEntity<?> adicionarUsuario(@Valid @RequestBody UsuarioForm usuarioform) {
		if (usuarioform.getEmpresa().getId().toString().equals("0") && usuarioform.getEmail().isEmpty()) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Todos os campos precisam ser preenchidos!"),
					HttpStatus.BAD_REQUEST);
		}

		Long id = new Long(0);

		Empresa empresa = new Empresa(usuarioform.getEmpresa().getId(), null, null);
		Usuario usuario = new Usuario(null, usuarioform.getNome(), usuarioform.getUsername(), usuarioform.getPassword(),
				usuarioform.getEmail(), usuarioform.getAuthorities());

		repository.save(usuario);
		return new ResponseEntity<>(new ResponseMessage("Usuario criado com sucesso!"), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	Usuario getServico(@PathVariable Long id) {
		return repository.findById(id).get();
	}

	@DeleteMapping("/{id}")
	void delete(@PathVariable Long id) {
		repository.deleteById(id);
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> editServico(@PathVariable Long id, @Valid @RequestBody UsuarioForm usuarioform) {
		if (usuarioform.getEmpresa().getId().toString().equals("0") && usuarioform.getEmail().isEmpty()) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Todos os campos precisam ser preenchidos!"),
					HttpStatus.BAD_REQUEST);
		}

		Usuario usuario = repository.findById(usuarioform.getId()).get();
		usuario.setNome(usuarioform.getNome());
		usuario.setUsername(usuario.getUsername());
		usuario.setPassword(usuarioform.getPassword());
		usuario.setEmail(usuarioform.getEmail());
		
		repository.save(usuario);
		return new ResponseEntity<>(new ResponseMessage("Procedimento editada com sucesso!"), HttpStatus.OK);
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
