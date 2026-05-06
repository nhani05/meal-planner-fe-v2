import { useState, useEffect, useCallback } from 'react';
import { Search, Lock, Unlock, Trash2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import * as adminApi from '../../api/adminApi';
import { useUiStore } from '../../stores/uiStore';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminApi.getUsers({
        keyword: keyword || undefined,
        status: statusFilter || undefined,
        page: currentPage,
        size: 10,
      });
      setUsers(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to load users';
      useUiStore.getState().showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  }, [keyword, statusFilter, currentPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleLock = async (id, lock) => {
    setActionId(id);
    try {
      const res = lock ? await adminApi.lockUser(id) : await adminApi.unlockUser(id);
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: res.data.status } : u)));
      useUiStore.getState().showToast(`User ${lock ? 'locked' : 'unlocked'}`, 'success');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Action failed';
      useUiStore.getState().showToast(msg, 'error');
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    setActionId(id);
    try {
      await adminApi.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      useUiStore.getState().showToast('User deleted', 'success');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Delete failed';
      useUiStore.getState().showToast(msg, 'error');
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-[#171d16]">Users</h1>
        <p className="text-xs font-bold text-[#6f7a6b] uppercase tracking-wider mt-1">Manage user accounts</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6f7a6b]" />
          <input
            type="text"
            placeholder="Search username or email..."
            value={keyword}
            onChange={(e) => { setKeyword(e.target.value); setCurrentPage(0); }}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#becab9]/50 text-sm focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 outline-none transition-all"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(0); }}
          className="px-4 py-2.5 rounded-xl bg-white border border-[#becab9]/50 text-sm focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 outline-none"
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="locked">Locked</option>
        </select>
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
                    <th className="text-left px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">ID</th>
                    <th className="text-left px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">Username</th>
                    <th className="text-left px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">Email</th>
                    <th className="text-left px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">Role</th>
                    <th className="text-left px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">Status</th>
                    <th className="text-right px-5 py-3 font-bold text-[#6f7a6b] text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eaf0e4]">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-[#f5fbef]/50 transition-colors">
                      <td className="px-5 py-3.5 text-[#171d16] font-medium">{u.id}</td>
                      <td className="px-5 py-3.5 text-[#171d16] font-semibold">{u.username}</td>
                      <td className="px-5 py-3.5 text-[#6f7a6b]">{u.email}</td>
                      <td className="px-5 py-3.5">
                        <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-md bg-[#eaf0e4] text-[#6f7a6b]">
                          {u.role}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${
                          u.status === 'active'
                            ? 'bg-[#eaf0e4] text-[#006e1c]'
                            : 'bg-[#ffdad6] text-[#ba1a1a]'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {u.status === 'active' ? (
                            <button
                              onClick={() => handleLock(u.id, true)}
                              disabled={actionId === u.id}
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6f7a6b] hover:text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors"
                              title="Lock"
                            >
                              {actionId === u.id ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />}
                            </button>
                          ) : (
                            <button
                              onClick={() => handleLock(u.id, false)}
                              disabled={actionId === u.id}
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6f7a6b] hover:text-[#006e1c] hover:bg-[#eaf0e4] transition-colors"
                              title="Unlock"
                            >
                              {actionId === u.id ? <Loader2 size={14} className="animate-spin" /> : <Unlock size={14} />}
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(u.id)}
                            disabled={actionId === u.id}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6f7a6b] hover:text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors"
                            title="Delete"
                          >
                            {actionId === u.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-5 py-8 text-center text-[#6f7a6b] text-sm">
                        No users found
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
