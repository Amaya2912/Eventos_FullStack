import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
        {/* <header className=" py-5 bg-gray-800">
            <div className="flex flex-col items-center justify-between w-full px-10 mx-auto max-w-screen-2xl lg:flex-row">
                <div className="w-64">
                    <Link to="/"> 
                    </Link>
                </div>

            </div>
        </header> */}

        <section className="p-5 mx-auto mt-10 max-w-5xl">
            <Outlet/> 
        </section>

        <footer className="py-5">
            <p className="text-center">&copy; 2025 Coworking. All rights reserved.</p>
        </footer>    
    
    </>
  )
}
