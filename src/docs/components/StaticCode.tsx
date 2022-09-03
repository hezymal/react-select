import Highlight, { Language, defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwlLight";
import React, { FC } from "react";
import styled from "styled-components";

const Pre = styled.pre`
    text-align: left;
    margin: 1em 0;
    padding: 0.5em;
    overflow: auto;

    & .token-line {
        line-height: 1.3em;
        height: 1.3em;
    }
`;

interface Props {
    language: Language;
    code: string;
}

export const StaticCode: FC<Props> = ({ language, code }) => (
    <Highlight {...defaultProps} theme={theme} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Pre className={className} style={style}>
                {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => (
                            <span {...getTokenProps({ token, key })} />
                        ))}
                    </div>
                ))}
            </Pre>
        )}
    </Highlight>
);
