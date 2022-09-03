import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { styles } from "./styles";

type DivElementClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
type LiElementClickEvent = React.MouseEvent<HTMLLIElement, MouseEvent>;

export interface Option<TValue> {
    label: string | JSX.Element;
    value: TValue;
}

export interface SelectProps<TValue> {
    options: Option<TValue>[];
    value: TValue;
    onChange: (
        value: TValue,
        option: Option<TValue>,
        event: LiElementClickEvent
    ) => void;
}

interface OptionsProps {
    show: boolean;
}

interface SelectedIconProps {
    direction: "up" | "down";
}

const StyledSelect = styled.div`
    box-sizing: border-box;
    position: relative;
    font-size: 16px;
`;

const Selected = styled.div`
    background-color: white;
    border: 1px solid ${styles.colors.grey1};
    border-radius: ${styles.borders.radius[0]};
    cursor: pointer;
    display: flex;
    padding: ${styles.span(1.5)} ${styles.span(2)};
    line-height: ${styles.span(3)};
    height: ${styles.span(6)};
    user-select: none;
`;

const SelectedLabel = styled.div`
    width: calc(100% - ${styles.span(4)});
`;

const SelectedIcon = styled.div<SelectedIconProps>`
    width: ${styles.span(4)};
    height: ${styles.span(3)};
    text-align: center;
    font-size: 28px;

    ${(props) => {
        if (props.direction === "up") {
            return `
                transform: rotate(180deg) translate(0, ${styles.span(1.5, -2)});
                padding-right: ${styles.span(1)};
            `;
        }

        return `
            transform: translate(0, ${styles.span(1.5, -2)});
            padding-left: ${styles.span(1)};
        `;
    }}
`;

const Options = styled.ul<OptionsProps>`
    border: 1px solid ${styles.colors.grey1};
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

    &:hover {
        background-color: ${styles.colors.grey2};
    }
`;

export function Select<TValue>(props: SelectProps<TValue>): JSX.Element {
    const { options, value, onChange } = props;

    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        const handleDocumentClick = () => setShowOptions(false);

        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    const selected = useMemo(
        () => options.find((option) => option.value === value),
        [options, value]
    );

    if (selected === undefined) {
        throw new Error(`Unknown value: "${value}"`);
    }

    const handleSelectedClick = (event: DivElementClickEvent) => {
        event.stopPropagation();
        setShowOptions((showOptions) => !showOptions);
    };

    const handleOptionClick = (
        option: Option<TValue>,
        event: LiElementClickEvent
    ) => {
        onChange(option.value, option, event);
    };

    return (
        <StyledSelect>
            <Selected onClick={handleSelectedClick}>
                <SelectedLabel>{selected.label}</SelectedLabel>
                <SelectedIcon direction={showOptions ? "up" : "down"}>
                    🢓
                </SelectedIcon>
            </Selected>
            <Options show={showOptions}>
                {options.map((option) => {
                    return (
                        <StyledOption
                            key={option.value + ""}
                            onClick={(event) =>
                                handleOptionClick(option, event)
                            }
                        >
                            {option.label}
                        </StyledOption>
                    );
                })}
            </Options>
        </StyledSelect>
    );
}
