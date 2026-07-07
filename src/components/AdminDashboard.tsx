import React, { useState, useEffect } from 'react';
import { fetchInquiries, updateInquiryStatus, deleteInquiry } from '../lib/firebase';
import { Inquiry } from '../types';
import { 
  Database, RefreshCw, Trash2, Calendar, Phone, MapPin, CheckCircle, 
  Clock, CheckCircle2, AlertTriangle, KeyRound, Loader2, ArrowLeft, Filter
} from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
}

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);

  const correctPasscode = 'aurawood786';

  useEffect(() => {
    if (isAuthenticated) {
      loadInquiries();
    }
  }, [isAuthenticated]);

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const data = await fetchInquiries();
      setInquiries(data);
    } catch (err) {
      console.error("Failed to load inquiries: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === correctPasscode) {
      setIsAuthenticated(true);
      setPassError('');
    } else {
      setPassError('Incorrect passcode. Please enter the correct woodshop owner passcode.');
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: Inquiry['status']) => {
    setStatusUpdatingId(id);
    try {
      await updateInquiryStatus(id, newStatus);
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
      );
    } catch (err) {
      console.error(err);
      alert('Failed to update status. Please try again.');
    } finally {
      setStatusUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this inquiry? This action cannot be undone.')) {
      return;
    }
    try {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete inquiry.');
    }
  };

  const getStatusBadgeClass = (status: Inquiry['status']) => {
    switch (status) {
      case 'New':
        return 'bg-brand-accent/15 text-brand-accent border border-brand-border';
      case 'In Progress':
        return 'bg-blue-50 text-blue-800 border border-blue-200';
      case 'Contacted':
        return 'bg-indigo-50 text-indigo-800 border border-indigo-200';
      case 'Completed':
        return 'bg-emerald-50 text-emerald-800 border border-emerald-200';
      default:
        return 'bg-stone-100 text-stone-800';
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return isoString;
    }
  };

  const filteredInquiries = inquiries.filter(inq => 
    filterStatus === 'All' ? true : inq.status === filterStatus
  );

  if (!isAuthenticated) {
    return (
      <div id="admin-gate-screen" className="min-h-[80vh] flex items-center justify-center bg-brand-bg py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white border border-brand-border/60 p-8 rounded-3xl shadow-sm">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-brand-bg border border-brand-border text-brand-accent">
              <KeyRound className="h-5 w-5" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-serif font-light text-stone-900">
              Store Owner Log
            </h2>
            <p className="mt-2 text-xs text-stone-500 font-sans">
              Access the secure dashboard to view live woodshop quote inquiries.
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md space-y-2">
              <label htmlFor="passcode-input" className="text-[11px] font-bold uppercase tracking-wider text-stone-700">
                Security Passcode
              </label>
              <input
                id="passcode-input"
                name="passcode"
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter woodshop owner passcode"
                className="appearance-none rounded-2xl relative block w-full px-4 py-3 border border-brand-border placeholder-stone-400 text-stone-900 bg-brand-bg/30 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-transparent transition-all sm:text-sm font-mono"
              />
            </div>

            {passError && (
              <div className="text-red-600 text-xs text-center font-medium bg-red-50 p-2.5 rounded-xl border border-red-100">
                {passError}
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-stone-600 hover:text-stone-950 border border-brand-border rounded-full py-3 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Storefront</span>
              </button>
              <button
                type="submit"
                className="w-2/3 flex justify-center py-3 px-4 border border-transparent text-xs font-bold uppercase tracking-widest rounded-full text-stone-50 bg-brand-accent hover:opacity-95 shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent cursor-pointer transition-all"
              >
                Unlock Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div id="admin-dashboard-container" className="py-12 bg-brand-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-border pb-6">
          <div className="space-y-1">
            <button 
              onClick={onClose}
              className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-accent hover:opacity-80 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Storefront
            </button>
            <h1 className="text-2xl sm:text-3xl font-serif font-light text-stone-900 flex items-center gap-2">
              <Database className="w-7 h-7 text-brand-accent" /> AURA WOOD Owner Panel
            </h1>
            <p className="text-xs text-stone-500">
              Live secure database logs. Monitor, update progress, and coordinate delivery. No emails are sent or used.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={loadInquiries}
              disabled={loading}
              className="flex items-center justify-center gap-2 border border-brand-border hover:bg-white text-stone-700 px-4 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh logs</span>
            </button>
            <button
              onClick={onClose}
              className="bg-stone-900 hover:bg-stone-850 text-stone-50 px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer"
            >
              Close Panel
            </button>
          </div>
        </div>

        {/* Filters and Counter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-brand-border/60 rounded-3xl p-4 shadow-sm">
          <div className="text-xs font-medium text-stone-600 font-sans">
            Total Inquiries: <strong className="text-stone-900 text-sm font-mono">{filteredInquiries.length}</strong> 
            {filterStatus !== 'All' && <span className="text-stone-400"> (Filtered by {filterStatus})</span>}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-stone-500 shrink-0" />
            <span className="text-xs font-medium text-stone-600 font-sans">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-brand-bg/40 border border-brand-border rounded-xl text-xs px-2.5 py-1.5 focus:ring-1 focus:ring-brand-accent focus:outline-none"
            >
              <option value="All">All Inquiries</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Contacted">Contacted</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Inquiries Table / Grid */}
        {loading && inquiries.length === 0 ? (
          <div className="text-center py-24 space-y-3">
            <Loader2 className="w-8 h-8 text-brand-accent animate-spin mx-auto" />
            <p className="text-xs text-stone-500 font-sans">Querying Firestore database...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="text-center py-24 bg-white border border-dashed border-brand-border rounded-3xl space-y-2">
            <Database className="w-10 h-10 text-stone-400 mx-auto" />
            <h3 className="font-serif text-lg font-semibold text-stone-700">No Inquiries Found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto font-sans leading-relaxed">
              {filterStatus === 'All' 
                ? "No clients have submitted quote requests yet. Try submitting one on the storefront!"
                : `There are no inquiries marked as "${filterStatus}" in the database.`}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredInquiries.map((inq) => (
              <div 
                key={inq.id}
                id={`inquiry-log-${inq.id}`}
                className="bg-white border border-brand-border/60 hover:border-brand-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-200 space-y-4"
              >
                {/* Header row of inquiry card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-border/40 pb-3">
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-semibold text-stone-900 flex items-center gap-2">
                      {inq.fullName}
                      <span className={`text-[9px] font-bold tracking-wider px-2.5 py-1 rounded-full font-sans uppercase ${getStatusBadgeClass(inq.status)}`}>
                        {inq.status}
                      </span>
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500 font-sans">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-stone-400" /> {formatDate(inq.timestamp)}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-stone-400" /> {inq.city}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${inq.phoneNumber}`}
                      className="flex items-center gap-1.5 bg-brand-bg hover:opacity-85 text-stone-850 px-3 py-1.5 rounded-lg text-xs font-semibold border border-brand-border font-mono"
                    >
                      <Phone className="w-3.5 h-3.5 text-brand-accent" />
                      <span>{inq.phoneNumber}</span>
                    </a>
                    
                    <button
                      onClick={() => handleDelete(inq.id || '')}
                      title="Permanently Delete Inquiry"
                      className="p-1.5 text-stone-400 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Main details grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Item Specs left */}
                  <div className="md:col-span-4 space-y-2 bg-brand-bg/50 p-4 rounded-2xl text-xs font-sans">
                    <div>
                      <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">Furniture Item:</span>
                      <p className="font-serif font-semibold text-stone-900 text-sm mt-0.5">{inq.productName}</p>
                    </div>
                    {inq.quantity && (
                      <div>
                        <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">Quantity Request:</span>
                        <p className="font-mono font-semibold text-stone-800 mt-0.5">{inq.quantity}</p>
                      </div>
                    )}
                    {inq.budget && (
                      <div>
                        <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">Proposed Budget:</span>
                        <p className="font-semibold text-brand-accent mt-0.5">{inq.budget}</p>
                      </div>
                    )}
                  </div>

                  {/* Customer Message right */}
                  <div className="md:col-span-8 space-y-1 bg-white p-2 rounded-xl">
                    <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">Custom Specifications & Message:</span>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic border-l-2 border-brand-accent pl-3 whitespace-pre-wrap mt-1">
                      "{inq.message}"
                    </p>
                  </div>
                </div>

                {/* Action status bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-brand-border/40">
                  <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider font-sans">
                    Update Workflow Stage:
                  </span>
                  
                  <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    {(['New', 'In Progress', 'Contacted', 'Completed'] as Inquiry['status'][]).map((status) => (
                      <button
                        key={status}
                        disabled={statusUpdatingId === inq.id}
                        onClick={() => handleStatusUpdate(inq.id || '', status)}
                        className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
                          inq.status === status
                            ? 'bg-brand-accent text-stone-50 shadow-sm font-bold'
                            : 'bg-brand-bg hover:opacity-85 text-stone-600 hover:text-stone-850 border border-brand-border'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
