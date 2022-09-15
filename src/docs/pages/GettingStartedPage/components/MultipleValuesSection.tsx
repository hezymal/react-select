import React, { FC, Fragment, useState } from "react";

import { useTranslation } from "docs/i18n";
import { Checkbox } from "docs/components/Checkbox";
import { Col, Row } from "docs/components/Grid";
import { LiveCode } from "docs/components/LiveCode";
import { Paragraph } from "docs/components/Paragraph";
import { Section, SectionTitle } from "docs/components/Section";
import { Select } from "Select";

const codeScope = { Col, Checkbox, Fragment, Row, Select, useState };

const code = `
const options = [
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
];

const MyComponent = () => {
    const [colors, setColors] = useState(["red", "blue"]);
    const [disabled, setDisabled] = useState(false);
    const [clearable, setClearable] = useState(false);

    return (
        <Row>
            <Col size={16}>
                <Select
                    options={options}
                    label="Choose colors"
                    placeholder="No selected"
                    disabled={disabled}
                    clearable={clearable}
                    multiple
                    value={colors}
                    onChange={setColors}
                />
            </Col>
            <Col size={3}>
                <Checkbox
                    name="multi-disabled"
                    label="disabled"
                    value={disabled}
                    onChange={setDisabled}
                />
            </Col>
            <Col size={3}>
                <Checkbox
                    name="multi-clearable"
                    label="clearable"
                    value={clearable}
                    onChange={setClearable}
                />
            </Col>
        </Row>
    );
};

render(<MyComponent />);
`.trim();

export const MultipleValuesSection: FC = () => {
    const t = useTranslation();

    return (
        <Section>
            <SectionTitle>С множеством значений</SectionTitle>
            <Paragraph>
                Пример использования с выборкой множества значений:
            </Paragraph>
            <LiveCode code={code} scope={codeScope} noInline />
        </Section>
    );
};
