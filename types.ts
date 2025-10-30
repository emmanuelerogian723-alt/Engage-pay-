// Fix: Added React import to resolve 'Cannot find namespace 'React'' error.
import React from 'react';

export enum UserRole {
  Creator = 'Creator',
  Engager = 'Engager',
  Admin = 'Admin',
}

export enum SocialPlatform {
  Instagram = 'Instagram',
  YouTube = 'YouTube',
  TikTok = 'TikTok',
  Facebook = 'Facebook',
  Twitter = 'Twitter',
  LinkedIn = 'LinkedIn',
}

export enum EngagementType {
  Like = 'Like',
  Follow = 'Follow',
  Comment = 'Comment',
  View = 'View',
  Share = 'Share',
}

export interface Campaign {
  id: string;
  name: string;
  platform: SocialPlatform;
  engagementType: EngagementType;
  budget: number;
  completedTasks: number;
  totalTasks: number;
  status: 'Active' | 'Paused' | 'Completed';
}

export interface Task {
  id: string;
  platform: SocialPlatform;
  engagementType: EngagementType;
  payout: number;
  description: string;
  link: string; // New: Link to the social media post
}

// New: Interface for task submissions
export interface Submission {
    id: string;
    taskId: string;
    taskDescription: string;
    user: Engager;
    screenshotUrl: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    submittedAt: string;
}

export interface Engager {
  id: number;
  name: string;
  avatar: string;
  earnings: number;
  rank: number;
  accountNumber?: string; // New: For payments
  phoneNumber?: string; // New: For verification
  isVerified: boolean; // New: Verification status
}

export interface Badge {
  name:string;
  icon: React.ElementType;
  color: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  grounding?: { uri: string; title: string }[];
}