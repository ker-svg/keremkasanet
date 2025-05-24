import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { FinancialNews } from './components/FinancialNews';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from './lib/supabase';
import { useEffect } from 'react';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleTransactionAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Finance Tracker
          </h1>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Finance Tracker</h1>
          <button
            onClick={() => supabase.auth.signOut()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <TransactionForm onTransactionAdded={handleTransactionAdded} />
          </div>
          <div>
            <TransactionList refreshTrigger={refreshTrigger} />
          </div>
        </div>
        
        <div className="mt-8">
          <FinancialNews />
        </div>
      </div>
    </div>
  );
}