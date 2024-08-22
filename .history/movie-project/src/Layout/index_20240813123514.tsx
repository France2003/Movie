import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
    console.log("DefaultLayout");
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow px-4 sm:px-6 lg:px-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default DefaultLayout;
