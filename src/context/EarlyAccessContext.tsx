import { createContext, useContext, useState } from 'react';

interface EarlyAccessContextType {
  isOpen: boolean;
  initialEmail: string;
  openDrawer: (email?: string) => void;
  closeDrawer: () => void;
}

const EarlyAccessContext = createContext<EarlyAccessContextType | null>(null);

export function EarlyAccessProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialEmail, setInitialEmail] = useState('');

  const openDrawer = (email = '') => {
    setInitialEmail(email);
    setIsOpen(true);
  };

  const closeDrawer = () => setIsOpen(false);

  return (
    <EarlyAccessContext.Provider value={{ isOpen, initialEmail, openDrawer, closeDrawer }}>
      {children}
    </EarlyAccessContext.Provider>
  );
}

export function useEarlyAccess() {
  const ctx = useContext(EarlyAccessContext);
  if (!ctx) throw new Error('useEarlyAccess must be used within EarlyAccessProvider');
  return ctx;
}
