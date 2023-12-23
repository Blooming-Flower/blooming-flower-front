import {useEffect, useRef, useState} from "react";
import bigHeader1 from '@images/common/big-head1.png'
import bigHeader2 from '@images/common/big-head2.png'
import bigHeader3 from '@images/common/bigHeader3.png'
import {Grid} from "@mui/material";
import {
    ComplexType, NormalType,
} from "@pages/menu/question/examCreate/questionType";

let seqTemp = 1
let questionSize = 0
let questionArr: {questionCode:string,questionTitle:string,question:question[],questionContent:string,passageName:string,passageYear:string,passageUnit:string,passageNumber:string}[] = []
let pagePerQuestion:{pageCount:number,questionIds:number[]}[] = []
const BigBook = (props:ExamProps) => {
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
            if(element.scrollWidth > element.clientWidth){
                setIsOverflow(isOverflow)
                setPageSeq(pageSeq+1)
                let questionIds = [];
                console.log('temp',temp1)
                console.log('temp2',temp2)
                for (let i = temp1; i < temp2-1; i++) {
                    questionIds.push(i)
                }
                pagePerQuestion.push({pageCount:pageSeq,questionIds:questionIds})
                setTemp1(temp2-Math.max(complexLength-1,1))
                seqTemp = seq-complexLength
                console.log('오버플로우',pagePerQuestion)
            }else{
                if(questionSize <= temp2){
                    // if(questionSize <= 2){
                    //     return;
                    // }
                    let questionIds = [];
                    console.log('temp',temp1)
                    console.log('temp2',temp2)
                    if(questionSize<=2){
                        for (let i = temp1; i < temp2; i++) {
                            questionIds.push(i)
                        }
                    }else {
                        for (let i = temp1; i < temp2 - 1; i++) {
                            questionIds.push(i)
                        }
                    }
                    pagePerQuestion.push({pageCount:pageSeq,questionIds:questionIds})
                    console.log('마지막',pagePerQuestion)
                    seqTemp = 1
                    setIsDone(!isDone)
                    return
                }
            }
            setTemp2(temp2+1)
        },20)
    }, [temp2])


    
    return(
        <div className="pdf_container" ref={props.pdfRef} id="pdf_container">
            <>
                {
                    isDone?
                        pagePerQuestion.map(({pageCount,questionIds},index0)=>(
                            <div className={pageCount == 1 ?'div_paper big_first':'div_paper big_second'} ref={pageRef} key={index0}>
                                {pageCount == 1 ?
                                    <Grid container className='bigHeader'>
                                        <Grid item xs={4}>
                                            <img src={bigHeader1} alt='bigHeader1'/>
                                        </Grid>
                                        <Grid item xs={4} className='bigHeader_text'>{props.header}</Grid>
                                        <Grid item xs={4}>
                                            <img src={bigHeader2} alt='bigHeader2'/>
                                        </Grid>
                                    </Grid>
                                    :
                                    <Grid container className='bigHeader'>
                                        <Grid item xs={12}>
                                            <img src={bigHeader3}/>
                                        </Grid>
                                    </Grid>
                                }
                                <div className='bigCont'>
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
                                                                        type={'bigBook'}
                                                                        questionTitle={questionArr[num].questionTitle}
                                                                        questionContent={questionArr[num].questionContent}
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
                                                                        type={'bigBook'}
                                                                        seq={seq=seq+complexLength}
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
                                <div className='bigBook_bottom'>
                                    {pageCount % 2  == 0?
                                        <div className='right-bottom'>
                                            {props.rightBottom}{pageCount}
                                        </div>
                                        :
                                        <div className='left-bottom'>
                                            {pageCount}{props.leftBottom}
                                        </div>
                                    }
                                </div>
                            </div>
                        ))
                        :
                        <div className={pageSeq == 1 ?'div_paper big_first':'div_paper big_second'} ref={pageRef}>
                            {pageSeq == 1 ?
                                <Grid container className='bigHeader'>
                                    <Grid item xs={4}>
                                        <img src={bigHeader1} alt='bigHeader1'/>
                                    </Grid>
                                    <Grid item xs={4} className='bigHeader_text'>{props.header}</Grid>
                                    <Grid item xs={4}>
                                        <img src={bigHeader2} alt='bigHeader2'/>
                                    </Grid>
                                </Grid>
                                :
                                <Grid container className='bigHeader'>
                                    <Grid item xs={12}>
                                        <img src={bigHeader3}/>
                                    </Grid>
                                </Grid>
                            }
                            <div className='bigCont'>
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
                                                                    type={'bigBook'}
                                                                    questionTitle={questionTitle}
                                                                    questionContent={questionContent}
                                                                    from={props.page == 'manage'?
                                                                        question[0].passageYear+' '+question[0].passageName+' '+question[0].passageUnit+' '+question[0].passageNumber
                                                                        :passageYear+' '+passageName+' '+passageUnit+' '+passageNumber}
                                                                />
                                                            )
                                                        }else{
                                                            complexLength = question.length
                                                            return (
                                                                <ComplexType
                                                                    questionInfo={{question,questionCode,questionTitle,questionContent}}
                                                                    seqLength={complexLength}
                                                                    type={'bigBook'}
                                                                    seq={seq=seq+complexLength}
                                                                    from={props.page == 'manage'?
                                                                        question[0].passageYear+' '+question[0].passageName+' '+question[0].passageUnit+' '+question[0].passageNumber
                                                                        :passageYear+' '+passageName+' '+passageUnit+' '+passageNumber}
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
                            <div className='bigBook_bottom'>
                                {pageSeq % 2  == 0?
                                    <div className='right-bottom'>
                                        {props.rightBottom}{pageSeq}
                                    </div>
                                    :
                                    <div className='left-bottom'>
                                        {pageSeq}{props.leftBottom}
                                    </div>
                                }
                            </div>
                        </div>
                }
                <div className='div_paper big_first'>
                        <Grid container className='bigHeader'>
                            <Grid item xs={4}>
                                <img src={bigHeader1} alt='bigHeader1'/>
                            </Grid>
                            <Grid item xs={4} className='bigHeader_text'>Answers</Grid>
                            <Grid item xs={4}>
                                <img src={bigHeader2} alt='bigHeader2'/>
                            </Grid>
                        </Grid>
                    <div className='bigCont'>
                        <div className='bigCont_sub'>
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
                    <div className='bigBook_bottom'>
                        {pageSeq+1 % 2  == 0?
                            <div className='right-bottom'>
                                {props.rightBottom}{pageSeq+1}
                            </div>
                            :
                            <div className='left-bottom'>
                                {pageSeq+1}{props.leftBottom}
                            </div>
                        }
                    </div>
                </div>
            </>
        </div>
    )
}
export default BigBook
