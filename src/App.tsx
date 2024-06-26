import { StoreProvider } from "./store/StoreContext";
import AppRoutes from "./router/routes.tsx";
import { SnackbarProvider } from "notistack";

const App: React.FC = () => (
  <SnackbarProvider>
    <StoreProvider>
      <AppRoutes />
    </StoreProvider>
  </SnackbarProvider>
);

export default App;
