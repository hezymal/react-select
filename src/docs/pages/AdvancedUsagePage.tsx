import React, { Fragment } from "react";

import { PageTitle } from "docs/components/Page";
import { useTranslation } from "docs/i18n";

export const AdvancedUsagePage: React.FC = () => {
    const t = useTranslation();

    return (
        <Fragment>
            <PageTitle>{t`AdvancedUsagePage:Title`}</PageTitle>
        </Fragment>
    );
};
