import * as React from 'react';
import {
    GridSlotsComponentsProps,
    useGridApiContext,
} from '@mui/x-data-grid';
import MuiPagination from '@mui/material/Pagination';
import {useEffect} from "react";
import {$GET} from "@utils/request";
import {addId} from "@utils/functions";

const customPagination = (props: NonNullable<GridSlotsComponentsProps['pagination']>) => {
    const apiRef = useGridApiContext();
    const [page, setPage] = React.useState(0)
useEffect(()=>{
    //타입별 재호출 => set그리드
    if(props.type == "passageMng"){
        $GET(
            "/api/v1/passage/search/list?page=" +
            page.toString() +
            "&size=5&passageYear=" +
            props.year +
            "&passageName=" + props.passageName,
            (res: any) => {
                apiRef.current.setRows(addId(res,props.year))
            }
        );
    }
},[page])
    return (
        <MuiPagination
            color="standard"
            className="MuiTablePagination-root"
            count={props.pageCount}
            showFirstButton
            showLastButton
            shape="rounded"
            sx={{ display: "flex" }}
            page={page + 1}
            onChange={(event, newPage) => {
                setPage(newPage-1)
                apiRef.current.setPage(newPage-1)
            }}
        />
    );
}

export default customPagination