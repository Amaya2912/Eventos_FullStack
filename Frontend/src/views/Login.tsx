import LoginForm from '../components/LoginForm';
import AuthLayout from '../layout/AuthLayout';

export default function Login() {
  return (
    <AuthLayout
      switchText="No tienes cuenta?"
      switchLinkText="Registrate aqui"
      switchLinkTo="/register"
    >
      <LoginForm />
    </AuthLayout>
  );
}
