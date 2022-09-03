import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { useTranslation } from "docs/i18n";
import { navigation } from "docs/navigation";
import { styles } from "styles";

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style-type: none;
`;

const Item = styled.li`
    margin: 0 0 ${styles.span(0.5)} 0;
`;

const Link = styled(NavLink)`
    color: black;
    display: inline-block;
    text-decoration: none;
    padding: ${styles.span(1)} ${styles.span(4)} ${styles.span(1)}
        ${styles.span(2)};
    border-radius: ${styles.borders.radius[0]};

    &.active,
    &:hover {
        background-color: #f8f8f8;
    }
`;

export const Menu: React.FC = () => {
    const t = useTranslation();

    return (
        <List>
            <Item>
                <Link to={navigation.home()}>{t`HomePage:Title`}</Link>
            </Item>
            <Item>
                <Link
                    to={navigation.gettingStarted()}
                >{t`GettingStartedPage:Title`}</Link>
            </Item>
            <Item>
                <Link
                    to={navigation.advancedUsage()}
                >{t`AdvancedUsagePage:Title`}</Link>
            </Item>
            <Item>
                <Link to={navigation.api()}>{t`ApiPage:Title`}</Link>
            </Item>
        </List>
    );
};
