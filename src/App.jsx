import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";

import AnimatedCanvas from "./components/layout/AnimatedCanvas";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import CodeSignature from "./components/sections/CodeSignature";
import Education from "./components/sections/Education";
import Contact from "./components/sections/Contact";
import GitHubMap from "./components/sections/GitHubMap";

import FeedbackButton from "./components/feedback/FeedbackButton";
import FeedbackModal from "./components/feedback/FeedbackModal";

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <CodeSignature />
      <Education />
      <Contact />
      <GitHubMap />
    </>
  );
}

export default function App() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div
          className="min-h-screen overflow-x-hidden grid-bg"
          style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
        >
          <AnimatedCanvas />
          <Navbar onFeedback={() => setFeedbackOpen(true)} />

          <main>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage />} />
              </Routes>
            </AnimatePresence>
          </main>

          <Footer />
          <FeedbackButton onClick={() => setFeedbackOpen(true)} />
          <AnimatePresence>
            {feedbackOpen && (
              <FeedbackModal onClose={() => setFeedbackOpen(false)} />
            )}
          </AnimatePresence>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
