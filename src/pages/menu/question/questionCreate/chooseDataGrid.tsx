import { ABC_TYPES, AB_TYPES, ARROW_TYPES, WRITE_TYPES } from "@common/const";
import { LeakAddTwoTone } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GridApiCommunity } from "@mui/x-data-grid/internals";
import * as React from "react";

const defaultChooseRows = [
  {
    id: 1,
    chooseSeq: "①",
    chooseContent: "",
  },
  {
    id: 2,
    chooseSeq: "②",
    chooseContent: "",
  },
  {
    id: 3,
    chooseSeq: "③",
    chooseContent: "",
  },
  {
    id: 4,
    chooseSeq: "④",
    chooseContent: "",
  },
  {
    id: 5,
    chooseSeq: "⑤",
    chooseContent: "",
  },
];

const arrowChooseRows = [
  {
    id: 1,
    chooseSeq: "①",
    chooseContentA: "",
    arrow: "→",
    chooseContentB: "",
  },
  {
    id: 2,
    chooseSeq: "②",
    chooseContentA: "",
    arrow: "→",
    chooseContentB: "",
  },
  {
    id: 3,
    chooseSeq: "③",
    chooseContentA: "",
    arrow: "→",
    chooseContentB: "",
  },
  {
    id: 4,
    chooseSeq: "④",
    chooseContentA: "",
    arrow: "→",
    chooseContentB: "",
  },
  {
    id: 5,
    chooseSeq: "⑤",
    chooseContentA: "",
    arrow: "→",
    chooseContentB: "",
  },
];

const abcChooseRows = [
  {
    id: 1,
    chooseSeq: "①",
    chooseContentA: "",
    chooseContentB: "",
    chooseContentC: "",
  },
  {
    id: 2,
    chooseSeq: "②",
    chooseContentA: "",
    chooseContentB: "",
    chooseContentC: "",
  },
  {
    id: 3,
    chooseSeq: "③",
    chooseContentA: "",
    chooseContentB: "",
    chooseContentC: "",
  },
  {
    id: 4,
    chooseSeq: "④",
    chooseContentA: "",
    chooseContentB: "",
    chooseContentC: "",
  },
  {
    id: 5,
    chooseSeq: "⑤",
    chooseContentA: "",
    chooseContentB: "",
    chooseContentC: "",
  },
];

const abChooseRows = [
  {
    id: 1,
    chooseSeq: "①",
    chooseContentA: "",
    chooseContentB: "",
  },
  {
    id: 2,
    chooseSeq: "②",
    chooseContentA: "",
    chooseContentB: "",
  },
  {
    id: 3,
    chooseSeq: "③",
    chooseContentA: "",
    chooseContentB: "",
  },
  {
    id: 4,
    chooseSeq: "④",
    chooseContentA: "",
    chooseContentB: "",
  },
  {
    id: 5,
    chooseSeq: "⑤",
    chooseContentA: "",
    chooseContentB: "",
  },
];

const defaultColumns: GridColDef[] = [
  {
    field: "chooseSeq",
    headerName: "선지번호",
    width: 30,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "chooseContent",
    headerName: "선지내용",
    width: 750,
    align: "left",
    headerAlign: "center",
    editable: true,
  },
];

const arrowColunms: GridColDef[] = [
  {
    field: "chooseSeq",
    headerName: "선지번호",
    width: 30,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "chooseContentA",
    headerName: "선지내용",
    width: 350,
    align: "left",
    headerAlign: "center",
    editable: true,
  },
  {
    field: "arrow",
    headerName: "선지번호",
    width: 30,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "chooseContentB",
    headerName: "선지내용",
    width: 350,
    align: "left",
    headerAlign: "center",
    editable: true,
  },
];

const abcColunms: GridColDef[] = [
  {
    field: "chooseSeq",
    headerName: "선지번호",
    width: 30,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "chooseContentA",
    headerName: "선지내용",
    width: 250,
    align: "center",
    headerAlign: "center",
    editable: true,
  },
  {
    field: "chooseContentB",
    headerName: "선지내용",
    width: 250,
    align: "center",
    headerAlign: "center",
    editable: true,
  },
  {
    field: "chooseContentC",
    headerName: "선지내용",
    width: 250,
    align: "center",
    headerAlign: "center",
    editable: true,
  },
];

const abColunms: GridColDef[] = [
  {
    field: "chooseSeq",
    headerName: "선지번호",
    width: 30,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "chooseContentA",
    headerName: "선지내용",
    width: 375,
    align: "center",
    headerAlign: "center",
    editable: true,
  },
  {
    field: "chooseContentB",
    headerName: "선지내용",
    width: 375,
    align: "center",
    headerAlign: "center",
    editable: true,
  },
];

const ChooseDataGrid = React.forwardRef(
  (
    props: {
      chooseRef: React.MutableRefObject<GridApiCommunity>;
      questionType: string;
      chooseList?: any[];
    },
    ref
  ) => {
    let { chooseRef, questionType, chooseList } = props;
    const [rowData, setRowData] = React.useState(
      chooseList?.map((item, idx) => {
        item.id = idx + 1;
        return item;
      })
    );

    React.useImperativeHandle(ref, () => ({
      getChooseList() {
        if (WRITE_TYPES.includes(questionType)) {
          return [];
        } else if (
          ARROW_TYPES.includes(questionType) ||
          ABC_TYPES.includes(questionType) ||
          AB_TYPES.includes(questionType)
        ) {
          return chooseRef.current.getAllRowIds().map((id) => {
            const row = chooseRef.current.getRow(id);
            return { ...row, chooseSeq: id };
          });
        }
        return chooseRef.current
          .getAllRowIds()
          .map((id) => chooseRef.current.getRow(id))
          .map(({ id: chooseSeq, chooseContent }) => {
            return { chooseSeq, chooseContent };
          });
      },
    }));

    React.useEffect(() => {
      setRowData(
        chooseList?.map((item, idx) => {
          item.id = idx + 1;
          if (ARROW_TYPES.includes(questionType)) {
            item.arrow = "→";
          }
          return item;
        })
      );
    }, [props.chooseList]);

    return !questionType || WRITE_TYPES.includes(questionType) ? (
      <></>
    ) : (
      <DataGrid
        apiRef={chooseRef}
        rows={
          rowData?.length
            ? rowData
            : ARROW_TYPES.includes(questionType)
            ? arrowChooseRows
            : ABC_TYPES.includes(questionType)
            ? abcChooseRows
            : AB_TYPES.includes(questionType)
            ? abChooseRows
            : defaultChooseRows
        }
        columns={
          ARROW_TYPES.includes(questionType)
            ? arrowColunms
            : ABC_TYPES.includes(questionType)
            ? abcColunms
            : AB_TYPES.includes(questionType)
            ? abColunms
            : defaultColumns
        }
        slots={{ columnHeaders: () => null }}
        hideFooter={true}
        hideFooterPagination={true}
        hideFooterSelectedRowCount={true}
      />
    );
  }
);
export default ChooseDataGrid;
