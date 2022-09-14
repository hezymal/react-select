import React from "react";
import styled from "styled-components";

import { styles } from "styles";

interface Props {
    name: string;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const StyledCheckbox = styled.div`
    display: inline-flex;
    user-select: none;
    cursor: pointer;
`;

const Label = styled.label`
    margin-left: ${styles.span(0.5)};
`;

export const Checkbox: React.FC<Props> = ({
    checked,
    label,
    name,
    onChange,
}) => {
    return (
        <StyledCheckbox>
            <input
                type="checkbox"
                id={name}
                name={name}
                checked={checked}
                onChange={(event) => onChange(event.currentTarget.checked)}
            />
            <Label htmlFor={name}>{label}</Label>
        </StyledCheckbox>
    );
};
