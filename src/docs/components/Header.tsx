import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import styled from "styled-components";

import { APP_TITLE, REPOSITORY_URL } from "docs/constants";
import { Language } from "docs/i18n";
import { styles } from "styles";
import { Select, OptionType } from "index";

interface Props {
    language: Language;
    onLanguageChange: (language: Language) => void;
}

const languagesOptions: OptionType<Language>[] = [
    { label: Language.en, value: Language.en },
    { label: Language.ru, value: Language.ru },
];

const StyledHeader = styled.div`
    display: flex;
    padding: ${styles.span(1)} 0;
    justify-content: space-between;
`;

const Logo = styled.a`
    background-color: #8383f3;
    color: white;
    display: block;
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    padding: 0 ${styles.span(2)};
    height: ${styles.span(6)};
    line-height: ${styles.span(6)};
`;

const RightPart = styled.div`
    align-items: center;
    display: flex;
`;

const GitHubLink = styled.a`
    margin-right: ${styles.span(4)};
    color: black;
    font-size: 32px;
`;

export const Header: FC<Props> = ({ language, onLanguageChange }) => {
    return (
        <StyledHeader>
            <Logo href="/">{APP_TITLE}</Logo>
            <RightPart>
                <GitHubLink href={REPOSITORY_URL}>
                    <FontAwesomeIcon icon={["fab", "github"]} />
                </GitHubLink>
                <Select<Language>
                    options={languagesOptions}
                    value={language}
                    onChange={onLanguageChange}
                />
            </RightPart>
        </StyledHeader>
    );
};
