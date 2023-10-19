import {useEffect, useState} from "react";
import bigHeader1 from '@images/common/big-head1.png'
import bigHeader2 from '@images/common/big-head2.png'
import {Grid} from "@mui/material";

const BigBook = (props:ExamProps) => {
    const [rowData, setRowData] = useState(props.rowData)
    useEffect(()=>{
        const paper = document.getElementById('paper1')
        console.log(paper!.clientHeight, paper!.scrollHeight)
        console.log('미리보기데이터',props)
    },[rowData])
    return(
        <div className="pdf_container" ref={props.pdfRef}>
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
                        {props.rowData.map(({passageId,questionSet,passageName})=>(
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
                                <div className='bigCont_answerList'>
                                    <p>① It deliver their message and cause an effect.</p>
                                    <p>② They are designed to act only on the parts of the body.</p>
                                    <p>③ A hormone binds to its receptor.</p>
                                    <p>④ The glands to restrain further hormone is released.</p>
                                    <p>⑤ It allows the endocrine system to ensure the conditions in your body.</p>
                                </div>
                            </div>
                        ))}
                        <div className='bigCont_questionBox'>
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
                            receptor sites that hormones must bind to in order to
                            deliver their message and cause an effect. But because
                            every hormone has its own unique shape, they are designed to act only on the parts of the body that have a receptor site with the corresponding shape. This mode
                            of action can be likened to a lock and key mechanism ― if the key doesn’t fit the lock, then nothing will
                            happen. When a hormone binds to its receptor, it sets
                            off a chain of other signaling pathways to create a change in the body. Once the desired effect has taken
                            place and there is too much hormone circulating in the
                            blood, this signal is fed back to the glands to restrain
                            further hormone release. This is called a feedback loop
                            and, when functioning correctly, it allows the endocrine
                            system to ensure the conditions in your body remain in
                            balance
                        </div>
                        <div className='bigCont_answerList'>
                            <p>① It deliver their message and cause an effect.</p>
                            <p>② They are designed to act only on the parts of the body.</p>
                            <p>③ A hormone binds to its receptor.</p>
                            <p>④ The glands to restrain further hormone is released.</p>
                            <p>⑤ It allows the endocrine system to ensure the conditions in your body.</p>
                        </div>
                        </div>
                        <div className='bigCont_questionBox'>
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
                                receptor sites that hormones must bind to in order to
                                deliver their message and cause an effect. But because
                                every hormone has its own unique shape, they are designed to act only on the parts of the body that have a receptor site with the corresponding shape. This mode
                                of action can be likened to a lock and key mechanism ― if the key doesn’t fit the lock, then nothing will
                                happen. When a hormone binds to its receptor, it sets
                                off a chain of other signaling pathways to create a change in the body. Once the desired effect has taken
                                place and there is too much hormone circulating in the
                                blood, this signal is fed back to the glands to restrain
                                further hormone release. This is called a feedback loop
                                and, when functioning correctly, it allows the endocrine
                                system to ensure the conditions in your body remain in
                                balance
                            </div>
                            <div className='bigCont_answerList'>
                                <p>① It deliver their message and cause an effect.</p>
                                <p>② They are designed to act only on the parts of the body.</p>
                                <p>③ A hormone binds to its receptor.</p>
                                <p>④ The glands to restrain further hormone is released.</p>
                                <p>⑤ It allows the endocrine system to ensure the conditions in your body.</p>
                            </div>
                        </div>
                        <div className='bigCont_questionBox'>
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
                                receptor sites that hormones must bind to in order to
                                deliver their message and cause an effect. But because
                                every hormone has its own unique shape, they are designed to act only on the parts of the body that have a receptor site with the corresponding shape. This mode
                                of action can be likened to a lock and key mechanism ― if the key doesn’t fit the lock, then nothing will
                                happen. When a hormone binds to its receptor, it sets
                                off a chain of other signaling pathways to create a change in the body. Once the desired effect has taken
                                place and there is too much hormone circulating in the
                                blood, this signal is fed back to the glands to restrain
                                further hormone release. This is called a feedback loop
                                and, when functioning correctly, it allows the endocrine
                                system to ensure the conditions in your body remain in
                                balance
                            </div>
                            <div className='bigCont_answerList'>
                                <p>① It deliver their message and cause an effect.</p>
                                <p>② They are designed to act only on the parts of the body.</p>
                                <p>③ A hormone binds to its receptor.</p>
                                <p>④ The glands to restrain further hormone is released.</p>
                                <p>⑤ It allows the endocrine system to ensure the conditions in your body.</p>
                            </div>
                        </div>
                        <div className='bigCont_questionBox'>
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
                                receptor sites that hormones must bind to in order to
                                deliver their message and cause an effect. But because
                                every hormone has its own unique shape, they are designed to act only on the parts of the body that have a receptor site with the corresponding shape. This mode
                                of action can be likened to a lock and key mechanism ― if the key doesn’t fit the lock, then nothing will
                                happen. When a hormone binds to its receptor, it sets
                                off a chain of other signaling pathways to create a change in the body. Once the desired effect has taken
                                place and there is too much hormone circulating in the
                                blood, this signal is fed back to the glands to restrain
                                further hormone release. This is called a feedback loop
                                and, when functioning correctly, it allows the endocrine
                                system to ensure the conditions in your body remain in
                                balance
                            </div>
                            <div className='bigCont_answerList'>
                                <p>① It deliver their message and cause an effect.</p>
                                <p>② They are designed to act only on the parts of the body.</p>
                                <p>③ A hormone binds to its receptor.</p>
                                <p>④ The glands to restrain further hormone is released.</p>
                                <p>⑤ It allows the endocrine system to ensure the conditions in your body.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='div_paper big_second'>
                <div className='bigCont'>
                    <div className='bigCont_sub'>
                        {props.rowData.map(({passageId,questionSet,passageName})=>(
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
                                <div className='bigCont_answerList'>
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
            </div>
            <div className='div_paper'>
                {props.examTitle}
                {props.rowData.map(({passageId,questionSet,passageName})=>(
                    <p key={passageId}>{passageName}</p>
                ))}
            </div>
            <div className='div_paper'>
                {props.examTitle}
                {props.rowData.map(({passageId,questionSet,passageName})=>(
                    <p key={passageId}>{passageName}</p>
                ))}
            </div>
        </div>
    )
}
export default BigBook