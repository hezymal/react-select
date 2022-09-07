import React, { FC } from "react";
import styled from "styled-components";

import { styles } from "../styles";

interface Props {
    direction: "up" | "down";
}

const StyledCursor = styled.div.withConfig<Props>({
    shouldForwardProp: (propertyName) => propertyName !== "direction",
})`
    height: ${styles.span(3)};
    text-align: center;
    font-size: 28px;

    ${(props) => {
        if (props.direction === "up") {
            return `
                transform: rotate(180deg) translate(0, ${styles.span(0)});
                padding-right: ${styles.span(1)};
            `;
        }

        return `
            transform: translate(0, ${styles.span(2.5)});
            padding-left: ${styles.span(1)};
        `;
    }}
`;

export const Cursor: FC<Props> = ({ direction }) => (
    <StyledCursor direction={direction}>🢓</StyledCursor>
);
