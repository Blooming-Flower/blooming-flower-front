import {useEffect, useState} from "react";
//기본타입
type questionType = {
    pastYn:boolean,         //기출여부
    choose:chooseList[],    //문제선지
    subBox:string,          //서브박스
    seq:number,             //문제번호
    questionTitle:string,   //문제발문
    questionContent?:string  //문제지문
    from:string
}
//기본타입 적용 단일문제
type normalType = {
    question:question[],
    seq:number,
    questionTitle:string,
    questionContent:string,
    from:string
}
//기본타입 적용 복합문제
type complexType = {
    questionInfo:questionInfo,
    seqLength:number,
    seq:number
    from:string
}

// 기본유형 1, 2, 3, 5, 7, 9, 10, 15
export const QuestionType1 = (props:questionType) => {
    return(
        <>
            <div className='bigCont_questionTitle'>
                {props.seq+'. '}
                {props.pastYn?
                    <span className="pastYn">
                        기출
                    </span>
                :
                    <></>
                }
                {props.questionTitle}
                <span className='bigCont_from'>
                    {props.from}
                </span>
            </div>
            <div className='bigCont_questionContent' dangerouslySetInnerHTML={{__html:props.questionContent!}}>
            </div>
            <div className="choose">
                {props.choose.map(({seq,content},num)=>(
                    <div style={{ display: "flex", gap: 5 }} key={num}>
                        <div>{num == 0? '①' : num == 1? '②': num==2? '③':num==3? '④':'⑤'}</div>
                        <div>{content}</div>
                    </div>
                ))}
            </div>
        </>
    )
}

// 화살표 유형 4
export const QuestionType2 = (props:questionType) => {
    return(
        <>
            <div className='bigCont_questionTitle'>
                {props.seq+'. '}
                {props.pastYn?
                    <span className="pastYn">
                        기출
                    </span>
                    :
                    <></>
                }
                {props.questionTitle}
                <span className='bigCont_from'>
                    {props.from}
                </span>
            </div>
            <div className='bigCont_questionContent' dangerouslySetInnerHTML={{__html:props.questionContent!}}>
            </div>
            <div className="choose">

            </div>
        </>
    )
}

//보기만 있는 유형 8, 11, 13, 17
export const QuestionType3 = (props:questionType) => {
    return(
        <>
            <div className='bigCont_questionTitle'>
                {props.seq+'. '}
                {props.pastYn?
                    <span className="pastYn">
                        기출
                    </span>
                    :
                    <></>
                }
                {props.questionTitle}
                <span className='bigCont_from'>
                    {props.from}
                </span>
            </div>
            {/* 서브박스 있는것도 있고 없는것도 있어서 없을때는 안보이게 하면 될듯 */}
            {props.subBox != '' ?
                <div className='subBox' dangerouslySetInnerHTML={{__html:props.subBox}}></div>
                    :
                <></>
            }
            <div className='bigCont_questionContent' dangerouslySetInnerHTML={{__html:props.questionContent!}}>
            </div>
            <div className="choose" style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>①</div>
                <div style={{ flex: 1 }}>②</div>
                <div style={{ flex: 1 }}>③</div>
                <div style={{ flex: 1 }}>④</div>
                <div style={{ flex: 1 }}>⑤</div>
            </div>
        </>
    )
}

//ABC유형 12, 14
export const QuestionType4 = (props:questionType) => {
    const [chooseCont, setChooseCont] = useState<chooseList[]>([]);
    //seq배열 재정리
    useEffect(()=>{
        let chooseCont:any = []
        for (let i = 0; i < props.choose.length; i++){
            chooseCont[i] = props.choose.find((chooseList)=>{
                if(chooseList.seq === i+1){
                    return true
                }
            })
        }
        setChooseCont(chooseCont)
    },[])
    return(
        <>
            <div className='bigCont_questionTitle'>
                {props.seq+'. '}
                {props.pastYn?
                    <span className="pastYn">
                        기출
                    </span>
                    :
                    <></>
                }
                {props.questionTitle}
                <span className='bigCont_from'>
                    {props.from}
                </span>
            </div>
            <div className='bigCont_questionContent' dangerouslySetInnerHTML={{__html:props.questionContent!}}>
            </div>
            <div className='choose'>
                <div style={{ display: "flex", gap: 5 }}>
                    <div style={{ flex: 1 }}></div>
                    <div style={{ flex: 3, textAlign: "center" }}>(A)</div>
                    <div style={{ flex: 3, textAlign: "center" }}>(B)</div>
                    <div style={{ flex: 3, textAlign: "center" }}>(C)</div>
                </div>
                {chooseCont.map(({seq,content},index)=>(
                    <div style={{ display: "flex", gap: 5 }} key={index}>
                        <div style={{ flex: 1 }}>{seq == 1?'①':seq==2?'②':seq==3?'③':seq==4?'④':'⑤'}</div>
                        <div style={{ flex: 3, textAlign: "center" }}>{content.split('|')[0]}</div>
                        <div style={{ flex: 3, textAlign: "center" }}>{content.split('|')[1]}</div>
                        <div style={{ flex: 3, textAlign: "center" }}>{content.split('|')[2]}</div>
                    </div>
                ))}
            </div>
        </>
    )
}

//2단 보기 유형 16
export const QuestionType5 = (props:questionType) => {
    const [chooseCont, setChooseCont] = useState<chooseList[]>([]);
    //seq배열 재정리
    useEffect(()=>{
        let chooseCont:any = []
        for (let i = 0; i < props.choose.length; i++){
            chooseCont[i] = props.choose.find((chooseList)=>{
                if(chooseList.seq === i+1){
                    return true
                }
            })
        }
        setChooseCont(chooseCont)
    },[])
    return(
        <>
            <div className='bigCont_questionTitle'>
                {props.seq+'. '}
                {props.pastYn?
                    <span className="pastYn">
                        기출
                    </span>
                    :
                    <></>
                }
                {props.questionTitle}
                <span className='bigCont_from'>
                    {props.from}
                </span>
            </div>
            {/* 서브박스 있는것도 있고 없는것도 있어서 없을때는 안보이게 하면 될듯 */}
            {props.subBox != '' ?
                <div className='subBox' dangerouslySetInnerHTML={{__html:props.subBox}}></div>
                :
                <></>
            }
            <div className='bigCont_questionContent' dangerouslySetInnerHTML={{__html:props.questionContent!}}>
            </div>
            <div className='choose' style={{columnCount:2}}>
                <div style={{ display: "flex", gap: 5 }}>
                    <div>①</div>
                    <div>(A)-(C)-(B)</div>
                </div>
                {chooseCont.map(({seq,content},index)=>(
                    <div style={{ display: "flex", gap: 5 }} key={index}>
                        <div>{seq == 1?'①':seq==2?'②':seq==3?'③':seq==4?'④':'⑤'}</div>
                        <div>{content.split('|')[0]+'-'+content.split('|')[1]+'-'+content.split('|')[2]}</div>
                    </div>
                ))}
            </div>
        </>
    )
}

//AB유형 18, 19
export const QuestionType6 = (props:questionType) => {
    const [chooseCont, setChooseCont] = useState<chooseList[]>([]);
    //seq배열 재정리
    useEffect(()=>{
        let chooseCont:any = []
        for (let i = 0; i < props.choose.length; i++){
            chooseCont[i] = props.choose.find((chooseList)=>{
                if(chooseList.seq === i+1){
                    return true
                }
            })
        }
        setChooseCont(chooseCont)
    },[])
    return(
        <>
            <div className='bigCont_questionTitle'>
                {props.seq+'. '}
                {props.pastYn?
                    <span className="pastYn">
                        기출
                    </span>
                    :
                    <></>
                }
                {props.questionTitle}
                <span className='bigCont_from'>
                    {props.from}
                </span>
            </div>
            {/* 서브박스 있는것도 있고 없는것도 있어서 없을때는 안보이게 하면 될듯 */}
            {props.subBox != '' ?
                <div className='subBox' dangerouslySetInnerHTML={{__html:props.subBox}}></div>
                :
                <></>
            }
            <div className='bigCont_questionContent' dangerouslySetInnerHTML={{__html:props.questionContent!}}>
            </div>
            <div style={{ display: "flex", gap: 5 }}>
                <div style={{ flex: 1 }}></div>
                <div style={{ flex: 3, textAlign: "center" }}>(A)</div>
                <div style={{ flex: 3, textAlign: "center" }}>(B)</div>
            </div>
            {chooseCont.map(({seq,content},index)=>(
                <div style={{ display: "flex", gap: 5 }} key={index}>
                    <div style={{ flex: 1 }}>{seq == 1?'①':seq==2?'②':seq==3?'③':seq==4?'④':'⑤'}</div>
                    <div style={{ flex: 3, textAlign: "center" }}>{content.split('|')[0]}</div>
                    <div style={{ flex: 3, textAlign: "center" }}>{content.split('|')[1]}</div>
                </div>
            ))}
        </>
    )
}

//서술형 영작 유형 20, 21, 22
export const QuestionType7 = (props:questionType) => {
    return(
        <>
            <div className='bigCont_questionTitle'>
                {props.seq+'. '}
                {props.pastYn?
                    <span className="pastYn">
                        기출
                    </span>
                    :
                    <></>
                }
                {props.questionTitle}
                <span className='bigCont_from'>
                    {props.from}
                </span>
            </div>
            {/* 서브박스 있는것도 있고 없는것도 있어서 없을때는 안보이게 하면 될듯 */}
            {props.subBox != '' ?
                <div className='subBox' dangerouslySetInnerHTML={{__html:props.subBox}}></div>
                :
                <></>
            }
            <div className='bigCont_questionContent' dangerouslySetInnerHTML={{__html:props.questionContent!}}>
            </div>
            <div className='choose' style={{display:'flex',paddingTop:20}}>
                <div style={{ flex: 1 }}>
                    <div>Answer:</div>
                </div>
                <div style={{ flex: 8 }}>
                    <div style={{ height: 23, borderBottom: "0.5px solid black" }}
                    ></div>
                    <div style={{ height: 23, borderBottom: "0.5px solid black" }}
                    ></div>
                </div>
            </div>
        </>
    )
}

//normal유형
export const NormalType = (props:normalType) => {
    return(
        <>
            {/* 기본유형 1, 2, 3, 5, 6, 7, 9, 10, 15,  */}
            {(props.question[0].questionType == 'Q1'||
                props.question[0].questionType == 'Q2'||
                props.question[0].questionType == 'Q3'||
                props.question[0].questionType == 'Q5'||
                props.question[0].questionType == 'Q6'||
                props.question[0].questionType == 'Q7'||
                props.question[0].questionType == 'Q9'||
                props.question[0].questionType == 'Q10'||
                props.question[0].questionType == 'Q15') ?
                <QuestionType1
                    pastYn={props.question[0].pastYn}
                    choose={props.question[0].choose}
                    subBox={props.question[0].subBox}
                    seq={props.seq}
                    questionTitle={props.questionTitle}
                    questionContent={props.questionContent}
                    from={props.from}
                />
                //화살표 유형: 4
                : (props.question[0].questionType == 'Q4') ?
                    <QuestionType2
                        pastYn={props.question[0].pastYn}
                        choose={props.question[0].choose}
                        subBox={props.question[0].subBox}
                        seq={props.seq}
                        questionTitle={props.questionTitle}
                        questionContent={props.questionContent}
                        from={props.from}
                    />
                    //보기만 있는 유형 8, 11, 13, 17
                    : (props.question[0].questionType == 'Q8'||
                        props.question[0].questionType == 'Q11'||
                        props.question[0].questionType == 'Q13'||
                        props.question[0].questionType == 'Q17') ?
                        <QuestionType3
                            pastYn={props.question[0].pastYn}
                            choose={props.question[0].choose}
                            subBox={props.question[0].subBox}
                            seq={props.seq}
                            questionTitle={props.questionTitle}
                            questionContent={props.questionContent}
                            from={props.from}
                        />
                        // ABC 유형: 12, 14,
                        : (props.question[0].questionType == 'Q12'||
                            props.question[0].questionType == 'Q14') ?
                            <QuestionType4
                                pastYn={props.question[0].pastYn}
                                choose={props.question[0].choose}
                                subBox={props.question[0].subBox}
                                seq={props.seq}
                                questionTitle={props.questionTitle}
                                questionContent={props.questionContent}
                                from={props.from}
                            />
                            // 2단 보기 유형: 16
                            :(props.question[0].questionType == 'Q16')?
                                <QuestionType5
                                    pastYn={props.question[0].pastYn}
                                    choose={props.question[0].choose}
                                    subBox={props.question[0].subBox}
                                    seq={props.seq}
                                    questionTitle={props.questionTitle}
                                    questionContent={props.questionContent}
                                    from={props.from}
                                />
                                // AB 유형: 18, 19
                                :(props.question[0].questionType == 'Q18'||
                                    props.question[0].questionType == 'Q19')?
                                    <QuestionType6
                                        pastYn={props.question[0].pastYn}
                                        choose={props.question[0].choose}
                                        subBox={props.question[0].subBox}
                                        seq={props.seq}
                                        questionTitle={props.questionTitle}
                                        questionContent={props.questionContent}
                                        from={props.from}
                                    />
                                    // 서술형 영작 유형 20, 21, 22
                                    :
                                    <QuestionType7
                                        pastYn={props.question[0].pastYn}
                                        choose={props.question[0].choose}
                                        subBox={props.question[0].subBox}
                                        seq={props.seq}
                                        questionTitle={props.questionTitle}
                                        questionContent={props.questionContent}
                                        from={props.from}
                                    />
            }
        </>
    )
}




//복합유형
export const ComplexType = (props:complexType) => {
    return(
        <>
            <div className='bigCont_questionTitle'>
                {props.seq-props.questionInfo.question.length+'-'+(props.seq-1)+'. '}
                {props.questionInfo.questionTitle}
                <span className='bigCont_from'>
                    (2023년 6월 고3 30번)
                </span>
                <div className='bigCont_questionContent' dangerouslySetInnerHTML={{__html:props.questionInfo.questionContent}}>
                </div>
            </div>
            {props.questionInfo.question.map(({questionSubTitle,questionType,subBox,choose,pastYn},index)=>(
                <div key={index}>
                    {(questionType == 'Q1' ||
                        questionType == 'Q2' ||
                        questionType == 'Q4' ||
                        questionType == 'Q5' ||
                        questionType == 'Q6' ||
                        questionType == 'Q7' ||
                        questionType == 'Q9' ||
                        questionType == 'Q10' ||
                        questionType == 'Q15')?
                        <QuestionType1
                            pastYn={pastYn}
                            choose={choose}
                            subBox={subBox}
                            seq={props.seq-props.questionInfo.question.length+index}
                            questionTitle={questionSubTitle}
                            from={props.from}
                        />
                        :(questionType == 'Q4') ?
                            <QuestionType2
                                pastYn={pastYn}
                                choose={choose}
                                subBox={subBox}
                                seq={props.seq-props.questionInfo.question.length+index}
                                questionTitle={questionSubTitle}
                                from={props.from}
                            />
                            :(questionType == 'Q8'||
                                questionType == 'Q11'||
                                questionType == 'Q13'||
                                questionType == 'Q17')?
                                <QuestionType3
                                    pastYn={pastYn}
                                    choose={choose}
                                    subBox={subBox}
                                    seq={props.seq-props.questionInfo.question.length+index}
                                    questionTitle={questionSubTitle}
                                    from={props.from}
                                />
                                :(questionType == 'Q12'||
                                    questionType == 'Q14')?
                                        <QuestionType4
                                            pastYn={pastYn}
                                            choose={choose}
                                            subBox={subBox}
                                            seq={props.seq-props.questionInfo.question.length+index}
                                            questionTitle={questionSubTitle}
                                            from={props.from}
                                        />
                                    :(questionType == 'Q16')?
                                        <QuestionType5
                                            pastYn={pastYn}
                                            choose={choose}
                                            subBox={subBox}
                                            seq={props.seq-props.questionInfo.question.length+index}
                                            questionTitle={questionSubTitle}
                                            from={props.from}
                                        />
                                        :(questionType == 'Q18'||
                                            questionType == 'Q19')?
                                                <QuestionType6
                                                    pastYn={pastYn}
                                                    choose={choose}
                                                    subBox={subBox}
                                                    seq={props.seq-props.questionInfo.question.length+index}
                                                    questionTitle={questionSubTitle}
                                                    from={props.from}
                                                />
                                            :
                                                <QuestionType7
                                                    pastYn={pastYn}
                                                    choose={choose}
                                                    subBox={subBox}
                                                    seq={props.seq-props.questionInfo.question.length+index}
                                                    questionTitle={questionSubTitle}
                                                    from={props.from}
                                                />
                    }
                </div>
            ))}
        </>
    )
}