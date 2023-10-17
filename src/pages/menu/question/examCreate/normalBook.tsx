import {useEffect, useState} from "react";

const NormalBook = (props:ExamProps) => {
    const [rowData, setRowData] = useState(props.rowData)
    useEffect(()=>{
        console.log('미리보기데이터'+props)
    },[rowData])
    return(
        <div className='div_paper'>
            시험지다
        </div>
    )
}

export default NormalBook