import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

import { styles } from "docs/styles";

export const Link = styled(RouterLink)`
    color: ${styles.colors.violet[0]};
    text-decoration: none;
`;
