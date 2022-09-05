import React from "react";
import styled from "styled-components";

interface Props {
    name: string;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const StyledCheckbox = styled.div`
    display: inline-flex;
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
            <label htmlFor={name}>{label}</label>
        </StyledCheckbox>
    );
};
