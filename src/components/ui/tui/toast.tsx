import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import * as React from "react";


interface Props {
    content: string;
    editorRef: React.MutableRefObject<any>;
}

const TuiEditor = ({ content = '', editorRef }: Props) => {
    const toolbarItems = [
        // 툴바 옵션 설정
        ["heading", "bold", "italic", "strike"],
        // ["hr", "quote"],
        ["ul", "ol", "task", "indent", "outdent"],
        ["table", "image", "link"],
        // ["code", "codeblock"],
    ];

    return (
        <>
            {editorRef && (
                <Editor
                    initialValue={content || ' '} // 글 수정 시 사용
                    height="400px"
                    theme={''} // '' & 'dark'
                    ref={editorRef}
                    placeholder="내용을 입력해주세요."
                    previewStyle="vertical" // 미리보기 스타일 지정
                    initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
                    toolbarItems={toolbarItems}
                ></Editor>
            )}
        </>
    );
};

export default TuiEditor;