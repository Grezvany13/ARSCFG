import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";

import "prismjs/components/prism-json";

//import "prismjs/themes/prism.css"

const hightlightWithLineNumbers = (input, language) => {
    return highlight(input, language)
        .split("\n")
        .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
        .join("\n");
};

const FormCodeEditor = (props) => {
    const {id, value, name} = props;

    const [codeValue, setCodeValue] = useState(value); 

    useEffect(() => {
        setCodeValue(value)
    }, [value])

    return (
        <div
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 pl-2 pr-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        >
            <Editor
                textareaId={id}
                value={codeValue}
                name={name}

                padding={0}
                className="code-editor"

                tabSize={4}
                insertSpaces={true}
                ignoreTabKey={false}

                highlight={code => {
                    return hightlightWithLineNumbers(code, languages.json)
                }}

                onBlur={(code) => {
                    props.onBlur()
                    props.onChange(code)
                }}
                onValueChange={(code) => {
                    setCodeValue(code)
                    props.onChange(code)
                }}
                disabled={props.disabled}
            />
        </div>
    );
};

export default FormCodeEditor;
