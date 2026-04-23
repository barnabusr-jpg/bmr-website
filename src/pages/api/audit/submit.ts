import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { accessCode, responses, orgName } = req.body;

  try {
    // 1. Record the individual signal
    const { error: opError } = await supabase
      .from('operators')
      .update({ 
        raw_responses: responses,
        status: 'completed',
        is_authorized: false // Lock this SPECIFIC node after submission
      })
      .eq('access_code', accessCode);

    if (opError) throw opError;

    // 2. Check if the Triangulation is complete (Do we have 3 completed nodes?)
    const { data: activeNodes, error: countError } = await supabase
      .from('operators')
      .select('status')
      .eq('group_id', orgName);

    const completedCount = activeNodes?.filter(n => n.status === 'completed').length || 0;

    // 3. Only flip the main Audit to COMPLETE if all 3 are in
    if (completedCount >= 3) {
      await supabase
        .from('audits')
        .update({ status: 'COMPLETE' })
        .eq('org_name', orgName);
        
      return res.status(200).json({ 
        success: true, 
        message: "TRIANGULATION_COMPLETE", 
        isFinished: true 
      });
    }

    // Otherwise, keep the session alive for the other links
    return res.status(200).json({ 
      success: true, 
      message: "SIGNAL_RECORDED", 
      isFinished: false 
    });

  } catch (error: any) {
    console.error("SUBMISSION_ERROR:", error);
    return res.status(500).json({ error: 'PROCESSING_FAILURE' });
  }
}
