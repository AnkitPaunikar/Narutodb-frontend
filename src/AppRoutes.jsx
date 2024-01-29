import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CharacterPage from "./pages/CharacterPage";
import CharacterDetails from "./pages/CharacterDetails";
import ClanPage from "./pages/ClanPage";
import Header from "../src/component/Header";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/character' element={<CharacterPage />} />
        <Route path='/clan' element={<ClanPage />} />
        <Route path='/characterdetails' element={<CharacterDetails />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
