/**
 * Assets exportados pelo MCP do Figma.
 *
 * Observacao: as URLs expiram em ~7 dias no servidor do Figma.
 * Ao integrar com backend/proxy, idealmente mover para um bucket proprio.
 */

export const figmaAssets = {
  login: {
    logoIconSrc:
      "https://www.figma.com/api/mcp/asset/73a9ffff-7d67-4bfb-914b-35edbd2741d4",
    illustrationSrc:
      "https://www.figma.com/api/mcp/asset/102f9dc8-f2c2-4bfd-b4c4-0c9860079df3",

    emailIconSrc:
      "https://www.figma.com/api/mcp/asset/f95bc15a-3303-4bbe-9dba-460ffba9ceb1",
    emailIconOverlaySrc:
      "https://www.figma.com/api/mcp/asset/92045747-3dda-422d-95eb-357770f8a056",
    dropdownIconSrc:
      "https://www.figma.com/api/mcp/asset/4a3203a0-5d1d-40a4-ad7d-28f5492fa850",

    passwordIconSrc:
      "https://www.figma.com/api/mcp/asset/8eb7ceba-d4e1-40ee-85c5-1f736e644db3",
    passwordIconOverlaySrc:
      "https://www.figma.com/api/mcp/asset/aa5df342-f586-4e39-8392-f9256ae1f83f",

    mobileStatus: {
      batterySrc:
        "https://www.figma.com/api/mcp/asset/098aa03e-cf98-4522-9039-dc2f117cda0b",
      timeSrc:
        "https://www.figma.com/api/mcp/asset/fc3ac866-27b0-479e-83fd-299a17c13ed0",
      backArrowSrc:
        "https://www.figma.com/api/mcp/asset/ddda40ae-43a0-4aab-9500-c249f7c5b39b",
      receptionSrc:
        "https://www.figma.com/api/mcp/asset/2a0377bd-e0b4-4f30-bd80-82933f26b0da",
      wifiSrc:
        "https://www.figma.com/api/mcp/asset/87c689f6-985e-4932-8a28-7ad1db61e4e0",
    },
  },

  forgotPassword: {
    logoIconSrc:
      "https://www.figma.com/api/mcp/asset/4a2f57a0-6d2a-4d47-be62-968fa9946df2",
    illustrationSrc:
      "https://www.figma.com/api/mcp/asset/fbbe5e3e-3ffe-461a-850d-31fc4fae9656",

    emailIconSrc:
      "https://www.figma.com/api/mcp/asset/2601eb0f-7b0f-4afd-aff1-744ff427046c",
    emailIconOverlaySrc:
      "https://www.figma.com/api/mcp/asset/81af83cd-362a-499e-9284-e95954b6d20f",
    dropdownIconSrc:
      "https://www.figma.com/api/mcp/asset/791af64e-27a1-4c02-9cf1-01a0dbacfc0a",
  },

  resetPassword: {
    logoIconSrc:
      "https://www.figma.com/api/mcp/asset/64658954-8ca8-4bfb-9feb-49052c4162ac",
    illustrationSrc:
      "https://www.figma.com/api/mcp/asset/35b50791-a604-4bba-a24c-fee4620ea84e",

    passwordIconSrc:
      "https://www.figma.com/api/mcp/asset/96ff05b8-1482-4794-86ae-f4f689141685",
    passwordIconOverlaySrc:
      "https://www.figma.com/api/mcp/asset/46b6bf8e-1202-482a-98ca-7c0ac2e45e1c",
    dropdownIconSrc:
      "https://www.figma.com/api/mcp/asset/6280f71c-3b42-436e-80d9-89304c29013c",
  },
} as const;

