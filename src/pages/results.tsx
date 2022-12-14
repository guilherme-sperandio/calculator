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

  const labels = ["50", "100", "150", "200"];

  var xValues = [39, 36, 29, 20];

  const data = {
    labels,
    datasets: [
      {
        label: " Curva do sistema de bombeamento",
        data: labels.map((__, index) => systemCalc[index]),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Curva da bomba",
        borderColor: "rgba(0,0,100,1)",
        backgroundColor: "rgba(81, 98, 194, 0.5)",
        data: xValues,
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
      (Number(manValue) - (Number(hs) + Number(hr))) /
      Math.pow(Number(output) / 3600, 2);

    connectionsList.map((value) => (total = total + value.totalSize));
    setTotalConnection(total);
    let counter = 50;
    for (let index = 0; index < 4; index++) {
      const vazao = Math.pow(counter / 3600, 2);
      const teste = c2 * vazao;
      const result = Number(hs) + Number(hr) + teste;

      setSystemCalc((oldState) => [...oldState, result]);

      counter = counter + 50;
    }
  }, [connectionsList, hr, hs, lr, ls, output, totalConnection]);

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
          <h2>Solu????o</h2>
          <div>
            <div>
              <div>
                <p className="title">1?? Calcular a Vaz??o</p>
                <div>
                  <p>{`Como ja foi informado a vaz??o ??: ${output} m??/h`}</p>
                </div>
              </div>
              <div>
                <p className="title">2?? Calcular o Diametro da tubula????o</p>
                <div>
                  <p>{`Como ja foi informado a Diametro de Suc????o ??: ${ds}" e o Diametro de Recalque ??: ${dr}"`}</p>
                </div>
              </div>
              <div>
                <p className="title">3?? Econtrar altura de Suc????o</p>
                <div>
                  <p>{`Como ja foi informado a Altura de Suc????o ??: ${hs}m`}</p>
                </div>
              </div>
              <div>
                <p className="title">4?? Econtrar altura de Recalque</p>
                <div>
                  <p>{`Como ja foi informado a Altura de Recalque ??: ${hr}m`}</p>
                </div>
              </div>
              <div>
                <p className="title">5?? Econtrar comprimento de Suc????o</p>
                <div>
                  <p>{`Como ja foi o Comprimento de Suc????o ??: ${ls}m`}</p>
                </div>
              </div>
              <div>
                <p className="title">6?? Econtrar comprimento de Recalque</p>
                <div>
                  <p>{`Como ja foi o Comprimento de Recalque ??: ${lr}m`}</p>
                </div>
              </div>
              <div>
                <p className="title">
                  7?? Calcular comprimento total da tubula????o
                </p>
                <div>
                  <p>Lt = Ls + Lr</p>
                  <p>{`Lt = ${ls} + ${lr}`}</p>
                  <p>{`Lt = ${Number(ls) + Number(lr)}m`}</p>
                </div>
              </div>
              <div>
                <p className="title">
                  8?? Encontrar perda de carga por comprimento de tubo
                </p>
                <div>
                  <p>
                    A perda de carga ser?? o mesmo valor calculado no comprimento
                    total da tubula????o.
                  </p>
                  <p>Jl = Lt</p>
                  <p>{`Jl = ${Number(ls) + Number(lr)}m`}</p>
                </div>
              </div>
              <div>
                <p className="title">
                  9?? Encontrar perda de carga nas conex??es
                </p>
                <div>
                  {connectionsList.map((connection, index) => (
                    <>
                      <p
                        key={index}
                      >{`${connection.connection} (${connection.quantity}x) = ${connection.totalSize}m`}</p>
                    </>
                  ))}
                  <p>{`O valor da somat??ria das perdas ??: ${totalConnection}m`}</p>
                </div>
              </div>
              <div>
                <p className="title">
                  10?? Encontrar perda de carga total no sistema de tubula????o
                </p>
                <div>
                  <p>A perda de carga total no sistema se da pela formula:</p>
                  <p>Jt = (Jc + Jl) * Fj</p>
                  <p>
                    Obs: o valor do Fj ?? obtido pela tabela, aonde o valor que
                    esta sendo utilizado ?? 1,7%
                  </p>
                  <p>{`Jt = ${(
                    (Number(ls) + Number(lr) + totalConnection) *
                    0.017
                  ).toFixed(4)} m.c.a`}</p>
                </div>
              </div>
              <div>
                <p className="title">11?? Encontrar altura monometrica total</p>
                <div>
                  <p>A altura manometrica ?? dada pela formula:</p>
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
                Ver Gr??ficos
              </SubmitButton>
            </div>
          </div>
        </div>
      </Wrapper>
    </Container>
  );
}
