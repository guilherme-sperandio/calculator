import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useResults } from "../hooks";
import { SubmitButton } from "../styles/home";
import { Container, Wrapper } from "../styles/results";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    heigth: "50%",
  },
};
Modal.setAppElement("body");

export default function Results() {
  const { connectionsList, dr, ds, hr, hs, lr, ls, output } = useResults();
  const [totalConnection, setTotalConnection] = useState(0);
  const [showGraphics, setShowGraphics] = useState(false);

  const [systemCalc, setSystemCalc] = useState<number[]>([]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Curva do sistema",
      },
    },
  };

  const labels = [
    "0",
    "20",
    "40",
    "60",
    "80",
    "100",
    "120",
    "140",
    "160",
    "180",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: " Curva do sistema de bombeamento",
        data: labels.map((__, index) => systemCalc[index]),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  useEffect(() => {
    let total = 0;

    const manValue = (
      Number(hr) +
      Number(hs) +
      (Number(ls) + Number(lr) + totalConnection) * 0.017
    ).toFixed(4);

    const c2 =
      (Number(manValue) - (Number(hs) + Number(hr)) / (Number(output) / 3600)) ^
      2;
    connectionsList.map((value) => (total = total + value.totalSize));
    setTotalConnection(total);
    let counter = 0;
    for (let index = 0; index < 10; index++) {
      const result = Math.sqrt(counter - (Number(hs) + Number(hr)) / c2);

      setSystemCalc((oldState) => [...oldState, result]);

      counter = counter + 20;
    }
  }, [connectionsList, hr, hs, lr, ls, output, totalConnection]);

  console.log(systemCalc);

  function openGraphicsModal() {
    setShowGraphics(true);
  }

  function closeGraphicsModal() {
    setShowGraphics(false);
  }

  return (
    <Container>
      <Modal
        isOpen={showGraphics}
        onRequestClose={closeGraphicsModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Line options={options} data={data} />
      </Modal>
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
                  <p>{`Amt = ${(
                    Number(hr) +
                    Number(hs) +
                    (Number(ls) + Number(lr) + totalConnection) * 0.017
                  ).toFixed(4)} m.c.a`}</p>
                </div>
              </div>
            </div>
            <div>
              <SubmitButton type="button" onClick={openGraphicsModal}>
                Ver Gráficos
              </SubmitButton>
            </div>
          </div>
        </div>
      </Wrapper>
    </Container>
  );
}
