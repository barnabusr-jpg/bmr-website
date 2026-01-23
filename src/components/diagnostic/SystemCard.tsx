import { motion } from "framer-motion";

interface SystemCardProps {
  title: string;
  state: string;
  narrative: string;
  index: number;
}

const getStateColor = (state: string): string => {
  const lowerState = state.toLowerCase();
  if (lowerState === "strong") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  if (lowerState === "variable") return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  return "bg-rose-500/10 text-rose-400 border-rose-500/20";
};

const SystemCard = ({ title, state, narrative, index }: SystemCardProps) => {
  const stateColor = getStateColor(state);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.1, ease: "easeOut" }}
      className="bg-card border border-border rounded-lg p-6 space-y-4"
    >
      <div className="space-y-3">
        <h4 className="text-lg font-semibold">{title}</h4>
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${stateColor}`}>
          {state}
        </span>
      </div>
      <p className="text-foreground/70 text-sm leading-relaxed">{narrative}</p>
    </motion.div>
  );
};

export default SystemCard;
