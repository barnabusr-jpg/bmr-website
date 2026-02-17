import type { NextApiRequest, NextApiResponse } from 'next';  
import sgMail from '@sendgrid/mail';  

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');  

export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });  
    
  const { name, email, org, zoneData } = req.body;  
  const firstName = name ? name.split(' ')[0] : 'there';  

  // --- ANCHOR LOGIC ---  
  let focusArea: 'HAI' | 'AVS' | 'IGF' = 'HAI';  
  const intensities = {  
    HAI: zoneData.HAI?.max || 0,  
    AVS: zoneData.AVS?.max || 0,  
    IGF: zoneData.IGF?.max || 0  
  };  

  if (intensities.HAI >= intensities.AVS && intensities.HAI >= intensities.IGF) focusArea = 'HAI';  
  else if (intensities.AVS >= intensities.HAI && intensities.AVS >= intensities.IGF) focusArea = 'AVS';  
  else focusArea = 'IGF';  

  const contentMap = {  
    'HAI': {  
      result: "Trust Architecture (HAI)",  
      implications: "The detected signals suggest a mismatch between current AI reliability and operational trust requirements.",  
      exercise: "Audit one high-frequency AI workflow."  
    },  
    'AVS': {  
      result: "Adoption Value System (AVS)",  
      implications: "Your results point toward Operational Drift where deployment frequency is decoupled from governance.",  
      exercise: "Identify a recent AI performance variance."  
    },  
    'IGF': {  
      result: "Internal Governance Framework (IGF)",  
      implications: "Current signals indicate Oversight Decay where systems may drift from leadership intent.",  
      exercise: "Examine your most recent AI correction event."  
    }  
  };  

  const selected = contentMap[focusArea];  
  const calendlyLink = `https://calendly.com/hello-bmradvisory/forensic-review?name=${encodeURIComponent(name || "")}&email=${encodeURIComponent(email || "")}`;  

  const msg = {  
    to: email,  
    bcc: 'hello@bmradvisory.co',  
    from: 'hello@bmradvisory.co',  
    subject: `[Observation Report] BMR Signal Diagnostic: ${org}`,  
    // Known-good Outlook signature
    text: `BMR SIGNAL DIAGNOSTIC: FORENSIC OBSERVATION REPORT\n--------------------------------------------------\nOrganization: ${org || 'Your Organization'}\n\nHello ${firstName},\n\nYour clinical signal analysis is complete. Primary focus: ${selected.result}.\n\nSchedule your Forensic Review here: ${calendlyLink}`,  
    html: ``  
  };  

  try {  
    // 1. Dispatch Email
    await sgMail.send(msg);  

    // 2. Webhook for Airtable
    const WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE';   
    if (WEBHOOK_URL !== 'YOUR_WEBHOOK_URL_HERE') {  
      await fetch(WEBHOOK_URL, {  
        method: 'POST',  
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify({  
          name, email, org, focusArea, result: selected.result, zoneData,  
          status: "Lead", isContracted: false, triggerSlideProduction: false,  
          diagnosticType: "Triage-12", vaultID: `BMR-${Date.now()}`  
        }),  
      });  
    }  

    // CRITICAL: Return response to stop the "hanging" spinner on screen
    return res.status(200).json({ success: true });  
  } catch (error: any) {  
    console.error('Dispatch Error:', error.message);  
    return res.status(500).json({ error: 'Internal server error' });  
  }  
}
