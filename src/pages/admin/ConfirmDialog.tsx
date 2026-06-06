import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertTriangle, Loader2 } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  onConfirm: () => void;
  loading?: boolean;
}

const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Delete",
  onConfirm,
  loading,
}: ConfirmDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-sm">
      <DialogHeader>
        <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto sm:mx-0">
          <AlertTriangle className="w-6 h-6 text-destructive" />
        </div>
        <DialogTitle className="font-display pt-2">{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
      <div className="flex gap-3 mt-2">
        <button
          onClick={() => onOpenChange(false)}
          className="flex-1 border border-border bg-background text-foreground px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-muted transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-destructive text-destructive-foreground px-4 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-60"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {confirmLabel}
        </button>
      </div>
    </DialogContent>
  </Dialog>
);

export default ConfirmDialog;
