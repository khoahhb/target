import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'

const CodeBlock = ({ codeString }) => {
    return (
        <SyntaxHighlighter
            language='javascript'
            style={okaidia}
        >
            {codeString}
        </SyntaxHighlighter>
    )
}

export default CodeBlock
