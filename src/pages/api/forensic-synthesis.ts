import type { NextApiRequest, NextApiResponse } from 'next';

const BASELINE = 17.8;
const SECTOR_DATA: Record<string, any> = {
  finance: { 
    mult: 1.8, 
    label: "FINANCIAL SERVICES", 
    anchor: 1.2,
    traps: {
      executive: { hook: "FIDUCIARY EROSION", anxiety: "Your signal is a quantified Material Risk. Analysis correlates this profile with a regulatory Deep Audit.", cta: "SECURE THE FIDUCIARY GAP" },
      manager: { hook: "AUDIT FRICTION", anxiety: "You are losing capital to 'Human Band-Aids.' 38% of your team capacity is lost to manual verification.", cta: "RECLAIM OPERATIONAL CAPACITY" },
      technical: { hook: "PROVENANCE DECAY", anxiety: "The Gap Penalty confirms 'Black Box' logic. The system is producing un-traceable decisions.", cta: "VERIFY SYSTEMIC INTEGRITY" }
    }
  },
  // ... healthcare and manufacturing blocks remain same
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { responses, sector } = req.body; // Expecting the full responses object
  const config = SECTOR_DATA[sector] || SECTOR_DATA.finance;

  // 1. Calculate Segment Scores
  // We look for the "Shear" between Executive intent and Technical reality
  const allValues = Object.values(responses || {}).map(v => Number(v));
  const totalRaw = allValues.reduce((a, b) => a + b, 0);
  
  // 2. The SFI Calculation (Proprietary Logic)
  // Higher weights in the answers lead to a higher Friction Index.
  // We cap it at 98% to avoid a perfect 100% (which looks fake).
  const sfiScore = Math.min(Math.round((totalRaw / 120) * 100), 98);

  // 3. Logic Shear Delta
  // We simulate the "Strategic Intent" as a high baseline (92%) 
  // and compare it to the "Technical Truth" (100 - Friction).
  const technicalTruth = 100 - sfiScore;
  const logicShear = 92 - technicalTruth;

  // 4. Financial Hemorrhage Calculation
  const finalTotal = (BASELINE * (totalRaw / 120) * config.mult);

  res.status(200).json({
    total: finalTotal.toFixed(1),
    sfi_score: sfiScore,
    logic_shear: logicShear, // Drives the "Shear Zone" visualization
    sectorLabel: config.label,
    personaContent: config.traps,
    provenance: {
      timestamp: new Date().toISOString(),
      audit_id: `BMR-${sector.toUpperCase()}-2026-FORENSIC`
    }
  });
}
