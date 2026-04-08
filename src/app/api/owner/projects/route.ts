import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb'; // Ensure you have your mongo util

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    const projects = await db.collection('forensic_audits')
      .find({})
      .sort({ updatedAt: -1 })
      .toArray();

    // Map the DB data to our clinical dashboard structure
    const dashboardData = projects.map(p => ({
      id: p.projectId,
      companyName: p.companyName,
      requesterEmail: p.requesterEmail,
      status: p.status, // e.g., 'INTAKE_COMPLETE', 'AUDIT_ACTIVE', 'REVIEW_PENDING'
      auditReleased: p.auditReleased || false,
      progress: {
        exec: !!p.lenses?.EXECUTIVE,
        mgr: !!p.lenses?.MANAGERIAL,
        tech: !!p.lenses?.TECHNICAL
      }
    }));

    return NextResponse.json(dashboardData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch audit queue' }, { status: 500 });
  }
}
