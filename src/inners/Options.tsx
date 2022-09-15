import React, { MouseEvent, MouseEventHandler } from "react";
import styled from "styled-components";

import { styles } from "../styles";
import { OptionType } from "../types";
import { castValueToReactKey } from "../utils";

export type ClickOptionHandler<TValue> = (
    value: TValue,
    option: OptionType<TValue>,
    event: MouseEvent<HTMLLIElement, globalThis.MouseEvent>
) => void;

export interface Props<TValue> {
    options: OptionType<TValue>[];
    show: boolean;
    noOptionsMessage?: string;
    onOptionClick: ClickOptionHandler<TValue>;
}

interface StyledOptionsProps {
    show: boolean;
}

const NO_OPTIONS_MESSAGE = "No options";

const StyledOptions = styled.ul.withConfig<StyledOptionsProps>({
    shouldForwardProp: (propertyName) => propertyName !== "show",
})`
    border: 1px solid ${styles.colors.grey[0]};
    border-radius: ${styles.borders.radius[0]};
    background-color: white;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    top: calc(100% + 1px);
    left: 0;
    width: 100%;
    user-select: none;
    line-height: ${styles.span(3)};

    ${(props) => {
        if (!props.show) {
            return "display: none";
        }

        return null;
    }}
`;

const StyledOption = styled.li`
    cursor: pointer;
    padding: ${styles.span(1)} ${styles.span(2)};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    &:hover {
        background-color: ${styles.colors.grey[1]};
    }
`;

const NoOptionMessage = styled.li`
    padding: ${styles.span(1)} ${styles.span(2)};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

export function Options<TValue>(props: Props<TValue>): JSX.Element {
    const { noOptionsMessage, options, show, onOptionClick } = props;

    const handleNoOptionMessageClick: MouseEventHandler<HTMLLIElement> = (
        event
    ) => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <StyledOptions show={show}>
            {options.length > 0 ? (
                options.map((option) => (
                    <StyledOption
                        key={castValueToReactKey(option.value)}
                        onClick={(event) =>
                            onOptionClick(option.value, option, event)
                        }
                    >
                        {option.label}
                    </StyledOption>
                ))
            ) : (
                <NoOptionMessage onClick={handleNoOptionMessageClick}>
                    {noOptionsMessage || NO_OPTIONS_MESSAGE}
                </NoOptionMessage>
            )}
        </StyledOptions>
    );
}
