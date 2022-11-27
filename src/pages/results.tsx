import { connect } from "http2";
import { useEffect, useState } from "react";
import { useResults } from "../hooks";
import { Container, Wrapper } from "../styles/results";

export default function Results() {
  const { connectionsList, dr, ds, hr, hs, lr, ls, output } = useResults();
  const [totalConnection, setTotalConnection] = useState(0);

  useEffect(() => {
    let total = 0;
    connectionsList.map((value) => (total = total + value.totalSize));
    setTotalConnection(total);
  }, [connectionsList]);

  return (
    <Container>
      <Wrapper>
        <div>
          <h2>Solução</h2>
          <div>
            <div>
              <div>
                <p className="title">1º Calcular a Vazão</p>
                <div>
                  <p>{`Como ja foi informado a vazão é: ${output} m³/h`}</p>
                </div>
              </div>
              <div>
                <p className="title">2º Calcular o Diametro da tubulação</p>
                <div>
                  <p>{`Como ja foi informado a Diametro de Sucção é: ${ds}" e o Diametro de Recalque é: ${dr}"`}</p>
                </div>
              </div>
              <div>
                <p className="title">3º Econtrar altura de Sucção</p>
                <div>
                  <p>{`Como ja foi informado a Altura de Sucção é: ${hs}m`}</p>
                </div>
              </div>
              <div>
                <p className="title">4º Econtrar altura de Recalque</p>
                <div>
                  <p>{`Como ja foi informado a Altura de Recalque é: ${hr}m`}</p>
                </div>
              </div>
              <div>
                <p className="title">5º Econtrar comprimento de Sucção</p>
                <div>
                  <p>{`Como ja foi o Comprimento de Sucção é: ${ls}m`}</p>
                </div>
              </div>
              <div>
                <p className="title">6º Econtrar comprimento de Recalque</p>
                <div>
                  <p>{`Como ja foi o Comprimento de Recalque é: ${lr}m`}</p>
                </div>
              </div>
              <div>
                <p className="title">
                  7º Calcular comprimento total da tubulação
                </p>
                <div>
                  <p>Lt = Ls + Lr</p>
                  <p>{`Lt = ${ls} + ${lr}`}</p>
                  <p>{`Lt = ${Number(ls) + Number(lr)}m`}</p>
                </div>
              </div>
              <div>
                <p className="title">
                  8º Encontrar perda de carga por comprimento de tubo
                </p>
                <div>
                  <p>
                    A perda de carga será o mesmo valor calculado no comprimento
                    total da tubulação.
                  </p>
                  <p>Jl = Lt</p>
                  <p>{`Jl = ${Number(ls) + Number(lr)}m`}</p>
                </div>
              </div>
              <div>
                <p className="title">
                  9º Encontrar perda de carga nas conexões
                </p>
                <div>
                  {connectionsList.map((connection, index) => (
                    <>
                      <p
                        key={index}
                      >{`${connection.connection} (${connection.quantity}x) = ${connection.totalSize}m`}</p>
                    </>
                  ))}
                  <p>{`O valor da somatória das perdas é: ${totalConnection}m`}</p>
                </div>
              </div>
              <div>
                <p className="title">
                  10º Encontrar perda de carga total no sistema de tubulação
                </p>
                <div>
                  <p>A perda de carga total no sistema se da pela formula:</p>
                  <p>Jt = (Jc + Jl) * Fj</p>
                  <p>
                    Obs: o valor do Fj é obtido pela tabela, aonde o valor que
                    esta sendo utilizado é 1,7%
                  </p>
                  <p>{`Jt = ${(
                    (Number(ls) + Number(lr) + totalConnection) *
                    0.017
                  ).toFixed(4)} m.c.a`}</p>
                </div>
              </div>
              <div>
                <p className="title">11º Encontrar altura monometrica total</p>
                <div>
                  <p>A altura manometrica é dada pela formula:</p>
                  <p>Amt = HS + HR + Jt</p>
                  <p>{`Amt = ${hs} + ${hr} + ${(
                    (Number(ls) + Number(lr) + totalConnection) *
                    0.017
                  ).toFixed(4)}`}</p>
                  <p>{`Amt = ${
                    Number(hr) +
                    Number(hs) +
                    (Number(ls) + Number(lr) + totalConnection) * 0.017
                  } m.c.a`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </Container>
  );
}
