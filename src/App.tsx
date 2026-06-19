import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScanPage from './pages/ScanPage';
import FlangeDetailPage from './pages/FlangeDetailPage';
import ProcessingPage from './pages/ProcessingPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import OverviewPage from './pages/OverviewPage';
import FlangeDataPage from './pages/FlangeDataPage';
import FlangeEditPage from './pages/FlangeEditPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route index element={<ScanPage />} />
                <Route path="flansch/:tagNummer" element={<FlangeDetailPage />} />
                <Route path="flansch/:tagNummer/bearbeitung" element={<ProcessingPage />} />
                <Route path="projekte" element={<ProjectsPage />} />
                <Route path="projekte/:projektId" element={<ProjectDetailPage />} />
                <Route path="uebersicht" element={<OverviewPage />} />
                <Route path="flanschen" element={<FlangeDataPage />} />
                <Route path="flanschen/:id/bearbeiten" element={<FlangeEditPage />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
