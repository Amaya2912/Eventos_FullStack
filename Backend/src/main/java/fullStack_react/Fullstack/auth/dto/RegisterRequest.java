package fullStack_react.Fullstack.auth.dto;

import jakarta.validation.constraints.*;

public class RegisterRequest {

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String nombre;

    @NotBlank
    @Size(min = 8)
    private String password;



    public RegisterRequest() {
    }

    

    public RegisterRequest(@Email @NotBlank String email, @NotBlank String nombre,
            @NotBlank @Size(min = 8) String password) {
        this.email = email;
        this.nombre = nombre;
        this.password = password;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    
}