import React, { FC, Fragment } from "react";

import { useTranslation } from "docs/i18n";
import { PageTitle } from "docs/components/Page";

import { InstallationSection } from "./components/InstallationSection";
import { MultipleValuesSection } from "./components/MultipleValuesSection";
import { OneValueSection } from "./components/OneValueSection";

export const GettingStartedPage: FC = () => {
    const t = useTranslation();

    return (
        <Fragment>
            <PageTitle>{t`GettingStartedPage:Title`}</PageTitle>
            <InstallationSection />
            <OneValueSection />
            <MultipleValuesSection />
        </Fragment>
    );
};
