import RegisterForm from '../components/RegisterForm';
import AuthLayout from '../layout/AuthLayout';

export default function Register() {
  return (
    <AuthLayout
      switchText="Ya tienes cuenta?"
      switchLinkText="Inicia sesion aqui"
      switchLinkTo="/login"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
