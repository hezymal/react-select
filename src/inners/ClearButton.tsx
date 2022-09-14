import React, { FC, MouseEventHandler } from "react";
import styled from "styled-components";

import { styles } from "../styles";

interface Props {
    className?: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const StyledButton = styled.button`
    display: block;
    height: ${styles.span(4)};
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    border: none;
    background-color: transparent;
    width: ${styles.span(4)};
    padding: 0;
    cursor: pointer;
`;

export const ClearButton: FC<Props> = ({ className, onClick }) => (
    <StyledButton className={className} onClick={onClick}>
        ⨉
    </StyledButton>
);
