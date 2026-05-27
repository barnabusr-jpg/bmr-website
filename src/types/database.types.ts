export interface AuditRecord {
  id: string;
  created_at: string;
  org_name: string;
  sector: string;
  decay_pct: number;
  ai_spend: number;
  /**
   * ⚠️ DATABASE SCHEMA OVERRIDE NOTE:
   * This field maps directly to the 'roi_pct' column in the Supabase Table layout.
   * To prevent a production database migration, it is explicitly repurposed here
   * to store the Impacted Client Workforce Size / Capacity (FTE headcount count).
   */
  roi_pct: number | null; 
  is_released: boolean;
  fractures: AnomalyNode[] | null;
}

export interface AnomalyNode {
  id: string;
  severity: "CRITICAL" | "HIGH";
  description: string;
  directive: string;
}
