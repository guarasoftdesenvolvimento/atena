export type ContractStatus = "ativo" | "inativo";

export type CategoryColor =
  | "Green"
  | "Orange"
  | "Purple"
  | "Red"
  | "Yellow"
  | "Plus";

export type ContractCategory = {
  name: string;
  color: CategoryColor;
};

export type ContractRow = {
  id: number;
  partnerName: string;
  modelo: string;
  verificado: boolean;
  categorias: ContractCategory[];
  vigencia: string;
  status: ContractStatus;
};

export type ModeloRow = {
  id: number;
  modelo: string;
  verificado: boolean;
  criadoEm: string;
  atualizadoEm: string;
};

export type ContractTab = "CONTRATOS" | "MODELOS";
