// Add these types to your existing types/index.ts file

export type ApplicationType = 'sent' | 'received';
export type ApplicationStatus = 'pending' | 'accepted' | 'declined';

export interface Application {
  id: string;
  title: string;
  description: string;
  status: ApplicationStatus;
  createdAt: string;
  userId: string;
  pitchId: string;
}