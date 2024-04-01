import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {AllDataUsersProvider} from "./context/AllDataUsers";

// Import des composants
import WelcomePage from "./pages/connexion/WelcomePage/WelcomePage";
import Login from "./pages/connexion/Login/Login";
import CreateAccount from "./pages/connexion/SignUp/CreateAccount";
import RegisterPlayeur from "./pages/inscription/RegisterPlayeur/RegisterPlayeur";
import InscriptionSchedules from "./pages/inscription/Schedules/InscriptionSchedules";
import SecondHour from "./pages/inscription/SecondHour/SecondHour";
import ThirdHour from './pages/inscription/ThirdHour/ThirdHour'
import ThankYouPage from "./pages/inscription/ThankYouPage/ThankYouPage";
import AdminLogin from "./pages/admin/connexion/AdminLogin";
import ShowAllSchedules from "./pages/admin/showSchedules/ShowAllSchedules";
import CreateSchedules from "./pages/admin/createSchedules/CreateSchedules";
import ShowAllUsers from "./pages/admin/showAllUsers/ShowAllUsers";

// Wrapper pour les routes nécessitant le contexte AllDataUsersProvider
function AdminRoutes() {
  return (
    <AllDataUsersProvider>
      <Routes>
        <Route path="tableaux-joueurs" element={<ShowAllSchedules />} />
        <Route path='ajouter-un-creneau' element={<CreateSchedules />} />
        <Route path='liste-joueurs' element={<ShowAllUsers />} />
      </Routes>
    </AllDataUsersProvider>
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
          <Route path="/inscrire-un-joueur">
            <Route exact index element={<RegisterPlayeur />} />
            <Route path="inscription">
              <Route exact index element={<InscriptionSchedules />} />
              <Route path='deuxieme-heure'>
                <Route exact index element={<SecondHour />}/>
                <Route path="troisieme-heure">
                  <Route index element={<ThirdHour />}/>
                </Route>
              </Route>
            </Route>
          </Route>
          <Route exact path="informations-inscription" element={<ThankYouPage />}/>
          
          {/* Partie Admin */}
          <Route exact path="/connexion-admin" element={<AdminLogin />}/>
          <Route path='/admin/*' element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
