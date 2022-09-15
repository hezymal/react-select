import { Language } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwlLight";
import React, { FC } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import styled from "styled-components";

import { styles } from "docs/styles";

interface Props {
    code: string;
    scope?: Record<string, any>;
    noInline?: boolean;
    language?: Language;
}

const StyledLivePreview = styled(LivePreview)`
    position: relative;
    z-index: 2;
    margin: 0 0 ${styles.span(2)} 0;
`;

const StyledLiveEditor = styled(LiveEditor)`
    position: relative;
    margin: 0 0 5px 0;
    z-index: 1;
    line-height: 1.2em;

    & > textarea {
        outline: none;
    }
`;

const StyledLiveError = styled(LiveError)`
    margin: 0 0 5px 0;
    padding: ${styles.span(1)} ${styles.span(2)};
    position: relative;
    z-index: 1;
    line-height: 1.2em;
    background-color: #fff6f6;
    color: #403f53;
`;

export const LiveCode: FC<Props> = (props) => {
    return (
        <LiveProvider {...props}>
            <StyledLivePreview />
            <StyledLiveEditor theme={theme} />
            <StyledLiveError />
        </LiveProvider>
    );
};
