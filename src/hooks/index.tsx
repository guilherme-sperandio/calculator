import React, { useState, createContext, useContext, ReactNode } from "react";

type resultsTypes = {
  connectionsList: IConnectionList[];
  setConnectionsList: React.Dispatch<React.SetStateAction<IConnectionList[]>>;
  output: string | null;
  setOutput: React.Dispatch<React.SetStateAction<string | null>>;
  dr: string | null;
  setDr: React.Dispatch<React.SetStateAction<string | null>>;
  ds: string | null;
  setDs: React.Dispatch<React.SetStateAction<string | null>>;
  hs: string | null;
  setHs: React.Dispatch<React.SetStateAction<string | null>>;
  hr: string | null;
  setHr: React.Dispatch<React.SetStateAction<string | null>>;
  ls: string | null;
  setLs: React.Dispatch<React.SetStateAction<string | null>>;
  lr: string | null;
  setLr: React.Dispatch<React.SetStateAction<string | null>>;
};

interface ResultsProviderProps {
  children: ReactNode;
}

interface IConnectionList {
  connection: string | undefined;
  connectionValue: number | undefined;
  quantity: number | undefined;
}

export const ResultsContext = createContext({} as resultsTypes);

export function ResultsProvider({
  children,
}: ResultsProviderProps): JSX.Element {
  const [connectionsList, setConnectionsList] = useState<IConnectionList[]>([]);
  const [output, setOutput] = useState<string | null>(null);
  const [ds, setDs] = useState<string | null>(null);
  const [dr, setDr] = useState<string | null>(null);
  const [hs, setHs] = useState<string | null>(null);
  const [hr, setHr] = useState<string | null>(null);
  const [ls, setLs] = useState<string | null>(null);
  const [lr, setLr] = useState<string | null>(null);

  return (
    <ResultsContext.Provider
      value={{
        connectionsList,
        setConnectionsList,
        output,
        setOutput,
        ds,
        setDs,
        dr,
        setDr,
        hs,
        setHs,
        hr,
        setHr,
        ls,
        setLs,
        lr,
        setLr,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
}

export function useResults(): resultsTypes {
  const context = useContext(ResultsContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
