import React, {
    ChangeEventHandler,
    FocusEventHandler,
    MouseEventHandler,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import styled from "styled-components";

import { Cursor } from "./inners/Cursor";
import { Filter } from "./inners/Filter";
import { Options, ClickOptionHandler } from "./inners/Options";
import { styles } from "./styles";
import { OptionType } from "./types";

export interface SelectProps<TValue> {
    options: OptionType<TValue>[];
    value: TValue;
    disabled?: boolean;
    label?: string;
    noOptionsMessage?: string;
    onChange: ClickOptionHandler<TValue>;
}

interface ContainerProps {
    disabled: boolean;
}

interface LabelProps {
    disabled: boolean;
}

const StyledSelect = styled.div`
    box-sizing: border-box;
    position: relative;
    font-size: 16px;
`;

const Container = styled.div.withConfig<ContainerProps>({
    shouldForwardProp: (propertyName) => propertyName !== "disabled",
})`
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
    display: flex;
    align-items: center;
`;

const ContainerRight = styled.div`
    width: ${styles.span(4)};
`;

const Label = styled.label.withConfig<LabelProps>({
    shouldForwardProp: (propertyName) => propertyName !== "disabled",
})`
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

const CurrentValue = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

export function Select<TValue>(props: SelectProps<TValue>): JSX.Element {
    const {
        disabled = false,
        label,
        noOptionsMessage,
        options,
        value,
        onChange,
    } = props;

    const filterRef = useRef<HTMLInputElement | null>(null);
    const [filter, setFilter] = useState("");
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        const handleDocumentClick = () => {
            setShowOptions(false);
            setFilter("");
        };

        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    const currentValue = useMemo(
        () => options.find((option) => option.value === value),
        [options, value]
    );

    if (currentValue === undefined) {
        throw new Error(`Unknown value: "${value}"`);
    }

    const filteredOptions = useMemo(() => {
        if (!filter) {
            return options;
        }

        return options.filter((option) => option.label.indexOf(filter) !== -1);
    }, [options, filter]);

    const handleContainerClick: MouseEventHandler<HTMLDivElement> = (event) => {
        if (disabled) {
            return;
        }

        event.stopPropagation();
        setShowOptions((showOptions) => {
            if (showOptions) {
                return false;
            }

            filterRef.current!.focus();
            return true;
        });
    };

    const handleFilterChange: ChangeEventHandler<HTMLInputElement> = (
        event
    ) => {
        setFilter(event.currentTarget.value);
    };

    const handleFilterFocus: FocusEventHandler<HTMLInputElement> = () => {
        if (disabled) {
            return;
        }

        setShowOptions(true);
    };

    return (
        <StyledSelect>
            <Container disabled={disabled} onClick={handleContainerClick}>
                <ContainerLeft>
                    {label && <Label disabled={disabled}>{label}</Label>}
                    <CurrentValue>{currentValue.label}</CurrentValue>
                    <Filter
                        ref={filterRef}
                        value={filter}
                        onChange={handleFilterChange}
                        onFocus={handleFilterFocus}
                    />
                </ContainerLeft>
                <ContainerRight>
                    <Cursor direction={showOptions ? "up" : "down"} />
                </ContainerRight>
            </Container>
            <Options
                noOptionsMessage={noOptionsMessage}
                options={filteredOptions}
                show={showOptions}
                onOptionClick={onChange}
            />
        </StyledSelect>
    );
}
