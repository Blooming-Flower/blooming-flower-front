import {useEffect, useState} from "react";

const BigBook = (props:ExamProps) => {
    const [rowData, setRowData] = useState(props.rowData)
    useEffect(()=>{
        console.log(props)
    },[rowData])
    return(
        <div className="pdf_container">
            <div className='div_paper'>
                {props.examTitle}
                {props.rowData.map(({id,passageName})=>(
                    <p key={id}>{passageName}</p>
                ))}
            </div>
            <div className='div_paper'>
                {props.examTitle}
                {props.rowData.map(({id,passageName})=>(
                    <p key={id}>{passageName}</p>
                ))}
            </div>
            <div className='div_paper'>
                {props.examTitle}
                {props.rowData.map(({id,passageName})=>(
                    <p key={id}>{passageName}</p>
                ))}
            </div>
        </div>
    )
}
export default BigBook