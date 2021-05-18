package com.manuserv.apirest.resource;
import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.manuserv.apirest.message.request.LoginForm;
import com.manuserv.apirest.message.request.RecoveryPasswordForm;
import com.manuserv.apirest.message.request.SignUpForm;
import com.manuserv.apirest.message.response.JwtResponse;
import com.manuserv.apirest.message.response.ResponseMessage;
import com.manuserv.apirest.models.Empresa;
import com.manuserv.apirest.models.Usuario;
import com.manuserv.apirest.repository.EmpresaRepository;
import com.manuserv.apirest.repository.UsuarioRepository;
import com.manuserv.apirest.security.jwt.JwtProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@Log4j2
@RequestMapping("/api/auth")
public class AuthRestAPIs {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UsuarioRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtProvider jwtProvider;
	
	@Autowired
	EmpresaRepository empresaRep ;


	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = jwtProvider.generateJwtToken(authentication);
		UserDetails userDetails = (UserDetails) authentication.getPrincipal();
		Usuario usuario = userRepository.findByUsername(loginRequest.getUsername()).get();
		return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), usuario.getNome(),	 userDetails.getAuthorities()));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpForm signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken!"),
					HttpStatus.BAD_REQUEST);
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Email is already in use!"),
					HttpStatus.BAD_REQUEST);
		}

		// Creating user's account 
		Empresa empresa = new Empresa();
		empresa.setNome(signUpRequest.getName());
		empresa.setCnpj(String.valueOf(signUpRequest.getCnpj()));
		empresaRep.save(empresa);
		Usuario user = new Usuario(empresa, signUpRequest.getName(), signUpRequest.getUsername(), encoder.encode(signUpRequest.getPassword()), signUpRequest.getEmail(), signUpRequest.getRole());


		userRepository.save(user);

		return new ResponseEntity<>(new ResponseMessage("User registered successfully!"), HttpStatus.OK);
	}
	
	@PostMapping("/passrecovery")
	public ResponseEntity<?> registerUser(@Valid @RequestBody RecoveryPasswordForm recoveryRequest) {
		if (!userRepository.existsByEmail(recoveryRequest.getEmail())) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Email não cadastrado!"),
					HttpStatus.BAD_REQUEST);
		}
		

		if(userRepository.existsByEmail(recoveryRequest.getEmail()) && !empresaRep.findByCnpj(recoveryRequest.getCnpj()).getCnpj().isEmpty()) {
			Usuario usuario = userRepository.findByEmail(recoveryRequest.getEmail());
			log.info("EMAIL" + recoveryRequest.getNovaSenha());
			usuario.setPassword(encoder.encode(recoveryRequest.getNovaSenha()));
			userRepository.save(usuario);
		}

		return new ResponseEntity<>(new ResponseMessage("User registered successfully!"), HttpStatus.OK);
	}
}