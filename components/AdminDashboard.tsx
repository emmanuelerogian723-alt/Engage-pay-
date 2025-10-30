import React, { useState } from 'react';
import { MOCK_CAMPAIGNS, MOCK_LEADERBOARD, MOCK_SUBMISSIONS } from '../constants';
import { Campaign, Engager, Submission } from '../types';
import { CheckIcon, XIcon, BarChartIcon, CheckCircleIcon } from './icons';


type AdminTab = 'Analytics' | 'Campaigns' | 'Users' | 'Task Approvals' | 'Payment Approvals';

const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AdminTab>('Task Approvals');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Analytics':
                return <Analytics />;
            case 'Campaigns':
                return <CampaignsTable />;
            case 'Users':
                return <UsersTable />;
            case 'Task Approvals':
                return <TaskApprovals />;
            case 'Payment Approvals':
                return <PaymentApprovals />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                    {(['Analytics', 'Task Approvals', 'Payment Approvals', 'Users', 'Campaigns'] as AdminTab[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`${
                                activeTab === tab
                                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="mt-6">
                {renderTabContent()}
            </div>
        </div>
    );
};

const Analytics: React.FC = () => {
    const data = [
        { day: 'Mon', tasks: 120 },
        { day: 'Tue', tasks: 180 },
        { day: 'Wed', tasks: 150 },
        { day: 'Thu', tasks: 210 },
        { day: 'Fri', tasks: 300 },
        { day: 'Sat', tasks: 250 },
        { day: 'Sun', tasks: 280 },
    ];
    const maxTasks = Math.max(...data.map(d => d.tasks));
    
    return (
        <div>
            <h3 className="text-lg font-bold mb-4 flex items-center space-x-2"><BarChartIcon className="w-5 h-5"/><span>Tasks Completed This Week</span></h3>
            <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg flex justify-around items-end" style={{ height: '300px' }}>
                {data.map(item => (
                    <div key={item.day} className="flex flex-col items-center">
                        <div 
                            className="w-10 bg-primary-500 rounded-t-md hover:bg-primary-600 transition-all"
                            style={{ height: `${(item.tasks / maxTasks) * 100}%` }}
                            title={`${item.tasks} tasks`}
                        ></div>
                        <span className="text-sm mt-2 font-medium text-gray-600 dark:text-gray-400">{item.day}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const TaskApprovals: React.FC = () => (
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Task</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Screenshot</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {MOCK_SUBMISSIONS.map((sub: Submission) => (
                    <tr key={sub.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white flex items-center">
                             <img src={sub.user.avatar} alt={sub.user.name} className="w-8 h-8 rounded-full mr-3" />
                            {sub.user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{sub.taskDescription}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <a href={sub.screenshotUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">View Proof</a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{sub.status}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                           {sub.status === 'Pending' && (
                             <>
                             <button className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200"><CheckIcon className="w-5 h-5"/></button>
                             <button className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200"><XIcon className="w-5 h-5"/></button>
                             </>
                           )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


const CampaignsTable: React.FC = () => (
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Campaign</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Budget</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {MOCK_CAMPAIGNS.map((campaign: Campaign) => (
                    <tr key={campaign.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{campaign.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${campaign.budget.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{campaign.status}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-200 mr-4">Edit</a>
                            <a href="#" className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200">Delete</a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const UsersTable: React.FC = () => (
    <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total Earned</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Verification</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contact</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {MOCK_LEADERBOARD.map((user: Engager) => (
                    <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            <div className="flex items-center">
                                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full mr-3" />
                                <span>{user.name}</span>
                                {/* Fix: Replaced title prop with a nested <title> element for SVG accessibility and to resolve TS error. */}
                                {user.isVerified && <CheckCircleIcon className="w-4 h-4 text-blue-500 ml-2"><title>Verified User</title></CheckCircleIcon>}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${user.earnings.toFixed(2)}</td>
                         <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {user.isVerified ? 
                                <span className="flex items-center space-x-1 text-green-600 dark:text-green-400"><CheckCircleIcon className="w-4 h-4" /> <span>Verified</span></span> : 
                                <span className="text-yellow-600 dark:text-yellow-400">Pending</span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.phoneNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {!user.isVerified && <a href="#" className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200 mr-4">Verify</a>}
                            <a href="#" className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-200">Suspend</a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const PaymentApprovals: React.FC = () => (
     <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Account No.</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {MOCK_LEADERBOARD.filter(u => u.isVerified).map((user: Engager) => (
                    <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white flex items-center">
                            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full mr-3" />
                            {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">${user.earnings.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.accountNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <button className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200"><CheckIcon className="w-5 h-5"/></button>
                            <button className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200"><XIcon className="w-5 h-5"/></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


export default AdminDashboard;