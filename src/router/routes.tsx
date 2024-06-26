import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/home_new";
import ConcertListPage from "../pages/ConcertList/concertList_new";
import NewConcertPage from "../pages/NewConcert/newConcert";
import Layout from "../pages/Layout/layout_new";

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
