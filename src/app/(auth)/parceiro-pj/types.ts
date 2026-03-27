import type { LucideIcon } from "lucide-react";

export type OnboardingStep =
  | "company_data"
  | "success"
  | "home"
  | "contracts"
  | "contract_detail"
  | "invoices"
  | "alerts"
  | "support"
  | "my_data";

export type NavItemId = "home" | "contracts" | "nfs" | "alerts";
export type ContractStatus = "active" | "waiting_signature" | "expired";
export type SignatureStatus = "signed" | "pending";
export type InvoiceFlowMode = "emit" | "upload";
export type ProfileAccordionId = "company" | "contact" | "banking";

export interface ContractItem {
  code: string;
  detailCode: string;
  status: ContractStatus;
  title: string;
  startDate: string;
  endDate: string;
  amount: string;
  signedAt?: string;
  sentDate: string;
}

export interface ContractSigner {
  name: string;
  email: string;
  status: SignatureStatus;
}

export interface ContractAddendum {
  id: string;
  code: string;
  sentDate: string;
}

export interface InvoiceItem {
  id: string;
  code: string;
  issuedAt: string;
  contractCode: string;
  paymentProof?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
}

export interface QuickAccessItem {
  id: "contracts" | "nfs" | "support" | "profile";
  label: string;
  icon: LucideIcon;
}

export interface BottomNavItem {
  id: NavItemId;
  label: string;
  icon: LucideIcon;
}
