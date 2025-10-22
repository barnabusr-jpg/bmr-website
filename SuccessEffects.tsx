import { motion, AnimatePresence } from "framer-motion";

interface SuccessEffectsProps {
  showSuccessEffects: boolean;
}

export default function SuccessEffects({ showSuccessEffects }: SuccessEffectsProps) {
  return (
    <AnimatePresence>
      {showSuccessEffects && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Success pulse */}
          <motion.div
            className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/10 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 1.5 }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
