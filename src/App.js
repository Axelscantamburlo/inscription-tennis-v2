import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// CONNEXION
// WELCOME PAGE
import WelcomePage from "./pages/connexion/WelcomePage/WelcomePage";
//LOGIN
import Login from "./pages/connexion/Login/Login";
//REGISTER
import Register from "./pages/connexion/Register/Register";

// INSCRIPTION
import RegisterPlayeur from "./pages/inscription/RegisterPlayeur/RegisterPlayeur";
import InscriptionSchedules from "./pages/inscription/Schedules/InscriptionSchedules";
import SecondHour from "./pages/inscription/SecondHour/SecondHour";
import ThirdHour from './pages/inscription/ThirdHour/ThirdHour'



export default function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* CONNEXION */}
          <Route exact path="/" element={<WelcomePage />} />
          <Route exact path="/se-connecter" element={<Login />} />
          <Route exact path="/creer-un-compte" element={<Register />} />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Préciser que si tu inscrits une personne qui n'est pas à ta charg, tu seras obliger d payer l'iscription
