import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import * as adminApi from '../../api/adminApi';
import { useUiStore } from '../../stores/uiStore';

const statusColors = {
  pending: 'bg-[#ffecb3] text-[#ff8f00]',
  processing: 'bg-[#d1e4ff] text-[#0061a4]',
  resolved: 'bg-[#eaf0e4] text-[#006e1c]',
};

const statusOptions = ['pending', 'processing', 'resolved'];

export default function AdminFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState(null);

  const fetchFeedbacks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getAdminFeedbacks({
        status: statusFilter || undefined,
        page: currentPage,
        size: 10,
      });
      setFeedbacks(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to load feedbacks';
      useUiStore.getState().showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, currentPage]);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  const handleStatusChange = async (id, status) => {
    setActionId(id);
    try {
      await adminApi.updateFeedbackStatus(id, status);
      setFeedbacks((prev) => prev.map((f) => (f.id === id ? { ...f, status } : f)));
      useUiStore.getState().showToast('Status updated', 'success');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Update failed';
      useUiStore.getState().showToast(msg, 'error');
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-[#171d16]">Feedbacks</h1>
        <p className="text-xs font-bold text-[#6f7a6b] uppercase tracking-wider mt-1">Review user feedback</p>
      </div>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(0); }}
          className="px-4 py-2.5 rounded-xl bg-white border border-[#becab9]/50 text-sm focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 outline-none">
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#becab9]/30 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader2 size={28} className="text-[#4caf50] animate-spin" /></div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#f5fbef]">
                  <tr>
                    <th className="text-left px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">ID</th>
                    <th className="text-left px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">Account</th>
                    <th className="text-left px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">Content</th>
                    <th className="text-left px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">Status</th>
                    <th className="text-left px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">Submitted</th>
                    <th className="text-right px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eaf0e4]">
                  {feedbacks.map((f) => (
                    <tr key={f.id} className="hover:bg-[#f5fbef]/50 transition-colors">
                      <td className="px-5 py-3.5 text-[#171d16] font-medium">{f.id}</td>
                      <td className="px-5 py-3.5 text-[#6f7a6b]">{f.accountId}</td>
                      <td className="px-5 py-3.5 text-[#171d16] max-w-xs truncate">{f.content}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${statusColors[f.status] || 'bg-[#eaf0e4] text-[#6f7a6b]'}`}>
                          {f.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-[#6f7a6b]">
                        {f.submittedAt ? new Date(f.submittedAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {statusOptions.map((s) => (
                            <button
                              key={s}
                              onClick={() => handleStatusChange(f.id, s)}
                              disabled={f.status === s || actionId === f.id}
                              className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${
                                f.status === s
                                  ? 'bg-[#becab9] text-white cursor-default'
                                  : 'bg-[#f0f6ea] text-[#6f7a6b] hover:bg-[#eaf0e4] hover:text-[#171d16]'
                              } disabled:opacity-50`}
                            >
                              {actionId === f.id && f.status !== s ? <Loader2 size={10} className="animate-spin" /> : s}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {feedbacks.length === 0 && (
                    <tr><td colSpan={6} className="px-5 py-8 text-center text-[#6f7a6b] text-sm">No feedbacks found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-5 py-3 border-t border-[#eaf0e4]">
              <p className="text-xs text-[#6f7a6b]">Page {currentPage + 1} of {totalPages}</p>
              <div className="flex gap-2">
                <button onClick={() => setCurrentPage((p) => Math.max(0, p - 1))} disabled={currentPage === 0}
                  className="px-3 py-1.5 rounded-lg border border-[#becab9] text-xs font-bold text-[#6f7a6b] hover:text-[#171d16] disabled:opacity-40 transition-colors"><ChevronLeft size={14} /></button>
                <button onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))} disabled={currentPage >= totalPages - 1}
                  className="px-3 py-1.5 rounded-lg border border-[#becab9] text-xs font-bold text-[#6f7a6b] hover:text-[#171d16] disabled:opacity-40 transition-colors"><ChevronRight size={14} /></button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
