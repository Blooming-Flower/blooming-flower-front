import {createElement, useEffect, useRef, useState} from "react";
import bigHeader1 from '@images/common/big-head1.png'
import bigHeader2 from '@images/common/big-head2.png'
import {Grid} from "@mui/material";
import {
    ComplexType, NormalType, QuestionType1,
} from "@pages/menu/question/examCreate/questionType";

const BigBook = (props:ExamProps) => {
    let seq = 1
    let pageSeq = 1
    const containerRef = useRef<any>()
    const [rowData, setRowData] = useState(props.rowData)
    const [pageTemp, setPageTemp] = useState(0);
    useEffect(()=>{
        containerRef.current.appendChild()
        // const pdfCont = document.getElementById('paper1')
        // console.log(pdfCont!.clientWidth < pdfCont!.scrollWidth)
        // if (pdfCont!.clientWidth < pdfCont!.scrollWidth){
        //     console.log(pdfCont!.lastElementChild!)
        // }

        console.log('미리보기데이터',props)
    },[rowData])
    return(
        <div className="pdf_container" ref={props.pdfRef} id="pdf_container">
            <div ref={containerRef}>
            <div className='div_paper big_first'  id='paper1'>
                <Grid container className='bigHeader'>
                    <Grid item xs={4}>
                        <img src={bigHeader1} alt='bigHeader1'/>
                    </Grid>
                    <Grid item xs={4} className='bigHeader_text'>{props.header}</Grid>
                    <Grid item xs={4}>
                        <img src={bigHeader2} alt='bigHeader2'/>
                    </Grid>
                </Grid>
                <div className='bigCont'>
                    <div className='bigCont_sub'>
                        {props.rowData.map(({passageId,questionInfo,passageName,passageYear,passageUnit,passageNumber},index0)=>(
                            <div key={index0}>
                                {questionInfo.map(({questionTitle,question,questionContent},index1)=>(
                                    <div key={index1} className='bigCont_questionBox'>
                                        {questionInfo[index1].question.length == 1?  //복합유형이 아닐경우
                                                <NormalType
                                                    question={question}
                                                    seq={seq++}
                                                    questionTitle={questionTitle}
                                                    questionContent={questionContent}
                                                    from={passageYear+' '+passageName+' '+passageUnit+' '+passageNumber}
                                                />
                                        : //복합유형일 경우
                                                <ComplexType
                                                    questionInfo={questionInfo[index1]}
                                                    seqLength={questionInfo[index1].question.length}
                                                    seq={seq=seq+questionInfo[index1].question.length}
                                                    from={passageYear+' '+passageName+' '+passageUnit+' '+passageNumber}
                                                />
                                        }
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                {pageSeq % 2  == 0?
                    <div className='right-bottom'>
                        {props.rightBottom}{pageSeq++}
                    </div>
                    :
                    <div className='left-bottom'>
                        {pageSeq++}{props.leftBottom}
                    </div>
                }
            </div>
            <div className='div_paper big_second'>
                <div className='bigCont'>
                    <div className='bigCont_sub'>
                        {props.rowData.map(({passageId,questionInfo,passageName})=>(
                            <div key={passageId} className='bigCont_questionBox'>
                                <div className='bigCont_questionTitle'>
                                    1.
                                    <div className='bigCont_pastYn'>
                                        기출
                                    </div>
                                    다음글의 제목으로 가장 적절한 것은?
                                    <span className='bigCont_from'>
                                        (2023년 6월 고3 30번)
                                    </span>
                                </div>
                                <div className='bigCont_questionContent'>
                                    How do hormones trigger reactions in the body? When a hormone is released from a gland, it travels in the
                                    bloodstream through the body in search of its target.
                                    Organs, tissues and other glands in the body have
                                    receptor sites that hormonds to its receptor, it sets
                                    off a chain of other signaling pathways to create a change in the body. Once the desired effect has taken
                                    place and there is too much hormone circulating in the
                                    blood, this signal is fed back to the glands to restrain
                                    further hormone release. This is called a feedback loop
                                    and, when functioning correctly, it allows the endocrine
                                    system to ensure the conditions in your body remain in
                                    balance
                                </div>
                                <div className='bigCont_chooseList'>
                                    <p>① It deliver their message and cause an effect.</p>
                                    <p>② They are designed to act only on the parts of the body.</p>
                                    <p>③ A hormone binds to its receptor.</p>
                                    <p>④ The glands to restrain further hormone is released.</p>
                                    <p>⑤ It allows the endocrine system to ensure the conditions in your body.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {pageSeq % 2  == 0?
                    <div className='right-bottom'>
                        {props.rightBottom}{pageSeq++}
                    </div>
                    :
                    <div className='left-bottom'>
                        {pageSeq++}{props.leftBottom}
                    </div>
                }
            </div>
            <div className='div_paper'>
                {props.examTitle}
                {props.rowData.map(({passageId,questionInfo,passageName})=>(
                    <p key={passageId}>{passageName}</p>
                ))}
                {pageSeq % 2  == 0?
                    <div className='right-bottom'>
                        {props.rightBottom}{pageSeq++}
                    </div>
                    :
                    <div className='left-bottom'>
                        {pageSeq++}{props.leftBottom}
                    </div>
                }
            </div>
            <div className='div_paper'>
                {props.examTitle}
                {props.rowData.map(({passageId,questionInfo,passageName})=>(
                    <p key={passageId}>{passageName}</p>
                ))}
            </div>
            </div>
        </div>
    )
}
export default BigBook