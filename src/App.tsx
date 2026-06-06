import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import WhoWeServe from "./pages/WhoWeServe";
import Track from "./pages/Track";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import RequireAuth from "./pages/admin/RequireAuth";
import Overview from "./pages/admin/Overview";
import Projects from "./pages/admin/Projects";
import ProjectForm from "./pages/admin/ProjectForm";
import ProjectDetail from "./pages/admin/ProjectDetail";
import Submissions from "./pages/admin/Submissions";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/who-we-serve" element={<WhoWeServe />} />
        <Route path="/track" element={<Track />} />
        <Route path="/contact" element={<Contact />} />

        {/* MD Dashboard */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Overview />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/:projectId" element={<ProjectDetail />} />
          <Route path="projects/:projectId/edit" element={<ProjectForm />} />
          <Route path="submissions" element={<Submissions />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
