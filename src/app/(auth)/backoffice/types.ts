export type ClientStatus = "Ativo" | "Inativo" | "Inadimplente";

export type ClientRow = {
  nome: string;
  cnpj: string;
  contato: string;
  licencas: string;
  status: ClientStatus;
};

export type ClientDetails = {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  email: string;
  telefone: string;
  endereco: string;
  municipio: string;
  estado: string;
  cnaePrincipal: string;
  pacoteContratado: string;
  acessosEmUso: string;
  usuariosAtivos: string;
};

export type AdditionalClient = {
  cnpj: string;
  nome: string;
  razaoSocial: string;
  nomeFantasia: string;
  email: string;
  telefone: string;
  endereco: string;
  municipio: string;
  estado: string;
  cnaePrincipal: string;
  usuariosAtivos: string;
};

