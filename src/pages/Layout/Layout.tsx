import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import { NavigationBar } from "../../components/NavigationBar/navigationBar";

function Layout() {
  return (
    <>
      <Header />
      <NavigationBar />
      <Outlet />
    </>
  );
}

export default Layout;
