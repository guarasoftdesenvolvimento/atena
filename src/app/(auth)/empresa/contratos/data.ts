import type { ContractRow, ModeloRow } from "./types";

export const contracts: ContractRow[] = [
  {
    id: 1,
    partnerName: "Felipe Alves dos Santos",
    modelo: "CONTRATO PRESTAÇÃO GERAL",
    verificado: true,
    categorias: [
      { name: "Categoria 1", color: "Green" },
      { name: "+1", color: "Plus" },
    ],
    vigencia: "08/07/2025",
    status: "ativo",
  },
  {
    id: 2,
    partnerName: "Felipe Alves dos Santos",
    modelo: "ADITIVO PRESTAÇÃO DE SERVIÇOS FRONT-END",
    verificado: true,
    categorias: [
      { name: "Categoria 1", color: "Purple" },
      { name: "+3", color: "Plus" },
    ],
    vigencia: "08/07/2025",
    status: "ativo",
  },
  {
    id: 3,
    partnerName: "Felipe Alves dos Santos",
    modelo: "ADITIVO PRESTAÇÃO DE SERVIÇOS FRONT-END",
    verificado: false,
    categorias: [{ name: "Categoria 1", color: "Red" }],
    vigencia: "08/07/2025",
    status: "ativo",
  },
  {
    id: 4,
    partnerName: "Felipe Alves dos Santos",
    modelo: "ADITIVO PRESTAÇÃO DE SERVIÇOS FRONT-END",
    verificado: false,
    categorias: [{ name: "Categoria 1", color: "Red" }],
    vigencia: "08/07/2025",
    status: "ativo",
  },
  {
    id: 5,
    partnerName: "Felipe Alves dos Santos",
    modelo: "ADITIVO PRESTAÇÃO DE SERVIÇOS FRONT-END",
    verificado: false,
    categorias: [{ name: "Categoria 1", color: "Red" }],
    vigencia: "08/07/2025",
    status: "ativo",
  },
];

export const modelos: ModeloRow[] = [
  {
    id: 1,
    modelo: "CONTRATO PRESTAÇÃO GERAL",
    verificado: true,
    criadoEm: "08/07/2025",
    atualizadoEm: "08/07/2025",
  },
  {
    id: 2,
    modelo: "ADITIVO PRESTAÇÃO DE SERVIÇOS FRONT-END",
    verificado: true,
    criadoEm: "08/07/2025",
    atualizadoEm: "08/07/2025",
  },
  {
    id: 3,
    modelo: "ADITIVO PRESTAÇÃO DE SERVIÇOS FRONT-END",
    verificado: false,
    criadoEm: "08/07/2025",
    atualizadoEm: "08/07/2025",
  },
  {
    id: 4,
    modelo: "ADITIVO PRESTAÇÃO DE SERVIÇOS FRONT-END",
    verificado: false,
    criadoEm: "08/07/2025",
    atualizadoEm: "08/07/2025",
  },
  {
    id: 5,
    modelo: "ADITIVO PRESTAÇÃO DE SERVIÇOS FRONT-END",
    verificado: false,
    criadoEm: "08/07/2025",
    atualizadoEm: "08/07/2025",
  },
];
