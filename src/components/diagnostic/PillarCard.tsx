import { motion } from "framer-motion";

interface PillarCardProps {
  title: string;
  score: string;
  narrative: string;
  colorClass: string;
  index: number;
}

const getLevelFromScore = (score: string): string => {
  const numScore = parseFloat(score);
  if (numScore >= 4) return "High";
  if (numScore >= 2.5) return "Moderate";
  return "Low";
};

const getLevelColor = (score: string): string => {
  const numScore = parseFloat(score);
  if (numScore >= 4) return "text-emerald-400";
  if (numScore >= 2.5) return "text-amber-400";
  return "text-rose-400";
};

const PillarCard = ({ title, score, narrative, colorClass, index }: PillarCardProps) => {
  const level = getLevelFromScore(score);
  const levelColor = getLevelColor(score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      className="bg-card border border-border rounded-lg p-8 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`h-12 w-12 rounded-full ${colorClass} flex items-center justify-center`}>
            <div className={`h-6 w-6 rounded-full ${colorClass.replace('/20', '')}`} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <span className={`text-sm font-medium ${levelColor}`}>{level}</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-accent">{score}</span>
          <span className="text-muted-foreground text-sm block">out of 5</span>
        </div>
      </div>
      <p className="text-foreground/75 leading-[1.7]">{narrative}</p>
    </motion.div>
  );
};

export default PillarCard;
