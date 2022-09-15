import React, { useState } from 'react';
import { useQuill } from 'react-quilljs';
import style from '../styles/Editor.module.css'
import 'quill/dist/quill.snow.css';

function Editor({ setDescription }) {

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ align: [] }],

            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],

            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['blockquote', 'code-block'],
            ['link', 'image', 'video'],
            [{ color: [] }, { background: [] }],
        ],
    }

    const placeholder = 'Write your post content here...';

    const formats = ['bold', 'italic', 'underline', 'strike', 'align', 'code-block', 'blockquote', 'link', 'image', 'video', 'color', 'background', 'indent', 'list', 'header'];

    const { quill, quillRef } = useQuill({ modules, formats, placeholder });

    React.useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                setDescription(quill.root.innerHTML)
            });
        }
    }, [quill]);

    return (
        <>
            <div className={style.editor_container}>
                <div ref={quillRef} />
            </div>

            {/* Preview Editor Html */}
            {/* <div className='ql-container ql-snow'>
                <div className='ql-editor'>
                    <div dangerouslySetInnerHTML={{ __html: quill?.root?.innerHTML }} />
                </div>
            </div> */}
        </>
    );
};

export default Editor