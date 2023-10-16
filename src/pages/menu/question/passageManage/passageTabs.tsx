import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ListItemText from "@mui/material/ListItemText";
import { Collapse, IconButton, ListItem } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { QUESTIONTYPE } from "@common/const";
import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { $DELETE, $DELETEPARAM } from "@utils/request";
interface callParent {
  data: { question: [] }[];
  parent: popupProps;
  setParent: setPopupProps;
  editor: React.MutableRefObject<any>;
  subBoxEditor1: React.MutableRefObject<any>;
  subBoxEditor2: React.MutableRefObject<any>;
}
export default function NestedList(props: callParent) {
  const [open, setOpen] = React.useState(false);
  const [listData, setListData] = React.useState(props.data);
  const handleClick = (
    content: string,
    title: string,
    questionId: number,
    questionCode: string
  ) => {
    props.setParent((parent: any) => ({
      ...parent,
      display: 1,
      type: "Q25",
      title: title,
      questionContent: content,
      pastYn: false,
      questionId,
      questionCode,
    }));
    props.editor.current.getInstance().setHTML(content);
    setOpen(!open);
  };

  React.useEffect(() => {
    setListData(props.data);
  }, [props.data]);

  const deleteHandle = (param: string, buttonType: number) => {
    if (buttonType == 1 || buttonType == 3) {
      $DELETE(`/api/v1/question/delete?questionCode=${param}`, (res: any) => {
        props.setParent((parent: any) => ({
          ...parent,
          check: !parent.check,
          display: 0,
        }));
      });
    } else {
      $DELETE(`/api/v1/question/delete/${param}`, (res: any) => {
        props.setParent((parent: any) => ({
          ...parent,
          check: !parent.check,
          display: 0,
        }));
      });
    }
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      subheader={
        <ListItemButton
          onClick={() =>
            props.setParent((parent: any) => ({
              ...parent,
              callPassage: !props.parent.callPassage,
            }))
          }
        >
          <ListSubheader
            sx={{ width: "100%" }}
            component="div"
            id="nested-list-subheader"
          >
            지문
          </ListSubheader>
        </ListItemButton>
      }
    >
      {listData.map((value1: any, index, array) =>
        value1.question.length > 1 ? (
          <div key={index}>
            <ListItem
              sx={{ paddingRight: "40px" }}
              secondaryAction={
                <IconButton
                  aria-label="comment"
                  style={{ padding: "0" }}
                  onClick={() => deleteHandle(value1.questionCode, 1)}
                >
                  <CancelPresentationIcon />
                </IconButton>
              }
            >
              <ListItemButton
                onClick={() => {
                  handleClick(
                    value1.questionContent,
                    value1.questionTitle,
                    0,
                    value1.questionCode
                  );
                }}
                style={{ paddingRight: "0" }}
              >
                <ListItemText primary="복합유형" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {value1.question.map((value2: any) => (
                  <ListItem
                    sx={{ paddingRight: "40px" }}
                    key={value2.questionId}
                    onClick={() => {
                      props.setParent((parent: any) => ({
                        ...parent,
                        display: 2,
                        type: "Q25",
                        subType: value2.questionType,
                        subPastYn: value2.pastYn,
                        title: value1.questionTitle,
                        subTitle: value2.questionSubTitle,
                        questionContent: value1.questionContent,
                        subContent: value2.subBox,
                        chooseList: value2.choose,
                        answerList: value2.answer,
                        questionId: value2.questionId,
                        questionCode: value1.questionCode,
                      }));
                      props.editor.current
                        .getInstance()
                        .setHTML(value1.questionContent);
                      const subBoxs = value2.split("|");
                      props.subBoxEditor1?.current
                        ?.getInstance()
                        .setHTML(subBoxs[0]);
                      props.subBoxEditor2?.current
                        ?.getInstance()
                        .setHTML(subBoxs[1]);
                    }}
                    secondaryAction={
                      <IconButton
                        aria-label="comment"
                        style={{ padding: "0" }}
                        onClick={() => deleteHandle(value2.questionId, 2)}
                      >
                        <CancelPresentationIcon />
                      </IconButton>
                    }
                  >
                    <ListItemButton
                      style={{ paddingRight: "0", paddingLeft: "30px" }}
                    >
                      <ListItemText
                        primary={QUESTIONTYPE[value2.questionType]}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ) : (
          <ListItem
            key={value1.question[0].questionId}
            sx={{ paddingRight: "40px" }}
            onClick={() => {
              props.setParent((parent: any) => ({
                ...parent,
                display: 3,
                type: value1.question[0].questionType,
                questionContent: value1.questionContent,
                subTitle: "",
                subContent: value1.question[0].subBox,
                title: value1.questionTitle,
                pastYn: value1.question[0].pastYn,
                chooseList: value1.question[0].choose,
                answerList: value1.question[0].answer,
                questionId: value1.question[0].questionId,
                questionCode: value1.questionCode,
              }));
              props.editor.current
                .getInstance()
                .setHTML(value1.questionContent);
              const subBoxs = value1.question[0].subBox.split("|");
              props.subBoxEditor1?.current?.getInstance().setHTML(subBoxs[0]);
              props.subBoxEditor2?.current?.getInstance().setHTML(subBoxs[1]);
            }}
            secondaryAction={
              <IconButton
                aria-label="comment"
                style={{ padding: "0" }}
                onClick={() => deleteHandle(value1.questionCode, 3)}
              >
                <CancelPresentationIcon />
              </IconButton>
            }
          >
            <ListItemButton>
              <ListItemText
                primary={QUESTIONTYPE[value1.question[0].questionType]}
              />
            </ListItemButton>
          </ListItem>
        )
      )}
    </List>
  );
}
