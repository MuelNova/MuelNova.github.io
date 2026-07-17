import { Routes, Route } from "react-router";
import { MotionProvider } from "@/hooks/useMotion";
import Home from "./pages/Home";

export default function App() {
  return (
    <MotionProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </MotionProvider>
  );
}
