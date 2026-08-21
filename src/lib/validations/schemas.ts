import { z } from "zod";

export const PersonaTypeSchema = z.enum([
  "EXECUTIVE",
  "MANAGERIAL",
  "TECHNICAL",
]);

// 1. Dispatch Directives Schema
export const DispatchDirectivesSchema = z.object({
  groupId: z.string().min(1, "Group ID is required"),
  orgName: z.string().min(1, "Organization name is required"),
  parentAuditId: z.string().uuid("Invalid parent audit ID").optional(),
  emails: z.object({
    EXECUTIVE: z.string().email("Invalid executive email"),
    MANAGERIAL: z.string().email("Invalid managerial email"),
    TECHNICAL: z.string().email("Invalid technical email"),
  }),
});

// 2. Send Triangulation Schema
export const SendTriangulationSchema = z.object({
  auditId: z.string().uuid("Invalid audit ID"),
  recipients: z
    .array(
      z.object({
        email: z.string().email("Invalid recipient email"),
        persona: PersonaTypeSchema.optional(),
      })
    )
    .min(1, "At least one recipient is required"),
});

// 3. Save Operator Response Schema
export const SaveOperatorResponseSchema = z.object({
  accessCode: z.string().min(1, "Access code is required"),
  rawResponses: z.record(z.unknown()).optional(),
  isFinalSubmission: z.boolean().optional().default(false),
});

// 4. Verify Session Schema
export const VerifySessionSchema = z.object({
  accessCode: z.string().min(1, "Access code is required"),
});

// Inferred TypeScript DTOs
export type DispatchDirectivesBody = z.infer<typeof DispatchDirectivesSchema>;
export type SendTriangulationBody = z.infer<typeof SendTriangulationSchema>;
export type SaveOperatorResponseBody = z.infer<typeof SaveOperatorResponseSchema>;
export type VerifySessionBody = z.infer<typeof VerifySessionSchema>;
