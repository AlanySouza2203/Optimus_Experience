import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Vehicles from './components/Vehicles';
import Plans from './components/Plans';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ProposalModal from './components/ProposalModal';
import AdminModal from './components/AdminModal';
import DriverSupportModal from './components/DriverSupportModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [proposalPlanType, setProposalPlanType] = useState('Semanal');
  const [isDriverSupportOpen, setIsDriverSupportOpen] = useState(false);
  const [supportRequests, setSupportRequests] = useState([]);
  const handleOpenProposal = (planType = 'Semanal', vehicle = null) => {
    setSelectedVehicle(vehicle);
    setProposalPlanType(planType || 'Semanal');
    setIsModalOpen(true);
  };

  const handleOpenAdmin = () => {
    setIsAdminModalOpen(true);
  };

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVehicle(null);
  };

  const handleCreateSupportRequest = (request) => {
    setSupportRequests((current) => [request, ...current]);
  };

  return (
    <div className="app-wrapper">
      <Navbar
        onOpenProposal={handleOpenProposal}
        onOpenAdmin={handleOpenAdmin}
        onOpenDriverSupport={() => setIsDriverSupportOpen(true)}
      />

      <main>
        <Hero onOpenProposal={handleOpenProposal} />
        <Benefits />
        <Vehicles onSelectVehicle={handleSelectVehicle} />
        <Plans onOpenProposal={handleOpenProposal} />
        <HowItWorks />
        <FAQ />
        <ContactForm />
      </main>

      <Footer onOpenProposal={handleOpenProposal} />

      <ProposalModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedVehicle={selectedVehicle}
        initialPlan={proposalPlanType}
      />

      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        supportRequests={supportRequests}
        setSupportRequests={setSupportRequests}
      />

      <DriverSupportModal
        isOpen={isDriverSupportOpen}
        onClose={() => setIsDriverSupportOpen(false)}
        requests={supportRequests}
        onCreateRequest={handleCreateSupportRequest}
      />
    </div>
  );
}
