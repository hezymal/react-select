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

export interface SelectProps<TValue, IsClearable extends boolean> {
    options: OptionType<TValue>[];
    value: IsClearable extends false ? TValue : TValue | null;
    clearable?: IsClearable;
    disabled?: boolean;
    label?: string;
    noOptionsMessage?: string;
    placeholder?: string;
    onChange: ClickOptionHandler<
        IsClearable extends false ? TValue : TValue | null
    >;
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

const ValueContainer = styled.div`
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

export function Select<TValue, IsClearable extends boolean = false>(
    props: SelectProps<TValue, IsClearable>
): JSX.Element {
    const {
        clearable = false,
        disabled = false,
        label,
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

    const currentValue = useMemo(() => {
        if (value === null) {
            return null;
        }

        return options.find((option) => option.value === value);
    }, [options, value]);

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

    const handleClear: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();

        // TODO: fix types
        onChange(null as any, null as any, event as any);
    };

    return (
        <StyledSelect>
            <Container disabled={disabled} onClick={handleContainerClick}>
                <ValueContainer>
                    {label && <Label disabled={disabled}>{label}</Label>}
                    {currentValue ? (
                        <CurrentValue>{currentValue.label}</CurrentValue>
                    ) : (
                        <Placeholder>{placeholder}</Placeholder>
                    )}
                    <Filter
                        ref={filterRef}
                        value={filter}
                        onChange={handleFilterChange}
                        onFocus={handleFilterFocus}
                    />
                </ValueContainer>
                {clearable && !isNullValue && (
                    <StyledClearButton onClick={handleClear} />
                )}
                <StyledToggleButton direction={showOptions ? "up" : "down"} />
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
