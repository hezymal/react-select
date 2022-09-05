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
    disabled?: boolean;
    label?: string;
    onChange: (
        value: TValue,
        option: Option<TValue>,
        event: LiElementClickEvent
    ) => void;
}

interface ContainerProps {
    disabled: boolean;
}

interface OptionsProps {
    show: boolean;
}

interface CursorProps {
    direction: "up" | "down";
}

interface LabelProps {
    disabled: boolean;
}

const StyledSelect = styled.div`
    box-sizing: border-box;
    position: relative;
    font-size: 16px;
`;

const Container = styled.div<ContainerProps>`
    border: 1px solid ${styles.colors.grey1};
    border-radius: ${styles.borders.radius[0]};
    height: ${styles.span(6)};
    user-select: none;
    display: flex;
    padding: 0 ${styles.span(2)};
    flex-wrap: wrap;

    ${(props) => {
        if (props.disabled) {
            return `
                background-color: ${styles.colors.grey3};
            `;
        }

        return `
            background-color: white;
            cursor: pointer;
        `;
    }}
`;

const ContainerLeft = styled.div`
    width: calc(100% - ${styles.span(4)});
    position: relative;
`;

const ContainerRight = styled.div`
    width: ${styles.span(4)};
`;

const Label = styled.label<LabelProps>`
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 12px;
    height: ${styles.span(3)};
    line-height: ${styles.span(2)};
    top: ${styles.span(-1.5, -1)};
    left: ${styles.span(-0.5)};
    position: absolute;
    padding: ${styles.span(0.5)};
    max-width: calc(100% + ${styles.span(1)});
    border-radius: ${styles.borders.radius[0]};

    ${(props) => {
        if (props.disabled) {
            return `background-color: ${styles.colors.grey3};`;
        }

        return "background-color: white;";
    }}
`;

const Value = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: ${styles.span(6, -2)};
`;

const Cursor = styled.div<CursorProps>`
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
        background-color: ${styles.colors.grey2};
    }
`;

export function Select<TValue>(props: SelectProps<TValue>): JSX.Element {
    const { disabled = false, label, options, value, onChange } = props;

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

    const handleContainerClick = (event: DivElementClickEvent) => {
        if (disabled) {
            return;
        }

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
            <Container disabled={disabled} onClick={handleContainerClick}>
                <ContainerLeft>
                    {label && <Label disabled={disabled}>{label}</Label>}
                    <Value>{selected.label}</Value>
                </ContainerLeft>
                <ContainerRight>
                    <Cursor direction={showOptions ? "up" : "down"}>🢓</Cursor>
                </ContainerRight>
            </Container>
            <Options show={showOptions}>
                {options.map((option) => (
                    <StyledOption
                        key={option.value + ""}
                        onClick={(event) => handleOptionClick(option, event)}
                    >
                        {option.label}
                    </StyledOption>
                ))}
            </Options>
        </StyledSelect>
    );
}
