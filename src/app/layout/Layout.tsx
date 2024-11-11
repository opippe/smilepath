import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import '../styles/globals.css'
import '../styles/embla.css'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header />

            <div className="flex">
                <Sidebar />

                <div className="flex-grow p-4 ml-64">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;