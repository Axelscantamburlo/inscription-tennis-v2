import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// CONNEXION
// WELCOME PAGE
import WelcomePage from "./pages/connexion/WelcomePage/WelcomePage";
//LOGIN
import Login from "./pages/connexion/Login/Login";
//SIGN UP
import CreateAccount from "./pages/connexion/SignUp/CreateAccount";

// INSCRIPTION
import RegisterPlayeur from "./pages/inscription/RegisterPlayeur/RegisterPlayeur";
import InscriptionSchedules from "./pages/inscription/Schedules/InscriptionSchedules";
import SecondHour from "./pages/inscription/SecondHour/SecondHour";
import ThirdHour from './pages/inscription/ThirdHour/ThirdHour'
// THANK YOU PAGE
import ThankYouPage from "./pages/inscription/ThankYouPage/ThankYouPage";

// ADMIN
import AdminLogin from "./pages/admin/connexion/AdminLogin";
import ShowAllSchedules from "./pages/admin/showSchedules/ShowAllSchedules";
import CreateSchedules from "./pages/admin/createSchedules/CreateSchedules";
import ShowAllUsers from "./pages/admin/showAllUsers/ShowAllUsers";
import { useSelector, useDispatch } from "react-redux";



export default function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* CONNEXION */}
          <Route exact path="/" element={<WelcomePage />} />
          <Route exact path="/se-connecter" element={<Login />} />
          <Route exact path="/creer-un-compte" element={<CreateAccount />} />
          {/* INSCRIPTION */}
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
          {/* ADMIN */}
          <Route exact path="/connexion-admin" element={<AdminLogin />}/>
          <Route path='/admin'>
            <Route path="tableaux-joueurs" element={<ShowAllSchedules />} />
            <Route path='ajouter-un-creneau' element={<CreateSchedules />} />
            <Route path='renseignements-joueurs' element={<ShowAllUsers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Préciser que si tu inscrits une personne qui n'est pas à ta charge, tu seras obliger d payer l'iscription
