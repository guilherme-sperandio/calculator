import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background-color: #535c68;
  h1 {
    padding: 0;
    margin: 0;
  }
`;

export const Wrapper = styled.section`
  background-color: white;
  margin: 0 4rem 0 4rem;
  border-radius: 16px;
  padding: 2rem;
  min-height: 800px;
  min-width: 900px;
  display: flex;
  justify-content: center;
  h2 {
    color: #1a4d9a;
    font-size: 42px;
    font-weight: 700;
    max-width: 300px;
    margin-bottom: 1rem;
  }
  span {
    color: #787676;
    font-weight: normal;
    font-size: 16px;
    margin-left: 25%;
  }

  > div {
    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;

      > div {
        div {
          background-color: #ccc;
          margin-bottom: 2rem;
          padding: 0.3rem;
          border-radius: 0.5rem;
        }
      }
    }
  }

  p {
    margin: 0;
  }
  .title {
    color: #1a4d9a;
    text-align: center;
    margin-bottom: 1rem;
    font-weight: 700;
  }
`;
