import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { answers } = req.body;

    // Logic for calculating the scores based on the 12-question array
    const calculateScore = (indices: number[]) => {
      const sum = indices.reduce((acc, curr) => acc + (answers[curr] || 0), 0);
      return Math.round((sum / (indices.length * 5)) * 100);
    };

    const hai = calculateScore([0, 3, 6, 9]);
    const avs = calculateScore([1, 4, 7, 10]);
    const igf = calculateScore([2, 5, 8, 11]);

    const overallDrift = Math.round((hai + avs + igf) / 3);

    return res.status(200).json({
      hai,
      avs,
      igf,
      overallDrift,
    });
  } catch {
    // Removed unused 'error' variable to pass build
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
