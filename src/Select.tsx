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
    label?: string;
    onChange: (
        value: TValue,
        option: Option<TValue>,
        event: LiElementClickEvent
    ) => void;
}

export interface MultiSelectProps<TValue> {
    options: Option<TValue>[];
    values: TValue[];
    onChange: (
        values: TValue[],
        options: Option<TValue>[],
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

const Container = styled.div`
    background-color: white;
    border: 1px solid ${styles.colors.grey1};
    border-radius: ${styles.borders.radius[0]};
    cursor: pointer;
    height: ${styles.span(6)};
    user-select: none;
    display: flex;
    padding: 0 ${styles.span(2)};
    flex-wrap: wrap;
`;

const ContainerLeft = styled.div`
    width: calc(100% - ${styles.span(4)});
    position: relative;
`;

const ContainerRight = styled.div`
    width: ${styles.span(4)};
`;

const Label = styled.label`
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
    background-color: white;
    max-width: calc(100% + ${styles.span(1)});
`;

const Value = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: ${styles.span(6, -2)};
`;

const Cursor = styled.div<SelectedIconProps>`
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
    const { options, label, value, onChange } = props;

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
            <Container onClick={handleContainerClick}>
                <ContainerLeft>
                    {label && <Label>{label}</Label>}
                    <Value>{selected.label}</Value>
                </ContainerLeft>
                <ContainerRight>
                    <Cursor direction={showOptions ? "up" : "down"}>🢓</Cursor>
                </ContainerRight>
            </Container>
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

// export function MultiSelect<TValue>(
//     props: MultiSelectProps<TValue>
// ): JSX.Element {
//     const { options, values, onChange } = props;

//     const [showOptions, setShowOptions] = useState(false);

//     useEffect(() => {
//         const handleDocumentClick = () => setShowOptions(false);

//         document.addEventListener("click", handleDocumentClick);

//         return () => {
//             document.removeEventListener("click", handleDocumentClick);
//         };
//     }, []);

//     const selecteds = useMemo(() => {
//         return options.filter((option) => {
//             return !!values.find((value) => value === option.value);
//         });
//     }, [options, values]);

//     const handleSelectedClick = (event: DivElementClickEvent) => {
//         event.stopPropagation();
//         setShowOptions((showOptions) => !showOptions);
//     };

//     const handleOptionClick = (
//         option: Option<TValue>,
//         event: LiElementClickEvent
//     ) => {
//         onChange(option.value, option, event);
//     };

//     return (
//         <StyledSelect>
//             <Selected onClick={handleSelectedClick}>
//                 <SelectedLabel>{selected.label}</SelectedLabel>
//                 <SelectedIcon direction={showOptions ? "up" : "down"}>
//                     🢓
//                 </SelectedIcon>
//             </Selected>
//             <Options show={showOptions}>
//                 {options.map((option) => {
//                     return (
//                         <StyledOption
//                             key={option.value + ""}
//                             onClick={(event) =>
//                                 handleOptionClick(option, event)
//                             }
//                         >
//                             {option.label}
//                         </StyledOption>
//                     );
//                 })}
//             </Options>
//         </StyledSelect>
//     );
// }
