import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./router/routes.tsx";
import { Header } from "./components/Header/header.tsx";
import { DrawerNavigation } from "./components/DrawerNavigation/drawerNavigation.tsx";

const App: React.FC = () => (
  <BrowserRouter>
    <Header />
    <DrawerNavigation />
    <AppRoutes />
  </BrowserRouter>
);

export default App;
