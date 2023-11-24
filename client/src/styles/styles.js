import styled from "@emotion/styled";

export const Container = styled.div`
  max-width: 1240px;
  width: 100%;
  padding: 0 1rem;
  margin: auto;
`;

export const Wrapper = styled.div`
  padding-top: ${(props) =>
    props.paddingTop === true
      ? "180px"
      : props.paddingTop
      ? `${props.paddingTop}px`
      : "initial"};
  color: ${(props) => (props.skyblue ? "skyblue" : "red")};
`;

{
  /* <Wrapper skyblue paddingTop={10}>
123
</Wrapper> */
}
