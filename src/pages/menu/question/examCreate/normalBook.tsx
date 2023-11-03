import {useEffect, useRef, useState} from "react";
import {ComplexType, NormalType} from "@pages/menu/question/examCreate/questionType";
let seqTemp = 1
let questionSize = 0
let questionArr: {questionCode:string,questionTitle:string,question:question[],questionContent:string,passageName:string,passageYear:string,passageUnit:string,passageNumber:string}[] = []
let pagePerQuestion:{pageCount:number,questionIds:number[]}[] = []
const NormalBook = (props: ExamProps) => {
  let seq = seqTemp
  let complexLength = 0
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
    debugger
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

  // let pages =
  //     <>
  //       {
  //         isDone?
  //             pagePerQuestion.map(({pageCount,questionIds},index0)=>(
  //                 <div className='div_paper big_first' ref={pageRef} key={index0} style={{ padding: "7.7% 9.5% 2.3% 9.5%" }}>
  //                   {pageCount == 1 ?
  //                         <div
  //                           className="head"
  //                           style={{ borderBottom: "3px solid", marginBottom: 17 }}
  //                         >
  //                         <div style={{ textAlign: "center", fontSize: 25 }}>
  //                           {props.header}
  //                         </div>
  //                           <h1 style={{ textAlign: "center", fontSize: 52 }}>영어</h1>
  //                         </div>
  //                       :
  //                       <></>
  //                   }
  //                     <div
  //                       className="bigCont"
  //                       style={pageCount != 1?{
  //                         padding: "0 0 20px 0",
  //                         columnFill: "auto",
  //                         height: '258mm',
  //                         columnGap: 30,
  //                         columnRule: "1px solid black",
  //                       }:{
  //                         padding: "0 0 20px 0",
  //                         columnFill: "auto",
  //                         height: '220mm',
  //                         columnGap: 30,
  //                         columnRule: "1px solid black",
  //                       }}
  //                     >
  //                     {pageCount == 1?
  //                         <div
  //                             className="first-page-ment"
  //                             style={{
  //                               fontSize: 11,
  //                               paddingBottom: 5,
  //                               borderBottom: "0.5px solid black",
  //                               marginBottom: 15,
  //                             }}
  //                         >
  //                           <ul style={{ paddingLeft: 20 }}>
  //                             <li style={{ listStyle: "circle" }}>
  //                               OMR카드에 학년, 반, 번호, 이름, 과목코드를 정확히 기입(표기)하고
  //                               해당란에 답을 정확히 표시하시오.
  //                             </li>
  //                             <li style={{ listStyle: "circle" }}>
  //                               [ ] 안의 숫자는 문항 당 배점입니다. 문항에 따라 배점이 다르니,
  //                               각 물음의 끝에 표시된 배점을 참고하시오.
  //                             </li>
  //                             <li style={{ listStyle: "circle" }}>
  //                               선택형은 물음에 알맞은 답의 번호를 답안카드에 컴퓨터용
  //                               사인첸으로 정확히 마킹하고, 서답형은 물음에 맞는 답과 풀이과정을
  //                               답안지에 바르게 적으시오.
  //                             </li>
  //                             <li style={{ listStyle: "circle" }}>
  //                               문항배점 : 선택형 20문항(50점)/서답형 중 서술형 6문항(50점)
  //                             </li>
  //                           </ul>
  //                         </div>
  //                         :
  //                         <></>
  //                     }
  //                     <div className='bigCont_sub'>
  //                       <div id='subRef'>
  //                         {questionIds.map((num,index1)=>(
  //                                 <div className='bigCont_questionBox' key={index1}>
  //                                   {(()=>{
  //                                     if(questionArr[num].question.length == 1){
  //                                       complexLength = 1
  //                                       return(
  //                                           <NormalType
  //                                               question={questionArr[num].question}
  //                                               seq={seq++}
  //                                               questionTitle={questionArr[num].questionTitle}
  //                                               questionContent={questionArr[num].questionContent}
  //                                               type={'normal'}
  //                                               from={questionArr[num].passageYear+' '+questionArr[num].passageName+' '+questionArr[num].passageUnit+' '+questionArr[num].passageNumber}
  //                                           />
  //                                       )
  //                                     }else{
  //                                       complexLength = questionArr[num].question.length
  //                                       const question = questionArr[num].question
  //                                       const questionCode = questionArr[num].questionCode
  //                                       const questionTitle = questionArr[num].questionTitle
  //                                       const questionContent = questionArr[num].questionContent
  //                                       const ssh = {question,questionCode,questionTitle,questionContent}
  //                                       return (
  //                                           <ComplexType
  //                                               questionInfo={ssh}
  //                                               seqLength={complexLength}
  //                                               seq={seq=seq+complexLength}
  //                                               type={'normal'}
  //                                               from={questionArr[num].passageYear+' '+questionArr[num].passageName+' '+questionArr[num].passageUnit+' '+questionArr[num].passageNumber}
  //                                           />
  //                                       )
  //                                     }
  //                                   })()}
  //                                 </div>
  //                             )
  //                         )}
  //                       </div>
  //                     </div>
  //                   </div>
  //                   <div
  //                       className="footer"
  //                       style={{
  //                         textAlign: "center",
  //                       }}
  //                   >
  //                     <div
  //                         className="page-box"
  //                         style={{
  //                           display: "inline-block",
  //                           width: 100,
  //                           border: "1px solid",
  //                           background:
  //                               "linear-gradient(to bottom right, #fff calc(50% - 1px), black , #fff calc(50% + 1px) )",
  //                           fontSize: 12,
  //                           marginBottom: 15,
  //                         }}
  //                     >
  //                       <div
  //                           className="now-page"
  //                           style={{ textAlign: "left", paddingLeft: 5 }}
  //                       >
  //                         {pageCount}
  //                       </div>
  //                       <div
  //                           className="max-page"
  //                           style={{ textAlign: "right", paddingRight: 5 }}
  //                       >
  //                         {pagePerQuestion.length}
  //                       </div>
  //                     </div>
  //                     <div
  //                         className="warning"
  //                         style={{ fontSize: 9.4, border: "1px solid" }}
  //                     >
  //                       이 시험문자의 저작긛은 00고등학교에 있습니다. 저작긛법에 의해
  //                       보호받는 저작물이므로 전재와 복지는 금지되여. 이를 어길시 저작긛법에
  //                       의거 처벌될 수 있습니다.
  //                     </div>
  //                   </div>
  //                 </div>
  //             ))
  //             :
  //             <div className='div_paper big_first' ref={pageRef} style={{ padding: "7.7% 9.5% 2.3% 9.5%" }}>
  //               {pageSeq == 1 ?
  //                     <div
  //                         className="head"
  //                         style={{ borderBottom: "3px solid", marginBottom: 17 }}
  //                     >
  //                       <div style={{ textAlign: "center", fontSize: 25 }}>
  //                         {props.header}
  //                       </div>
  //                       <h1 style={{ textAlign: "center", fontSize: 52 }}>영어</h1>
  //                     </div>
  //                   :
  //                   <></>
  //               }
  //               <div
  //                   className="bigCont"
  //                   style={pageSeq != 1?{
  //                     padding: "0 0 20px 0",
  //                     columnFill: "auto",
  //                     height: '258mm',
  //                     columnGap: 30,
  //                     columnRule: "1px solid black",
  //                   }:{
  //                     padding: "0 0 20px 0",
  //                     columnFill: "auto",
  //                     height: '220mm',
  //                     columnGap: 30,
  //                     columnRule: "1px solid black",
  //                   }}
  //               >
  //                 {pageSeq == 1?
  //                     <div
  //                         className="first-page-ment"
  //                         style={{
  //                           fontSize: 11,
  //                           paddingBottom: 5,
  //                           borderBottom: "0.5px solid black",
  //                           marginBottom: 15,
  //                         }}
  //                     >
  //                       <ul style={{ paddingLeft: 20 }}>
  //                         <li style={{ listStyle: "circle" }}>
  //                           OMR카드에 학년, 반, 번호, 이름, 과목코드를 정확히 기입(표기)하고
  //                           해당란에 답을 정확히 표시하시오.
  //                         </li>
  //                         <li style={{ listStyle: "circle" }}>
  //                           [ ] 안의 숫자는 문항 당 배점입니다. 문항에 따라 배점이 다르니,
  //                           각 물음의 끝에 표시된 배점을 참고하시오.
  //                         </li>
  //                         <li style={{ listStyle: "circle" }}>
  //                           선택형은 물음에 알맞은 답의 번호를 답안카드에 컴퓨터용
  //                           사인첸으로 정확히 마킹하고, 서답형은 물음에 맞는 답과 풀이과정을
  //                           답안지에 바르게 적으시오.
  //                         </li>
  //                         <li style={{ listStyle: "circle" }}>
  //                           문항배점 : 선택형 20문항(50점)/서답형 중 서술형 6문항(50점)
  //                         </li>
  //                       </ul>
  //                     </div>
  //                     :
  //                     <></>
  //                 }
  //                 <div className='bigCont_sub'>
  //                   <div id='subRef'>
  //                     {questionArr.slice(temp1,temp2).map(({questionTitle,questionCode,question,questionContent,passageUnit,passageNumber,passageName,passageYear},index1)=>(
  //                             <div className='bigCont_questionBox' key={index1}>
  //                               {(()=>{
  //                                 if(question.length == 1){
  //                                   complexLength = 1
  //                                   return(
  //                                       <NormalType
  //                                           question={question}
  //                                           seq={seq++}
  //                                           questionTitle={questionTitle}
  //                                           questionContent={questionContent}
  //                                           from={passageYear+' '+passageName+' '+passageUnit+' '+passageNumber}
  //                                           type={'normal'}
  //                                       />
  //                                   )
  //                                 }else{
  //                                   complexLength = question.length
  //                                   return (
  //                                       <ComplexType
  //                                           questionInfo={{question,questionCode,questionTitle,questionContent}}
  //                                           seqLength={complexLength}
  //                                           seq={seq=seq+complexLength}
  //                                           from={passageYear+' '+passageName+' '+passageUnit+' '+passageNumber}
  //                                           type={'normal'}
  //                                       />
  //                                   )
  //                                 }
  //                               })()}
  //                             </div>
  //                         )
  //                     )}
  //                   </div>
  //                 </div>
  //               </div>
  //               {/*{pageSeq % 2  == 0?*/}
  //               {/*    <div className='right-bottom'>*/}
  //               {/*      {props.rightBottom}{pageSeq}*/}
  //               {/*    </div>*/}
  //               {/*    :*/}
  //               {/*    <div className='left-bottom'>*/}
  //               {/*      {pageSeq}{props.leftBottom}*/}
  //               {/*    </div>*/}
  //               {/*}*/}
  //               <div
  //                   className="footer"
  //                   style={{
  //                     textAlign: "center",
  //                   }}
  //                 >
  //                   <div
  //                     className="page-box"
  //                     style={{
  //                       display: "inline-block",
  //                       width: 100,
  //                       border: "1px solid",
  //                       background:
  //                         "linear-gradient(to bottom right, #fff calc(50% - 1px), black , #fff calc(50% + 1px) )",
  //                       fontSize: 12,
  //                       marginBottom: 15,
  //                     }}
  //                   >
  //                     <div
  //                       className="now-page"
  //                       style={{ textAlign: "left", paddingLeft: 5 }}
  //                     >
  //                       1
  //                     </div>
  //                     <div
  //                       className="max-page"
  //                       style={{ textAlign: "right", paddingRight: 5 }}
  //                     >
  //                       8
  //                     </div>
  //                   </div>
  //                   <div
  //                     className="warning"
  //                     style={{ fontSize: 9.4, border: "1px solid" }}
  //                   >
  //                     이 시험문자의 저작긛은 00고등학교에 있습니다. 저작긛법에 의해
  //                     보호받는 저작물이므로 전재와 복지는 금지되여. 이를 어길시 저작긛법에
  //                     의거 처벌될 수 있습니다.
  //                   </div>
  //                 </div>
  //             </div>
  //       }
  //     </>

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
                                        if(questionArr[num].question.length == 1){
                                          complexLength = 1
                                          return(
                                              <NormalType
                                                  question={questionArr[num].question}
                                                  seq={seq++}
                                                  questionTitle={questionArr[num].questionTitle}
                                                  questionContent={questionArr[num].questionContent}
                                                  type={'normal'}
                                                  from={questionArr[num].passageYear+' '+questionArr[num].passageName+' '+questionArr[num].passageUnit+' '+questionArr[num].passageNumber}
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
                                                  from={questionArr[num].passageYear+' '+questionArr[num].passageName+' '+questionArr[num].passageUnit+' '+questionArr[num].passageNumber}
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
                          이 시험문자의 저작긛은 00고등학교에 있습니다. 저작긛법에 의해
                          보호받는 저작물이므로 전재와 복지는 금지되여. 이를 어길시 저작긛법에
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
                                    if(question.length == 1){
                                      complexLength = 1
                                      return(
                                          <NormalType
                                              question={question}
                                              seq={seq++}
                                              questionTitle={questionTitle}
                                              questionContent={questionContent}
                                              from={passageYear+' '+passageName+' '+passageUnit+' '+passageNumber}
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
                                              from={passageYear+' '+passageName+' '+passageUnit+' '+passageNumber}
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
                      이 시험문자의 저작긛은 00고등학교에 있습니다. 저작긛법에 의해
                      보호받는 저작물이므로 전재와 복지는 금지되여. 이를 어길시 저작긛법에
                      의거 처벌될 수 있습니다.
                    </div>
                  </div>
                </div>
          }
        </>
      {/*<div className="div_paper" style={{ padding: "7.7% 9.5% 2.3% 9.5%" }}>*/}
      {/*  <div*/}
      {/*    className="head"*/}
      {/*    style={{ borderBottom: "3px solid", marginBottom: 17 }}*/}
      {/*  >*/}
      {/*    <div style={{ textAlign: "center", fontSize: 25 }}>*/}
      {/*      {props.header}*/}
      {/*    </div>*/}
      {/*    <h1 style={{ textAlign: "center", fontSize: 52 }}>영어</h1>*/}
      {/*  </div>*/}
      {/*  <div*/}
      {/*    className="bigCont"*/}
      {/*    style={{*/}
      {/*      padding: "0 0 20px 0",*/}
      {/*      height: "222mm",*/}
      {/*      columnFill: "auto",*/}
      {/*      columnGap: 30,*/}
      {/*      columnRule: "1px solid black",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <div*/}
      {/*      className="first-page-ment"*/}
      {/*      style={{*/}
      {/*        fontSize: 11,*/}
      {/*        paddingBottom: 5,*/}
      {/*        borderBottom: "0.5px solid black",*/}
      {/*        marginBottom: 15,*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <ul style={{ paddingLeft: 20 }}>*/}
      {/*        <li style={{ listStyle: "circle" }}>*/}
      {/*          OMR카드에 학년, 반, 번호, 이름, 과목코드를 정확히 기입(표기)하고*/}
      {/*          해당란에 답을 정확히 표시하시오.*/}
      {/*        </li>*/}
      {/*        <li style={{ listStyle: "circle" }}>*/}
      {/*          [ ] 안의 숫자는 문항 당 배점입니다. 문항에 따라 배점이 다르니,*/}
      {/*          각 물음의 끝에 표시된 배점을 참고하시오.*/}
      {/*        </li>*/}
      {/*        <li style={{ listStyle: "circle" }}>*/}
      {/*          선택형은 물음에 알맞은 답의 번호를 답안카드에 컴퓨터용*/}
      {/*          사인첸으로 정확히 마킹하고, 서답형은 물음에 맞는 답과 풀이과정을*/}
      {/*          답안지에 바르게 적으시오.*/}
      {/*        </li>*/}
      {/*        <li style={{ listStyle: "circle" }}>*/}
      {/*          문항배점 : 선택형 20문항(50점)/서답형 중 서술형 6문항(50점)*/}
      {/*        </li>*/}
      {/*      </ul>*/}
      {/*    </div>*/}

      {/*    /!*{요기다가 map돌릴것!!}*!/*/}
      {/*    /!* 기본유형 1, 2, 3, 5, 6, 7, 9, 10, 15,  *!/*/}
      {/*    <div className="question" style={{ marginBottom: 30 }}>*/}
      {/*      <div className="title" style={{ display: "flex" }}>*/}
      {/*        <div className="question-seq">1.&nbsp;</div>*/}
      {/*        <div className="question-title" style={{ paddingBottom: 5 }}>*/}
      {/*          <span*/}
      {/*            className="pastYn"*/}
      {/*            style={{*/}
      {/*              color: "white",*/}
      {/*              background: "#4c4c4c",*/}
      {/*              borderRadius: 4,*/}
      {/*              padding: "0px 6px 0 4px",*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            기출*/}
      {/*          </span>*/}
      {/*          다음 글의 주제로 가장 적절한 것은?*/}
      {/*          <span style={{ fontSize: 11, color: "#666666" }}>*/}
      {/*            (2023년 6월 고3 30번)*/}
      {/*          </span>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="question-content" style={{ marginBottom: 15 }}>*/}
      {/*        &nbsp;&nbsp;How do hormones trigger reactions in the body? When a*/}
      {/*        hormone is released from a gland, it travels in the bloodstream*/}
      {/*        through the body in search of its target. Organs, tissues and*/}
      {/*        other glands in the bOdy have receptor sites that hormones must*/}
      {/*        billd to ill order to deliver their message and cause an effect.*/}
      {/*        BLIt because every hormone has its own unique shape, they are*/}
      {/*        designed to act only on the parts of the body that have a receptor*/}
      {/*        site with the corresponding shape. This mode of action can be*/}
      {/*        likened to a lock and key mechanism - if the key doesn't fit the*/}
      {/*        lock, then nothing will happen. When a hormone billds to its*/}
      {/*        receptor, it sets off a chain of other signaling pathways to*/}
      {/*        create a change in the body. Once the desired effect has taken*/}
      {/*        place and there is too much hormone circulating ill the blood,*/}
      {/*        this signal is fed back to the glands to restrain further hormone*/}
      {/*        release. This is called a feedback 100p and, when functioning*/}
      {/*        correctly, it allows the endocrine system to ensure the conditions*/}
      {/*        in your body remain ill balance.*/}
      {/*      </div>*/}
      {/*      <div*/}
      {/*        className="choose"*/}
      {/*        style={{ display: "flex", flexDirection: "column" }}*/}
      {/*      >*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div>①</div>*/}
      {/*          <div>It deliver their message and cause an effect.</div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div>②</div>*/}
      {/*          <div>*/}
      {/*            They are designed to act only on the parts of the body.*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div>③</div>*/}
      {/*          <div>A hormone binds to its receptor.</div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div>④</div>*/}
      {/*          <div>The glands to restrain further formone is released.</div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div>⑤</div>*/}
      {/*          <div>*/}
      {/*            It allows the endocrine system to ensure the conditions in*/}
      {/*            your body.*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    /!* 화살표 유형: 4 *!/*/}
      {/*    <div className="question" style={{ marginBottom: 30 }}>*/}
      {/*      <div className="title" style={{ display: "flex" }}>*/}
      {/*        <div className="question-seq">4.&nbsp;</div>*/}
      {/*        <div className="question-title" style={{ paddingBottom: 5 }}>*/}
      {/*          다음 글에서 필자의 심경변화로 가장 적절한 것은?*/}
      {/*          <span style={{ fontSize: 11, color: "#666666" }}>*/}
      {/*            (외부지문: Dilemma)*/}
      {/*          </span>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="question-content" style={{ marginBottom: 15 }}>*/}
      {/*        &nbsp;&nbsp;How do hormones trigger reactions in the body? When a*/}
      {/*        hormone is released from a gland, it travels in the bloodstream*/}
      {/*        through the body in search of its target. Organs, tissues and*/}
      {/*        other glands in the bOdy have receptor sites that hormones must*/}
      {/*        billd to ill order to deliver their message and cause an effect.*/}
      {/*        BLIt because every hormone has its own unique shape, they are*/}
      {/*        designed to act only on the parts of the body that have a receptor*/}
      {/*        site with the corresponding shape. This mode of action can be*/}
      {/*        likened to a lock and key mechanism - if the key doesn't fit the*/}
      {/*        lock, then nothing will happen. When a hormone billds to its*/}
      {/*        receptor, it sets off a chain of other signaling pathways to*/}
      {/*        create a change in the body. Once the desired effect has taken*/}
      {/*        place and there is too much hormone circulating ill the blood,*/}
      {/*        this signal is fed back to the glands to restrain further hormone*/}
      {/*        release. This is called a feedback 100p and, when functioning*/}
      {/*        correctly, it allows the endocrine system to ensure the conditions*/}
      {/*        in your body remain ill balance.*/}
      {/*      </div>*/}
      {/*      <div*/}
      {/*        className="choose"*/}
      {/*        style={{ display: "flex", flexDirection: "column" }}*/}
      {/*      >*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div style={{ flex: 1 }}>①</div>*/}
      {/*          <div style={{ flex: 5, textAlign: "center" }}>hesitation</div>*/}
      {/*          <div style={{ flex: 1 }}>→</div>*/}
      {/*          <div style={{ flex: 5, textAlign: "center" }}>happy</div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div style={{ flex: 1 }}>②</div>*/}
      {/*          <div style={{ flex: 5, textAlign: "center" }}>sad</div>*/}
      {/*          <div style={{ flex: 1 }}>→</div>*/}
      {/*          <div style={{ flex: 5, textAlign: "center" }}>*/}
      {/*            embarrassment*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div style={{ flex: 1 }}>③</div>*/}
      {/*          <div style={{ flex: 5, textAlign: "center" }}>shy</div>*/}
      {/*          <div style={{ flex: 1 }}>→</div>*/}
      {/*          <div style={{ flex: 5, textAlign: "center" }}>anxiety</div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div style={{ flex: 1 }}>④</div>*/}
      {/*          <div style={{ flex: 5, textAlign: "center" }}>anxiety</div>*/}
      {/*          <div style={{ flex: 1 }}>→</div>*/}
      {/*          <div style={{ flex: 5, textAlign: "center" }}>calm</div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div style={{ flex: 1 }}>⑤</div>*/}
      {/*          <div style={{ flex: 5, textAlign: "center" }}>calm</div>*/}
      {/*          <div style={{ flex: 1 }}>→</div>*/}
      {/*          <div style={{ flex: 5, textAlign: "center" }}>hesitation</div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div*/}
      {/*    className="footer"*/}
      {/*    style={{*/}
      {/*      textAlign: "center",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <div*/}
      {/*      className="page-box"*/}
      {/*      style={{*/}
      {/*        display: "inline-block",*/}
      {/*        width: 100,*/}
      {/*        border: "1px solid",*/}
      {/*        background:*/}
      {/*          "linear-gradient(to bottom right, #fff calc(50% - 1px), black , #fff calc(50% + 1px) )",*/}
      {/*        fontSize: 12,*/}
      {/*        marginBottom: 15,*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <div*/}
      {/*        className="now-page"*/}
      {/*        style={{ textAlign: "left", paddingLeft: 5 }}*/}
      {/*      >*/}
      {/*        1*/}
      {/*      </div>*/}
      {/*      <div*/}
      {/*        className="max-page"*/}
      {/*        style={{ textAlign: "right", paddingRight: 5 }}*/}
      {/*      >*/}
      {/*        8*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      className="warning"*/}
      {/*      style={{ fontSize: 9.4, border: "1px solid" }}*/}
      {/*    >*/}
      {/*      이 시험문자의 저작긛은 00고등학교에 있습니다. 저작긛법에 의해*/}
      {/*      보호받는 저작물이므로 전재와 복지는 금지되여. 이를 어길시 저작긛법에*/}
      {/*      의거 처벌될 수 있습니다.*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="div_paper" style={{ padding: "7.7% 9.5% 2.3% 9.5%" }}>*/}
      {/*  <div*/}
      {/*    className="bigCont"*/}
      {/*    style={{*/}
      {/*      padding: "0 0 20px 0",*/}
      {/*      height: "258mm",*/}
      {/*      columnFill: "auto",*/}
      {/*      columnGap: 30,*/}
      {/*      columnRule: "1px solid black",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    /!* 보기만 있는 유형 8, 11, 13, 17,   *!/*/}
      {/*    <div className="question" style={{ marginBottom: 30 }}>*/}
      {/*      <div className="title" style={{ display: "flex" }}>*/}
      {/*        <div className="question-seq">8.&nbsp;</div>*/}
      {/*        <div className="question-title" style={{ paddingBottom: 5 }}>*/}
      {/*          다음 글의 밑줄 친 부분 중, 지칭하는 대상이{" "}*/}
      {/*          <span style={{ textDecoration: "underline" }}>다른</span>{" "}*/}
      {/*          하나는?*/}
      {/*          <span style={{ fontSize: 11, color: "#666666" }}>*/}
      {/*            (2022년 수능특강light 영어독해 12강 2번)*/}
      {/*          </span>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      /!* 서브박스 있는것도 있고 없는것도 있어서 없을때는 안보이게 하면 될듯 *!/*/}
      {/*      <div*/}
      {/*        className="subBox"*/}
      {/*        style={{*/}
      {/*          borderBottom: "0.5px solid black",*/}
      {/*          borderTop: "0.5px solid black",*/}
      {/*          marginBottom: 5,*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        This mode of action can be likened to a lock and key mechanism -*/}
      {/*        if the key doesn`t fit the lock. then nothing will happen.*/}
      {/*      </div>*/}
      {/*      <div className="question-content" style={{ marginBottom: 15 }}>*/}
      {/*        &nbsp;&nbsp;How do hormones trigger reactions in the body? When a*/}
      {/*        hormone is released from a gland, it travels in the bloodstream*/}
      {/*        through the body in search of its target. Organs, tissues and*/}
      {/*        other glands in the bOdy have receptor sites that hormones must*/}
      {/*        billd to ill order to deliver their message and cause an effect.*/}
      {/*        BLIt because every hormone has its own unique shape, they are*/}
      {/*        designed to act only on the parts of the body that have a receptor*/}
      {/*        site with the corresponding shape. This mode of action can be*/}
      {/*        likened to a lock and key mechanism - if the key doesn't fit the*/}
      {/*        lock, then nothing will happen. When a hormone billds to its*/}
      {/*        receptor, it sets off a chain of other signaling pathways to*/}
      {/*        create a change in the body. Once the desired effect has taken*/}
      {/*        place and there is too much hormone circulating ill the blood,*/}
      {/*        this signal is fed back to the glands to restrain further hormone*/}
      {/*        release. This is called a feedback 100p and, when functioning*/}
      {/*        correctly, it allows the endocrine system to ensure the conditions*/}
      {/*        in your body remain ill balance.*/}
      {/*      </div>*/}
      {/*      <div className="choose" style={{ display: "flex" }}>*/}
      {/*        <div style={{ flex: 1 }}>①</div>*/}
      {/*        <div style={{ flex: 1 }}>②</div>*/}
      {/*        <div style={{ flex: 1 }}>③</div>*/}
      {/*        <div style={{ flex: 1 }}>④</div>*/}
      {/*        <div style={{ flex: 1 }}>⑤</div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    /!* ABC 유형: 12, 14,  *!/*/}
      {/*    <div className="question" style={{ marginBottom: 30 }}>*/}
      {/*      <div className="title" style={{ display: "flex" }}>*/}
      {/*        <div className="question-seq">12.&nbsp;</div>*/}
      {/*        <div className="question-title" style={{ paddingBottom: 5 }}>*/}
      {/*          다음 글의 (A) ~ (C)에 들어갈 말로 어법상 가장 적절한 것은?*/}
      {/*          <span style={{ fontSize: 11, color: "#666666" }}>*/}
      {/*            (2022 수능특강light 영어독해 12강 2번)*/}
      {/*          </span>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="question-content" style={{ marginBottom: 15 }}>*/}
      {/*        &nbsp;&nbsp;How do hormones trigger reactions in the body? When a*/}
      {/*        hormone is released from a gland, it travels in the bloodstream*/}
      {/*        through the body in search of its target. Organs, tissues and*/}
      {/*        other glands in the bOdy have receptor sites that hormones must*/}
      {/*        billd to ill order to deliver their message and cause an effect.*/}
      {/*        BLIt because every hormone has its own unique shape, they are*/}
      {/*        designed to act only on the parts of the body that have a receptor*/}
      {/*        site with the corresponding shape. This mode of action can be*/}
      {/*        likened to a lock and key mechanism - if the key doesn't fit the*/}
      {/*        lock, then nothing will happen. When a hormone billds to its*/}
      {/*        receptor, it sets off a chain of other signaling pathways to*/}
      {/*        create a change in the body. Once the desired effect has taken*/}
      {/*        place and there is too much hormone circulating ill the blood,*/}
      {/*        this signal is fed back to the glands to restrain further hormone*/}
      {/*        release. This is called a feedback 100p and, when functioning*/}
      {/*        correctly, it allows the endocrine system to ensure the conditions*/}
      {/*        in your body remain ill balance.*/}
      {/*      </div>*/}

      {/*      <div*/}
      {/*        className="choose"*/}
      {/*        style={{ display: "flex", flexDirection: "column" }}*/}
      {/*      >*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div style={{ flex: 1 }}></div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>(A)</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>(B)</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>(C)</div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div style={{ flex: 1 }}>①</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>is released</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>have</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>circulated</div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div style={{ flex: 1 }}>②</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>released</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>has</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>circulated</div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div style={{ flex: 1 }}>③</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>is released</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>has</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>circulated</div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div style={{ flex: 1 }}>④</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>is released</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>has</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>circulating</div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div style={{ flex: 1 }}>⑤</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>calm</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>have</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>circulating</div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div*/}
      {/*    className="footer"*/}
      {/*    style={{*/}
      {/*      textAlign: "center",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <div*/}
      {/*      className="page-box"*/}
      {/*      style={{*/}
      {/*        display: "inline-block",*/}
      {/*        width: 100,*/}
      {/*        border: "1px solid",*/}
      {/*        background:*/}
      {/*          "linear-gradient(to bottom right, #fff calc(50% - 1px), black , #fff calc(50% + 1px) )",*/}
      {/*        fontSize: 12,*/}
      {/*        marginBottom: 15,*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <div*/}
      {/*        className="now-page"*/}
      {/*        style={{ textAlign: "left", paddingLeft: 5 }}*/}
      {/*      >*/}
      {/*        2*/}
      {/*      </div>*/}
      {/*      <div*/}
      {/*        className="max-page"*/}
      {/*        style={{ textAlign: "right", paddingRight: 5 }}*/}
      {/*      >*/}
      {/*        8*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      className="warning"*/}
      {/*      style={{ fontSize: 9.4, border: "1px solid" }}*/}
      {/*    >*/}
      {/*      이 시험문자의 저작긛은 00고등학교에 있습니다. 저작긛법에 의해*/}
      {/*      보호받는 저작물이므로 전재와 복지는 금지되여. 이를 어길시 저작긛법에*/}
      {/*      의거 처벌될 수 있습니다.*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="div_paper" style={{ padding: "7.7% 9.5% 2.3% 9.5%" }}>*/}
      {/*  <div*/}
      {/*    className="bigCont"*/}
      {/*    style={{*/}
      {/*      padding: "0 0 20px 0",*/}
      {/*      height: "258mm",*/}
      {/*      columnFill: "auto",*/}
      {/*      columnGap: 30,*/}
      {/*      columnRule: "1px solid black",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    /!* 2단 보기 유형: 16 *!/*/}
      {/*    <div className="question" style={{ marginBottom: 30 }}>*/}
      {/*      <div className="title" style={{ display: "flex" }}>*/}
      {/*        <div className="question-seq">16.&nbsp;</div>*/}
      {/*        <div className="question-title" style={{ paddingBottom: 5 }}>*/}
      {/*          다음 주어진 문장 이후에 올 글의 순서로 가장 적절한 것은?*/}
      {/*          <span style={{ fontSize: 11, color: "#666666" }}>*/}
      {/*            (2022 수능특강light 영어독해 12강 2번)*/}
      {/*          </span>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div*/}
      {/*        className="subBox"*/}
      {/*        style={{*/}
      {/*          borderBottom: "0.5px solid black",*/}
      {/*          borderTop: "0.5px solid black",*/}
      {/*          marginBottom: 5,*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        How do hormones trigger reactions in the body? When a hormone is*/}
      {/*        released from a glamd. it travels in the bloodstrem through the*/}
      {/*        body in search of its target. Organs, tissued and other glands in*/}
      {/*        the body have receptor sites that hormones must bind to in order*/}
      {/*        to deliver their message and cause an effect.*/}
      {/*      </div>*/}
      {/*      <div className="question-content" style={{ marginBottom: 15 }}>*/}
      {/*        &nbsp;&nbsp;How do hormones trigger reactions in the body? When a*/}
      {/*        hormone is released from a gland, it travels in the bloodstream*/}
      {/*        through the body in search of its target. Organs, tissues and*/}
      {/*        other glands in the bOdy have receptor sites that hormones must*/}
      {/*        billd to ill order to deliver their message and cause an effect.*/}
      {/*        BLIt because every hormone has its own unique shape, they are*/}
      {/*        designed to act only on the parts of the body that have a receptor*/}
      {/*        site with the corresponding shape. This mode of action can be*/}
      {/*        likened to a lock and key mechanism - if the key doesn't fit the*/}
      {/*        lock, then nothing will happen. When a hormone billds to its*/}
      {/*        receptor, it sets off a chain of other signaling pathways to*/}
      {/*        create a change in the body. Once the desired effect has taken*/}
      {/*        place and there is too much hormone circulating ill the blood,*/}
      {/*        this signal is fed back to the glands to restrain further hormone*/}
      {/*        release. This is called a feedback 100p and, when functioning*/}
      {/*        correctly, it allows the endocrine system to ensure the conditions*/}
      {/*        in your body remain ill balance.*/}
      {/*      </div>*/}
      {/*      <div className="choose" style={{ columnCount: 2 }}>*/}
      {/*        /!* 이부분 css로 순서 맞추기 애매해서 그냥 순서자체를 1>3>5>2>4 로 함 *!/*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div>①</div>*/}
      {/*          <div>(A)-(C)-(B)</div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div>③</div>*/}
      {/*          <div>(B)-(C)-(A)</div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div>⑤</div>*/}
      {/*          <div>(C)-(B)-(A)</div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div>②</div>*/}
      {/*          <div>(B)-(A)-(C)</div>*/}
      {/*        </div>*/}

      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div>④</div>*/}
      {/*          <div>(C)-(A)-(B)</div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    /!* AB 유형: 18, 19,  *!/*/}
      {/*    <div className="question" style={{ marginBottom: 30 }}>*/}
      {/*      <div className="title" style={{ display: "flex" }}>*/}
      {/*        <div className="question-seq">18.&nbsp;</div>*/}
      {/*        <div className="question-title" style={{ paddingBottom: 5 }}>*/}
      {/*          다음 글을 요약하고자 한다. 빈칸 (A)와 (B)에 들어갈 말로 가장*/}
      {/*          적절한 것은?*/}
      {/*          <span style={{ fontSize: 11, color: "#666666" }}>*/}
      {/*            (2022 수능특강light 영어독해 12강 2번)*/}
      {/*          </span>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="question-content" style={{ marginBottom: 15 }}>*/}
      {/*        &nbsp;&nbsp;How do hormones trigger reactions in the body? When a*/}
      {/*        hormone is released from a gland, it travels in the bloodstream*/}
      {/*        through the body in search of its target. Organs, tissues and*/}
      {/*        other glands in the bOdy have receptor sites that hormones must*/}
      {/*        billd to ill order to deliver their message and cause an effect.*/}
      {/*        BLIt because every hormone has its own unique shape, they are*/}
      {/*        designed to act only on the parts of the body that have a receptor*/}
      {/*        site with the corresponding shape. This mode of action can be*/}
      {/*        likened to a lock and key mechanism - if the key doesn't fit the*/}
      {/*        lock, then nothing will happen. When a hormone billds to its*/}
      {/*        receptor, it sets off a chain of other signaling pathways to*/}
      {/*        create a change in the body. Once the desired effect has taken*/}
      {/*        place and there is too much hormone circulating ill the blood,*/}
      {/*        this signal is fed back to the glands to restrain further hormone*/}
      {/*        release. This is called a feedback 100p and, when functioning*/}
      {/*        correctly, it allows the endocrine system to ensure the conditions*/}
      {/*        in your body remain ill balance.*/}
      {/*      </div>*/}
      {/*      /!* 서브박스 있을 수도 있고 없을 수도 있음 *!/*/}
      {/*      <div*/}
      {/*        className="subBox"*/}
      {/*        style={{*/}
      {/*          borderBottom: "0.5px solid black",*/}
      {/*          borderTop: "0.5px solid black",*/}
      {/*          marginBottom: 5,*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        Every hormone has its own (A) shape, they are designed to act only*/}
      {/*        on the parts of the body that gave a (B) site with the*/}
      {/*        corresponding shape.*/}
      {/*      </div>*/}
      {/*      <div*/}
      {/*        className="choose"*/}
      {/*        style={{ display: "flex", flexDirection: "column" }}*/}
      {/*      >*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div style={{ flex: 1 }}></div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>(A)</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>(B)</div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div style={{ flex: 1 }}>①</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>is released</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>have</div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div style={{ flex: 1 }}>②</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>released</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>has</div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div style={{ flex: 1 }}>③</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>is released</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>has</div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div style={{ flex: 1 }}>④</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>is released</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>has</div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex", gap: 5 }}>*/}
      {/*          <div style={{ flex: 1 }}>⑤</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>released</div>*/}
      {/*          <div style={{ flex: 3, textAlign: "center" }}>have</div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div*/}
      {/*    className="footer"*/}
      {/*    style={{*/}
      {/*      textAlign: "center",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <div*/}
      {/*      className="page-box"*/}
      {/*      style={{*/}
      {/*        display: "inline-block",*/}
      {/*        width: 100,*/}
      {/*        border: "1px solid",*/}
      {/*        background:*/}
      {/*          "linear-gradient(to bottom right, #fff calc(50% - 1px), black , #fff calc(50% + 1px) )",*/}
      {/*        fontSize: 12,*/}
      {/*        marginBottom: 15,*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <div*/}
      {/*        className="now-page"*/}
      {/*        style={{ textAlign: "left", paddingLeft: 5 }}*/}
      {/*      >*/}
      {/*        3*/}
      {/*      </div>*/}
      {/*      <div*/}
      {/*        className="max-page"*/}
      {/*        style={{ textAlign: "right", paddingRight: 5 }}*/}
      {/*      >*/}
      {/*        8*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      className="warning"*/}
      {/*      style={{ fontSize: 9.4, border: "1px solid" }}*/}
      {/*    >*/}
      {/*      이 시험문자의 저작긛은 00고등학교에 있습니다. 저작긛법에 의해*/}
      {/*      보호받는 저작물이므로 전재와 복지는 금지되여. 이를 어길시 저작긛법에*/}
      {/*      의거 처벌될 수 있습니다.*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="div_paper" style={{ padding: "7.7% 9.5% 2.3% 9.5%" }}>*/}
      {/*  <div*/}
      {/*    className="bigCont"*/}
      {/*    style={{*/}
      {/*      padding: "0 0 20px 0",*/}
      {/*      height: "258mm",*/}
      {/*      columnFill: "auto",*/}
      {/*      columnGap: 30,*/}
      {/*      columnRule: "1px solid black",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    /!* 서술형 영작 유형 20, 21, 22 *!/*/}
      {/*    <div className="question" style={{ marginBottom: 30 }}>*/}
      {/*      <div className="title" style={{ display: "flex" }}>*/}
      {/*        <div className="question-seq">20.&nbsp;</div>*/}
      {/*        <div className="question-title" style={{ paddingBottom: 5 }}>*/}
      {/*          다음 글의 밑줄 친 (A)에 해당하는 우리말 의미가 되도록*/}
      {/*          영작하시오.*/}
      {/*          <span style={{ fontSize: 11, color: "#666666" }}>*/}
      {/*            (2022 수능특강light 영어독해 12강 2번)*/}
      {/*          </span>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="question-content" style={{ marginBottom: 15 }}>*/}
      {/*        &nbsp;&nbsp;How do hormones trigger reactions in the body? When a*/}
      {/*        hormone is released from a gland, it travels in the bloodstream*/}
      {/*        through the body in search of its target. Organs, tissues and*/}
      {/*        other glands in the bOdy have receptor sites that hormones must*/}
      {/*        billd to ill order to deliver their message and cause an effect.*/}
      {/*        BLIt because every hormone has its own unique shape, they are*/}
      {/*        designed to act only on the parts of the body that have a receptor*/}
      {/*        site with the corresponding shape. This mode of action can be*/}
      {/*        likened to a lock and key mechanism - if the key doesn't fit the*/}
      {/*        lock, then nothing will happen. When a hormone billds to its*/}
      {/*        receptor, it sets off a chain of other signaling pathways to*/}
      {/*        create a change in the body. Once the desired effect has taken*/}
      {/*        place and there is too much hormone circulating ill the blood,*/}
      {/*        this signal is fed back to the glands to restrain further hormone*/}
      {/*        release. This is called a feedback 100p and, when functioning*/}
      {/*        correctly, it allows the endocrine system to ensure the conditions*/}
      {/*        in your body remain ill balance.*/}
      {/*      </div>*/}
      {/*      /!* 서브박스 있을 수도 있고 없을 수도 있음 *!/*/}
      {/*      <div*/}
      {/*        className="subBox"*/}
      {/*        style={{*/}
      {/*          borderBottom: "0.5px solid black",*/}
      {/*          borderTop: "0.5px solid black",*/}
      {/*          marginBottom: 5,*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        Every hormone has its own (A) shape, they are designed to act only*/}
      {/*        on the parts of the body that gave a (B) site with the*/}
      {/*        corresponding shape.*/}
      {/*      </div>*/}
      {/*      /!* 서브박스 있을 수도 있고 없을 수도 있음 *!/*/}
      {/*      <div*/}
      {/*        className="subBox"*/}
      {/*        style={{*/}
      {/*          borderBottom: "0.5px solid black",*/}
      {/*          borderTop: "0.5px solid black",*/}
      {/*          marginBottom: 5,*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        Every hormone has its own (A) shape, they are designed to act only*/}
      {/*        on the parts of the body that gave a (B) site with the*/}
      {/*        corresponding shape.*/}
      {/*      </div>*/}
      {/*      <div className="choose" style={{ display: "flex", paddingTop: 20 }}>*/}
      {/*        <div style={{ flex: 1 }}>*/}
      {/*          <div>Answer:</div>*/}
      {/*        </div>*/}
      {/*        <div style={{ flex: 8 }}>*/}
      {/*          <div*/}
      {/*            style={{ height: 23, borderBottom: "0.5px solid black" }}*/}
      {/*          ></div>*/}
      {/*          <div*/}
      {/*            style={{ height: 23, borderBottom: "0.5px solid black" }}*/}
      {/*          ></div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    /!* 서술형 빈칸 유형 23, 24 *!/*/}
      {/*    <div className="question" style={{ marginBottom: 30 }}>*/}
      {/*      <div className="title" style={{ display: "flex" }}>*/}
      {/*        <div className="question-seq">20.&nbsp;</div>*/}
      {/*        <div className="question-title" style={{ paddingBottom: 5 }}>*/}
      {/*          다음 글의 빈칸에 들어갈 말을 쓰시오.*/}
      {/*          <span style={{ fontSize: 11, color: "#666666" }}>*/}
      {/*            (2022 수능특강light 영어독해 12강 2번)*/}
      {/*          </span>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="question-content" style={{ marginBottom: 15 }}>*/}
      {/*        &nbsp;&nbsp;How do hormones trigger reactions in the body? When a*/}
      {/*        hormone is released from a gland, it travels in the bloodstream*/}
      {/*        through the body in search of its target. Organs, tissues and*/}
      {/*        other glands in the bOdy have receptor sites that hormones must*/}
      {/*        billd to ill order to deliver their message and cause an effect.*/}
      {/*        BLIt because every hormone has its own unique shape, they are*/}
      {/*        designed to act only on the parts of the body that have a receptor*/}
      {/*        site with the corresponding shape. This mode of action can be*/}
      {/*        likened to a lock and key mechanism - if the key doesn't fit the*/}
      {/*        lock, then nothing will happen. When a hormone billds to its*/}
      {/*        receptor, it sets off a chain of other signaling pathways to*/}
      {/*        create a change in the body. Once the desired effect has taken*/}
      {/*        place and there is too much hormone circulating ill the blood,*/}
      {/*        this signal is fed back to the glands to restrain further hormone*/}
      {/*        release. This is called a feedback 100p and, when functioning*/}
      {/*        correctly, it allows the endocrine system to ensure the conditions*/}
      {/*        in your body remain ill balance.*/}
      {/*      </div>*/}
      {/*      <div className="choose" style={{ display: "flex", paddingTop: 20 }}>*/}
      {/*        <div style={{ display: "flex" }}>*/}
      {/*          <div style={{ flex: 1 }}>Answer (A) :</div>*/}
      {/*          <div*/}
      {/*            style={{*/}
      {/*              flex: 2.3,*/}
      {/*              height: 23,*/}
      {/*              borderBottom: "0.5px solid black",*/}
      {/*            }}*/}
      {/*          ></div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex" }}>*/}
      {/*          <div style={{ flex: 1 }}>Answer (B) :</div>*/}
      {/*          <div*/}
      {/*            style={{*/}
      {/*              flex: 2.3,*/}
      {/*              height: 23,*/}
      {/*              borderBottom: "0.5px solid black",*/}
      {/*            }}*/}
      {/*          ></div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex" }}>*/}
      {/*          <div style={{ flex: 1 }}>Answer (C) :</div>*/}
      {/*          <div*/}
      {/*            style={{*/}
      {/*              flex: 2.3,*/}
      {/*              height: 23,*/}
      {/*              borderBottom: "0.5px solid black",*/}
      {/*            }}*/}
      {/*          ></div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex" }}>*/}
      {/*          <div style={{ flex: 1 }}>Answer (D) :</div>*/}
      {/*          <div*/}
      {/*            style={{*/}
      {/*              flex: 2.3,*/}
      {/*              height: 23,*/}
      {/*              borderBottom: "0.5px solid black",*/}
      {/*            }}*/}
      {/*          ></div>*/}
      {/*        </div>*/}
      {/*        <div style={{ display: "flex" }}>*/}
      {/*          <div style={{ flex: 1 }}>Answer (E) :</div>*/}
      {/*          <div*/}
      {/*            style={{*/}
      {/*              flex: 2.3,*/}
      {/*              height: 23,*/}
      {/*              borderBottom: "0.5px solid black",*/}
      {/*            }}*/}
      {/*          ></div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div*/}
      {/*    className="footer"*/}
      {/*    style={{*/}
      {/*      textAlign: "center",*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <div*/}
      {/*      className="page-box"*/}
      {/*      style={{*/}
      {/*        display: "inline-block",*/}
      {/*        width: 100,*/}
      {/*        border: "1px solid",*/}
      {/*        background:*/}
      {/*          "linear-gradient(to bottom right, #fff calc(50% - 1px), black , #fff calc(50% + 1px) )",*/}
      {/*        fontSize: 12,*/}
      {/*        marginBottom: 15,*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      <div*/}
      {/*        className="now-page"*/}
      {/*        style={{ textAlign: "left", paddingLeft: 5 }}*/}
      {/*      >*/}
      {/*        4*/}
      {/*      </div>*/}
      {/*      <div*/}
      {/*        className="max-page"*/}
      {/*        style={{ textAlign: "right", paddingRight: 5 }}*/}
      {/*      >*/}
      {/*        8*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      className="warning"*/}
      {/*      style={{ fontSize: 9.4, border: "1px solid" }}*/}
      {/*    >*/}
      {/*      이 시험문자의 저작긛은 00고등학교에 있습니다. 저작긛법에 의해*/}
      {/*      보호받는 저작물이므로 전재와 복지는 금지되여. 이를 어길시 저작긛법에*/}
      {/*      의거 처벌될 수 있습니다.*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  /!* */}
      {/*  복합문제는 문제 타이틀에 지문만있고 나머지 세부 문제들은 위에있는 폼 가져다 쓰면 될듯! */}
      {/*  위에 있는 세부적인 폼들은 복합문제를 대비해서 questionContent 전달안했을때 questionContent 안ㄴ보이게 하면 될거같아!*/}
      {/*  *!/*/}
      {/*</div>*/}
      </div>
  );
};

export default NormalBook;
