import { DeploymentStage } from './types';

// Generate code snippets for animation
export const generateCodeSnippet = (stageId: string): string => {
  switch(stageId) {
    case 'preparing':
      return `git checkout main && npm install`;
    case 'building': 
      return `npm run build -- --production`;
    case 'testing':
      return `npm run test && npm run e2e`;
    case 'deploying':
      return `aws cloudfront deploy --environment=prod`;
    case 'success':
      return `✨ Deployment successful! Site is live.`;
    default:
      return `initializing...`;
  }
};

// Determine if a stage is completed
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isStageComplete = (currentStage: DeploymentStage, stageId: string, pipelineStages: any[]): boolean => {
  const stageIndex = pipelineStages.findIndex(s => s.id === stageId);
  const currentIndex = pipelineStages.findIndex(s => s.id === currentStage);
  return currentIndex > stageIndex || currentStage === "success";
};

// Determine if a stage is active
export const isStageActive = (currentStage: DeploymentStage, stageId: string): boolean => 
  currentStage === stageId;
