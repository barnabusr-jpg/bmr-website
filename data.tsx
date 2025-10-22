import {
 
  IconWorld,
  IconChartBar,
  IconCreditCard,
  IconLock,
  IconServer
} from "@tabler/icons-react"

export type DeploymentStatus = "process" | "ready" | "error";

export interface Deployment {
  id: string;
  name: string;
  description: string;
  status: DeploymentStatus;
  date: string;
  environment: string;
  version: string;
  icon: React.ReactNode;
}

export const deployments: Deployment[] = [
  {
    id: "1",
    name: "production-server",
    description: "Main production environment for customer-facing services",
    status: "process",
    date: "26/07/2024, 03:25:23",
    environment: "Production",
    version: "v1.2.3",
    icon: <IconServer size={16} />
  },
  {
    id: "2",
    name: "web-app-staging",
    description: "Testing environment for frontend applications",
    status: "ready",
    date: "06/05/2024, 11:15:12",
    environment: "Staging",
    version: "v1.2.0",
    icon: <IconWorld size={16} />
  },
  {
    id: "3",
    name: "analytics-service",
    description: "Data processing pipeline for user analytics",
    status: "process",
    date: "20/08/2024, 03:54:03",
    environment: "Production",
    version: "v2.0.1",
    icon: <IconChartBar size={16} />
  },
  {
    id: "4",
    name: "payment-api",
    description: "Secure payment processing system",
    status: "ready",
    date: "04/08/2024, 11:46:16",
    environment: "Production",
    version: "v1.1.0",
    icon: <IconCreditCard size={16} />
  },
  {
    id: "6",
    name: "auth-service",
    description: "User authentication and authorization service",
    status: "ready",
    date: "18/05/2024, 01:15:33",
    environment: "Production",
    version: "v1.0.0",
    icon: <IconLock size={16} />
  },
  {
    id: "5",
    name: "backup-service",
    description: "Database backup and recovery service",
    status: "error",
    date: "15/08/2024, 09:22:45",
    environment: "Production",
    version: "v0.9.5",
    icon: <IconServer size={16} />
  },
]
