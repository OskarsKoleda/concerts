import { StoreProvider } from "./store/StoreContext";
import AppRoutes from "./router/routes.tsx";

const App: React.FC = () => (
  <StoreProvider>
    <AppRoutes />
  </StoreProvider>
);

export default App;
