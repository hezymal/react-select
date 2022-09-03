import React, { Fragment } from "react";

import { LiveCode } from "docs/components/LiveCode";
import { Link } from "docs/components/Link";
import { OuterLink } from "docs/components/OuterLink";
import { PageTitle } from "docs/components/Page";
import { Paragraph } from "docs/components/Paragraph";
import { REPOSITORY_URL } from "docs/constants";
import { useTranslation } from "docs/i18n";
import { navigation } from "docs/navigation";
import { Select } from "Select";

const scope = { Select };
const code = `
() => {
    const Color = {
        red: "red",
        green: "green",
        blue: "blue",
    };

    const colors = [
        { label: "Red", value: Color.red },
        { label: "Green", value: Color.green },
        { label: "Blue", value: Color.blue },
    ];

    const [value, setValue] = React.useState(Color.red);

    return <Select options={colors} value={value} onChange={setValue} />;
}
`.trim();

export const HomePage: React.FC = () => {
    const t = useTranslation();

    return (
        <Fragment>
            <PageTitle>Select</PageTitle>
            <Paragraph>{t`HomePage:Paragraph:1`}</Paragraph>
            <Paragraph>
                <LiveCode code={code} scope={scope} />
            </Paragraph>
            <Paragraph>
                {t`HomePage:Paragraph:2:1`}
                &laquo;
                <Link
                    to={navigation.gettingStarted()}
                >{t`GettingStartedPage:Title`}</Link>
                &raquo;
                {t`HomePage:Paragraph:2:2`}
                &laquo;
                <Link
                    to={navigation.advancedUsage()}
                >{t`AdvancedUsagePage:Title`}</Link>
                &raquo;
                {t`HomePage:Paragraph:2:3`}
                &laquo;
                <Link to={navigation.api()}>{t`ApiPage:Title`}</Link>
                &raquo;
                {t`HomePage:Paragraph:2:4`}
            </Paragraph>
            <Paragraph>
                {t`HomePage:Paragraph:3:1`}
                <OuterLink href={REPOSITORY_URL}>{REPOSITORY_URL}</OuterLink>.
            </Paragraph>
        </Fragment>
    );
};
