import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background-image: url("/assets/bg.svg");
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
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div:first-child {
    max-width: 600px;
    margin-right: 1rem;

    > h1 {
      color: #1a4d9a;
      font-size: 52px;
      font-weight: 700;
      max-width: 300px;
    }

    > h3 {
      color: #787676;
      font-weight: normal;
      font-size: 16px;
      max-width: 500px;
    }

    > form {
      > div:first-child {
        > div {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          margin-bottom: 1rem;
          > div {
            padding-right: 1rem;
            margin-bottom: 0.4rem;
          }
        }

        span {
          color: #05d7c1;
          font-size: 1.25rem;
        }
        .title {
          margin-bottom: 1rem !important;
        }

        .list {
          margin-top: 1rem;
          display: flex;
          flex-wrap: wrap;
          .listConnections {
            border-radius: 0.5rem;
            background-color: #1a4d9a;
            color: white;
            height: 35px;
            padding: 4px;
            margin-right: 4px;
          }
        }

        .connections {
          display: unset;
          > div:first-child {
            display: flex;
            margin-top: 1rem;
            > div:first-child {
              width: 47%;
              margin-right: 10px;
            }
            > div:last-child {
              width: 50%;
            }
          }

          button {
            border: none;
            border-radius: 0.5rem;
            background-color: #1a4d9a;
            color: white;
            cursor: pointer;
            height: 35px;

            :hover {
              background-color: white;
              border: 1px solid #1a4d9a;
              color: #1a4d9a;
              transition: 0.3s;
            }
          }
        }
      }
    }
  }
`;

export const SubmitButton = styled.button`
  background-color: #05d7c1;
  color: white;
  border-radius: 8px;
  border: none;
  height: 40px;
  width: 120px;
  cursor: pointer;
  font-weight: 700;
  margin-top: 1rem;

  :hover {
    background-color: white;
    border: 1px solid #05d7c1;
    color: #05d7c1;
    transition: 0.3s;
  }
`;
