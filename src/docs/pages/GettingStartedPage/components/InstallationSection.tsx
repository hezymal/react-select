import React from "react";

import { useTranslation } from "docs/i18n";
import { Section, SectionTitle } from "docs/components/Section";
import { StaticCode } from "docs/components/StaticCode";

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
};
`.trim();

export const InstallationSection: React.FC = () => {
    const t = useTranslation();

    return (
        <Section>
            <SectionTitle>
                {t`GettingStartedPage:Title:1`} и использование
            </SectionTitle>
            <StaticCode language="bash" code={installationCode} />
            <StaticCode language="javascript" code={exampleCode} />
        </Section>
    );
};
