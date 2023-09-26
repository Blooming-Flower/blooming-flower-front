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
        width: 820,
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
                const seq = [..."ABCD"];
                const newRows = writeTypeRows
                  .filter((row) => row.id !== id)
                  .map(({ id }) => answerRef.current.getRow(id));
                let idx = 0;
                newRows.forEach((row) => (row.chooseSeq = seq[idx++]));
                setWriteTypeRows(newRows);
              }}
            />,
          ];
        },
      },
    ];
    const { answerRef, questionType } = props;
    const [writeTypeRows, setWriteTypeRows] =
      React.useState(writeTypeDefaultRows);

    React.useImperativeHandle(ref, () => ({
      getAnswerList() {
        if (!questionType) {
          return [];
        } else if (WRITE_TYPES.includes(questionType)) {
          return writeTypeRows
            .map(({ id }) => answerRef.current.getRow(id))
            .map((row) => {
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
        setWriteTypeRows(writeTypeDefaultRows);
      },
    }));

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
