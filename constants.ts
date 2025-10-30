// Fix: Added React import to resolve 'Cannot find namespace 'React'' error.
import React from 'react';
import { Campaign, Task, Engager, Badge, SocialPlatform, EngagementType, Submission } from './types';
import { InstagramIcon, TikTokIcon, YouTubeIcon, TwitterIcon, StarIcon, TrophyIcon, TrendingUpIcon } from './components/icons';

export const MOCK_CAMPAIGNS: Campaign[] = [
  { id: '1', name: 'Summer Collection Launch', platform: SocialPlatform.Instagram, engagementType: EngagementType.Like, budget: 500, completedTasks: 1250, totalTasks: 2500, status: 'Active' },
  { id: '2', name: 'New Gaming Channel', platform: SocialPlatform.YouTube, engagementType: EngagementType.Follow, budget: 1000, completedTasks: 850, totalTasks: 1000, status: 'Active' },
  { id: '3', name: 'Viral Dance Challenge', platform: SocialPlatform.TikTok, engagementType: EngagementType.Share, budget: 750, completedTasks: 15000, totalTasks: 15000, status: 'Completed' },
  { id: '4', name: 'Tech Product Review', platform: SocialPlatform.Twitter, engagementType: EngagementType.Comment, budget: 300, completedTasks: 120, totalTasks: 600, status: 'Paused' },
];

export const MOCK_TASKS: Task[] = [
  { id: 't1', platform: SocialPlatform.Instagram, engagementType: EngagementType.Like, payout: 0.05, description: "Like @StyleMaven's latest post about their summer collection.", link: 'https://instagram.com/p/12345' },
  { id: 't2', platform: SocialPlatform.YouTube, engagementType: EngagementType.Follow, payout: 0.15, description: "Subscribe to 'PixelPlayhouse' gaming channel.", link: 'https://youtube.com/c/PixelPlayhouse' },
  { id: 't3', platform: SocialPlatform.TikTok, engagementType: EngagementType.View, payout: 0.02, description: "Watch the full #GrooveMaster challenge video.", link: 'https://tiktok.com/v/67890' },
  { id: 't4', platform: SocialPlatform.Twitter, engagementType: EngagementType.Comment, payout: 0.10, description: "Reply to @TechGuru's latest tweet with a thoughtful question.", link: 'https://twitter.com/TechGuru/status/54321' },
  { id: 't5', platform: SocialPlatform.Instagram, engagementType: EngagementType.Follow, payout: 0.12, description: "Follow @TravelScapes for amazing travel photos.", link: 'https://instagram.com/TravelScapes' },
  { id: 't6', platform: SocialPlatform.YouTube, engagementType: EngagementType.Share, payout: 0.20, description: "Share the latest 'LearnCode' tutorial on your story.", link: 'https://youtube.com/watch?v=abcdef' },
];

export const MOCK_LEADERBOARD: Engager[] = [
  { id: 1, name: 'CryptoKing', avatar: 'https://picsum.photos/seed/1/40/40', earnings: 125.50, rank: 1, accountNumber: '...1234', phoneNumber: '...5678', isVerified: true },
  { id: 2, name: 'TaskMaster', avatar: 'https://picsum.photos/seed/2/40/40', earnings: 119.20, rank: 2, accountNumber: '...5678', phoneNumber: '...1234', isVerified: true },
  { id: 3, name: 'EngagePro', avatar: 'https://picsum.photos/seed/3/40/40', earnings: 115.80, rank: 3, accountNumber: '...9012', phoneNumber: '...3456', isVerified: false },
  { id: 4, name: 'SocialWhiz', avatar: 'https://picsum.photos/seed/4/40/40', earnings: 98.00, rank: 4, accountNumber: '...3456', phoneNumber: '...7890', isVerified: true },
  { id: 5, name: 'PointCollector', avatar: 'https://picsum.photos/seed/5/40/40', earnings: 92.60, rank: 5, accountNumber: '...7890', phoneNumber: '...2345', isVerified: false },
];

export const MOCK_SUBMISSIONS: Submission[] = [
    { id: 's1', taskId: 't1', taskDescription: "Like @StyleMaven's post", user: MOCK_LEADERBOARD[2], screenshotUrl: 'https://picsum.photos/seed/s1/300/200', status: 'Pending', submittedAt: '2023-10-27T10:00:00Z' },
    { id: 's2', taskId: 't4', taskDescription: "Reply to @TechGuru's tweet", user: MOCK_LEADERBOARD[4], screenshotUrl: 'https://picsum.photos/seed/s2/300/200', status: 'Pending', submittedAt: '2023-10-27T10:05:00Z' },
    { id: 's3', taskId: 't2', taskDescription: "Subscribe to 'PixelPlayhouse'", user: MOCK_LEADERBOARD[0], screenshotUrl: 'https://picsum.photos/seed/s3/300/200', status: 'Approved', submittedAt: '2023-10-26T15:30:00Z' },
];


export const MOCK_BADGES: Badge[] = [
    { name: 'Top Earner', icon: TrophyIcon, color: 'text-yellow-400' },
    { name: 'Streak Master', icon: TrendingUpIcon, color: 'text-green-400' },
    { name: 'Super Sharer', icon: StarIcon, color: 'text-blue-400' },
    { name: 'Task Novice', icon: StarIcon, color: 'text-gray-400' },
    { name: 'Comment King', icon: StarIcon, color: 'text-purple-400' },
];

export const PLATFORM_ICONS: Record<SocialPlatform, React.ElementType> = {
    [SocialPlatform.Instagram]: InstagramIcon,
    [SocialPlatform.YouTube]: YouTubeIcon,
    [SocialPlatform.TikTok]: TikTokIcon,
    [SocialPlatform.Twitter]: TwitterIcon,
    [SocialPlatform.Facebook]: () => null, // Add actual icon if needed
    [SocialPlatform.LinkedIn]: () => null, // Add actual icon if needed
};