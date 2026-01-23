import { DiagnosticScores } from "./diagnosticScoring";

const getLevelFromScore = (score: string): string => {
  const numScore = parseFloat(score);
  if (numScore >= 4) return "High";
  if (numScore >= 2.5) return "Moderate";
  return "Low";
};

// const getLevelColor = (score: string): string => {
//   const numScore = parseFloat(score);
//   if (numScore >= 4) return "text-emerald-400";
//   if (numScore >= 2.5) return "text-amber-400";
//   return "text-rose-400";
// };
// utils/emailTemplates.js
export const generateDiagnosticEmailHtml = ({
  scores,
}: {
  scores: DiagnosticScores;
}) => {
  const getOverallHeadline = () => {
    switch (scores.overallLevel) {
      case "high":
        return "Your Organization Shows Strong AI Maturity";
      case "moderate":
        return "Your Organization is Building AI Maturity";
      case "low":
        return "Your Organization Has Opportunities for AI Growth";
      default:
        return "";
    }
  };

  const getOverallSubheadline = () => {
    switch (scores.overallLevel) {
      case "high":
        return "Your diagnostic results indicate strong foundations across Trust, Governance, and Evolution. You're well-positioned to scale AI capabilities responsibly.";
      case "moderate":
        return "Your diagnostic results show developing capabilities with opportunities to strengthen specific areas. Focused improvements can accelerate your AI maturity.";
      case "low":
        return "Your diagnostic results highlight important areas for foundational development. Addressing these areas will help establish a solid base for AI success.";
      default:
        return "";
    }
  };

  // Build Pillars HTML
  const pillarsHtml = scores.pillars
    .map((pillar) => {
      const level = getLevelFromScore(pillar as any);

      return `
<tr >
  <td style="padding:16px 0;">
    <div style="
      border:1px solid #132139;
      border-radius:12px;
      padding:16px;
      background-color:#132139;
      color:#ffffff;
     
    ">
      <div>
     <h3 style="margin:0 0 4px 0; font-size:16px; font-weight:600; display:flex; justify-content:space-between;">
      <span>${pillar.title} — ${level} — </span>
      <span style="display:flex; flex-direction:column; text-align:right;float:right">
        <span>${pillar.score.toFixed(1)}</span>
        <span style="font-size:12px; font-weight:400;">out of 5</span>
      </span>
    </h3>
      </div>
      <p style="margin:0; font-size:14px; color:#f5f7fabf; line-height:1.6;">
        ${pillar.narrative}
      </p>
    </div>
  </td>
</tr>
`;
    })
    .join("");

  // Build Systems HTML
  const systemsHtml = scores.systems
    .map(
      (system) => `
<tr >
  <td style="padding:12px 0;">
    <div style="
      border:1px solid #132139;
      border-radius:12px;
      padding:16px;
      background-color:#132139;
      color:#ffffff;
    ">
      <h3 style="margin:0 0 4px 0; font-size:16px; font-weight:600;">
        ${system.title} — <span style="color:#fbbf24"> ${system.stateLabel}</span>
      </h3>
      <p style="margin:0; font-size:14px; color:#f5f7fabf; line-height:1.6;">
        ${system.narrative}
      </p>
    </div>
  </td>
</tr>
`,
    )
    .join("");

  // Full HTML email
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AI Diagnostic Results</title>
</head>
<body style="margin:0; padding:0;  font-family:Arial, Helvetica, sans-serif; ">

<div style="background-color:#0a172e">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:64px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:640px;">
          <!-- Badge -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <span style="
                display:inline-block;
                padding:8px 16px;
                border-radius:9999px;
                background-color:#09263a;
                border:1px solid #00a5a8;
                color:#00a5a8;
                font-size:14px;
                font-weight:600;
              ">
                📊 Your Results
              </span>
            </td>
          </tr>

          <!-- Headline -->
          <tr>
            <td align="center" style="padding-bottom:16px;">
              <h1 style="
                margin:0;
                font-size:32px;
                line-height:1.25;
                font-weight:700;
                color:#ffffff;
                font-family:Arial, Helvetica, sans-serif;
              ">
                ${getOverallHeadline()}
              </h1>
            </td>
          </tr>

          <!-- Subheadline -->
          <tr>
            <td align="center" style="padding-bottom:48px;">
              <p style="
                margin:0;
                font-size:16px;
                line-height:1.7;
                color:#f5f7fabf;
                max-width:520px;
                 font-family:Arial, Helvetica, sans-serif;

              ">
                ${getOverallSubheadline()}
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:32px 0;">
              <div style="height:1px; background-color:#132139;"></div>
            </td>
          </tr>
      <tr>
              <td style="padding: 32px 0">
                <h2
                  style="
                    margin: 0;
                    font-size: 24px;
                    line-height: 1.25;
                    font-weight: 700;
                    color: #ffffff;
                  "
                >
                  Framework Pillar Results
                </h2>
                <p
                  style="
                    margin: 0;
                    font-size: 16px;
                    line-height: 1.7;
                    color: #f5f7fabf;
                    max-width: 520px;
                  "
                >
                  Your assessment across the Trust → Govern → Evolve framework.
                </p>
                </td>
                </tr>
          <!-- Pillars -->
          ${pillarsHtml}

          <!-- Divider -->
          <tr>
            <td style="padding:32px 0;">
              <div style="height:1px; background-color:#132139;"></div>
            </td>
          </tr>
           <tr>
              <td style="padding: 32px 0">
                <h2
                  style="
                    margin: 0;
                    font-size: 24px;
                    line-height: 1.25;
                    font-weight: 700;
                    color: #ffffff;
                  "
                >
                  4DSV System Analysis

                </h2>
                <p
                  style="
                    margin: 0;
                    font-size: 16px;
                    line-height: 1.7;
                    color: #f5f7fabf;
                    max-width: 520px;
                  "
                >
How your organization performs across the four dimensions of sustainable value.

                </p>
                </td>
                </tr>

          <!-- Systems -->
          ${systemsHtml}

        </table>
      </td>
    </tr>
  </table>
  </div>
</body>
</html>
  `;
};
