import React, { useState } from 'react';
import { Campaign, EngagementType, SocialPlatform } from '../types';
import { MOCK_CAMPAIGNS, PLATFORM_ICONS } from '../constants';
import { TrendingUpIcon, DollarSignIcon, UsersIcon, CheckCircleIcon, CloseIcon, CreditCardIcon, BankIcon, LinkIcon } from './icons';

interface AnalyticsCardProps {
    title: string;
    value: string;
    icon: React.ElementType;
    color: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
    </div>
);

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
            <div className="mt-4 flex justify-between items-center text-sm">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Budget: <span className="text-primary-500">${campaign.budget.toLocaleString()}</span></span>
                <button className="text-primary-600 dark:text-primary-400 hover:underline font-semibold">View Analytics</button>
            </div>
        </div>
    );
};

const PaymentModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer'>('card');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md m-4">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-xl font-bold">Fund Your Account</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        <CloseIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <div className="p-6">
                    <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                        <button onClick={() => setPaymentMethod('card')} className={`flex-1 py-2 text-sm font-semibold flex items-center justify-center space-x-2 ${paymentMethod === 'card' ? 'border-b-2 border-primary-500 text-primary-500' : 'text-gray-500'}`}>
                            <CreditCardIcon className="w-5 h-5" />
                            <span>Credit Card</span>
                        </button>
                        <button onClick={() => setPaymentMethod('transfer')} className={`flex-1 py-2 text-sm font-semibold flex items-center justify-center space-x-2 ${paymentMethod === 'transfer' ? 'border-b-2 border-primary-500 text-primary-500' : 'text-gray-500'}`}>
                            <BankIcon className="w-5 h-5" />
                            <span>Bank Transfer</span>
                        </button>
                    </div>

                    {paymentMethod === 'card' && (
                        <form className="space-y-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                                <input type="number" placeholder="$100.00" className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 focus:ring-primary-500 focus:border-primary-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Card Number</label>
                                <input type="text" placeholder="**** **** **** 1234" className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 focus:ring-primary-500 focus:border-primary-500" />
                            </div>
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Expiry Date</label>
                                    <input type="text" placeholder="MM/YY" className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">CVC</label>
                                    <input type="text" placeholder="123" className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                            </div>
                        </form>
                    )}
                    {paymentMethod === 'transfer' && (
                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
                            <p>Please transfer the desired amount to the bank account below. Use your User ID as the reference.</p>
                            <p><strong>Bank:</strong> EngagePay Bank</p>
                            <p><strong>Account Number:</strong> 123-456-7890</p>
                            <p><strong>Routing Number:</strong> 0987654321</p>
                            <p><strong>Your User ID:</strong> C102-B304</p>
                        </div>
                    )}
                </div>
                <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
                    <button className="w-full bg-primary-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200">
                        {paymentMethod === 'card' ? 'Add Funds' : 'I Have Transferred'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const CreateTaskModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg m-4">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-xl font-bold">Create a New Task</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        <CloseIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <div className="p-6">
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Social Media Link</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LinkIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input type="url" placeholder="https://www.instagram.com/p/..." className="pl-10 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 focus:ring-primary-500 focus:border-primary-500" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Engagement Type</label>
                            <select className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 focus:ring-primary-500 focus:border-primary-500">
                                {Object.values(EngagementType).map(type => <option key={type}>{type}</option>)}
                            </select>
                        </div>
                        <div className="flex space-x-4">
                           <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Payout per Task</label>
                                <input type="number" step="0.01" placeholder="$0.10" className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 focus:ring-primary-500 focus:border-primary-500" />
                            </div>
                             <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Total Tasks</label>
                                <input type="number" placeholder="1000" className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 focus:ring-primary-500 focus:border-primary-500" />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
                    <button className="w-full bg-primary-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200">
                        Launch Task
                    </button>
                </div>
            </div>
        </div>
    );
};

const CreatorDashboard: React.FC = () => {
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    const [isCreateTaskModalOpen, setCreateTaskModalOpen] = useState(false);

    return (
        <div className="space-y-8">
             <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setPaymentModalOpen(false)} />
             <CreateTaskModal isOpen={isCreateTaskModalOpen} onClose={() => setCreateTaskModalOpen(false)} />
            <section>
                <h2 className="text-2xl font-bold mb-4">Campaign Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AnalyticsCard title="Total Spend" value="$1,850" icon={DollarSignIcon} color="bg-green-500" />
                    <AnalyticsCard title="Total Engagements" value="17,220" icon={TrendingUpIcon} color="bg-blue-500" />
                    <AnalyticsCard title="Active Campaigns" value="2" icon={UsersIcon} color="bg-purple-500" />
                    <AnalyticsCard title="Avg. ROI" value="+250%" icon={CheckCircleIcon} color="bg-yellow-500" />
                </div>
            </section>
            
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">My Campaigns</h2>
                    <div className="flex space-x-2">
                         <button onClick={() => setPaymentModalOpen(true)} className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
                            Fund Account
                        </button>
                        <button onClick={() => setCreateTaskModalOpen(true)} className="bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
                            + Create Task
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {MOCK_CAMPAIGNS.map(campaign => (
                        <CampaignCard key={campaign.id} campaign={campaign} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default CreatorDashboard;