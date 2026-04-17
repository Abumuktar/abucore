import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, Truck, CheckCircle2, Clock, Building2, AlertCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Milestone {
  task: string;
  date: string;
  status: "completed" | "in-progress" | "pending";
}

interface ProjectData {
  id: string;
  name: string;
  client: string;
  status: string;
  type: string;
  timeline: Milestone[];
}

const mockProjects: Record<string, ProjectData> = {
  "ABU-2024-X1": {
    id: "ABU-2024-X1",
    name: "Corporate Office Infrastructure",
    client: "Ministry of Finance",
    status: "Completed",
    type: "Procurement",
    timeline: [
      { task: "Contract Awarded", date: "Mar 10, 2024", status: "completed" },
      { task: "Sourcing & QC", date: "Mar 15, 2024", status: "completed" },
      { task: "Logistics Dispatch", date: "Mar 20, 2024", status: "completed" },
      { task: "Final Delivery & Inspection", date: "Mar 25, 2024", status: "completed" },
    ],
  },
  "ABU-2024-X2": {
    id: "ABU-2024-X2",
    name: "Education Wing Renovation",
    client: "Katsina State Govt",
    status: "Execution Phase",
    type: "Civil Works",
    timeline: [
      { task: "Contract Awarded", date: "Apr 02, 2024", status: "completed" },
      { task: "Site Mobilization", date: "Apr 08, 2024", status: "completed" },
      { task: "Structural Works", date: "Apr 15, 2024", status: "in-progress" },
      { task: "Finishing & Handover", date: "Pending", status: "pending" },
    ],
  },
  "ABU-2024-X3": {
    id: "ABU-2024-X3",
    name: "Medical Consumables Supply",
    client: "General Hospital Katsina",
    status: "In Transit",
    type: "Logistics",
    timeline: [
      { task: "Contract Awarded", date: "Apr 10, 2024", status: "completed" },
      { task: "Inventory Loading", date: "Apr 12, 2024", status: "completed" },
      { task: "Last-Mile Delivery", date: "In Progress", status: "in-progress" },
      { task: "Receipt Confirmation", date: "Pending", status: "pending" },
    ],
  },
};

const ease = [0.16, 1, 0.3, 1] as const;

const ProjectTracker = () => {
  const [searchId, setSearchId] = useState("");
  const [project, setProject] = useState<ProjectData | null>(null);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e?: React.FormEvent, manualId?: string) => {
    e?.preventDefault();
    const id = (manualId || searchId).toUpperCase().trim();
    if (mockProjects[id]) {
      setProject(mockProjects[id]);
      setError(false);
      setIsModalOpen(true);
    } else {
      setProject(null);
      setError(true);
      // Even if error, we might want to open modal to show "not found" or just show inline error
    }
  };

  return (
    <section className="py-12 md:py-16 bg-navy relative border-y border-white/5">
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-display font-bold text-primary-foreground mb-2">
              Track Your <span className="text-gold">Execution Pulse</span>
            </h3>
            <p className="text-primary-foreground/40 text-sm">
              Enter your tracking ID for real-time visibility.
            </p>
          </div>

          <div className="w-full md:w-auto flex-1 max-w-md">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder="ID (e.g. ABU-2024-X2)"
                value={searchId}
                onChange={(e) => {
                  setSearchId(e.target.value);
                  setError(false);
                }}
                className={`w-full bg-white/5 border ${error ? 'border-destructive/50' : 'border-white/10'} rounded-full py-3.5 pl-6 pr-32 text-primary-foreground placeholder:text-primary-foreground/20 focus:outline-none focus:border-gold/50 transition-all font-medium text-sm`}
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 gradient-gold text-navy font-bold px-6 py-2 rounded-full text-xs hover:shadow-glow transition-all active:scale-95"
              >
                Track Now
              </button>
            </form>
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive text-[10px] font-bold mt-2 ml-6 uppercase tracking-wider"
              >
                Project ID Not Found
              </motion.p>
            )}
            <div className="flex gap-2 mt-3 ml-2 flex-wrap justify-center md:justify-start">
              {Object.keys(mockProjects).map(id => (
                <button 
                  key={id}
                  onClick={() => handleSearch(undefined, id)}
                  className="text-[10px] text-primary-foreground/20 hover:text-gold transition-colors font-medium"
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-[95vw] sm:max-w-3xl bg-navy border-white/10 p-0 overflow-hidden shadow-2xl border-none">
          <div className="absolute top-0 left-0 w-full h-1 gradient-gold z-50" />
          
          <div className="p-5 md:p-8">
            {/* Compact Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-white/5 pb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  <span className="text-gold text-[9px] tracking-[3px] uppercase font-bold">Execution Pulse</span>
                </div>
                <DialogTitle className="text-xl md:text-2xl font-display font-extrabold text-primary-foreground">
                  {project?.id} — {project?.name}
                </DialogTitle>
                <p className="text-[10px] text-primary-foreground/40 font-medium mt-1">
                  Client: {project?.client}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="bg-white/5 px-3 py-2 rounded-lg border border-white/5 text-right">
                  <p className="text-[9px] text-primary-foreground/40 uppercase font-bold">Category</p>
                  <p className="text-xs text-primary-foreground font-bold">{project?.type}</p>
                </div>
                <div className="bg-gold/10 px-3 py-2 rounded-lg border border-gold/20 text-right">
                  <p className="text-[9px] text-gold uppercase font-bold">Status</p>
                  <p className="text-xs text-gold font-bold">{project?.status}</p>
                </div>
              </div>
            </div>

            {/* Horizontal Progress bar */}
            <div className="relative py-4">
              {/* Connector line */}
              <div className="absolute top-[34px] left-[10%] right-[10%] h-[2px] bg-white/5" />
              <div 
                className="absolute top-[34px] left-[10%] h-[2px] bg-gold transition-all duration-1000 ease-out" 
                style={{ 
                  width: `${project?.timeline.reduce((acc, step, i) => step.status === 'completed' ? ((i / (project.timeline.length - 1)) * 80) : acc, 0)}%` 
                }}
              />

              <div className="grid grid-cols-4 gap-2 relative z-10">
                {project?.timeline.map((step, idx) => (
                  <motion.div
                    key={step.task}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all duration-500 shadow-lg
                      ${step.status === 'completed' ? 'bg-gold' : 
                        step.status === 'in-progress' ? 'bg-navy border-2 border-gold ring-4 ring-gold/10' : 
                        'bg-navy border-2 border-white/10'}`}
                    >
                      {step.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-navy shrink-0" />
                      ) : step.status === 'in-progress' ? (
                        <Clock className="w-5 h-5 text-gold shrink-0 animate-spin-slow" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-white/10" />
                      )}
                    </div>
                    <h4 className={`text-[10px] md:text-xs font-bold leading-tight mb-1 ${step.status === 'completed' ? 'text-primary-foreground' : step.status === 'in-progress' ? 'text-gold' : 'text-primary-foreground/20'}`}>
                      {step.task}
                    </h4>
                    <p className="text-[8.5px] md:text-[9px] text-primary-foreground/30 font-medium">{step.date}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between text-[9px] text-primary-foreground/20 font-bold uppercase tracking-widest border-t border-white/5 pt-5">
              <span>Next Milestone: {project?.timeline.find(s => s.status !== 'completed')?.task || 'Completed'}</span>
              <span className="italic opacity-50">Verified by Abucore Compliance</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectTracker;
