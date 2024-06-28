import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/Home/home";
import ConcertListPage from "../pages/ConcertList/concertListPage";
import NewConcertPage from "../pages/NewConcert/newConcert";
import Layout from "../pages/Layout/layout";
import { ROUTE_LIST } from "./routes";
import { ConcertDetailsPage } from "../pages/ConcertDetails/concertDetailsPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE_LIST.HOMEPAGE} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTE_LIST.CONCERT_LIST} element={<ConcertListPage />} />
          <Route path={ROUTE_LIST.NEW_CONCERT} element={<NewConcertPage />} />
        </Route>
        <Route path={"/concert"}>
          <Route path={":id"} element={<ConcertDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
