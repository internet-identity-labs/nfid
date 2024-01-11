export enum SupportedStandards {
  "ICRC_25" = "ICRC-25",
  "ICRC_31" = "ICRC-31",
  "ICRC_32" = "ICRC-32",
  "ICRC_33" = "ICRC-33",
  "ICRC_34" = "ICRC-34",
}

export type SupportedStandardsType = Array<keyof typeof SupportedStandards>
