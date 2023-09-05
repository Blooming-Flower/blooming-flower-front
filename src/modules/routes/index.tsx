import { Routes, Route, Outlet } from "react-router-dom";

import "@css/common.css";
import "@css/common.scss";
import "@css/main.scss";
import "@css/menu.scss";

import { PATH } from "@common/domain";
import Main from "@pages/main";
import Error from "@pages/error";
import QuestionCrt from "@pages/menu/question/questionCreate/questionCrt";
import PassageCrt from "@pages/menu/question/passageManage/passageMng";
import PassageMng from "@pages/menu/question/passageCreate/passageCrt";
import ExamCrt from "@pages/menu/question/examCreate/examCrt";
import ExamView from "@pages/menu/question/examView/examView";
import ExamMng from "@pages/menu/question/examManage/examMng";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path={PATH.MAIN} element={<Main />} />

        {/*문제관련 라우터*/}
        <Route path={PATH.QUESTION0} element={<PassageCrt />} />
        <Route path={PATH.QUESTION1} element={<PassageMng />} />
        <Route path={PATH.QUESTION2} element={<QuestionCrt />} />
        <Route path={PATH.QUESTION3} element={<ExamCrt />} />
        <Route path={PATH.QUESTION4} element={<ExamView />} />
        <Route path={PATH.QUESTION5} element={<ExamMng />} />

        <Route path={PATH.ERROR} element={<Error />} />
      </Routes>
    </>
  );
};

export default Router;
