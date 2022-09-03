import React, { Fragment } from "react";

import { PageTitle } from "docs/components/Page";
import { useTranslation } from "docs/i18n";

export const ApiPage: React.FC = () => {
    const t = useTranslation();

    return (
        <Fragment>
            <PageTitle>{t`ApiPage:Title`}</PageTitle>
        </Fragment>
    );
};
