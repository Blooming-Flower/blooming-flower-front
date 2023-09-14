import { BrowserRouter, Route, Routes } from "react-router-dom";
import Router from "@modules/routes";
import QuestionTab from "./menu/question/questionCreate/QuestionTab";

const Main = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default Main;
