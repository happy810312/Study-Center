import React from "react";
import EditorComponent from "../components/Editor-component";
import { Container, Wrapper } from "../styles/styles";
import styled from "@emotion/styled";

const EditPage = () => {
  const Title = styled.h2`
    font-size: 3.5rem;
    font-weight: 600;
    color: #151618;
    padding-bottom: 20px;
  `;

  return (
    <div>
      <Container>
        <Wrapper>
          <Title>Post News</Title>
          <EditorComponent />
        </Wrapper>
      </Container>
    </div>
  );
};

export default EditPage;
