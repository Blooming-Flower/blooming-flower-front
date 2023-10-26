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
    sortable: false,
  },
  {
    field: "chooseContent",
    headerName: "선지내용",
    width: 750,
    align: "left",
    headerAlign: "center",
    editable: true,
    sortable: false,
  },
];

const arrowColunms: GridColDef[] = [
  {
    field: "chooseSeq",
    headerName: "선지번호",
    width: 30,
    align: "center",
    headerAlign: "center",
    sortable: false,
  },
  {
    field: "chooseContentA",
    headerName: "선지내용",
    width: 350,
    align: "left",
    headerAlign: "center",
    editable: true,
    sortable: false,
  },
  {
    field: "arrow",
    headerName: "선지번호",
    width: 30,
    align: "center",
    headerAlign: "center",
    sortable: false,
  },
  {
    field: "chooseContentB",
    headerName: "선지내용",
    width: 350,
    align: "left",
    headerAlign: "center",
    editable: true,
    sortable: false,
  },
];

const abcColunms: GridColDef[] = [
  {
    field: "chooseSeq",
    headerName: "",
    width: 30,
    align: "center",
    headerAlign: "center",
    sortable: false,
  },
  {
    field: "chooseContentA",
    headerName: "(A)",
    width: 250,
    align: "center",
    headerAlign: "center",
    editable: true,
    sortable: false,
  },
  {
    field: "chooseContentB",
    headerName: "(B)",
    width: 250,
    align: "center",
    headerAlign: "center",
    editable: true,
    sortable: false,
  },
  {
    field: "chooseContentC",
    headerName: "(C)",
    width: 250,
    align: "center",
    headerAlign: "center",
    editable: true,
    sortable: false,
  },
];

const abColunms: GridColDef[] = [
  {
    field: "chooseSeq",
    headerName: "",
    width: 30,
    align: "center",
    headerAlign: "center",
    sortable: false,
  },
  {
    field: "chooseContentA",
    headerName: "(A)",
    width: 375,
    align: "center",
    headerAlign: "center",
    editable: true,
    sortable: false,
  },
  {
    field: "chooseContentB",
    headerName: "(B)",
    width: 375,
    align: "center",
    headerAlign: "center",
    editable: true,
    sortable: false,
  },
];

const chooseSeqs = ["①", "②", "③", "④", "⑤"];

const ChooseDataGrid = React.forwardRef(
  (
    props: {
      chooseRef: React.MutableRefObject<GridApiCommunity>;
      questionType: string;
      chooseList?: any[];
    },
    ref
  ) => {
    const { chooseRef, questionType, chooseList } = props;
    const [rowData, setRowData] = React.useState(
      chooseList?.map((item, idx) => {
        item.id = idx + 1;
        item.chooseSeq = chooseSeqs[idx];

        if (!("content" in item)) {
          if ("chooseContent" in item && item.chooseContent) {
            item.content = item.chooseContent;
          } else if ("chooseContentA" in item) {
            item.content = Object.entries(item)
              .reduce((arr, [key, value]) => {
                if (
                  [
                    "chooseContentA",
                    "chooseContentB",
                    "chooseContentC",
                  ].includes(key)
                ) {
                  arr.push(value);
                  return arr;
                }
                return arr;
              }, [] as any)
              .join("|");
          }
        }
        const arr = item.content?.split("|");
        if (
          !ARROW_TYPES.includes(questionType) &&
          !ABC_TYPES.includes(questionType) &&
          !AB_TYPES.includes(questionType) &&
          (!arr || arr.length > 1)
        ) {
          item.chooseContent = arr?.join("") ?? "";
        } else if (ARROW_TYPES.includes(questionType)) {
          item.arrow = "→";
          item.chooseContentA = arr[0];
          item.chooseContentB = arr[1];
        } else if (ABC_TYPES.includes(questionType)) {
          item.chooseContentA = arr[0];
          item.chooseContentB = arr[1];
          item.chooseContentC = arr[2];
        } else if (AB_TYPES.includes(questionType)) {
          item.chooseContentA = arr[0];
          item.chooseContentB = arr[1];
        }
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
            const chooseContent = Object.entries(row)
              .reduce((acc, [key, value]) => {
                if (
                  [
                    "chooseContentA",
                    "chooseContentB",
                    "chooseContentC",
                  ].includes(key)
                ) {
                  acc.push(value);
                }
                return acc;
              }, [] as any)
              .join("|");
            return {
              ...row,
              chooseSeq: id,
              chooseContent,
            };
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
          item.chooseSeq = chooseSeqs[idx];

          if (!("content" in item)) {
            if ("chooseContent" in item && item.chooseContent) {
              item.content = item.chooseContent;
            } else if ("chooseContentA" in item) {
              item.content = Object.entries(item)
                .reduce((arr, [key, value]) => {
                  if (
                    [
                      "chooseContentA",
                      "chooseContentB",
                      "chooseContentC",
                    ].includes(key)
                  ) {
                    arr.push(value);
                    return arr;
                  }
                  return arr;
                }, [] as any)
                .join("|");
            }
          }
          const arr = item.content?.split("|");
          if (
            !ARROW_TYPES.includes(questionType) &&
            !ABC_TYPES.includes(questionType) &&
            !AB_TYPES.includes(questionType) &&
            (!arr || arr.length > 1)
          ) {
            item.chooseContent = arr?.join("") ?? "";
          } else if (ARROW_TYPES.includes(questionType)) {
            item.arrow = "→";
            item.chooseContentA = arr[0];
            item.chooseContentB = arr[1];
          } else if (ABC_TYPES.includes(questionType)) {
            item.chooseContentA = arr[0];
            item.chooseContentB = arr[1];
            item.chooseContentC = arr[2];
          } else if (AB_TYPES.includes(questionType)) {
            item.chooseContentA = arr[0];
            item.chooseContentB = arr[1];
          }
          return item;
        })
      );
    }, [props.chooseList, props.questionType]);

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
        slots={
          ABC_TYPES.includes(questionType) || AB_TYPES.includes(questionType)
            ? {}
            : { columnHeaders: () => null }
        }
        hideFooter={true}
        hideFooterPagination={true}
        hideFooterSelectedRowCount={true}
      />
    );
  }
);
export default ChooseDataGrid;
