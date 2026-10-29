import { describe, it, expect } from "vitest";
import {
  roundToInt,
  roundToTwoDecimals,
  formatBMRCurrency,
  formatBMRMultiplier,
  formatBMRExpectation,
} from "../formatters";

describe("Formatting and Boundary Invariants", () => {
  describe("roundToTwoDecimals", () => {
    it("handles boundary floats without IEEE-754 precision drift", () => {
      expect(roundToTwoDecimals(1.0)).toBe(1.0);
      expect(roundToTwoDecimals(1.005)).toBe(1.01);
      expect(roundToTwoDecimals(1.0049)).toBe(1.0);
      expect(roundToTwoDecimals(0.0)).toBe(0.0);
      expect(roundToTwoDecimals(99.999)).toBe(100.0);
    });

    it("safely handles non-finite inputs without producing NaN", () => {
      expect(roundToTwoDecimals(Number.NaN)).toBe(0.0);
      expect(roundToTwoDecimals(Number.POSITIVE_INFINITY)).toBe(0.0);
      expect(roundToTwoDecimals(Number.NEGATIVE_INFINITY)).toBe(0.0);
    });
  });

  describe("formatBMRMultiplier", () => {
    it("formats strictly to two decimal places with 'x' suffix", () => {
      expect(formatBMRMultiplier(1)).toBe("1.00x");
      expect(formatBMRMultiplier(1.0)).toBe("1.00x");
      expect(formatBMRMultiplier(1.25)).toBe("1.25x");
      expect(formatBMRMultiplier(1.3)).toBe("1.30x");
      expect(formatBMRMultiplier(0)).toBe("0.00x");
    });

    it("falls back to baseline 1.00x on non-finite multiplier", () => {
      expect(formatBMRMultiplier(Number.NaN)).toBe("1.00x");
      expect(formatBMRMultiplier(Number.POSITIVE_INFINITY)).toBe("1.00x");
      expect(formatBMRMultiplier(Number.NEGATIVE_INFINITY)).toBe("1.00x");
    });

    it("maintains parity between web display and worker-serialized payload inputs", () => {
      const edgeCases = [1.0, 1.005, 1.254, 1.455, 99.999];

      for (const raw of edgeCases) {
        const payloadValue = roundToTwoDecimals(raw);
        const webDisplay = formatBMRMultiplier(raw);
        const pdfDisplay = formatBMRMultiplier(payloadValue);

        expect(pdfDisplay).toBe(webDisplay);
      }
    });

    it("maintains stable formatting parity when non-finite values are passed through roundToTwoDecimals", () => {
      const nonFiniteCases = [
        Number.NaN,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
      ];

      for (const nonFinite of nonFiniteCases) {
        const payloadValue = roundToTwoDecimals(nonFinite);
        expect(payloadValue).toBe(0.0);

        const formattedFromPayload = formatBMRMultiplier(payloadValue);
        expect(formattedFromPayload).toBe("0.00x");

        const formattedDirect = formatBMRMultiplier(nonFinite);
        expect(formattedDirect).toBe("1.00x");
      }
    });
  });

  describe("roundToInt & formatBMRCurrency", () => {
    it("enforces integer-only currency representation without decimals", () => {
      expect(formatBMRCurrency(0)).toBe("$0");
      expect(formatBMRCurrency(1240.49)).toBe("$1,240");
      expect(formatBMRCurrency(1240.5)).toBe("$1,241");
      expect(formatBMRCurrency(1000000)).toBe("$1,000,000");
    });

    it("guards all non-finite currency inputs", () => {
      expect(formatBMRCurrency(Number.NaN)).toBe("$0");
      expect(formatBMRCurrency(Number.POSITIVE_INFINITY)).toBe("$0");
      expect(formatBMRCurrency(Number.NEGATIVE_INFINITY)).toBe("$0");
    });
  });

  describe("formatBMRExpactation", () => {
    it("handles hours formatting with rounding or adoption fallback", () => {
      expect(formatBMRExpactation(0)).toBe("High Active Adoption");
      expect(formatBMRExpactation(-10)).toBe("High Active Adoption");
      expect(formatBMRExpactation(14.2)).toBe("+14 hrs");
      expect(formatBMRExpactation(14.6)).toBe("+15 hrs");
    });

    it("guards all non-finite hours with adoption fallback", () => {
      expect(formatBMRExpactation(Number.NaN)).toBe("High Active Adoption");
      expect(formatBMRExpactation(Number.POSITIVE_INFINITY)).toBe("High Active Adoption");
      expect(formatBMRExpactation(Number.NEGATIVE_INFINITY)).toBe("High Active Adoption");
    });
  });
});
