import BreakingNews from "@/components/BreakingNews";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";

const MainLayout = ({children}) => {
    return (
        <>
            <Header />
            <BreakingNews/>
            <NavBar />
            {children}
        </>
    );
};

export default MainLayout;