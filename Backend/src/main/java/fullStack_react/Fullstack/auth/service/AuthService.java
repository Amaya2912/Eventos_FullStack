package fullStack_react.Fullstack.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import fullStack_react.Fullstack.auth.dto.AuthResponse;
import fullStack_react.Fullstack.auth.dto.LoginRequest;
import fullStack_react.Fullstack.auth.dto.RegisterRequest;
import fullStack_react.Fullstack.security.JwtUtil;
import fullStack_react.Fullstack.usuario.model.Usuario;
import fullStack_react.Fullstack.usuario.repository.UsuarioRepository;

@Service
public class AuthService {
    @Autowired
    private UsuarioRepository repo;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private JwtUtil jwtUtil;

    public Usuario register(RegisterRequest request) {

        if (repo.findByEmail(request.getEmail()) != null) {
            throw new RuntimeException("Email ya registrado");
        }

        Usuario user = new Usuario();
        user.setEmail(request.getEmail());
        user.setNombre(request.getNombre());
        user.setPassword(encoder.encode(request.getPassword()));

        return repo.save(user);
    }

    public AuthResponse login(LoginRequest request) {

        Usuario user = repo.findByEmail(request.getEmail());

        if (user == null) {
            throw new RuntimeException("Usuario no encontrado");
        }

        if (!encoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Password incorrecto");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        return new AuthResponse(token);
    }
}
