import styled from "styled-components";
import { styles } from "styles";

interface ColProps {
    size: number;
}

export const Container = styled.div`
    margin: 0 auto;
    width: ${styles.span(138)};
`;

export const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const Col = styled.div<ColProps>`
    ${(props) => `width: ${(props.size * 100) / 16}%;`}
`;
