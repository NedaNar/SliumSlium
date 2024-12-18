import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import HomePage from "./pages/HomePage/HomePage";
import JobOfferPage from "./pages/JobOffers/JobOfferPage";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import OpenPositionPage from "./pages/OpenPositions/OpenPositionPage";
import { UserProvider } from "./context/UserContext";
import PublicRoute from "./utils/PublicRoute";
import { ApplicantPage } from "./pages/ApplicantPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/job-position/:offerId"
              element={<OpenPositionPage />}
            />
            <Route path="/job-offer/:id" element={<JobOfferPage />} />
            <Route path="/user" element={<ApplicantPage />} />
            <Route
              path="/login"
              element={<PublicRoute element={<LoginPage />} />}
            />
            <Route
              path="/signup"
              element={<PublicRoute element={<SignUpPage />} />}
            />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
