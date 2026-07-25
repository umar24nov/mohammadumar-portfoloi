import { useState } from "react";

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

export default function App() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <div className="bg-[#050b14] text-[#e2eaf2] min-h-screen overflow-x-hidden">
      <AnimatedCanvas />
      <Navbar onFeedback={() => setFeedbackOpen(true)} />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <CodeSignature />
        <Education />
        <Contact />
        <GitHubMap />
      </main>

      <Footer />
      <FeedbackButton onClick={() => setFeedbackOpen(true)} />
      {feedbackOpen && <FeedbackModal onClose={() => setFeedbackOpen(false)} />}
    </div>
  );
}
