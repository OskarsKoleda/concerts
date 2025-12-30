import { Route, Routes } from "react-router-dom";

import Auth from "../pages/Auth/Auth.tsx";
import EventDetails from "../pages/EventDetails/EventDetails.tsx";
import EventForm from "../pages/EventForm/EventForm.tsx";
import Events from "../pages/Events/Events.tsx";
import Homepage from "../pages/Homepage/Homepage.tsx";
import ProtectedLayout from "../pages/Layouts/ProtectedLayout.tsx";

import EventOwnershipGuard from "./guards/EventOwnershipGuard.tsx";
import { ROUTES } from "./routes.ts";
import UnprotectedLayout from "../pages/Layouts/UnprotectedLayout.tsx";

// TODO: Create Profile page, using Homepage for now
const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.AUTH} element={<UnprotectedLayout />}>
        <Route index element={<Auth />} />
      </Route>

      <Route element={<ProtectedLayout />}>
        <Route path={ROUTES.HOMEPAGE} element={<Homepage />} />
        <Route path={ROUTES.NEW_EVENT} element={<EventForm />} />
        <Route
          path={ROUTES.EDIT_EVENT}
          element={
            <EventOwnershipGuard>
              <EventForm />
            </EventOwnershipGuard>
          }
        />
        <Route path={ROUTES.PROFILE} element={<Homepage />} />
      </Route>

      <Route element={<UnprotectedLayout />}>
        <Route path={ROUTES.EVENTS} element={<Events />} />
        <Route path={ROUTES.EVENT_DETAILS} element={<EventDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
