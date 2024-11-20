import React from 'react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { Menu } from '@/app/categories/menu';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full flex flex-col items-center min-h-screen">
      <Header className="mb-4 lg:mb-4" />
      <main className="w-full flex flex-col md:flex-row justify-center gap-6 flex-grow container-wide px-4">
        <Menu className="w-full md:max-w-[300px] md:sticky top-6 md:overflow-auto md:max-h-[calc(100vh-4rem)]" />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
