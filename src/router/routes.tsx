import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/Home";
import ConcertListPage from "../pages/ConcertList/ConcertList";
import NewConcertPage from "../pages/NewConcert/NewConcert";
import Layout from "../pages/Layout/Layout";

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
