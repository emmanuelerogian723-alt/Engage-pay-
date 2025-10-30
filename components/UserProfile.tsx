import React from 'react';
import { UserRole, Engager, Campaign, Badge } from '../types';
import { MOCK_LEADERBOARD, MOCK_BADGES, MOCK_CAMPAIGNS, PLATFORM_ICONS } from '../constants';
import { ArrowLeftIcon, CheckCircleIcon, DollarSignIcon, BarChartIcon, TrendingUpIcon, TrophyIcon } from './icons';

// Mock data for the profile page
const currentUserEngager: Engager = MOCK_LEADERBOARD[0];
const currentUserCreator = {
    name: 'StyleMaven',
    avatar: 'https://picsum.photos/seed/creator/100/100',
};

// Reusable components
const StatCard: React.FC<{ icon: React.ElementType, label: string, value: string | number, color: string }> = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    </div>
);

const BadgeCard: React.FC<{ badge: Badge }> = ({ badge }) => (
     <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
        <div className={`p-3 mb-2 rounded-full bg-gray-100 dark:bg-gray-700 ${badge.color}`}>
            <badge.icon className="w-8 h-8" />
        </div>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{badge.name}</p>
    </div>
);

// Reusing CampaignCard from CreatorDashboard
const CampaignCard: React.FC<{ campaign: Campaign }> = ({ campaign }) => {
    const progress = (campaign.completedTasks / campaign.totalTasks) * 100;
    const PlatformIcon = PLATFORM_ICONS[campaign.platform];

    const getStatusChipStyle = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'Paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'Completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        }
    };
    
    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center space-x-2 mb-2">
                        <PlatformIcon className="w-5 h-5 text-gray-500" />
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{campaign.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{campaign.engagementType} on {campaign.platform}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusChipStyle(campaign.status)}`}>{campaign.status}</span>
            </div>
            <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{campaign.completedTasks.toLocaleString()} / {campaign.totalTasks.toLocaleString()} Engagers</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        </div>
    );
};


const EngagerProfile: React.FC = () => (
    <div className="space-y-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <img src={currentUserEngager.avatar} alt={currentUserEngager.name} className="w-24 h-24 rounded-full border-4 border-primary-500" />
            <div>
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{currentUserEngager.name}</h2>
                    {currentUserEngager.isVerified && <CheckCircleIcon className="w-6 h-6 text-blue-500" title="Verified User" />}
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-center sm:text-left">Top Engager</p>
            </div>
        </div>

        <section>
            <h3 className="text-xl font-bold mb-4">Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={DollarSignIcon} label="Total Earnings" value={`$${currentUserEngager.earnings.toFixed(2)}`} color="bg-green-500" />
                <StatCard icon={BarChartIcon} label="Tasks Completed" value={342} color="bg-blue-500" />
                <StatCard icon={TrophyIcon} label="Current Rank" value={`#${currentUserEngager.rank}`} color="bg-yellow-500" />
            </div>
        </section>

        <section>
            <h3 className="text-xl font-bold mb-4">My Badges</h3>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {MOCK_BADGES.map(badge => <BadgeCard key={badge.name} badge={badge} />)}
            </div>
        </section>
    </div>
);

const CreatorProfile: React.FC = () => (
     <div className="space-y-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <img src={currentUserCreator.avatar} alt={currentUserCreator.name} className="w-24 h-24 rounded-full border-4 border-primary-500" />
            <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center sm:text-left">{currentUserCreator.name}</h2>
                <p className="text-gray-500 dark:text-gray-400 text-center sm:text-left">Brand Creator</p>
            </div>
        </div>

        <section>
            <h3 className="text-xl font-bold mb-4">Overall Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={DollarSignIcon} label="Total Spend" value="$1,850" color="bg-green-500" />
                <StatCard icon={TrendingUpIcon} label="Total Engagements" value="17,220" color="bg-blue-500" />
                <StatCard icon={BarChartIcon} label="Active Campaigns" value="2" color="bg-purple-500" />
            </div>
        </section>

        <section>
            <h3 className="text-xl font-bold mb-4">My Campaigns</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {MOCK_CAMPAIGNS.map(campaign => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
            </div>
        </section>
    </div>
);


interface UserProfileProps {
    userRole: UserRole;
    onNavigateBack: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ userRole, onNavigateBack }) => {
    return (
        <div>
            <div className="mb-6">
                 <button onClick={onNavigateBack} className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold">
                    <ArrowLeftIcon className="w-5 h-5" />
                    <span>Back to Dashboard</span>
                </button>
            </div>
             {userRole === UserRole.Creator || userRole === UserRole.Admin ? <CreatorProfile /> : <EngagerProfile />}
        </div>
    );
};

export default UserProfile;
