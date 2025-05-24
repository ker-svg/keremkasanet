import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { FinancialNews } from './components/FinancialNews';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTransactionAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Finance Tracker</h1>
        
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

export default App;