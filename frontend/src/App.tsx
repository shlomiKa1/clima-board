import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import DashboardPage from "./pages/DashboardPage";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";
import CityDetailsPage from "./pages/CityDetailsPage";
import ComparePage from "./pages/ComparePage";
import NotFoundPage from "./pages/NotFoundPage";
import WelcomePage from "./pages/WelcomePage";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import ProtectedPublic from "./routes/ProtectedPublic";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedPublic />}>
          <Route path="/" element={<WelcomePage />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/city/:cityName" element={<CityDetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/compare" element={<ComparePage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
