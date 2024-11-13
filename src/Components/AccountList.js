import React, { useEffect, useState } from 'react';
import { fetchUserAccounts } from '../utils/api';

const AccountList = ({ userId }) => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const data = await fetchUserAccounts(userId);
        setAccounts(data);
      } catch (error) {
        console.error("Could not load accounts:", error);
      }
    };
    loadAccounts();
  }, [userId]);

  return (
    <div>
      <h2>Your Accounts</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account.accountId}>
            Account ID: {account.accountId}, Balance: {account.balance}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountList;