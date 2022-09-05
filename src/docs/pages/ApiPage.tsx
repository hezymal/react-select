import React, { Fragment } from "react";

import { PageTitle } from "docs/components/Page";
import { useTranslation } from "docs/i18n";
import { Section, SectionTitle } from "docs/components/Section";
import { StaticCode } from "docs/components/StaticCode";

const singleCode = `
function Select<TValue>(props: SelectProps<TValue>): JSX.Element;
    
    // value type
    type TValue = any;

    // properties type
    interface SelectProps<TValue> {

        // options
        options: Option<TValue>[];

        // current value
        value: TValue;

        // label
        label?: string;

        // change event callback function
        onChange: (

            // selected value
            value: TValue,
            
            // selected option
            option: Option<TValue>,

            // Virtual DOM element event
            event: React.MouseEvent<HTMLLIElement, MouseEvent>

        ) => void;
    }

    // option type
    interface Option<TValue> {

        // option label
        label: string | JSX.Element;

        // option value
        value: TValue;
        
    }

        // value type
        type TValue = any;
`.trim();

export const ApiPage: React.FC = () => {
    const t = useTranslation();

    return (
        <Fragment>
            <PageTitle>{t`ApiPage:Title`}</PageTitle>
            <Section>
                <SectionTitle>Компонент Select</SectionTitle>
                <StaticCode language="typescript" code={singleCode} />
            </Section>
        </Fragment>
    );
};
