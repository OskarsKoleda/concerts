import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./router/routes.tsx";
import { Header } from "./components/Header/header.tsx";
import { NavigationBar } from "./components/NavigationBar/navigationBar.tsx";

const App: React.FC = () => (
  <BrowserRouter>
    <Header />
    <NavigationBar />
    <AppRoutes />
  </BrowserRouter>
);

export default App;
