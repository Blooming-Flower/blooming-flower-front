import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import * as React from "react";
import {useEffect} from "react";


interface Props {
    content?: string;
    editorRef: React.MutableRefObject<any>;
}

const TuiEditor = ({ content = '', editorRef }: Props) => {
    const createCustomButton = (param:string) => {
        const button = document.createElement('button');
        button.className = 'toastui-editor-toolbar-icons last';
        button.style.backgroundImage = 'none';
        button.style.margin = '0';
        button.innerHTML = param == "U"? "<ins style='font-size:18px'>"+param+"</ins>" : param == "빈칸" ? "<ins style='font-size: 15px'>"+param+"</ins>" : "<span style='font-size: 18px'>"+param+"</span>";
        button.addEventListener('click', () => {
            if(param == "U"){
                editorRef.current.getInstance().exec('strike')
                console.log(editorRef.current.focus)
            }else if(param == "빈칸"){
                editorRef.current.getInstance().exec('strike')
                editorRef.current.getInstance().insertText('    ')
                console.log(editorRef.current.selectionStart)
            }
            else{
                editorRef.current.getInstance().insertText(param)
            }
        });

        return button;
    }
    const toolbarItems = [
        // 툴바 옵션 설정
        ["bold", "italic",
            {
                name: 'customU',
                tooltip: 'underLine',
                command:'strike',
                el: createCustomButton("U")
            },
            {
                name: 'customBox',
                tooltip: 'Box',
                el: createCustomButton("빈칸")
            }
        ],
        [
            {
                name: 'custom1',
                tooltip: 'alt+1',
                el: createCustomButton("①")
            },
            {
                name: 'custom2',
                tooltip: 'alt+2',
                el: createCustomButton("②")
            },
            {
                name: 'custom3',
                tooltip: 'alt+3',
                el: createCustomButton("③")
            },
            {
                name: 'custom4',
                tooltip: 'alt+4',
                el: createCustomButton("④")
            },
            {
                name: 'custom5',
                tooltip: 'alt+5',
                el: createCustomButton("⑤")
            }
        ],
        [
            {
                name: 'custom6',
                tooltip: 'alt+shift+a',
                el: createCustomButton("(A)")
            },
            {
                name: 'custom7',
                tooltip: 'alt+shift+b',
                el: createCustomButton("(B)")
            },
            {
                name: 'custom8',
                tooltip: 'alt+shift+c',
                el: createCustomButton("(C)")
            }
        ],
        [
            {
                name: 'custom9',
                tooltip: 'alt+a',
                el: createCustomButton("ⓐ")
            },
            {
                name: 'custom10',
                tooltip: 'alt+b',
                el: createCustomButton("ⓑ")
            },
            {
                name: 'custom11',
                tooltip: 'alt+c',
                el: createCustomButton("ⓒ")
            },
            {
                name: 'custom12',
                tooltip: 'alt+d',
                el: createCustomButton("ⓓ")
            },
            {
                name: 'custom13',
                tooltip: 'alt+e',
                el: createCustomButton("ⓔ")
            }
        ]
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
                    hideModeSwitch={true}
                    useCommandShortcut={true}
                    customHTMLRenderer={{
                        htmlBlock:{
                            div(node:any){
                                return[
                                    {
                                        type: 'openTag',
                                        tagName: 'div',
                                        outerNewLine: true,
                                        attributes: node.attrs,
                                        classNames: ['tui-div']
                                    },
                                    { type: 'html', content: node.childrenHTML },
                                    { type: 'closeTag', tagName: 'div', outerNewLine: true }
                                ]
                            },
                        },
                        htmlInline: {
                            ins(node, { entering }) {
                                return entering
                                    ? { type: 'openTag', tagName: 'ins', attributes: node.attrs }
                                    : { type: 'closeTag', tagName: 'ins' };
                            },
                        },
                    }}
                    onKeydown={(editorType, ev)=>{
                        // ev.preventDefault()
                        if(ev.code == "KeyB" && ev.ctrlKey){
                            console.log("Bold호출")
                        }else if(ev.code == "KeyI" && ev.ctrlKey){
                            console.log("기울기호출")
                            editorRef.current.getInstance().exec("italic");
                        }else if(ev.code == "KeyM" && ev.ctrlKey){
                            console.log("밑줄호출")
                            editorRef.current.getInstance().exec("strike");
                        }else if(ev.key == "1" && ev.altKey){
                            console.log('1번 호출')
                            editorRef.current.getInstance().insertText('①')
                        }else if(ev.key == "2" && ev.altKey){
                            console.log('2번호출')
                            editorRef.current.getInstance().insertText('②')
                        }else if(ev.key == "3" && ev.altKey){
                            console.log('3번호출')
                            editorRef.current.getInstance().insertText('③')
                        }else if(ev.key == "4" && ev.altKey){
                            console.log('4번호출')
                            editorRef.current.getInstance().insertText('④')
                        }else if(ev.key == "5" && ev.altKey){
                            console.log('5번호출')
                            editorRef.current.getInstance().insertText('⑤')
                        }else if(ev.code == "KeyA" && ev.altKey && ev.shiftKey){
                            console.log("(A)")
                            editorRef.current.getInstance().insertText('(A)')
                        }else if(ev.code == "KeyB" && ev.altKey && ev.shiftKey){
                            console.log("(B)")
                            editorRef.current.getInstance().insertText('(B)')
                        }else if(ev.code == "KeyC" && ev.altKey && ev.shiftKey){
                            console.log("(C)")
                            editorRef.current.getInstance().insertText('(C)')
                        }else if(ev.code == "KeyA" && ev.altKey){
                            console.log("a호출")
                            editorRef.current.getInstance().insertText('ⓐ')
                        }else if(ev.code == "KeyB" && ev.altKey){
                            console.log("b호출")
                            editorRef.current.getInstance().insertText('ⓑ')
                        }else if(ev.code == "KeyC" && ev.altKey){
                            console.log("c호출")
                            editorRef.current.getInstance().insertText('ⓒ')
                        }else if(ev.code == "KeyD" && ev.altKey){
                            console.log("d호출")
                            editorRef.current.getInstance().insertText('ⓓ')
                        }else if(ev.code == "KeyE" && ev.altKey){
                            console.log("e호출")
                            editorRef.current.getInstance().insertText('ⓔ')
                        }
                            }}
                ></Editor>
            )}
        </>
    );
};

export default TuiEditor;