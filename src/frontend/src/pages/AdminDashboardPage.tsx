import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useGetAllApplications,
  useIsAdmin,
  useUpdateApplicationStatus,
} from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle,
  Clock,
  Loader2,
  LogOut,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { toast } from "sonner";
import { LoanStatus } from "../backend";

function formatDate(nanos: bigint): string {
  const ms = Number(nanos / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function StatusBadge({ status }: { status: LoanStatus }) {
  if (status === LoanStatus.approved) {
    return (
      <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
        <CheckCircle className="w-3 h-3 mr-1" />
        Approved
      </Badge>
    );
  }
  if (status === LoanStatus.rejected) {
    return (
      <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-100">
        <XCircle className="w-3 h-3 mr-1" />
        Rejected
      </Badge>
    );
  }
  return (
    <Badge className="bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-50">
      <Clock className="w-3 h-3 mr-1" />
      Pending
    </Badge>
  );
}

export function AdminDashboardPage() {
  const { clear, identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: checkingAdmin } = useIsAdmin();
  const { data: applications, isLoading, refetch } = useGetAllApplications();
  const { mutateAsync: updateStatus, isPending: isUpdating } =
    useUpdateApplicationStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkingAdmin && isAdmin === false) {
      navigate({ to: "/admin" });
    }
  }, [isAdmin, checkingAdmin, navigate]);

  if (checkingAdmin || !identity) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div
          data-ocid="dashboard.loading_state"
          className="flex items-center gap-2 text-muted-foreground"
        >
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </main>
    );
  }

  const handleStatusChange = async (id: bigint, status: LoanStatus) => {
    try {
      await updateStatus({ id, status });
      toast.success(
        `Application ${status === LoanStatus.approved ? "approved" : "rejected"}.`,
      );
    } catch {
      toast.error("Failed to update status.");
    }
  };

  const pending =
    applications?.filter((a) => a.status === LoanStatus.pending).length ?? 0;
  const approved =
    applications?.filter((a) => a.status === LoanStatus.approved).length ?? 0;
  const rejected =
    applications?.filter((a) => a.status === LoanStatus.rejected).length ?? 0;

  return (
    <main className="min-h-screen bg-background pt-20 pb-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-wrap items-start justify-between gap-4"
        >
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold">
              Loan Applications
            </h1>
            <p className="text-muted-foreground mt-1">
              Admin dashboard &mdash; {applications?.length ?? 0} total
              applications
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              data-ocid="dashboard.refresh.button"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                clear();
                navigate({ to: "/admin" });
              }}
              data-ocid="dashboard.logout.button"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Pending", count: pending, color: "text-amber-600" },
            { label: "Approved", count: approved, color: "text-green-700" },
            { label: "Rejected", count: rejected, color: "text-red-600" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-card p-5 text-center"
            >
              <div className={`font-display text-4xl font-bold ${stat.color}`}>
                {stat.count}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          {isLoading ? (
            <div
              data-ocid="dashboard.table.loading_state"
              className="flex items-center justify-center py-20 text-muted-foreground"
            >
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Loading applications...
            </div>
          ) : !applications || applications.length === 0 ? (
            <div
              data-ocid="dashboard.table.empty_state"
              className="py-20 text-center"
            >
              <div className="font-display text-2xl font-bold mb-2">
                No Applications Yet
              </div>
              <p className="text-muted-foreground">
                New applications will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table data-ocid="dashboard.table">
                <TableHeader>
                  <TableRow className="bg-secondary/50">
                    <TableHead className="font-semibold">ID</TableHead>
                    <TableHead className="font-semibold">Full Name</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold text-forest">
                      WhatsApp
                    </TableHead>
                    <TableHead className="font-semibold">Amount</TableHead>
                    <TableHead className="font-semibold">Rate</TableHead>
                    <TableHead className="font-semibold">Term</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app, idx) => (
                    <TableRow
                      key={String(app.id)}
                      data-ocid={`dashboard.row.item.${idx + 1}`}
                      className="hover:bg-secondary/30 transition-colors"
                    >
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        #{String(app.id)}
                      </TableCell>
                      <TableCell className="font-medium">
                        {app.fullName}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {app.email}
                      </TableCell>
                      <TableCell className="text-sm font-medium text-forest">
                        {app.whatsApp}
                      </TableCell>
                      <TableCell className="font-semibold">
                        ${Number(app.amount).toLocaleString()}
                      </TableCell>
                      <TableCell>{String(app.interestRate)}%</TableCell>
                      <TableCell>{String(app.term)}mo</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(app.submittedAt)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={app.status} />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={app.status}
                          onValueChange={(v) =>
                            handleStatusChange(app.id, v as LoanStatus)
                          }
                          disabled={isUpdating}
                        >
                          <SelectTrigger
                            data-ocid={`dashboard.status.select.${idx + 1}`}
                            className="w-32 h-8 text-xs"
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={LoanStatus.pending}>
                              Pending
                            </SelectItem>
                            <SelectItem value={LoanStatus.approved}>
                              Approve
                            </SelectItem>
                            <SelectItem value={LoanStatus.rejected}>
                              Reject
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
