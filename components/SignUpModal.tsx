import React, { useState } from 'react';
import { CloseIcon, UserIcon, BriefcaseIcon } from './icons';
import { UserRole } from '../types';

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
    const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.Engager);

    if (!isOpen) return null;

    const getRoleButtonStyle = (role: UserRole) => {
        return selectedRole === role
            ? 'bg-primary-100 dark:bg-primary-900/50 border-primary-500 text-primary-700 dark:text-primary-300'
            : 'bg-gray-100 dark:bg-gray-700 border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600';
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md m-4 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold">Create Your Account</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Join EngagePay today!</p>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        <CloseIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <div className="p-6">
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">I am a...</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button type="button" onClick={() => setSelectedRole(UserRole.Engager)} className={`flex flex-col items-center p-4 border-2 rounded-lg transition-colors duration-200 ${getRoleButtonStyle(UserRole.Engager)}`}>
                                    <UserIcon className="w-8 h-8 mb-2" />
                                    <span className="font-semibold">Engager</span>
                                </button>
                                <button type="button" onClick={() => setSelectedRole(UserRole.Creator)} className={`flex flex-col items-center p-4 border-2 rounded-lg transition-colors duration-200 ${getRoleButtonStyle(UserRole.Creator)}`}>
                                    <BriefcaseIcon className="w-8 h-8 mb-2" />
                                    <span className="font-semibold">Creator</span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <input type="text" placeholder="John Doe" className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 focus:ring-primary-500 focus:border-primary-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                            <input type="email" placeholder="you@example.com" className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 focus:ring-primary-500 focus:border-primary-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <input type="password" placeholder="••••••••" className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 focus:ring-primary-500 focus:border-primary-500" />
                        </div>
                    </form>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-b-lg space-y-3">
                    <button className="w-full bg-primary-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200">
                        Create Account
                    </button>
                    <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                        Already have an account? <a href="#" className="font-semibold text-primary-600 hover:underline">Log in</a>.
                    </p>
                </div>
            </div>
             <style>{`
                @keyframes fadeInScale {
                    from { transform: scale(.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in-scale { animation: fadeInScale 0.2s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default SignUpModal;
