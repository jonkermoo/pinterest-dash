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

function App() {
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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

// Made with Bob
