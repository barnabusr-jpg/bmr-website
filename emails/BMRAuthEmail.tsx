import { Body, Container, Head, Heading, Html, Section, Text, Hr, Link, Preview } from "@react-email/components";
import * as React from "react";

interface BMRAuthEmailProps {
  operatorName?: string;
  archetype: string;
  reworkTax: string;
  protocolName: string;
  calendlyLink: string;
}

export const BMRAuthEmail = ({
  operatorName = "Operator",
  archetype = "The Ghost",
  reworkTax = "22.5",
  protocolName = "Rapid De-Risk",
  calendlyLink = "#",
}: BMRAuthEmailProps) => (
  <Html>
    <Head />
    <Preview>Authorization Granted // {protocolName}</Preview>
    <Body style={{ backgroundColor: "#020617", fontFamily: "Helvetica,Arial,sans-serif", padding: "40px 0" }}>
      <Container style={{ backgroundColor: "#020617", border: "1px solid #1e293b", margin: "0 auto", padding: "40px", maxWidth: "600px" }}>
        <Section style={{ marginBottom: "32px", borderLeft: "4px solid #dc2626", paddingLeft: "20px" }}>
          <Text style={{ color: "#475569", fontSize: "10px", letterSpacing: "2px", fontWeight: "bold", textTransform: "uppercase" }}>BMR System Log // Secure Dispatch</Text>
          <Heading style={{ color: "#ffffff", fontSize: "36px", fontWeight: "900", fontStyle: "italic", margin: "10px 0" }}>Authorization Granted.</Heading>
        </Section>
        <Section>
          <Text style={{ color: "#94a3b8", fontSize: "15px", lineHeight: "1.6" }}>
            Greetings, {operatorName}. Your identity has been validated against the BMR Forensic Registry. Access to **{protocolName}** is now active.
          </Text>
          <Hr style={{ borderColor: "#1e293b", margin: "30px 0" }} />
          <Section style={{ backgroundColor: "#0f172a", padding: "24px", border: "1px solid #1e293b" }}>
            <Text style={{ color: "#475569", fontSize: "11px", fontWeight: "bold", margin: "0", textTransform: "uppercase" }}>Archetype Snapshot //</Text>
            <Text style={{ color: "#ffffff", fontSize: "20px", fontWeight: "900", margin: "4px 0 16px 0" }}>{archetype}</Text>
            <Text style={{ color: "#475569", fontSize: "11px", fontWeight: "bold", margin: "0", textTransform: "uppercase" }}>Recorded Rework Tax //</Text>
            <Text style={{ color: "#dc2626", fontSize: "20px", fontWeight: "900", margin: "4px 0 0 0" }}>{reworkTax}% ! Drift Detected</Text>
          </Section>
          <Hr style={{ borderColor: "#1e293b", margin: "30px 0" }} />
          <Section style={{ textAlign: "center", margin: "40px 0" }}>
            <Link href={calendlyLink} style={{ backgroundColor: "#dc2626", color: "#ffffff", padding: "18px 36px", fontSize: "13px", fontWeight: "bold", textDecoration: "none", fontStyle: "italic" }}>
              Initialize Stabilization Session
            </Link>
          </Section>
          <Text style={{ color: "#475569", fontSize: "11px", lineHeight: "1.5" }}>
            **Confidentiality Notice //** This transmission and any attachments are intended for the exclusive use of the validated recipient. The diagnostic data within this manifest is proprietary to the BMR Advisory framework.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);
