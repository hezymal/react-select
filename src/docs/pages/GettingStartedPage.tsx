import React, { Fragment } from "react";

import { useTranslation } from "docs/i18n";
import { StaticCode } from "docs/components/StaticCode";
import { PageTitle } from "docs/components/Page";
import { ParagraphTitle } from "docs/components/Paragraph";

const code = `
# NPM
npm i @hezymal/react-select --save

# Yarn
yarn add @hezymal/react-select
`.trim();

export const GettingStartedPage: React.FC = () => {
    const t = useTranslation();

    return (
        <Fragment>
            <PageTitle>{t`GettingStartedPage:Title`}</PageTitle>
            <ParagraphTitle>{t`GettingStartedPage:Title:1`}</ParagraphTitle>
            <StaticCode language="bash" code={code} />
        </Fragment>
    );
};
