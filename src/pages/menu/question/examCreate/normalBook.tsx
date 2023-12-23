import {useEffect, useRef, useState} from "react";
import {ComplexType, NormalType} from "@pages/menu/question/examCreate/questionType";
let seqTemp = 1
let questionSize = 0
let questionArr: {questionCode:string,questionTitle:string,question:question[],questionContent:string,passageName:string,passageYear:string,passageUnit:string,passageNumber:string}[] = []
let pagePerQuestion:{pageCount:number,questionIds:number[]}[] = []
const NormalBook = (props: ExamProps) => {
  let seq = seqTemp
  let complexLength = 0
  let answerSeq = 1
  const [isDone, setIsDone] = useState(false)
  const [temp1, setTemp1] = useState(0)
  const [temp2, setTemp2] = useState(0)
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const [pageSeq, setPageSeq] = useState(1)
  const pageRef = useRef<any>(null)
  useEffect(()=>{
    for (let i = 0; i <props.rowData.length; i++) {
      for (let j = 0; j < props.rowData[i].questionInfo.length; j++) {
        questionSize += props.rowData[i].questionInfo[j].question.length
        questionArr.push({
          questionCode:props.rowData[i].questionInfo[j].questionCode,
          questionTitle:props.rowData[i].questionInfo[j].questionTitle,
          question:props.rowData[i].questionInfo[j].question,
          questionContent:props.rowData[i].questionInfo[j].questionContent,
          passageName:props.rowData[i].passageName,
          passageYear:props.rowData[i].passageYear,
          passageUnit:props.rowData[i].passageUnit,
          passageNumber:props.rowData[i].passageNumber
        })
      }
    }
    console.log('문제배열------------',questionArr)
    console.log('문제사이즈------------',questionSize)
    return (()=>{
      seqTemp = 1
      questionSize = 0
      questionArr = []
      pagePerQuestion = []
      setIsDone(false)
      setIsOverflow(false)
      setPageSeq(1)
      setTemp1(0)
      setTemp2(0)
    })
  },[props.rowData])

  useEffect(()=>{
    setTimeout(()=>{
      const element = pageRef.current
      console.log(element.scrollWidth > element.clientWidth)
      if (element.scrollWidth > element.clientWidth) {
        setIsOverflow(isOverflow)
        setPageSeq(pageSeq + 1)
        let questionIds = [];
        console.log('temp', temp1)
        console.log('temp2', temp2)
        for (let i = temp1; i < temp2 - 1; i++) {
          questionIds.push(i)
        }
        pagePerQuestion.push({pageCount: pageSeq, questionIds: questionIds})
        setTemp1(temp2 - Math.max(complexLength - 1, 1))
        seqTemp = seq - complexLength
        console.log('오버플로우', pagePerQuestion)
      } else {
        if (questionSize <= temp2) {
          let questionIds = [];
          console.log('temp', temp1)
          console.log('temp2', temp2)
          if(questionSize<=2){
            for (let i = temp1; i < temp2; i++) {
              questionIds.push(i)
            }
          }else {
            for (let i = temp1; i < temp2 - 1; i++) {
              questionIds.push(i)
            }
          }
          pagePerQuestion.push({pageCount: pageSeq, questionIds: questionIds})
          console.log('마지막', pagePerQuestion)
          seqTemp = 1
          setIsDone(!isDone)
          return
        }
      }
      setTemp2(temp2+1)
    },20)
  }, [temp2])

  return (
      <div className="pdf_container" ref={props.pdfRef} id="pdf_container">
        <>
          {
            isDone?
                pagePerQuestion.map(({pageCount,questionIds},index0)=>(
                    <div className='div_paper big_first' ref={pageRef} key={index0} style={{ padding: "7.7% 9.5% 2.3% 9.5%" }}>
                      {pageCount == 1 ?
                          <div
                              className="head"
                              style={{ borderBottom: "3px solid", marginBottom: 17 }}
                          >
                            <div style={{ textAlign: "center", fontSize: 25 }}>
                              {props.header}
                            </div>
                            <h1 style={{ textAlign: "center", fontSize: 52 }}>영어</h1>
                          </div>
                          :
                          <></>
                      }
                      <div
                          className="bigCont"
                          style={pageCount != 1?{
                            padding: "0 0 20px 0",
                            columnFill: "auto",
                            height: '258mm',
                            columnGap: 30,
                            columnRule: "1px solid black",
                          }:{
                            padding: "0 0 20px 0",
                            columnFill: "auto",
                            height: '220mm',
                            columnGap: 30,
                            columnRule: "1px solid black",
                          }}
                      >
                        {pageCount == 1?
                            <div
                                className="first-page-ment"
                                style={{
                                  fontSize: 11,
                                  paddingBottom: 5,
                                  borderBottom: "0.5px solid black",
                                  marginBottom: 15,
                                }}
                            >
                              <ul style={{ paddingLeft: 20 }}>
                                <li style={{ listStyle: "circle" }}>
                                  OMR카드에 학년, 반, 번호, 이름, 과목코드를 정확히 기입(표기)하고
                                  해당란에 답을 정확히 표시하시오.
                                </li>
                                <li style={{ listStyle: "circle" }}>
                                  [ ] 안의 숫자는 문항 당 배점입니다. 문항에 따라 배점이 다르니,
                                  각 물음의 끝에 표시된 배점을 참고하시오.
                                </li>
                                <li style={{ listStyle: "circle" }}>
                                  선택형은 물음에 알맞은 답의 번호를 답안카드에 컴퓨터용
                                  사인첸으로 정확히 마킹하고, 서답형은 물음에 맞는 답과 풀이과정을
                                  답안지에 바르게 적으시오.
                                </li>
                                <li style={{ listStyle: "circle" }}>
                                  문항배점 : 선택형 20문항(50점)/서답형 중 서술형 6문항(50점)
                                </li>
                              </ul>
                            </div>
                            :
                            <></>
                        }
                        <div className='bigCont_sub'>
                          <div id='subRef'>
                            {questionIds.map((num,index1)=>(
                                    <div className='bigCont_questionBox' key={index1}>
                                      {(()=>{
                                        debugger
                                        if(questionArr[num].question.length == 1){
                                          complexLength = 1
                                          return(
                                              <NormalType
                                                  question={questionArr[num].question}
                                                  seq={seq++}
                                                  questionTitle={questionArr[num].questionTitle}
                                                  questionContent={questionArr[num].questionContent}
                                                  type={'normal'}
                                                  from={props.page == 'manage'?
                                                      questionArr[num].question[0].passageYear+' '+questionArr[num].question[0].passageName+' '+questionArr[num].question[0].passageUnit+' '+questionArr[num].question[0].passageNumber
                                                      :questionArr[num].passageYear+' '+questionArr[num].passageName+' '+questionArr[num].passageUnit+' '+questionArr[num].passageNumber}
                                              />
                                          )
                                        }else{
                                          complexLength = questionArr[num].question.length
                                          const question = questionArr[num].question
                                          const questionCode = questionArr[num].questionCode
                                          const questionTitle = questionArr[num].questionTitle
                                          const questionContent = questionArr[num].questionContent
                                          const ssh = {question,questionCode,questionTitle,questionContent}
                                          return (
                                              <ComplexType
                                                  questionInfo={ssh}
                                                  seqLength={complexLength}
                                                  seq={seq=seq+complexLength}
                                                  type={'normal'}
                                                  from={props.page == 'manage'?
                                                      questionArr[num].question[0].passageYear+' '+questionArr[num].question[0].passageName+' '+questionArr[num].question[0].passageUnit+' '+questionArr[num].question[0].passageNumber
                                                      :questionArr[num].passageYear+' '+questionArr[num].passageName+' '+questionArr[num].passageUnit+' '+questionArr[num].passageNumber}
                                              />
                                          )
                                        }
                                      })()}
                                    </div>
                                )
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                          className="footer"
                          style={{
                            textAlign: "center",
                          }}
                      >
                        <div
                            className="page-box"
                            style={{
                              display: "inline-block",
                              width: 100,
                              border: "1px solid",
                              background:
                                  "linear-gradient(to bottom right, #fff calc(50% - 1px), black , #fff calc(50% + 1px) )",
                              fontSize: 12,
                              marginBottom: 15,
                            }}
                        >
                          <div
                              className="now-page"
                              style={{ textAlign: "left", paddingLeft: 5 }}
                          >
                            {pageCount}
                          </div>
                          <div
                              className="max-page"
                              style={{ textAlign: "right", paddingRight: 5 }}
                          >
                            {pagePerQuestion.length}
                          </div>
                        </div>
                        <div
                            className="warning"
                            style={{ fontSize: 9.4, border: "1px solid" }}
                        >
                          이 시험문제의 저작권은 00고등학교에 있습니다. 저작권법에 의해
                          보호받는 저작물이므로 판매와 복제는 금지되여. 이를 어길시 저작권법에
                          의거 처벌될 수 있습니다.
                        </div>
                      </div>
                    </div>
                ))
                :
                <div className='div_paper big_first' ref={pageRef} style={{ padding: "7.7% 9.5% 2.3% 9.5%" }}>
                  {pageSeq == 1 ?
                      <div
                          className="head"
                          style={{ borderBottom: "3px solid", marginBottom: 17 }}
                      >
                        <div style={{ textAlign: "center", fontSize: 25 }}>
                          {props.header}
                        </div>
                        <h1 style={{ textAlign: "center", fontSize: 52 }}>영어</h1>
                      </div>
                      :
                      <></>
                  }
                  <div
                      className="bigCont"
                      style={pageSeq != 1?{
                        padding: "0 0 20px 0",
                        columnFill: "auto",
                        height: '258mm',
                        columnGap: 30,
                        columnRule: "1px solid black",
                      }:{
                        padding: "0 0 20px 0",
                        columnFill: "auto",
                        height: '220mm',
                        columnGap: 30,
                        columnRule: "1px solid black",
                      }}
                  >
                    {pageSeq == 1?
                        <div
                            className="first-page-ment"
                            style={{
                              fontSize: 11,
                              paddingBottom: 5,
                              borderBottom: "0.5px solid black",
                              marginBottom: 15,
                            }}
                        >
                          <ul style={{ paddingLeft: 20 }}>
                            <li style={{ listStyle: "circle" }}>
                              OMR카드에 학년, 반, 번호, 이름, 과목코드를 정확히 기입(표기)하고
                              해당란에 답을 정확히 표시하시오.
                            </li>
                            <li style={{ listStyle: "circle" }}>
                              [ ] 안의 숫자는 문항 당 배점입니다. 문항에 따라 배점이 다르니,
                              각 물음의 끝에 표시된 배점을 참고하시오.
                            </li>
                            <li style={{ listStyle: "circle" }}>
                              선택형은 물음에 알맞은 답의 번호를 답안카드에 컴퓨터용
                              사인첸으로 정확히 마킹하고, 서답형은 물음에 맞는 답과 풀이과정을
                              답안지에 바르게 적으시오.
                            </li>
                            <li style={{ listStyle: "circle" }}>
                              문항배점 : 선택형 20문항(50점)/서답형 중 서술형 6문항(50점)
                            </li>
                          </ul>
                        </div>
                        :
                        <></>
                    }
                    <div className='bigCont_sub'>
                      <div id='subRef'>
                        {questionArr.slice(temp1,temp2).map(({questionTitle,questionCode,question,questionContent,passageUnit,passageNumber,passageName,passageYear},index1)=>(
                                <div className='bigCont_questionBox' key={index1}>
                                  {(()=>{
                                    debugger
                                    if(question.length == 1){
                                      complexLength = 1
                                      return(
                                          <NormalType
                                              question={question}
                                              seq={seq++}
                                              questionTitle={questionTitle}
                                              questionContent={questionContent}
                                              from={props.page == 'manage'?
                                                  question[0].passageYear+' '+question[0].passageUnit+' '+passageNumber
                                                  :passageYear+' '+passageName+' '+passageUnit+' '+passageNumber}
                                              type={'normal'}
                                          />
                                      )
                                    }else{
                                      complexLength = question.length
                                      return (
                                          <ComplexType
                                              questionInfo={{question,questionCode,questionTitle,questionContent}}
                                              seqLength={complexLength}
                                              seq={seq=seq+complexLength}
                                              from={props.page == 'manage'?
                                                  question[0].passageYear+' '+question[0].passageUnit+' '+passageNumber
                                                  :passageYear+' '+passageName+' '+passageUnit+' '+passageNumber}
                                              type={'normal'}
                                          />
                                      )
                                    }
                                  })()}
                                </div>
                            )
                        )}
                      </div>
                    </div>
                  </div>
                  {/*{pageSeq % 2  == 0?*/}
                  {/*    <div className='right-bottom'>*/}
                  {/*      {props.rightBottom}{pageSeq}*/}
                  {/*    </div>*/}
                  {/*    :*/}
                  {/*    <div className='left-bottom'>*/}
                  {/*      {pageSeq}{props.leftBottom}*/}
                  {/*    </div>*/}
                  {/*}*/}
                  <div
                      className="footer"
                      style={{
                        textAlign: "center",
                      }}
                  >
                    <div
                        className="page-box"
                        style={{
                          display: "inline-block",
                          width: 100,
                          border: "1px solid",
                          background:
                              "linear-gradient(to bottom right, #fff calc(50% - 1px), black , #fff calc(50% + 1px) )",
                          fontSize: 12,
                          marginBottom: 15,
                        }}
                    >
                      <div
                          className="now-page"
                          style={{ textAlign: "left", paddingLeft: 5 }}
                      >
                        1
                      </div>
                      <div
                          className="max-page"
                          style={{ textAlign: "right", paddingRight: 5 }}
                      >
                        8
                      </div>
                    </div>
                    <div
                        className="warning"
                        style={{ fontSize: 9.4, border: "1px solid" }}
                    >
                      이 시험문제의 저작권은 00고등학교에 있습니다. 저작권법에 의해
                      보호받는 저작물이므로 판매와 복제는 금지되여. 이를 어길시 저작권법에
                      의거 처벌될 수 있습니다.
                    </div>
                  </div>
                </div>
          }
          <div className='div_paper big_answer' style={{ padding: "7.7% 9.5% 2.3% 9.5%" }}>
            <div className='big_answer_head'>
              [Answers] {props.examTitle}
            </div>
            <div
                className="bigCont"
                style={{
                  padding: "20px 0",
                  columnFill: "auto",
                  height: '220mm',
                  columnCount:3,
                  columnGap: 30,
                  columnRule: "1px solid black",
                }}
            >
              {questionArr.map(({question},index)=>(
                  <div key={index}>
                    {question.map(({answer},index1)=>(
                        <div key={index1} style={{margin:'3pt'}}>
                          {(answerSeq++)+') '}
                          {answer.map(({content},index2)=>(
                              <span key={index2}>
                                                    {content == '1'?'①':content=='2'?'②':content=='3'?'③':content=='4'?'④':content=='5'?'⑤':content}
                                {answer.length == 1 || answer.length-1 == index2?
                                    '':
                                    ', '
                                }
                              </span>
                          ))}
                        </div>
                    ))}
                  </div>
              ))}
            </div>
          </div>
        </>
      </div>
  );
};

export default NormalBook;
