package fullStack_react.Fullstack.usuario.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import fullStack_react.Fullstack.usuario.model.Usuario;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    Usuario findByEmailIgnoreCase(String email);
}
