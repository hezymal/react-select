import React, {
    ChangeEventHandler,
    FormEventHandler,
    FocusEventHandler,
    MouseEventHandler,
    forwardRef,
} from "react";
import styled from "styled-components";

import { styles } from "../styles";

interface Props {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onFocus: FocusEventHandler<HTMLInputElement>;
}

const StyledFilter = styled.div`
    display: inline-grid;
    flex: 1 1 auto;
    grid-area: 1 / 1 / 2 / 3;
    grid-template-columns: 0px min-content;
    margin-left: ${styles.span(1)};
    min-width: 2px;

    &::after {
        content: attr(data-value) " ";
        visibility: hidden;
        white-space: pre-wrap;
    }

    &::after,
    input {
        font: inherit;
        width: 100%;
        min-width: 2px;
        grid-area: 1 / 2;
        margin: 0;
        resize: none;
        border: none;
        outline: none;
        padding: 0;
    }

    input {
        background-color: transparent;
    }
`;

export const Filter = forwardRef<HTMLInputElement, Props>(
    ({ value, onChange, onFocus }, ref) => {
        const handleInput: FormEventHandler<HTMLInputElement> = (event) => {
            // for details see: https://css-tricks.com/auto-growing-inputs-textareas/#aa-other-ideas

            const input = event.currentTarget;
            const wrapper = input.parentNode as HTMLDivElement;
            wrapper.dataset.value = input.value;
        };

        const handleClick: MouseEventHandler<HTMLInputElement> = (event) => {
            event.stopPropagation();
        };

        return (
            <StyledFilter>
                <input
                    ref={ref}
                    value={value}
                    onChange={onChange}
                    onInput={handleInput}
                    onFocus={onFocus}
                    onClick={handleClick}
                />
            </StyledFilter>
        );
    }
);
