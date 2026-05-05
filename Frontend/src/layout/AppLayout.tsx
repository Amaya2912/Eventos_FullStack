import { Outlet, useNavigate } from "react-router-dom";

export default function AppLayout() {
  const navigate = useNavigate();
  const savedUserName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");
  const userName = savedUserName && savedUserName !== "undefined"
    ? savedUserName
    : userEmail?.split("@")[0] || "Usuario";
  const userInitial = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <>
      <header className="border-b border-indigo-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
              EV
            </div>
            <div>
              <p className="text-lg font-bold text-indigo-950">Eventos</p>
              <p className="text-sm text-gray-500">Panel administrativo</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-sm font-bold text-indigo-700">
              {userInitial}
            </div>

            <div className="text-right">
              <p className="text-sm font-semibold text-indigo-950">{userName}</p>
              {userEmail && <p className="hidden text-xs text-gray-500 sm:block">{userEmail}</p>}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Cerrar sesion
            </button>
          </div>
        </div>
      </header>

      <section className="p-5 mx-auto mt-10 max-w-5xl">
        <Outlet />
      </section>

      <footer className="py-5">
        <p className="text-center">&copy; 2025 Organizador de eventos. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
