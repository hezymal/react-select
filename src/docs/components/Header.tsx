import React, { FC } from "react";
import styled from "styled-components";

import { Language } from "docs/i18n";
import { styles } from "styles";
import { Option, Select } from "Select";

interface Props {
    language: Language;
    onLanguageChange: (language: Language) => void;
}

const StyledHeader = styled.div`
    display: flex;
    padding: ${styles.span(1)} 0;
    justify-content: space-between;
`;

const Logo = styled.a`
    background-color: #8383f3;
    color: white;
    display: inline-block;
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    padding: 0 ${styles.span(2)};
    height: ${styles.span(6)};
    line-height: ${styles.span(6)};
`;

const languagesOptions: Option<Language>[] = [
    { label: Language.en, value: Language.en },
    { label: Language.ru, value: Language.ru },
];

export const Header: FC<Props> = ({ language, onLanguageChange }) => {
    return (
        <StyledHeader>
            <Logo href="/">@hezymal/react-select</Logo>
            <Select<Language>
                options={languagesOptions}
                value={language}
                onChange={onLanguageChange}
            />
        </StyledHeader>
    );
};
