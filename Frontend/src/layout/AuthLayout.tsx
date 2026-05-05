import { Link } from 'react-router-dom';

type AuthLayoutProps = {
  switchText: string;
  switchLinkText: string;
  switchLinkTo: string;
  children: React.ReactNode;
};

export default function AuthLayout({ switchText, switchLinkText, switchLinkTo, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold text-indigo-900 mb-6">
            Bienvenido
          </h1>
          <p className="text-xl text-indigo-700 font-semibold mb-6">
            Sistema de gestion de eventos
          </p>
          <p className="text-gray-600 leading-relaxed text-base mb-8">
            Gestiona todos tus eventos desde una sola cuenta. Crea tu perfil y accede a la plataforma con acceso seguro.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-indigo-900">Gestiona tus eventos</h3>
                <p className="text-gray-600 text-sm">Manejo personalizado de todos tus eventos por venir</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-indigo-900">Gestion segura</h3>
                <p className="text-gray-600 text-sm">Acceso seguro y proteccion de datos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <p className="text-center mb-6 text-gray-600">
            <span className="text-sm">
              {switchText}{' '}
              <Link to={switchLinkTo} className="text-indigo-600 hover:text-indigo-800 font-semibold">
                {switchLinkText}
              </Link>
            </span>
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}
