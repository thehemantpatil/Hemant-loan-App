//package com.example.demo.security;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import com.example.demo.modal.User;
//import com.example.demo.modal.UserInterface;
//
//@Service
//public class MyUserDetailsService implements UserDetailsService {
//	
//	@Autowired
//	private UserInterface userInterface;
//	
//	@Override
//	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//		User user =	userInterface.findByEmail(email);
//		if(user == null) {
//			throw new UsernameNotFoundException("User Not found");
//		}
//		return new UserPrincipal(user);
//	}
//
//}
