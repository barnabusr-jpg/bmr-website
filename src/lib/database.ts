import { NodeScoresPayload } from "@/utils/auditGuards";

export interface AnomalyNode {
  id?: string;
  node_id?: string;
  dimension_node_id?: string;
  anomaly_id?: string;
  title?: string;
  severity?: string;
  description?: string;
  impact_narrative?: string;
  directive?: string;
  remediation_directive?: string;
}

export interface AuditRecord {
  id: string;
  created_at: string;
  updated_at?: string | null;
  compiled_at?: string | null;
  org_name: string;
  sector?: string | null;
  sector_multiplier?: number | null;
  decay_pct?: number | null;
  ai_spend?: number | null;
  status?: string | null;
  roi_pct?: number | null;
  is_released?: boolean | null;
  sow_sent?: boolean | null;
  is_paid?: boolean | null;
  sfi_score?: number | null;
  lead_email?: string | null;
  rework_tax?: number | null;
  exposure?: number | null;
  hai_raw_score?: number | null;
  avs_raw_score?: number | null;
  igf_raw_score?: number | null;
  has_technical?: boolean | null;
  has_managerial?: boolean | null;
  has_executive?: boolean | null;
  fractures?: AnomalyNode[] | null;
  anomalies?: AnomalyNode[] | null;
  raw_responses?: Record<string, unknown>[] | null;
  node_scores?: NodeScoresPayload | null;
}

