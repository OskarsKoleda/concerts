import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/header_new";
import { NavigationBar } from "../../components/NavigationBar/navigationBar_new";

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
