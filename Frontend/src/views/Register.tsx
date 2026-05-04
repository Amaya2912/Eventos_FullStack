import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">


        <div>
          <h1 className="text-5xl font-bold text-indigo-900 mb-6">
            ¡Bienvenido!
          </h1>
          <p className="text-xl text-indigo-700 font-semibold mb-6">
            Sistema de gestión de eventos
          </p>
          <p className="text-gray-600 leading-relaxed text-base mb-8">
            Gestiona todos tu eventos desde una sola cuenta. Crea tu perfil y accede a la plataforma con acceso seguro.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-lg">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-indigo-900">Espacios listos para tu jornada</h3>
                <p className="text-gray-600 text-sm">Acceso inmediato a todos los espacios disponibles</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-lg">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-indigo-900">Gestión segura</h3>
                <p className="text-gray-600 text-sm">Acceso seguro y protección de datos</p>
              </div>
            </div>
          </div>
        </div>



        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <p className="text-center mb-6 text-gray-600">
            <span className="text-sm">¿Ya tienes cuenta? <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-semibold">Inicia sesión aquí</Link></span>
          </p>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}