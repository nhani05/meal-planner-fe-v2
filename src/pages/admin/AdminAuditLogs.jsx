import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Loader2, History } from 'lucide-react';
import * as adminApi from '../../api/adminApi';
import { useUiStore } from '../../stores/uiStore';

const actionLabels = {
  LOCK_USER: { label: 'Lock User', color: 'text-[#ba1a1a]', bg: 'bg-[#ffdad6]' },
  UNLOCK_USER: { label: 'Unlock User', color: 'text-[#006e1c]', bg: 'bg-[#eaf0e4]' },
  DELETE_USER: { label: 'Delete User', color: 'text-[#171d16]', bg: 'bg-[#becab9]' },
  UPDATE_USER_STATUS: { label: 'Update Status', color: 'text-[#6f7a6b]', bg: 'bg-[#f0f6ea]' },
};

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getAdminAuditLogs({
        page: currentPage,
        size: 10,
      });
      setLogs(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to load audit logs';
      useUiStore.getState().showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-[#171d16]">Audit Logs</h1>
        <p className="text-xs font-bold text-[#6f7a6b] uppercase tracking-wider mt-1">Track admin actions (UC16 NFR16-3)</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#becab9]/30 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={28} className="text-[#4caf50] animate-spin" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#f5fbef]">
                  <tr>
                    <th className="text-left px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">Time</th>
                    <th className="text-left px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">Admin</th>
                    <th className="text-left px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">Action</th>
                    <th className="text-left px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">Target</th>
                    <th className="text-left px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eaf0e4]">
                  {logs.map((log) => {
                    const actionStyle = actionLabels[log.action] || { label: log.action, color: 'text-[#6f7a6b]', bg: 'bg-[#f0f6ea]' };
                    return (
                      <tr key={log.id} className="hover:bg-[#f5fbef]/50 transition-colors">
                        <td className="px-5 py-3.5 text-[#6f7a6b] whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <History size={14} className="text-[#becab9]" />
                            {formatDate(log.performedAt)}
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-[#171d16] font-medium">
                          {log.adminUsername || `Admin #${log.adminId}`}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${actionStyle.bg} ${actionStyle.color}`}>
                            {actionStyle.label}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-[#6f7a6b]">
                          {log.targetEntity} #{log.targetId}
                        </td>
                        <td className="px-5 py-3.5 text-[#171d16] max-w-xs truncate" title={log.details}>
                          {log.details}
                        </td>
                      </tr>
                    );
                  })}
                  {logs.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-5 py-8 text-center text-[#6f7a6b] text-sm">
                        No audit logs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-[#eaf0e4]">
              <p className="text-xs text-[#6f7a6b]">Page {currentPage + 1} of {totalPages}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                  disabled={currentPage === 0}
                  className="px-3 py-1.5 rounded-lg border border-[#becab9] text-xs font-bold text-[#6f7a6b] hover:text-[#171d16] disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={currentPage >= totalPages - 1}
                  className="px-3 py-1.5 rounded-lg border border-[#becab9] text-xs font-bold text-[#6f7a6b] hover:text-[#171d16] disabled:opacity-40 transition-colors"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
