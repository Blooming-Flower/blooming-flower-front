import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GridApiCommunity } from "@mui/x-data-grid/internals";

const ARROW_TYPES = ["Q4"];
const ABC_TYPES = ["Q12", "Q14"];
const AB_TYPES = ["Q18", "Q19"];

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

const ChooseDataGrid = (props: {
  chooseRef: React.MutableRefObject<GridApiCommunity>;
  questionType: string;
}) => {
  const { chooseRef, questionType } = props;

  return questionType ? (
    <DataGrid
      apiRef={chooseRef}
      rows={
        ARROW_TYPES.includes(questionType)
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
  ) : (
    <></>
  );
};
export default ChooseDataGrid;
