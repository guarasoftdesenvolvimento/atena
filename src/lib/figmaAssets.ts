/**
 * Assets exportados pelo MCP do Figma.
 *
 * Observacao: as URLs expiram em ~7 dias no servidor do Figma.
 * Para evitar quebra no frontend, usamos assets locais versionados no projeto.
 */

const localAuthAssets = {
  logoIconSrc: "/atena-logo-icon.png",
  illustrationSrc: "/atena-auth-illustration.png",
  emailIconSrc: "/file.svg",
  emailIconOverlaySrc: "/file.svg",
  dropdownIconSrc: "/file.svg",
  passwordIconSrc: "/file.svg",
  passwordIconOverlaySrc: "/file.svg",
  mobileStatus: {
    batterySrc: "/file.svg",
    timeSrc: "/file.svg",
    backArrowSrc: "/file.svg",
    receptionSrc: "/file.svg",
    wifiSrc: "/file.svg",
  },
} as const;

export const figmaAssets = {
  login: localAuthAssets,
  forgotPassword: localAuthAssets,
  resetPassword: localAuthAssets,
} as const;
