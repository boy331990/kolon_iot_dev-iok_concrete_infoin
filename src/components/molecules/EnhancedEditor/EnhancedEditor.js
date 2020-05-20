import React from "react";
import ReactQuill from "react-quill";
import {useObserver} from "mobx-react-lite";


export const EnhancedEditor = ({store, placeholder, height}) => {

    const handleChange = content => {
        store.setValue("etc", content);
    };

    return useObserver(() => (
        <ReactQuill value={''} placeholder={placeholder} onChange={content => handleChange(content)}>
            <div style={{height: height, fontSize: '1rem'}}/>
        </ReactQuill>
    ))
};