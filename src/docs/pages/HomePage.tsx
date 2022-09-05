import React, { Fragment, useState } from "react";

import { LiveCode } from "docs/components/LiveCode";
import { Link } from "docs/components/Link";
import { OuterLink } from "docs/components/OuterLink";
import { PageTitle } from "docs/components/Page";
import { Paragraph } from "docs/components/Paragraph";
import { Section, SectionTitle } from "docs/components/Section";
import { REPOSITORY_URL } from "docs/constants";
import { useTranslation } from "docs/i18n";
import { navigation } from "docs/navigation";
import { Select } from "Select";

const codeScope = { Select, useState };
const code = `
const planets = [
    { label: "Earth", value: "earth" },
    { label: "Mars", value: "mars" },
    { label: "Venera", value: "venera" },
];

function MyComponent() {
    const [planet, setPlanet] = useState("earth");

    return <Select options={planets} value={planet} onChange={setPlanet} />;
}

render(<MyComponent />);
`.trim();

export const HomePage: React.FC = () => {
    const t = useTranslation();

    return (
        <Fragment>
            <PageTitle>@hezymal/react-select</PageTitle>
            <Section>
                <Paragraph>{t`HomePage:Paragraph:1`}</Paragraph>
                <Paragraph>
                    Пример компонента и код (можно редактировать):
                </Paragraph>
                <Paragraph>
                    <LiveCode code={code} scope={codeScope} noInline />
                </Paragraph>
            </Section>
            <Section>
                <SectionTitle>Если заинтересовало:</SectionTitle>
                <ul>
                    <li>
                        <Link
                            to={navigation.gettingStarted()}
                        >{t`GettingStartedPage:Title`}</Link>{" "}
                        - тут можно найти примеры установки и использования
                        компонента;
                    </li>
                    <li>
                        <Link
                            to={navigation.advancedUsage()}
                        >{t`AdvancedUsagePage:Title`}</Link>{" "}
                        - здесь примеры кастомизации;
                    </li>
                    <li>
                        <Link to={navigation.api()}>{t`ApiPage:Title`}</Link> -
                        здесь описание всех доступных свойств;
                    </li>
                    <li>
                        Ну, и можно посетить репозиторий проекта:{" "}
                        <OuterLink href={REPOSITORY_URL}>
                            {REPOSITORY_URL}
                        </OuterLink>
                        .
                    </li>
                </ul>
            </Section>
        </Fragment>
    );
};
