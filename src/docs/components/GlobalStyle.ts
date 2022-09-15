import { createGlobalStyle } from "styled-components";

import { styles } from "docs/styles";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html, body {
        margin: 0;
    }

    body {
        font-family: 'Roboto Mono', monospace;
        font-size: 14px;
        line-height: ${styles.span(3)};
    }
`;
