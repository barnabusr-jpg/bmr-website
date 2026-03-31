import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { organization, validated_hemorrhage, calibration } = body;

    if (!calibration || !validated_hemorrhage) {
      return NextResponse.json({ error: 'DATA_UNSTABLE' }, { status: 400 });
    }

    const ipNotice = "PROPRIETARY LOGIC NOTICE (BMR-v3.4): Calculations protected under BMR Advisory IP (2026).";

    return NextResponse.json({ 
      status: 'COMPLETE', 
      artifact: `BMR_${organization.toUpperCase()}`,
      notice: ipNotice,
      summary: {
        nodes: calibration.nodes,
        integrity: calibration.integrity,
        total: validated_hemorrhage
      }
    });
  } catch (err) {
    console.error("CRITICAL_API_FAILURE:", err);
    return NextResponse.json({ error: 'SYSTEM_FAILURE' }, { status: 500 });
  }
}
