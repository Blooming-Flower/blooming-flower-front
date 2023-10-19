import { useEffect, useState } from "react";

const NormalBook = (props: ExamProps) => {
  const [rowData, setRowData] = useState(props.rowData);
  useEffect(() => {
    console.log("미리보기데이터", props);
  }, [rowData]);
  return (
    <div className="div_paper" style={{ padding: "7.7% 9.5% 2.3% 9.5%" }}>
      <div
        className="head"
        style={{ borderBottom: "3px solid", marginBottom: 17 }}
      >
        <div style={{ textAlign: "center", fontSize: 25 }}>
          {props.examTitle}
        </div>
        <h1 style={{ textAlign: "center", fontSize: 52 }}>영어</h1>
      </div>
      <div
        className="bigCont"
        style={{
          padding: "0 0 20px 0",
          height: "82.5%",
          columnFill: "auto",
          columnGap: 30,
        }}
      >
        <div className="question" style={{ marginBottom: 30 }}>
          <div className="title" style={{ display: "flex" }}>
            <div className="question-seq">1.&nbsp;</div>
            <div className="question-title">
              <span
                style={{
                  color: "white",
                  background: "#4c4c4c",
                  borderRadius: 4,
                  padding: "0px 6px 0 4px",
                }}
              >
                기출
              </span>
              다음 글의 주제로 가장 적절한 것은?
              <span style={{ fontSize: 11, color: "#666666" }}>
                (2023년 6월 고3 30번)
              </span>
            </div>
          </div>
          <div className="question-content" style={{ marginBottom: 15 }}>
            &nbsp;&nbsp;How do hormones trigger reactions in the body? When a
            hormone is released from a gland, it travels in the bloodstream
            through the body in search of its target. Organs, tissues and other
            glands in the bOdy have receptor sites that hormones must billd to
            ill order to deliver their message and cause an effect. BLIt because
            every hormone has its own unique shape, they are designed to act
            only on the parts of the body that have a receptor site with the
            corresponding shape. This mode of action can be likened to a lock
            and key mechanism - if the key doesn't fit the lock, then nothing
            will happen. When a hormone billds to its receptor, it sets off a
            chain of other signaling pathways to create a change in the body.
            Once the desired effect has taken place and there is too much
            hormone circulating ill the blood, this signal is fed back to the
            glands to restrain further hormone release. This is called a
            feedback 100p and, when functioning correctly, it allows the
            endocrine system to ensure the conditions in your body remain ill
            balance.
          </div>
          <div
            className="choose"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div style={{ display: "flex", gap: 5 }}>
              <div>①</div>
              <div>It deliver their message and cause an effect.</div>
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              <div>②</div>
              <div>They are designed to act only on the parts of the body.</div>
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              <div>③</div>
              <div>A hormone binds to its receptor.</div>
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              <div>④</div>
              <div>The glands to restrain further formone is released.</div>
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              <div>⑤</div>
              <div>
                It allows the endocrine system to ensure the conditions in your
                body.
              </div>
            </div>
          </div>
        </div>
        <div className="question">
          <div className="title" style={{ display: "flex" }}>
            <div className="question-seq">1.&nbsp;</div>
            <div className="question-title">
              <span
                style={{
                  color: "white",
                  background: "#4c4c4c",
                  borderRadius: 4,
                  padding: "0px 6px 0 4px",
                }}
              >
                기출
              </span>
              다음 글의 주제로 가장 적절한 것은?
              <span style={{ fontSize: 11, color: "#666666" }}>
                (2023년 6월 고3 30번)
              </span>
            </div>
          </div>
          <div className="question-content" style={{ marginBottom: 15 }}>
            &nbsp;&nbsp;How do hormones trigger reactions in the body? When a
            hormone is released from a gland, it travels in the bloodstream
            through the body in search of its target. Organs, tissues and other
            glands in the bOdy have receptor sites that hormones must billd to
            ill order to deliver their message and cause an effect. BLIt because
            every hormone has its own unique shape, they are designed to act
            only on the parts of the body that have a receptor site with the
            corresponding shape. This mode of action can be likened to a lock
            and key mechanism - if the key doesn't fit the lock, then nothing
            will happen. When a hormone billds to its receptor, it sets off a
            chain of other signaling pathways to create a change in the body.
            Once the desired effect has taken place and there is too much
            hormone circulating ill the blood, this signal is fed back to the
            glands to restrain further hormone release. This is called a
            feedback 100p and, when functioning correctly, it allows the
            endocrine system to ensure the conditions in your body remain ill
            balance.
          </div>
          <div
            className="choose"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div style={{ display: "flex", gap: 5 }}>
              <div>①</div>
              <div>It deliver their message and cause an effect.</div>
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              <div>②</div>
              <div>They are designed to act only on the parts of the body.</div>
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              <div>③</div>
              <div>A hormone binds to its receptor.</div>
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              <div>④</div>
              <div>The glands to restrain further formone is released.</div>
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              <div>⑤</div>
              <div>
                It allows the endocrine system to ensure the conditions in your
                body.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="footer"
        style={{
          textAlign: "center",
        }}
      >
        <div
          className="page-box"
          style={{
            display: "inline-block",
            width: 100,
            border: "1px solid",
            background:
              "linear-gradient(to bottom right, #fff calc(50% - 1px), black , #fff calc(50% + 1px) )",
            fontSize: 12,
            marginBottom: 15,
          }}
        >
          <div
            className="now-page"
            style={{ textAlign: "left", paddingLeft: 5 }}
          >
            1
          </div>
          <div
            className="max-page"
            style={{ textAlign: "right", paddingRight: 5 }}
          >
            8
          </div>
        </div>
        <div
          className="warning"
          style={{ fontSize: 10.4, border: "1px solid" }}
        >
          &nbsp; 이 시험문자의 저작긛은 00고등학교에 있습니다. 저작긛법에 의해
          보호받는 저작물이므로 전재와 복지는 금지되여. 이를 어길시 저작긛법에
          의거 처벌될 수 있습니다.
        </div>
      </div>
    </div>
  );
};

export default NormalBook;
