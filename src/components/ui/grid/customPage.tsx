import * as React from "react";
import { GridSlotsComponentsProps, useGridApiContext } from "@mui/x-data-grid";
import MuiPagination from "@mui/material/Pagination";
import { useEffect } from "react";
import { $GET } from "@utils/request";
import { addId } from "@utils/functions";

const customPagination = (
  props: NonNullable<GridSlotsComponentsProps["pagination"]>
) => {
  const apiRef = useGridApiContext();
  const [page, setPage] = React.useState(0);
  useEffect(() => {
    //타입별 재호출 => set그리드
    if(props.type == "passageMng"){
        $GET(
            "/api/v1/passage/search/list?page=" +
            page.toString() +
            "&size=10&passageYear=" +
            props.year +
            "&passageName=" + props.passageName,
            (res: any) => {
                apiRef.current.setRows(addId(res,props.year))
            }
        );
    } else if(props.type == "examMng"){
        let baseUrl = "/api/v1/exam/search?page=" +  page.toString() +"&size=5";
        
        let uri = props.text? baseUrl + "&examTitle=" + props.text : baseUrl;
        
        setTimeout(() => {
            $GET(
              uri,
              (res: any) => {
                let data = res.data.content;
                let newRows = [];
                for (let i = 0; i < data.length; i++) {
                  newRows.push({
                    id: i + 1,
                    title: data[i].examTitle,
                    createDate: data[i].createTime.split(" ")[0],
                    downPdf: "",
                    examId: data[i].examId
                  });
                }
      
                console.log("Res:::", res)
                console.log("newRows:::", newRows)
                apiRef.current.setRows(newRows);
              }
            );
          }, 5);

          console.log("page:::", props.page)
    }
  }, [page]);
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
        setPage(newPage - 1);
        apiRef.current.setPage(newPage - 1);
      }}
    />
  );
};

export default customPagination;
