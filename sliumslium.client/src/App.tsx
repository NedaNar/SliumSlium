import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import HomePage from "./pages/HomePage/HomePage";
import JobOfferPage from "./pages/JobOfferPage";
import { AppliedOffersProvider } from "./context/AppliedOffersContext";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <>
      <AppliedOffersProvider>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/job-offer/:id" element={<JobOfferPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </AppliedOffersProvider>
    </>
  );
}

export default App;
