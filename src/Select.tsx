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

import { ClearButton } from "./inners/ClearButton";
import { Filter } from "./inners/Filter";
import { Options, ClickOptionHandler } from "./inners/Options";
import { ToggleButton } from "./inners/ToggleButton";
import { styles } from "./styles";
import { OptionType } from "./types";
import { castValueToReactKey } from "./utils";

type Nullable<
    TValue,
    TCondition extends boolean = true
> = TCondition extends true ? TValue | null : TValue;

type Multiple<
    TValue,
    TCondition extends boolean = true
> = TCondition extends true ? TValue[] : TValue;

type ValueType<
    TValue,
    IsClearable extends boolean,
    IsMultiple extends boolean
> = Multiple<Nullable<TValue, IsClearable>, IsMultiple>;

export interface SelectProps<
    TValue,
    IsClearable extends boolean,
    IsMultiple extends boolean
> {
    clearable?: IsClearable;
    disabled?: boolean;
    label?: string;
    multiple?: IsMultiple;
    noOptionsMessage?: string;
    options: OptionType<TValue>[];
    placeholder?: string;
    value: ValueType<TValue, IsClearable, IsMultiple>;
    onChange: ClickOptionHandler<ValueType<TValue, IsClearable, IsMultiple>>;
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
    align-items: center;

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

const ValueLine = styled.div`
    width: calc(100% - ${styles.span(4)});
    position: relative;
    display: flex;
    align-items: center;
`;

const StyledToggleButton = styled(ToggleButton)`
    flex-shrink: 0;
`;

const StyledClearButton = styled(ClearButton)`
    flex-shrink: 0;
`;

const Label = styled.label.withConfig<LabelProps>({
    shouldForwardProp: (propertyName) => propertyName !== "disabled",
})`
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 12px;
    height: ${styles.span(2)};
    line-height: ${styles.span(2)};
    top: ${styles.span(-3, 3)};
    left: ${styles.span(-0.5)};
    position: absolute;
    padding: 0 ${styles.span(0.5)};
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

const Placeholder = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: ${styles.colors.grey4};
`;

export function Select<
    TValue,
    IsClearable extends boolean = false,
    IsMultiple extends boolean = false
>(props: SelectProps<TValue, IsClearable, IsMultiple>): JSX.Element {
    const {
        clearable = false,
        disabled = false,
        label,
        multiple = false,
        noOptionsMessage,
        options,
        placeholder,
        value,
        onChange,
    } = props;

    const filterRef = useRef<HTMLInputElement | null>(null);
    const [filter, setFilter] = useState("");
    const [showOptions, setShowOptions] = useState(false);

    const isNullValue = value === null;

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

    const currentOption = useMemo(() => {
        if (value === null) {
            return null;
        }

        if (!multiple) {
            return options.find((option) => option.value === value);
        }

        return options.filter((option) => {
            // TODO: remove any type
            const values = value as TValue[];

            return values.find((value) => option.value === value);
        });
    }, [options, value]);

    if (currentOption === undefined) {
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

    const handleClear: MouseEventHandler<HTMLButtonElement> = (event) => {
        // TODO: remove any types

        event.stopPropagation();

        if (multiple) {
            onChange([] as any, null as any, event as any);
        } else {
            onChange(null as any, null as any, event as any);
        }
    };

    const handleOptionClick: ClickOptionHandler<TValue> = (
        clickedValue,
        option,
        event
    ) => {
        // TODO: remove any types

        if (multiple) {
            const values = value as TValue[];
            const newValues: TValue[] = [];

            let exists = false;
            for (let index = 0; index <= values.length; index++) {
                if (values[index] === clickedValue) {
                    exists = true;
                } else {
                    newValues.push(values[index]);
                }
            }

            if (!exists) {
                newValues.push(clickedValue);
            }

            onChange(newValues as any, option as any, event);
        } else {
            onChange(clickedValue as any, option as any, event);
        }
    };

    const renderLabel = () => {
        if (!label) {
            return null;
        }

        return <Label disabled={disabled}>{label}</Label>;
    };

    const renderCurrentValue = () => {
        if (!currentOption) {
            return <Placeholder>{placeholder}</Placeholder>;
        }

        if (!Array.isArray(currentOption)) {
            return <CurrentValue>{currentOption.label}</CurrentValue>;
        }

        if (currentOption.length === 0) {
            return <Placeholder>{placeholder}</Placeholder>;
        }

        const valuesString = currentOption.reduce(
            (totalString, option) =>
                totalString ? totalString + ", " + option.label : option.label,
            ""
        );

        return <CurrentValue title={valuesString}>{valuesString}</CurrentValue>;
    };

    const renderClearButton = () => {
        if (!clearable || isNullValue) {
            return null;
        }

        return <StyledClearButton onClick={handleClear} />;
    };

    return (
        <StyledSelect>
            <Container disabled={disabled} onClick={handleContainerClick}>
                <ValueLine>
                    {renderLabel()}
                    {renderCurrentValue()}
                    <Filter
                        ref={filterRef}
                        value={filter}
                        onChange={handleFilterChange}
                        onFocus={handleFilterFocus}
                    />
                </ValueLine>
                {renderClearButton()}
                <StyledToggleButton direction={showOptions ? "up" : "down"} />
            </Container>
            <Options<TValue>
                noOptionsMessage={noOptionsMessage}
                options={filteredOptions}
                show={showOptions}
                onOptionClick={handleOptionClick}
            />
        </StyledSelect>
    );
}
