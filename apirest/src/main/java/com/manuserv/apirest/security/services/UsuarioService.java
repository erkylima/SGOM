package com.manuserv.apirest.security.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.manuserv.apirest.models.Usuario;
import com.manuserv.apirest.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class UsuarioService implements UserDetailsService{

	private final UsuarioRepository usuarioRepository;
	
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) {
		Usuario usuario = usuarioRepository.findByUsername(username).orElseThrow(
				() -> new UsernameNotFoundException("User Not Found with -> username or email : " + username)); 
		
		return UserPrinciple.build(usuario);
	}

}
