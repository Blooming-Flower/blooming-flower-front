import {useEffect, useState} from "react";

const BigBook = (props:ExamProps) => {
    const [rowData, setRowData] = useState(props.rowData)
    useEffect(()=>{
        console.log('미리보기데이터'+props)
    },[rowData])
    return(
        <div className="pdf_container">
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