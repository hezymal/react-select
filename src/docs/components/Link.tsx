import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

import { styles } from "styles";

export const Link = styled(RouterLink)`
    color: ${styles.colors.violet1};
    text-decoration: none;
`;
