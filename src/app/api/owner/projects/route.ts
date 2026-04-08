import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Explicitly type as any array to clear mapping errors
    const projects = await db.collection('forensic_audits')
      .find({})
      .sort({ updatedAt: -1 })
      .toArray() as any[];

    const dashboardData = projects.map((p) => ({
      id: p.projectId || p._id.toString(),
      companyName: p.companyName || 'Unknown Entity',
      requesterEmail: p.requesterEmail || '',
      status: p.status || 'PENDING',
      auditReleased: p.auditReleased || false,
      progress: {
        exec: !!p.lenses?.EXECUTIVE,
        mgr: !!p.lenses?.MANAGERIAL,
        tech: !!p.lenses?.TECHNICAL
      }
    }));

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Dashboard_Fetch_Error:", error);
    return NextResponse.json({ error: 'Failed to fetch audit queue' }, { status: 500 });
  }
}
