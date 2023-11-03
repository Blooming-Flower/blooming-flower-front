import { WRITE_TYPES } from "@common/const";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  DataGrid,
  GridColDef,
  GRID_CHECKBOX_SELECTION_COL_DEF,
  GridActionsCell,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { GridApiCommunity } from "@mui/x-data-grid/internals";
import * as React from "react";

const AnswerDataGrid = React.forwardRef(
  (
    props: {
      answerRef: React.MutableRefObject<GridApiCommunity>;
      questionType: string;
      answerList?: any;
      id: any;
    },
    ref
  ) => {
    const defaultAnswerRows = [
      {
        id: 1,
        chooseSeq: "①",
        answerContent: "1",
      },
      {
        id: 2,
        chooseSeq: "②",
        answerContent: "2",
      },
      {
        id: 3,
        chooseSeq: "③",
        answerContent: "3",
      },
      {
        id: 4,
        chooseSeq: "④",
        answerContent: "4",
      },
      {
        id: 5,
        chooseSeq: "⑤",
        answerContent: "5",
      },
    ];

    const writeTypeDefaultRows = [
      {
        id: 1,
        chooseSeq: "A",
        answerContent: "",
      },
      {
        id: 2,
        chooseSeq: "B",
        answerContent: "",
      },
      {
        id: 3,
        chooseSeq: "C",
        answerContent: "",
      },
      {
        id: 4,
        chooseSeq: "D",
        answerContent: "",
      },
      {
        id: 5,
        chooseSeq: "E",
        answerContent: "",
      },
    ];

    const writeTypeQ23Rows = [
      {
        id: 1,
        chooseSeq: "A",
        answerContent: "",
      },
      {
        id: 2,
        chooseSeq: "B",
        answerContent: "",
      },
      {
        id: 3,
        chooseSeq: "C",
        answerContent: "",
      },
      {
        id: 4,
        chooseSeq: "D",
        answerContent: "",
      },
      {
        id: 5,
        chooseSeq: "E",
        answerContent: "",
      },
      {
        id: 6,
        chooseSeq: "F",
        answerContent: "",
      },
      {
        id: 7,
        chooseSeq: "G",
        answerContent: "",
      },
    ];

    const answerColunms: GridColDef[] = [
      {
        field: "chooseSeq",
        headerName: "선지번호",
        width: 30,
        align: "center",
        headerAlign: "center",
      },
      {
        ...GRID_CHECKBOX_SELECTION_COL_DEF,
        width: 30,
      },
    ];

    const wirteTypeColums: GridColDef[] = [
      {
        field: "chooseSeq",
        headerName: "선지번호",
        width: 30,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "answerContent",
        headerName: "정답란",
        width: 790,
        align: "center",
        editable: true,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 30,
        align: "center",
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => {
                let newRows = writeTypeRows
                  .filter((row: any) => row.id !== id)
                  .map(({ id }: any) => answerRef.current.getRow(id));
                if (newRows.length === 0) {
                  newRows = getWriteTypeRows();
                }
                let idx = 0;
                newRows.forEach((row: any) => (row.chooseSeq = seq[idx++]));
                setWriteTypeRows(newRows);
              }}
            />,
          ];
        },
      },
    ];
    const seq = [..."ABCDEFG"];
    const { answerRef, questionType } = props;

    const getWriteTypeRows = () =>
      props.answerList && isNaN(props.answerList[0]?.chooseSeq)
        ? props.answerList?.map((cur: any, idx: number) => {
            cur.id = idx + 1;
            cur.chooseSeq = seq[idx];
            return cur;
          })
        : props.questionType === "Q23"
        ? writeTypeQ23Rows
        : writeTypeDefaultRows;

    const [writeTypeRows, setWriteTypeRows] = React.useState(
      getWriteTypeRows()
    );

    React.useImperativeHandle(ref, () => ({
      getAnswerList() {
        if (!questionType) {
          return [];
        } else if (WRITE_TYPES.includes(questionType)) {
          return writeTypeRows
            .map(({ id }: any) => answerRef.current.getRow(id))
            .map((row: any) => {
              return { answerContent: row.answerContent };
            });
        }
        return [...answerRef.current.getSelectedRows().keys()].map((seq) => {
          return {
            answerContent: answerRef.current.getSelectedRows().get(seq)
              ?.answerContent,
          };
        });
      },
      resetWriteTypeRows() {
        setWriteTypeRows(getWriteTypeRows());
      },
    }));

    React.useEffect(() => {
      setTimeout(() => {
        if (props.answerList) {
          const checkList = document.querySelectorAll<any>(
            `.answer-wrap-${props.id} input.PrivateSwitchBase-input[type='checkbox']`
          );

          checkList.forEach((el) => {
            if (el?.checked) el?.click();
          });
          props?.answerList
            ?.filter((el: any) => Number(el.answerContent))
            .forEach((el: any) => {
              if (!checkList[el.answerContent - 1]?.checked) {
                checkList[el.answerContent - 1]?.click();
              }
            });
        }
      }, 50);
    });

    React.useEffect(() => {
      setWriteTypeRows(getWriteTypeRows());
    }, [props.answerList, props.questionType]);
    return !questionType ? (
      <></>
    ) : WRITE_TYPES.includes(questionType) ? (
      <DataGrid
        apiRef={answerRef}
        rows={writeTypeRows}
        columns={wirteTypeColums}
        slots={{ columnHeaders: () => null }}
        hideFooter={true}
        hideFooterPagination={true}
        hideFooterSelectedRowCount={true}
        rowSelection={false}
        sx={{ marginBottom: 1 }}
      />
    ) : (
      <DataGrid
        apiRef={answerRef}
        rows={defaultAnswerRows}
        columns={answerColunms}
        slots={{ columnHeaders: () => null }}
        hideFooter={true}
        hideFooterPagination={true}
        hideFooterSelectedRowCount={true}
        checkboxSelection
        sx={{ marginBottom: 1 }}
      />
    );
  }
);
export default AnswerDataGrid;
