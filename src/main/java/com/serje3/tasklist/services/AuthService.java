package com.serje3.tasklist.services;

import com.serje3.tasklist.dto.UserPrincipal;
import com.serje3.tasklist.entities.User;
import com.serje3.tasklist.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JdbcUserDetailsManager userDetailsManager;

    public Optional<User> createUser(String username, String password1, String password2) {
        if (!isUsernameUnique(username)) {
            throw new IllegalArgumentException("Username must be unique");
        }
        validatePasswords(password1, password2);
        UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                .username(username)
                .password(passwordEncoder.encode(password1))
                .build();
        userDetailsManager.createUser(userDetails);
        return userRepository.findByUsername(username);
    }

    public Optional<User> getUserByPrincipal(UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId());
    }

    private boolean isUsernameUnique(String username) {
        return userRepository.findByUsername(username).isEmpty();
    }

    private void validatePasswords(String password1, String password2) {
        if (!password1.equals(password2)) {
            throw new IllegalArgumentException("Passwords do not match");
        }
    }
}
