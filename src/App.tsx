import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Services from "./components/Services";
import Process from "./components/Process";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedRoute from "./admin/ProtectedRoute";

function Portfolio() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f8fbff] text-[#071426]">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="ambient-blue ambient-one" />
        <div className="ambient-blue ambient-two" />
        <div className="ambient-grid" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Stats />
        <About />
        <Services />
        <Process />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
