import React from 'react';

const AuthLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col p-8 md:p-12 bg-base-100">
                <img src="/src/assets/images/logo.png" alt="MyBudget Logo" className="w-32 mb-8" />
                
                <div className="flex-grow flex flex-col justify-center">
                    {children}
                </div>
            </div>


            <div className="hidden md:flex w-1/2 lg:w-3/5 h-screen bg-primary/90 p-12 relative items-center justify-center overflow-hidden">
                <div className="w-64 h-64 rounded-full bg-secondary/50 absolute -top-20 -left-20" />
                <div className="w-48 h-48 border-[20px] border-secondary absolute top-1/2 -right-20 transform -translate-y-1/2 rotate-45" />
                <div className="w-56 h-56 rounded-full bg-secondary/30 absolute -bottom-24 -right-10" />

                <div className="z-10 text-center text-white">
                    <h1 className="text-5xl font-bold leading-tight drop-shadow-lg">
                        Manage Your Finances,<br />Shape Your Future.
                    </h1>
                    <p className="mt-4 max-w-lg mx-auto text-primary-content/80">
                        Start tracking every transaction to gain insights and achieve your financial goals with ease.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;