import { SnackbarProvider } from "notistack";

import { StoreProvider } from "./store/StoreContext";
import AppRoutes from "./router/routes.tsx";

const App: React.FC = () => (
  <SnackbarProvider>
    <StoreProvider>
      <AppRoutes />
    </StoreProvider>
  </SnackbarProvider>
);

export default App;
