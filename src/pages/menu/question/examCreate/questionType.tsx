import { useEffect, useState } from "react";
import { QUESTIONTYPE } from "@common/const";
import question from "@pages/menu/question/questionCreate/question";
//기본타입
type questionType = {
  pastYn: boolean; //기출여부
  choose: chooseList[]; //문제선지
  answer?: { content: string }[];
  subBox: string; //서브박스
  seq: number; //문제번호
  questionTitle: string; //문제발문
  questionContent?: string; //문제지문
  from: string;
  type: string;
};
//기본타입 적용 단일문제
type normalType = {
  question: question[];
  seq: number;
  questionTitle: string;
  questionContent: string;
  from: string;
  type: string;
};
//기본타입 적용 복합문제
type complexType = {
  questionInfo: questionInfo;
  seqLength: number;
  seq: number;
  from: string;
  type: string;
};

// 기본유형 1, 2, 3, 5, 7, 9, 10, 15
export const QuestionType1 = (props: questionType) => {
  //   debugger;
  return (
    <>
      <div
        className={
          props.type == "bigBook"
            ? "bigCont_questionTitle"
            : "bigCont_questionTitle_normal"
        }
      >
        {props.seq + ". "}
        {props.pastYn ? <span className="pastYn">기출</span> : <></>}
        {props.questionTitle}
        <span className="bigCont_from">{"(" + props.from + ")"}</span>
      </div>
      <div
        className={
          props.type == "bigBook"
            ? "bigCont_questionContent"
            : "bigCont_questionContent_normal"
        }
        dangerouslySetInnerHTML={{ __html: props.questionContent ?? "" }}
      ></div>
      <div className={props.type == "bigBook" ? "choose" : "choose_normal"}>
        {props.choose.map(({ seq, content }, num) => (
          <div
            style={{ display: "flex", gap: 5, wordBreak: "normal" }}
            key={num}
          >
            <div className={props.type == "bigBook" ? "" : "choose_text"}>
              {num == 0
                ? "①"
                : num == 1
                ? "②"
                : num == 2
                ? "③"
                : num == 3
                ? "④"
                : "⑤"}
            </div>
            <div className={props.type == "bigBook" ? "" : "choose_text"}>
              {content}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

// 화살표 유형 4
export const QuestionType2 = (props: questionType) => {
  return (
    <>
      <div
        className={
          props.type == "bigBook"
            ? "bigCont_questionTitle"
            : "bigCont_questionTitle_normal"
        }
      >
        {props.seq + ". "}
        {props.pastYn ? <span className="pastYn">기출</span> : <></>}
        {props.questionTitle}
        <span className="bigCont_from">{"(" + props.from + ")"}</span>
      </div>
      <div
        className={
          props.type == "bigBook"
            ? "bigCont_questionContent"
            : "bigCont_questionContent_normal"
        }
        dangerouslySetInnerHTML={{ __html: props.questionContent ?? "" }}
      ></div>
      <div className={props.type == "bigBook" ? "choose" : "choose_normal"}>
        {props.choose.map(({ seq, content }, index) => (
          <div
            style={{ display: "flex", gap: 5, wordBreak: "normal" }}
            key={index}
          >
            <div style={{ flex: 1 }}>
              {seq == 1
                ? "①"
                : seq == 2
                ? "②"
                : seq == 3
                ? "③"
                : seq == 4
                ? "④"
                : "⑤"}
            </div>
            <div
              style={{ flex: 5, textAlign: "center", wordBreak: "break-word" }}
            >
              {content.split("|")[0]}
            </div>
            <div
              style={{ flex: 1, textAlign: "center" }}
              className={props.type == "bigBook" ? "" : "choose_text"}
            >
              →
            </div>
            <div
              style={{ flex: 5, textAlign: "center" }}
              className={props.type == "bigBook" ? "choose" : ""}
            >
              {content.split("|")[1]}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

//보기만 있는 유형 8, 11, 13, 17
export const QuestionType3 = (props: questionType) => {
  return (
    <>
      <div
        className={
          props.type == "bigBook"
            ? "bigCont_questionTitle"
            : "bigCont_questionTitle_normal"
        }
      >
        {props.seq + ". "}
        {props.pastYn ? <span className="pastYn">기출</span> : <></>}
        {props.questionTitle}
        <span className="bigCont_from">{"(" + props.from + ")"}</span>
      </div>
      {/* 서브박스 있는것도 있고 없는것도 있어서 없을때는 안보이게 하면 될듯 */}
      {props.subBox != "" ? (
        <div
          className={props.type == "bigBook" ? "subBox" : "subBox_normal"}
          dangerouslySetInnerHTML={{ __html: props.subBox }}
        ></div>
      ) : (
        <></>
      )}
      <div
        className={
          props.type == "bigBook"
            ? "bigCont_questionContent"
            : "bigCont_questionContent_normal"
        }
        dangerouslySetInnerHTML={{ __html: props.questionContent! }}
      ></div>
      <div style={{ display: "flex", marginTop: "20px", marginBottom: "30px" }}>
        {props.choose.map(({ seq, content }, index) => (
          <div
            className={props.type == "bigBook" ? "" : "choose_text"}
            style={{ flex: 1, wordBreak: "normal" }}
            key={index}
          >
            {seq == 1
              ? "①"
              : seq == 2
              ? "②"
              : seq == 3
              ? "③"
              : seq == 4
              ? "④"
              : "⑤"}
            <span
              className={props.type == "bigBook" ? "" : "choose_text"}
              style={{ marginLeft: "8px" }}
            >
              {content == "-" ? "" : content}
            </span>
          </div>
        ))}
        {/*                <div className={props.type == 'bigBook'?'':'choose_text'} style={{ flex: 1 }}>①</div>
                <div className={props.type == 'bigBook'?'':'choose_text'} style={{ flex: 1 }}>②</div>
                <div className={props.type == 'bigBook'?'':'choose_text'} style={{ flex: 1 }}>③</div>
                <div className={props.type == 'bigBook'?'':'choose_text'} style={{ flex: 1 }}>④</div>
                <div className={props.type == 'bigBook'?'':'choose_text'} style={{ flex: 1 }}>⑤</div>*/}
      </div>
    </>
  );
};

//ABC유형 12, 14
export const QuestionType4 = (props: questionType) => {
  return (
    <>
      <div
        className={
          props.type == "bigBook"
            ? "bigCont_questionTitle"
            : "bigCont_questionTitle_normal"
        }
      >
        {props.seq + ". "}
        {props.pastYn ? <span className="pastYn">기출</span> : <></>}
        {props.questionTitle}
        <span className="bigCont_from">{"(" + props.from + ")"}</span>
      </div>
      <div
        className={
          props.type == "bigBook"
            ? "bigCont_questionContent"
            : "bigCont_questionContent_normal"
        }
        dangerouslySetInnerHTML={{ __html: props.questionContent ?? "" }}
      ></div>
      <div className={props.type == "bigBook" ? "choose" : "choose_normal"}>
        <div style={{ display: "flex", gap: 5 }}>
          <div
            className={props.type == "bigBook" ? "" : "choose_text"}
            style={{ flex: 1 }}
          ></div>
          <div
            className={props.type == "bigBook" ? "" : "choose_text"}
            style={{ flex: 3, textAlign: "center" }}
          >
            (A)
          </div>
          <div
            className={props.type == "bigBook" ? "" : "choose_text"}
            style={{ flex: 3, textAlign: "center" }}
          >
            (B)
          </div>
          <div
            className={props.type == "bigBook" ? "" : "choose_text"}
            style={{ flex: 3, textAlign: "center" }}
          >
            (C)
          </div>
        </div>
        {props.choose.map(({ seq, content }, index) => (
          <div style={{ display: "flex", gap: 5 }} key={index}>
            <div
              className={props.type == "bigBook" ? "" : "choose_text"}
              style={{ flex: 1 }}
            >
              {seq == 1
                ? "①"
                : seq == 2
                ? "②"
                : seq == 3
                ? "③"
                : seq == 4
                ? "④"
                : "⑤"}
            </div>
            <div
              className={props.type == "bigBook" ? "" : "choose_text"}
              style={{ flex: 3, textAlign: "center", wordBreak: "break-word" }}
            >
              {content.split("|")[0]}
            </div>
            <div
              className={props.type == "bigBook" ? "" : "choose_text"}
              style={{ flex: 3, textAlign: "center", wordBreak: "break-word" }}
            >
              {content.split("|")[1]}
            </div>
            <div
              className={props.type == "bigBook" ? "" : "choose_text"}
              style={{ flex: 3, textAlign: "center", wordBreak: "break-word" }}
            >
              {content.split("|")[2]}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

//2단 보기 유형 16
export const QuestionType5 = (props: questionType) => {
  //   debugger;
  return (
    <>
      <div
        className={
          props.type == "bigBook"
            ? "bigCont_questionTitle"
            : "bigCont_questionTitle_normal"
        }
      >
        {props.seq + ". "}
        {props.pastYn ? <span className="pastYn">기출</span> : <></>}
        {props.questionTitle}
        <span className="bigCont_from">{"(" + props.from + ")"}</span>
      </div>
      {/* 서브박스 있는것도 있고 없는것도 있어서 없을때는 안보이게 하면 될듯 */}
      {props.subBox != "" ? (
        <div
          className={props.type == "bigBook" ? "subBox" : "subBox_normal"}
          dangerouslySetInnerHTML={{ __html: props.subBox }}
        ></div>
      ) : (
        <></>
      )}
      <div
        className={
          props.type == "bigBook"
            ? "bigCont_questionContent"
            : "bigCont_questionContent_normal"
        }
        dangerouslySetInnerHTML={{ __html: props.questionContent ?? "" }}
      ></div>
      <div
        className={props.type == "bigBook" ? "choose" : "choose_normal"}
        style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        {props.choose.map(({ seq, content }, index) => (
          <div
            style={{
              display: "flex",
              gap: 5,
              wordBreak: "normal",
              flex: "0 0 50%",
            }}
            key={index}
          >
            <div className={props.type == "bigBook" ? "" : "choose_text"}>
              {seq == 1
                ? "①"
                : seq == 2
                ? "②"
                : seq == 3
                ? "③"
                : seq == 4
                ? "④"
                : "⑤"}
            </div>
            <div
              className={props.type == "bigBook" ? "" : "choose_text"}
              style={{ wordBreak: "break-word" }}
            >
              {content}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

//AB유형 18, 19
export const QuestionType6 = (props: questionType) => {
  return (
    <>
      <div
        className={
          props.type == "bigBook"
            ? "bigCont_questionTitle"
            : "bigCont_questionTitle_normal"
        }
      >
        {props.seq + ". "}
        {props.pastYn ? <span className="pastYn">기출</span> : <></>}
        {props.questionTitle}
        <span className="bigCont_from">{"(" + props.from + ")"}</span>
      </div>
      {/* 서브박스 있는것도 있고 없는것도 있어서 없을때는 안보이게 하면 될듯 */}
      {props.subBox != "" ? (
        <div
          className={props.type == "bigBook" ? "subBox" : "subBox_normal"}
          dangerouslySetInnerHTML={{ __html: props.subBox }}
        ></div>
      ) : (
        <></>
      )}
      <div
        className={
          props.type == "bigBook"
            ? "bigCont_questionContent"
            : "bigCont_questionContent_normal"
        }
        dangerouslySetInnerHTML={{ __html: props.questionContent ?? "" }}
      ></div>
      <div className={props.type == "bigBook" ? "choose" : "choose_normal"}>
        <div style={{ display: "flex", gap: 5 }}>
          <div style={{ flex: 1 }}></div>
          <div
            className={props.type == "bigBook" ? "" : "choose_text"}
            style={{ flex: 3, textAlign: "center" }}
          >
            (A)
          </div>
          <div
            className={props.type == "bigBook" ? "" : "choose_text"}
            style={{ flex: 3, textAlign: "center" }}
          >
            (B)
          </div>
        </div>
        {props.choose.map(({ seq, content }, index) => (
          <div
            style={{ display: "flex", gap: 5, wordBreak: "normal" }}
            key={index}
          >
            <div
              className={props.type == "bigBook" ? "" : "choose_text"}
              style={{ flex: 1 }}
            >
              {seq == 1
                ? "①"
                : seq == 2
                ? "②"
                : seq == 3
                ? "③"
                : seq == 4
                ? "④"
                : "⑤"}
            </div>
            <div
              className={props.type == "bigBook" ? "" : "choose_text"}
              style={{ flex: 3, textAlign: "center", wordBreak: "break-word" }}
            >
              {content.split("|")[0]}
            </div>
            <div
              className={props.type == "bigBook" ? "" : "choose_text"}
              style={{ flex: 3, textAlign: "center", wordBreak: "break-word" }}
            >
              {content.split("|")[1]}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

//서술형 영작 유형 20, 21, 22
export const QuestionType7 = (props: questionType) => {
  let subBoxArr: String[] = [];
  if (props.subBox.includes("|")) {
    subBoxArr = props.subBox.split("|");
  }
  return (
    <>
      <div
        className={
          props.type == "bigBook"
            ? "bigCont_questionTitle"
            : "bigCont_questionTitle_normal"
        }
      >
        {props.seq + ". "}
        {props.pastYn ? <span className="pastYn">기출</span> : <></>}
        {props.questionTitle}
        <span className="bigCont_from">{"(" + props.from + ")"}</span>
      </div>
      {/* 서브박스 있는것도 있고 없는것도 있어서 없을때는 안보이게 하면 될듯 */}
      {props.subBox != "" ? (
        props.subBox.includes("|") ? (
          <>
            <div
              className={props.type == "bigBook" ? "subBox" : "subBox_normal"}
              dangerouslySetInnerHTML={{ __html: subBoxArr[0] }}
            ></div>
            <div
              className={props.type == "bigBook" ? "subBox" : "subBox_normal"}
              dangerouslySetInnerHTML={{ __html: subBoxArr[1] }}
            ></div>
          </>
        ) : (
          <div
            className={props.type == "bigBook" ? "subBox" : "subBox_normal"}
            dangerouslySetInnerHTML={{ __html: props.subBox }}
          ></div>
        )
      ) : (
        <></>
      )}
      <div
        className={
          props.type == "bigBook"
            ? "bigCont_questionContent"
            : "bigCont_questionContent_normal"
        }
        dangerouslySetInnerHTML={{ __html: props.questionContent ?? "" }}
      ></div>
      <div
        className={props.type == "bigBook" ? "choose" : "choose_normal"}
        style={{ display: "flex" }}
      >
        <div style={{ flex: 1 }}>
          <div className={props.type == "bigBook" ? "" : "choose_text"}>
            Answer:
          </div>
        </div>
        <div style={{ flex: 8 }}>
          {props.answer!.map(({}, index) => (
            <div key={index} style={{ display: "flex" }}>
              <div
                className={props.type == "bigBook" ? "" : "choose_text"}
                // style={{
                //   display: "flex",
                //   float: "left",
                // }}
              >
                {`(${"ABCDEFGHIJKLMN"[index]})`}
              </div>
              <div
                className={props.type == "bigBook" ? "" : "choose_text"}
                style={{
                  // display: "flex",
                  height: 21,
                  marginBottom: 5,
                  borderBottom: "0.5px solid black",
                  width: "-webkit-fill-available",
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

//normal유형
export const NormalType = (props: normalType) => {
  return (
    <>
      {/*            {props.type != 'bigBook'?
                <div className='questionType'>{
                    props.question[0].questionType == 'Q20'||
                    props.question[0].questionType == 'Q21'||
                    props.question[0].questionType == 'Q22'?
                        '서술(해석)':
                        props.question[0].questionType == 'Q23'?
                            '서술(단어)':
                    QUESTIONTYPE[props.question[0].questionType]
                }</div>:
                <></>
            }*/}
      {/* 기본유형 1, 2, 3, 5, 6, 7, 9, 10, 15,  */}
      {["Q1", "Q2", "Q3", "Q5", "Q6", "Q7", "Q9", "Q10", "Q15"].includes(
        props.question[0].questionType
      ) ? (
        <QuestionType1
          pastYn={props.question[0].pastYn}
          choose={props.question[0].choose}
          subBox={props.question[0].subBox}
          seq={props.seq}
          questionTitle={props.questionTitle}
          questionContent={props.questionContent}
          from={props.from}
          type={props.type}
        />
      ) : //화살표 유형: 4
      props.question[0].questionType == "Q4" ? (
        <QuestionType2
          pastYn={props.question[0].pastYn}
          choose={props.question[0].choose}
          subBox={props.question[0].subBox}
          seq={props.seq}
          questionTitle={props.questionTitle}
          questionContent={props.questionContent}
          from={props.from}
          type={props.type}
        />
      ) : //보기만 있는 유형 8, 11, 13, 17
      ["Q8", "Q11", "Q13", "Q17"].includes(props.question[0].questionType) ? (
        <QuestionType3
          pastYn={props.question[0].pastYn}
          choose={props.question[0].choose}
          subBox={props.question[0].subBox}
          seq={props.seq}
          questionTitle={props.questionTitle}
          questionContent={props.questionContent}
          from={props.from}
          type={props.type}
        />
      ) : // ABC 유형: 12, 14,
      ["Q12", "Q14"].includes(props.question[0].questionType) ? (
        <QuestionType4
          pastYn={props.question[0].pastYn}
          choose={props.question[0].choose}
          subBox={props.question[0].subBox}
          seq={props.seq}
          questionTitle={props.questionTitle}
          questionContent={props.questionContent}
          from={props.from}
          type={props.type}
        />
      ) : // 2단 보기 유형: 16
      props.question[0].questionType == "Q16" ? (
        <QuestionType5
          pastYn={props.question[0].pastYn}
          choose={props.question[0].choose}
          subBox={props.question[0].subBox}
          seq={props.seq}
          questionTitle={props.questionTitle}
          questionContent={props.questionContent}
          from={props.from}
          type={props.type}
        />
      ) : // AB 유형: 18, 19
      props.question[0].questionType == "Q18" ||
        props.question[0].questionType == "Q19" ? (
        <QuestionType6
          pastYn={props.question[0].pastYn}
          choose={props.question[0].choose}
          subBox={props.question[0].subBox}
          seq={props.seq}
          questionTitle={props.questionTitle}
          questionContent={props.questionContent}
          from={props.from}
          type={props.type}
        />
      ) : (
        // 서술형 영작 유형 20, 21, 22
        <QuestionType7
          pastYn={props.question[0].pastYn}
          choose={props.question[0].choose}
          subBox={props.question[0].subBox}
          seq={props.seq}
          questionTitle={props.questionTitle}
          questionContent={props.questionContent}
          from={props.from}
          type={props.type}
          answer={props.question[0].answer}
        />
      )}
    </>
  );
};

//복합유형
export const ComplexType = (props: complexType) => {
  return (
    <>
      {/*            {props.type != 'bigBook'?
                <div className='questionType'>종합문제</div>:
                <></>
            }*/}
      <div
        className={
          props.type == "bigBook"
            ? "bigCont_questionTitle"
            : "bigCont_questionTitle_normal"
        }
      >
        {props.seq - props.seqLength + "-" + (props.seq - 1) + ". "}
        {props.questionInfo.questionTitle}
        <span className="bigCont_from">{"(" + props.from + ")"}</span>
        <div
          className={
            props.type == "bigBook"
              ? "bigCont_questionContent"
              : "bigCont_questionContent_normal"
          }
          dangerouslySetInnerHTML={{
            __html: props.questionInfo.questionContent,
          }}
        ></div>
      </div>
      {props.questionInfo.question.map(
        (
          { questionSubTitle, questionType, subBox, choose, pastYn, answer },
          index
        ) => (
          <div key={index}>
            {questionType == "Q1" ||
            questionType == "Q2" ||
            questionType == "Q3" ||
            questionType == "Q5" ||
            questionType == "Q6" ||
            questionType == "Q7" ||
            questionType == "Q9" ||
            questionType == "Q10" ||
            questionType == "Q15" ? (
              <QuestionType1
                pastYn={pastYn}
                choose={choose}
                subBox={subBox}
                seq={props.seq - props.questionInfo.question.length + index}
                questionTitle={questionSubTitle}
                from={props.from}
                type={props.type}
              />
            ) : questionType == "Q4" ? (
              <QuestionType2
                pastYn={pastYn}
                choose={choose}
                subBox={subBox}
                seq={props.seq - props.questionInfo.question.length + index}
                questionTitle={questionSubTitle}
                from={props.from}
                type={props.type}
              />
            ) : questionType == "Q8" ||
              questionType == "Q11" ||
              questionType == "Q13" ||
              questionType == "Q17" ? (
              <QuestionType3
                pastYn={pastYn}
                choose={choose}
                subBox={subBox}
                seq={props.seq - props.questionInfo.question.length + index}
                questionTitle={questionSubTitle}
                from={props.from}
                type={props.type}
              />
            ) : questionType == "Q12" || questionType == "Q14" ? (
              <QuestionType4
                pastYn={pastYn}
                choose={choose}
                subBox={subBox}
                seq={props.seq - props.questionInfo.question.length + index}
                questionTitle={questionSubTitle}
                from={props.from}
                type={props.type}
              />
            ) : questionType == "Q16" ? (
              <QuestionType5
                pastYn={pastYn}
                choose={choose}
                subBox={subBox}
                seq={props.seq - props.questionInfo.question.length + index}
                questionTitle={questionSubTitle}
                from={props.from}
                type={props.type}
              />
            ) : questionType == "Q18" || questionType == "Q19" ? (
              <QuestionType6
                pastYn={pastYn}
                choose={choose}
                subBox={subBox}
                seq={props.seq - props.questionInfo.question.length + index}
                questionTitle={questionSubTitle}
                from={props.from}
                type={props.type}
              />
            ) : (
              <QuestionType7
                pastYn={pastYn}
                choose={choose}
                subBox={subBox}
                seq={props.seq - props.questionInfo.question.length + index}
                questionTitle={questionSubTitle}
                from={props.from}
                type={props.type}
                answer={answer}
              />
            )}
          </div>
        )
      )}
    </>
  );
};
