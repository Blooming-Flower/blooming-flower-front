import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';


interface Props {
    content: string;
    editorRef: React.MutableRefObject<any>;
}

const TuiEditor = ({ content = '', editorRef }: Props) => {
    const toolbarItems = [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr'],
        ['ul', 'ol', 'task'],
        ['table', 'link'],
        ['image'],
        ['code'],
        ['scrollSync'],
    ];

    return (
        <>
            {editorRef && (
                <Editor
                    ref={editorRef}
                    initialValue={content || ' '} // 글 수정 시 사용
                    initialEditType="markdown" // wysiwyg & markdown
                    previewStyle={window.innerWidth > 1000 ? 'vertical' : 'tab'} // tab, vertical
                    hideModeSwitch={true}
                    height="calc(100% - 10rem)"
                    theme={''} // '' & 'dark'
                    usageStatistics={false}
                    toolbarItems={toolbarItems}
                    useCommandShortcut={true}
                />
            )}
        </>
    );
};

export default TuiEditor;