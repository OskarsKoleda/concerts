import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/home";
import ConcertListPage from "../pages/ConcertList/concertList";
import NewConcertPage from "../pages/NewConcert/newConcert";
import Layout from "../pages/Layout/layout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="concert-list" element={<ConcertListPage />} />
        </Route>
        <Route path="/concert" element={<Layout />}>
          <Route path="new" element={<NewConcertPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
