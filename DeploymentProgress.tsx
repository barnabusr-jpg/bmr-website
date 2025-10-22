import { motion } from "framer-motion";
import { DeploymentStage, pipelineStages } from "../types";
import { isStageActive, isStageComplete } from "../utils";

interface DeploymentProgressProps {
    stage: DeploymentStage;
}

export default function DeploymentProgress({ stage }: DeploymentProgressProps) {
    return (
        <div className="relative flex items-center justify-between mb-1 p-2 rounded-lg border border-neutral-300 dark:border-neutral-700">
            {/* Connecting background line */}
            <div
                className="absolute right-0 h-[2px] bg-neutral-200 dark:bg-neutral-800 z-0"
                style={{ top: '14px' }}
            ></div>

            {pipelineStages.map((pStage, index) => (
                <div key={pStage.id} className="relative flex flex-col items-center z-50">
                    {/* Stage node */}
                    <motion.div
                        className={`w-8 h-8 rounded-full flex items-center justify-center z-20`}
                        initial={{
                            backgroundColor: "var(--progress-inactive-bg)",
                        }}
                        animate={{
                            backgroundColor: isStageComplete(stage, pStage.id, pipelineStages) 
                                ? "var(--progress-active-bg)"
                                : isStageActive(stage, pStage.id) 
                                    ? "var(--progress-active-bg)"
                                    : "var(--progress-inactive-bg)",
                            transition: { duration: 0.5, ease: "easeIn", delay: 0.5 },
                        }}
                    >
                        {isStageComplete(stage, pStage.id, pipelineStages) ? (
                            <svg className="w-4 h-4 text-neutral-100 dark:text-neutral-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <span
                                className={`text-xs ${isStageActive(stage, pStage.id) ? "text-white dark:text-black" : "text-neutral-600 dark:text-neutral-600"}`}
                            >{index + 1}</span>
                        )}
                    </motion.div>
                    <div className="mt-2 text-[9px] font-medium text-neutral-600 dark:text-neutral-400">{pStage.name}</div>

                    {/* Fixed connecting line between circles */}
                    {index < pipelineStages.length - 1 && (
                        <div className="absolute top-[14px] h-[2px] bg-neutral-300 dark:bg-neutral-700 origin-left z-0"
                            style={{
                                left: '32px',
                                width: '40px',
                            }} />
                    )}

                    {/* Progress line that only appears between circles */}
                    {index < pipelineStages.length - 1 && (
                        <div className="absolute top-[14px] h-[2px] z-1" style={{
                            left: '32px',
                            width: '40px',
                        }}>
                            <motion.div
                                className="h-full bg-gray-500 dark:bg-gray-100 origin-left"
                                initial={{ scaleX: 0 }}
                                animate={{
                                    scaleX: isStageComplete(stage, pStage.id, pipelineStages) ? 1 : 0
                                }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
