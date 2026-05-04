package fullStack_react.Fullstack.auth.controller;

import org.springframework.web.bind.annotation.RestController;

import fullStack_react.Fullstack.auth.dto.AuthResponse;
import fullStack_react.Fullstack.auth.dto.LoginRequest;
import fullStack_react.Fullstack.auth.dto.RegisterRequest;
import fullStack_react.Fullstack.auth.service.AuthService;
import fullStack_react.Fullstack.usuario.model.Usuario;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController

@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/register")
    public Usuario register(@Valid @RequestBody RegisterRequest request) {
        return service.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return service.login(request);
    }
}
