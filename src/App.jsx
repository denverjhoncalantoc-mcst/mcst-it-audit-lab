import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import LaboratoryActivities from './pages/LaboratoryActivities'
import LabDetail from './pages/LabDetail'
import CompanyProfile from './pages/CompanyProfile'
import EvidenceRepository from './pages/EvidenceRepository'
import HitlFramework from './pages/HitlFramework'
import AiDeclaration from './pages/AiDeclaration'
import FinalProject from './pages/FinalProject'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="laboratory" element={<LaboratoryActivities />} />
          <Route path="laboratory/:slug" element={<LabDetail />} />
          <Route path="company" element={<CompanyProfile />} />
          <Route path="evidence" element={<EvidenceRepository />} />
          <Route path="hitl" element={<HitlFramework />} />
          <Route path="ai-declaration" element={<AiDeclaration />} />
          <Route path="final-project" element={<FinalProject />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
