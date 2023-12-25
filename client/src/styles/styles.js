import styled from "@emotion/styled";

export const Container = styled.div`
  max-width: 1240px;
  width: 100%;
  padding: 0 1rem;
  margin: auto;
`;

export const Wrapper = styled.div`
  padding: ${(props) =>
    props.paddingY === true ? `${props.paddingY}px 0px` : "180px 0px"};
`;
