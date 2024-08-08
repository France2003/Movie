import Header from "../Header";
import Footer from "../Footer";

import { Outlet } from "react-router-dom";


const DefaultLayout = () => {
    console.log("DefaultLayout");
    return (
        <div className="container mx-auto">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default DefaultLayout;