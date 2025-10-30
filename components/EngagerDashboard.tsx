import React, { useState } from 'react';
import { MOCK_TASKS, MOCK_LEADERBOARD, MOCK_BADGES, PLATFORM_ICONS } from '../constants';
import { Task, Engager, Badge, Announcement, User, WithdrawalRequest, Submission } from '../types';
import { LikeIcon, CommentIcon, FollowIcon, ViewIcon, ShareIcon, WalletIcon, LinkIcon, UploadIcon, CloseIcon, CreditCardIcon, MegaphoneIcon } from './icons';

const ENGAGEMENT_ICONS: { [key:string]: React.ElementType } = {
  Like: LikeIcon,
  Comment: CommentIcon,
  Follow: FollowIcon,
  View: ViewIcon,
  Share: ShareIcon,
};

const Wallet: React.FC<{ onWithdraw: () => void, balance: number }> = ({ onWithdraw, balance }) => (
    <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">My Wallet</h3>
            <WalletIcon className="w-8 h-8 opacity-70" />
        </div>
        <p className="text-4xl font-bold tracking-tight">${balance.toFixed(2)}</p>
        <p className="text-sm opacity-80 mt-1">Available for withdrawal</p>
        <button onClick={onWithdraw} className="mt-6 w-full bg-white text-primary-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200">
            Withdraw Funds
        </button>
    </div>
);

const Leaderboard: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4">Top Engagers</h3>
        <ul className="space-y-4">
            {MOCK_LEADERBOARD.map(user => (
                <li key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <span className="font-bold text-gray-500 dark:text-gray-400">{user.rank}</span>
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{user.name}</span>
                    </div>
                    <span className="font-bold text-primary-500">${user.earnings.toFixed(2)}</span>
                </li>
            ))}
        </ul>
    </div>
);

const BadgeDisplay: React.FC<{ badge: Badge }> = ({ badge }) => (
    <div className="flex flex-col items-center space-y-1 flex-shrink-0 w-24">
        <div className={`p-3 rounded-full bg-gray-200 dark:bg-gray-700 ${badge.color}`}>
            <badge.icon className="w-6 h-6" />
        </div>
        <p className="text-xs text-center text-gray-600 dark:text-gray-400">{badge.name}</p>
    </div>
);

const SubscriptionModal: React.FC<{ onSubscribe: () => void }> = ({ onSubscribe }) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm m-4 p-8 text-center">
            <CreditCardIcon className="w-16 h-16 text-primary-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Unlock Full Access</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">A one-time fee of $5.00 is required to access the Task Marketplace and start earning.</p>
            <button onClick={onSubscribe} className="w-full bg-primary-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200">
                Pay $5.00 Now
            </button>
        </div>
    </div>
);


const WithdrawalModal: React.FC<{ isOpen: boolean, onClose: () => void, balance: number, onSubmit: (details: Omit<WithdrawalRequest, 'id' | 'userId' | 'status' | 'requestedAt'>) => void }> = ({ isOpen, onClose, balance, onSubmit }) => {
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const details = {
            amount: Number(formData.get('amount')),
            bankCountry: formData.get('bankCountry') as string,
            bankName: formData.get('bankName') as string,
            accountNumber: formData.get('accountNumber') as string,
        };
        onSubmit(details);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md m-4">
                 <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-xl font-bold">Request Withdrawal</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        <CloseIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                 <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
                            <input name="amount" type="number" step="0.01" max={balance} defaultValue={balance.toFixed(2)} required className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 focus:ring-primary-500 focus:border-primary-500" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bank Country</label>
                            <select name="bankCountry" required className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 focus:ring-primary-500 focus:border-primary-500">
                                <option>United States</option>
                                <option>Canada</option>
                                <option>United Kingdom</option>
                                <option>Nigeria</option>
                                <option>Australia</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bank Name</label>
                            <input name="bankName" type="text" placeholder="e.g., Chase Bank" required className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 focus:ring-primary-500 focus:border-primary-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Account Number</label>
                            <input name="accountNumber" type="text" placeholder="Enter your bank account number" required className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 focus:ring-primary-500 focus:border-primary-500" />
                        </div>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
                        <button type="submit" className="w-full bg-primary-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200">
                            Submit Request
                        </button>
                    </div>
                 </form>
            </div>
        </div>
    );
};


const CompleteTaskModal: React.FC<{ task: Task, isOpen: boolean, onClose: () => void, onSubmit: () => void }> = ({ task, isOpen, onClose, onSubmit }) => {
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = () => {
        onSubmit();
    };

    if(!isOpen) return null;

    return (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md m-4">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-xl font-bold">Complete Task</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        <CloseIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">{task.description}</p>
                    <a href={task.link} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:underline">
                        <LinkIcon className="w-5 h-5"/>
                        <span>Go to Post</span>
                    </a>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload Proof (Screenshot)</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none">
                                        <span>{file ? file.name : 'Upload a file'}</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
                    <button onClick={handleSubmit} className="w-full bg-primary-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200 disabled:bg-primary-400" disabled={!file}>
                        Submit for Review
                    </button>
                </div>
            </div>
        </div>
    )
}

const TaskCard: React.FC<{ task: Task, onSubmit: () => void }> = ({ task, onSubmit }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const PlatformIcon = PLATFORM_ICONS[task.platform];
  const EngagementIcon = ENGAGEMENT_ICONS[task.engagementType];

  const handleSubmit = () => {
    onSubmit();
    setModalOpen(false);
  };

  return (
    <>
    <CompleteTaskModal task={task} isOpen={isModalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} />
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-3">
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <PlatformIcon className="w-5 h-5" />
                <span className="text-sm font-medium">{task.platform}</span>
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-300 rounded-full">
                <EngagementIcon className="w-4 h-4" />
                <span className="text-xs font-bold">{task.engagementType}</span>
            </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300">{task.description}</p>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <span className="text-xl font-bold text-primary-500">${task.payout.toFixed(2)}</span>
        <button onClick={() => setModalOpen(true)} className="bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
            Complete Task
        </button>
      </div>
    </div>
    </>
  );
};

interface EngagerDashboardProps {
    announcements: Announcement[];
    currentUser: Engager | null;
    onSubscribe: () => void;
    setSubmissions: React.Dispatch<React.SetStateAction<Submission[]>>;
    setWithdrawalRequests: React.Dispatch<React.SetStateAction<WithdrawalRequest[]>>;
    onUpdateUser: (user: Engager) => void;
}

const EngagerDashboard: React.FC<EngagerDashboardProps> = ({ announcements, currentUser, onSubscribe, setSubmissions, setWithdrawalRequests, onUpdateUser }) => {
  const [isWithdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
  const [accountNumber, setAccountNumber] = useState(currentUser?.accountNumber || '');
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phoneNumber || '');

  if (currentUser && !currentUser.isSubscribed) {
      return <SubscriptionModal onSubscribe={onSubscribe} />;
  }
  
  const userEarnings = currentUser ? currentUser.earnings : 0;

  const handleWithdrawalSubmit = (details: Omit<WithdrawalRequest, 'id' | 'userId' | 'status' | 'requestedAt'>) => {
      if(!currentUser) return;
      const newRequest: WithdrawalRequest = {
          ...details,
          id: `wr-${Date.now()}`,
          userId: currentUser.id,
          status: 'Pending',
          requestedAt: new Date().toISOString()
      };
      setWithdrawalRequests(prev => [newRequest, ...prev]);
      alert('Withdrawal request submitted successfully!');
      setWithdrawalModalOpen(false);
  };
  
  const handleTaskSubmit = (task: Task) => {
      if(!currentUser) return;
      const newSubmission: Submission = {
          id: `sub-${Date.now()}`,
          taskId: task.id,
          taskDescription: task.description,
          userId: currentUser.id,
          screenshotUrl: 'https://picsum.photos/seed/newsub/300/200', // Placeholder
          status: 'Pending',
          submittedAt: new Date().toISOString()
      };
      setSubmissions(prev => [newSubmission, ...prev]);
      alert('Task submitted for review!');
  };

  const handleSaveDetails = () => {
      if (!currentUser) return;
      onUpdateUser({ ...currentUser, accountNumber, phoneNumber });
      alert('Details saved successfully!');
  };

  return (
    <div className="space-y-8">
      <WithdrawalModal isOpen={isWithdrawalModalOpen} onClose={() => setWithdrawalModalOpen(false)} balance={userEarnings} onSubmit={handleWithdrawalSubmit} />
      
      {announcements.length > 0 && (
           <section className="bg-primary-50 dark:bg-primary-900/50 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-2 flex items-center space-x-2 text-primary-800 dark:text-primary-200"><MegaphoneIcon className="w-6 h-6"/><span>Admin Announcements</span></h2>
              <div className="space-y-3">
              {announcements.map(ann => (
                  <div key={ann.id} className="p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">{ann.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{ann.content}</p>
                  </div>
              ))}
              </div>
          </section>
      )}

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Wallet onWithdraw={() => setWithdrawalModalOpen(true)} balance={userEarnings} />
        </div>
        <div className="lg:col-span-2">
          <Leaderboard />
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section>
            <h3 className="text-lg font-bold mb-4">My Badges</h3>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="flex space-x-4 overflow-x-auto pb-2">
                    {MOCK_BADGES.map((badge, index) => <BadgeDisplay key={index} badge={badge} />)}
                </div>
            </div>
        </section>
        <section>
            <h3 className="text-lg font-bold mb-4">Verification Details</h3>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Account Number</label>
                    <input type="text" placeholder="Enter your bank account number" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 focus:ring-primary-500 focus:border-primary-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                    <input type="tel" placeholder="Enter your phone number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 focus:ring-primary-500 focus:border-primary-500" />
                </div>
                 <button onClick={handleSaveDetails} className="w-full bg-primary-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
                    Save Details
                </button>
            </div>
        </section>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">Task Marketplace</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TASKS.map(task => (
            <TaskCard key={task.id} task={task} onSubmit={() => handleTaskSubmit(task)} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default EngagerDashboard;
