import React, { Fragment, useState } from "react";

import { useTranslation } from "docs/i18n";
import { LiveCode } from "docs/components/LiveCode";
import { StaticCode } from "docs/components/StaticCode";
import { PageTitle } from "docs/components/Page";
import { Section, SectionTitle } from "docs/components/Section";
import { Paragraph } from "docs/components/Paragraph";
import { Select } from "Select";

const installationCode = `
# NPM
npm i @hezymal/react-select --save

# Yarn
yarn add @hezymal/react-select
`.trim();

const exampleCode = `
import React from "react";
import Select from "@hezymal/react-select";

const options = [
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
];

const MyComponent = () => {
    const [value, setValue] = useState("blue");

    return <Select options={options} value={value} onChange={setValue} />;
}
`.trim();

const singleCodeScope = { Select, useState };
const singleCode = `
const colors = [
    { label: "Red", value: "red" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
];

function MyComponent() {
    const [color, setColor] = useState("red");

    return <Select options={colors} label="Choose color" value={color} onChange={setColor} />;
}

render(<MyComponent />);
`.trim();

export const GettingStartedPage: React.FC = () => {
    const t = useTranslation();

    return (
        <Fragment>
            <PageTitle>{t`GettingStartedPage:Title`}</PageTitle>
            <Section>
                <SectionTitle>{t`GettingStartedPage:Title:1`} и использование</SectionTitle>
                <StaticCode language="bash" code={installationCode} />
                <StaticCode language="javascript" code={exampleCode} />
            </Section>
            <Section>
                <SectionTitle>С одним значением</SectionTitle>
                <Paragraph>
                    Пример использования с выборкой одного значения:
                </Paragraph>
                <LiveCode code={singleCode} scope={singleCodeScope} noInline />
            </Section>
        </Fragment>
    );
};
