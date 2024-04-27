import React, { useContext, useEffect } from "react";
// CONTEXT
import { AllDataSchedules } from "../../../context/AllDataSchedules";
import { getPlayeurInscription } from "../../../functions/getPlayeurInscription";
import { useSelector } from "react-redux";

export default function PriorityInscription() {
  // const {loadedData} = useContext(AllDataSchedules)
  // const { name } = useSelector((state) => state.user);
  // useEffect(() => {
  //   getPlayeurInscription(loadedData,name);
  // }, []);
  return <div>Prioruité</div>;
}
