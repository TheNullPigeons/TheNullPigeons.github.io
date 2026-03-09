import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { DocsLayout } from '../components/DocsLayout';
import { HomePage } from './HomePage';
import { CommunityPage } from './CommunityPage';
import { PricingPage } from './PricingPage';
import { TryItPage } from './TryItPage';
import { OsSelectorPage } from './OsSelectorPage';
import { InstallationPage } from './docs/InstallationPage';
import { InstallMacosPage } from './docs/InstallMacosPage';
import { InstallWindowsPage } from './docs/InstallWindowsPage';
import { UsagePage } from './docs/UsagePage';
import { CompletionPage } from './docs/CompletionPage';
import { HistoryPage } from './docs/HistoryPage';
import { FaqPage } from './docs/FaqPage';

export const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/try" element={<TryItPage />} />

        {/* Legacy redirects */}
        <Route path="/install" element={<Navigate to="/docs" replace />} />
        <Route path="/docs/linux" element={<Navigate to="/docs/installation/linux" replace />} />
        <Route path="/docs/installation" element={<Navigate to="/docs/installation/linux" replace />} />

        {/* OS selector — before entering docs */}
        <Route path="/docs" element={<OsSelectorPage />} />

        {/* Docs — all pages share the DocsLayout sidebar */}
        <Route
          path="/docs/installation/linux"
          element={<DocsLayout><InstallationPage /></DocsLayout>}
        />
        <Route
          path="/docs/installation/macos"
          element={<DocsLayout><InstallMacosPage /></DocsLayout>}
        />
        <Route
          path="/docs/installation/windows"
          element={<DocsLayout><InstallWindowsPage /></DocsLayout>}
        />
        <Route
          path="/docs/usage"
          element={<DocsLayout><UsagePage /></DocsLayout>}
        />
        <Route
          path="/docs/completion"
          element={<DocsLayout><CompletionPage /></DocsLayout>}
        />
        <Route
          path="/docs/history"
          element={<DocsLayout><HistoryPage /></DocsLayout>}
        />
        <Route
          path="/docs/faq"
          element={<DocsLayout><FaqPage /></DocsLayout>}
        />
      </Routes>
    </Layout>
  );
};
