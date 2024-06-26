import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import { AllDataUsersProvider } from "./context/AllDataUsers";

// Import des composants
// Connexion
import WelcomePage from "./pages/connexion/WelcomePage/WelcomePage";
import Login from "./pages/connexion/Login/Login";
import CreateAccount from "./pages/connexion/SignUp/CreateAccount";
// Inscription
import RegisterPlayeur from "./pages/inscription/RegisterPlayeur/RegisterPlayeur";
import InscriptionSchedules from "./pages/inscription/Schedules/InscriptionSchedules";
import SecondHour from "./pages/inscription/SecondHour/SecondHour";
import ThirdHour from "./pages/inscription/ThirdHour/ThirdHour";
import InformationInscription from "./pages/inscription/InformationInscription/InformationInscription";
import ThankYouPage from "./pages/inscription/ThankYouPage/ThankYouPage";
import AddCommentary from "./pages/inscription/AddCommentary/AddCommentary";
import PriorityInscription from "./pages/inscription/PriorityInscription/PriorityInscription";

// Admin
import AdminLogin from "./pages/admin/connexion/AdminLogin";
import ShowAllSchedules from "./pages/admin/showSchedules/ShowAllSchedules";
import CreateSchedules from "./pages/admin/createSchedules/CreateSchedules";
import ShowAllUsers from "./pages/admin/showAllUsers/ShowAllUsers";
// NotFound
import NotFoundPage from "./pages/not-found-page/NotFoundPage";
// PRIVATE ROUTE
import AdminPrivateRoute from "./pages/PrivateRoutes/AdminPrivateRoute";

import { UidUserConnected } from "./context/UidUserConnected";
import ClientPrivateRoute from "./pages/PrivateRoutes/ClientPrivateRoute";
import NavbarTabs from "./pages/admin/showAllUsers/NavBarTabs/NavBarTabs";
import NavbarTabs2 from "./pages/admin/createSchedules/NavBarTabs2/NavBarTabs2";
import NavbarTabs3 from "./pages/admin/showSchedules/NavbarTabs3/NavbarTabs3";
import ChooseTest from "./pages/inscription/RegisterPlayeur/modal/NewInscriptionModal/ChooseTest/ChooseTest";
// Wrapper pour les routes nécessitant le contexte AllDataUsersProvider
function AdminRoutes() {
  return (
    <AllDataUsersProvider>
      <Routes>
        <Route exact path="tableaux-joueurs" element={<NavbarTabs3 />} />
        <Route exact path="ajouter-un-creneau" element={<NavbarTabs2 />} />
        <Route exact path="liste-joueurs" element={<NavbarTabs />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AllDataUsersProvider>
  );
}
function ClientRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="priorite-inscription"
        element={<PriorityInscription />}
      />
      <Route exact path="choisir-un-test" element={<ChooseTest />} />

      <Route exact index element={<RegisterPlayeur />} />
      <Route path="inscription">
        <Route exact index element={<InscriptionSchedules />} />
        <Route path="deuxieme-heure">
          <Route exact index element={<SecondHour />} />

          <Route path="troisieme-heure">
            <Route index element={<ThirdHour />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Partie Connexion */}
          <Route exact path="/" element={<WelcomePage />} />
          <Route exact path="/se-connecter" element={<Login />} />
          <Route exact path="/creer-un-compte" element={<CreateAccount />} />

          {/* Partie Inscription */}
          <Route
            path="/inscrire-un-joueur/*"
            element={
              <ClientPrivateRoute>
                <ClientRoutes />
              </ClientPrivateRoute>
            }
          />
          <Route
            exact
            path="informations-inscription"
            element={<InformationInscription />}
          />
          <Route
            exact
            path="informations-paiement"
            element={<ThankYouPage />}
          />
          <Route exact path="/emettre-un-souhait" element={<AddCommentary />} />

          {/* Partie Admin */}
          <Route exact path="/connexion-admin" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <AdminPrivateRoute>
                <AdminRoutes />
              </AdminPrivateRoute>
            }
          />
          {/* 404 Error */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
