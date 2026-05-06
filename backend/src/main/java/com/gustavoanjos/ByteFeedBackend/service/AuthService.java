package com.gustavoanjos.ByteFeedBackend.service;

import com.gustavoanjos.ByteFeedBackend.domain.User;
import com.gustavoanjos.ByteFeedBackend.repository.UserRepository;
import com.gustavoanjos.ByteFeedBackend.web.dto.AuthResponse;
import com.gustavoanjos.ByteFeedBackend.web.dto.LoginRequest;
import com.gustavoanjos.ByteFeedBackend.web.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.email())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email já cadastrado.");
        }
        if (userRepository.existsByHandle(req.handle())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Handle @" + req.handle() + " já está em uso.");
        }

        User user = User.builder()
                .name(req.name())
                .handle(req.handle())
                .email(req.email())
                .password(passwordEncoder.encode(req.password()))
                .build();

        userRepository.save(user);
        String token = jwtService.generateToken(user);
        return new AuthResponse(token, user.getName(), user.getHandle(), user.getAvatarUrl());
    }

    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciais inválidas."));

        if (!passwordEncoder.matches(req.password(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenciais inválidas.");
        }

        String token = jwtService.generateToken(user);
        return new AuthResponse(token, user.getName(), user.getHandle(), user.getAvatarUrl());
    }
}
