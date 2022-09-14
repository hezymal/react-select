import React, { FC } from "react";
import styled from "styled-components";

import { styles } from "../styles";

interface Props {
    className?: string;
    direction: "up" | "down";
}

interface IconProps {
    direction: "up" | "down";
}

const StyledToggleButton = styled.button`
    display: block;
    height: ${styles.span(4)};
    width: ${styles.span(4)};
    border: none;
    background-color: transparent;
    padding: 0;
    cursor: pointer;
`;

const Icon = styled.span.withConfig<IconProps>({
    shouldForwardProp: (propertyName) => propertyName !== "direction",
})`
    display: block;
    height: ${styles.span(4)};
    width: ${styles.span(4)};
    text-align: center;
    font-size: 28px;

    ${(props) => {
        if (props.direction === "up") {
            return `
                transform: rotate(180deg) translate(0, 6px);
            `;
        }

        return `
            transform: rotate(0deg) translate(0, 6px);
        `;
    }}
`;

export const ToggleButton: FC<Props> = ({ className, direction }) => (
    <StyledToggleButton className={className}>
        <Icon direction={direction}>🢓</Icon>
    </StyledToggleButton>
);
