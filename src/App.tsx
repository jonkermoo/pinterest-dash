import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import Settings from "./components/pages/Settings";
import PinterestSetup from "./components/pages/PinterestSetup";
import PinterestAuth from "./components/pages/PinterestAuth";
import PinterestCallback from "./components/pages/PinterestCallback";
import PinterestCredentials from "./components/pages/PinterestCredentials";
import PinterestDashboard from "./components/pages/PinterestDashboard";
import SchedulePins from "./components/pages/SchedulePins";
import ScheduledPins from "./components/pages/ScheduledPins";
import BulkUpload from "./components/pages/BulkUpload";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import TermsOfService from "./components/pages/TermsOfService";
import { schedulerService } from "./services/schedulerService";
import { pinterestApi } from "./services/pinterestApi";

function App() {
  useEffect(() => {
    // Start the scheduler when app loads
    const publishPin = async (pin: any) => {
      const accessToken = localStorage.getItem('pinterest_access_token');
      if (!accessToken) {
        throw new Error('Not authenticated');
      }

      // Prepare pin data for Pinterest API
      const pinData: any = {
        board_id: pin.board_id,
        title: pin.title,
        description: pin.description,
        media_source: pin.image_base64
          ? {
              source_type: 'image_base64' as const,
              data: pin.image_base64.split(',')[1], // Remove data:image/...;base64, prefix
              content_type: pin.image_base64.match(/data:([^;]+)/)?.[1] || 'image/jpeg',
            }
          : {
              source_type: 'image_url' as const,
              url: pin.image_url,
            },
      };

      if (pin.link) {
        pinData.link = pin.link;
      }

      // Create pin on Pinterest
      const createdPin = await pinterestApi.createPin(accessToken, pinData);

      // Mark as published in scheduler
      schedulerService.markAsPublished(pin.id, createdPin.id);

      console.log('Pin published successfully:', createdPin.id);
    };

    schedulerService.startScheduler(publishPin);

    // Cleanup on unmount
    return () => {
      schedulerService.stopScheduler();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setup" element={<PinterestSetup />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/auth" element={<PinterestAuth />} />
          <Route path="/callback" element={<PinterestCallback />} />
          <Route path="/credentials" element={<PinterestCredentials />} />
          <Route path="/dashboard" element={<PinterestDashboard />} />
          <Route path="/schedule" element={<SchedulePins />} />
          <Route path="/scheduled" element={<ScheduledPins />} />
          <Route path="/bulk-upload" element={<BulkUpload />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

// Made with Bob
