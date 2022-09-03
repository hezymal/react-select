import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { Language } from "docs/i18n";
import { styles } from "styles";

import { Container, Row, Col } from "./Grid";
import { Header } from "./Header";
import { Menu } from "./Menu";

interface Props {
    language: Language;
    onLanguageChange: (language: Language) => void;
}

const HeadPart = styled.div`
    border-bottom: 1px solid #eeeeee;
    height: ${styles.span(8, +1)};
`;

const LeftPart = styled.div`
    padding: ${styles.span(4)} ${styles.span(4)} ${styles.span(4)} 0;
`;

const RightPart = styled.div`
    height: calc(100vh - ${styles.span(8, +1)});
    padding: ${styles.span(4)} ${styles.span(4)} ${styles.span(4)} 0;
    overflow-y: auto;
`;

export const Layout: React.FC<Props> = ({ language, onLanguageChange }) => {
    return (
        <Container>
            <HeadPart>
                <Header
                    language={language}
                    onLanguageChange={onLanguageChange}
                />
            </HeadPart>
            <Row>
                <Col size={4}>
                    <LeftPart>
                        <Menu />
                    </LeftPart>
                </Col>
                <Col size={12}>
                    <RightPart>
                        <Outlet />
                    </RightPart>
                </Col>
            </Row>
        </Container>
    );
};
