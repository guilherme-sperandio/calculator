import { TextField } from "@mui/material";
import Select from "react-select";
import Image from "next/image";
import { Container, Wrapper, SubmitButton } from "../styles/home";
import { useState } from "react";
import { useResults } from "../hooks";
import { useRouter } from "next/router";

interface ISelect {
  value: number;
  label: string;
}

export default function Home() {
  const router = useRouter();
  const [connection, setConnection] = useState<ISelect | null>(null);
  const [quantity, setQuantity] = useState<ISelect | null>(null);
  const {
    connectionsList,
    dr,
    ds,
    hr,
    hs,
    lr,
    ls,
    output,
    setConnectionsList,
    setDr,
    setDs,
    setHr,
    setHs,
    setLr,
    setLs,
    setOutput,
  } = useResults();

  const connections = [
    { value: 1, label: "Válvula de Retenção" },
    { value: 2, label: "Curvas de 90º" },
    { value: 3, label: "Curvas de 45º" },
    { value: 4, label: "Registro de Gaveta" },
    { value: 5, label: "Saída de Canalização" },
    { value: 6, label: "Válvula de Pé com Crivo" },
  ];
  const quantitys = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" },
  ];

  function handleAddConnection() {
    setConnectionsList((oldState) => [
      ...oldState,
      {
        connection: connection?.label,
        connectionValue: connection?.value,
        quantity: quantity?.value,
      },
    ]);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    if (
      output === null ||
      dr === null ||
      ds === null ||
      hr === null ||
      hs === null ||
      ls === null ||
      lr === null ||
      output === "" ||
      dr === "" ||
      ds === "" ||
      hr === "" ||
      hs === "" ||
      ls === "" ||
      lr === ""
    ) {
      console.log("todos os campos devem estar preenchidos");
      return;
    }
    if (!connectionsList.length) {
      console.log("adicione pelomenos uma conexão");
      return;
    }

    router.push("/results");
  }

  return (
    <Container>
      <Wrapper>
        <div>
          <h1>Calcule o Dimensionamento</h1>
          <h3>
            Preencha todos os campos abaixo, conforme as informações e unidades
            de medidas pedida. Após isto clique em calcular e você conseguirá
            ver os passos para dimensionar sua bomba e o grafico.
          </h3>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <span>Dados Gerais</span>
              <div>
                <div>
                  <TextField
                    id="standard-basic"
                    label="Vazão (m³/h)"
                    variant="standard"
                    onChange={(value) => setOutput(value.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    id="standard-basic"
                    label="Diâmetro Sucção"
                    variant="standard"
                    onChange={(value) => setDs(value.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    id="standard-basic"
                    label="Diâmetro Recalque"
                    variant="standard"
                    onChange={(value) => setDr(value.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    id="standard-basic"
                    label="Altura Sucção (Hs)"
                    variant="standard"
                    onChange={(value) => setHs(value.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    id="standard-basic"
                    label="Altura Recalque (Hr)"
                    variant="standard"
                    onChange={(value) => setHr(value.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    id="standard-basic"
                    label="Comprimento Sucção (Ls)"
                    variant="standard"
                    onChange={(value) => setLs(value.target.value)}
                  />
                </div>
                <div>
                  <TextField
                    id="standard-basic"
                    label="Comprimento Recalque (Lr)"
                    variant="standard"
                    onChange={(value) => setLr(value.target.value)}
                  />
                </div>
              </div>
              <span className="title">Conexões</span>
              {connectionsList.length > 0 && (
                <div className="list">
                  {connectionsList.map((connection, index) => (
                    <div className="listConnections" key={index}>
                      {connection.connection} - {connection.quantity}
                    </div>
                  ))}
                </div>
              )}
              <div className="connections">
                <div>
                  <Select
                    placeholder="Tipo de Conexão"
                    options={connections}
                    onChange={(value) => setConnection(value)}
                  />
                  <Select
                    placeholder="Quantidade"
                    options={quantitys}
                    onChange={(value) => setQuantity(value)}
                  />
                </div>
                <button
                  disabled={
                    connection === null || quantity === null ? true : false
                  }
                  type="button"
                  onClick={handleAddConnection}
                >
                  Adicionar Conexão
                </button>
              </div>
            </div>
            <div>
              <SubmitButton type="submit">Calcular</SubmitButton>
            </div>
          </form>
        </div>
        <div>
          <Image
            alt="calculator hero image"
            src="/assets/hero.svg"
            width={500}
            height={600}
          />
        </div>
      </Wrapper>
    </Container>
  );
}