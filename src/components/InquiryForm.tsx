import React, { useState, useEffect } from 'react';
import { submitInquiry } from '../lib/firebase';
import { Inquiry } from '../types';
import { FileText, CheckCircle, Loader2, MapPin, User, Phone, ShoppingBag, Hash, CircleDollarSign } from 'lucide-react';

interface InquiryFormProps {
  selectedProductName: string;
  onClearSelectedProduct: () => void;
}

export default function InquiryForm({ selectedProductName, onClearSelectedProduct }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    city: '',
    productName: '',
    quantity: '',
    budget: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Update product name in form when selected from catalog
  useEffect(() => {
    if (selectedProductName) {
      setFormData((prev) => ({ ...prev, productName: selectedProductName }));
    }
  }, [selectedProductName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!formData.fullName || !formData.phoneNumber || !formData.city || !formData.productName || !formData.message) {
      setError('Please fill in all required fields (Full Name, Phone Number, City, Product Name, and Message).');
      return;
    }

    setLoading(true);
    try {
      await submitInquiry({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        city: formData.city,
        productName: formData.productName,
        quantity: formData.quantity || undefined,
        budget: formData.budget || undefined,
        message: formData.message
      });

      setSuccess(true);
      setFormData({
        fullName: '',
        phoneNumber: '',
        city: '',
        productName: '',
        quantity: '',
        budget: '',
        message: ''
      });
      onClearSelectedProduct();
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="quote-form" className="py-20 bg-brand-bg border-b border-brand-border">
      <div id="quote-form-container" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white border border-brand-border/60 rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
          {/* Decorative Warm Accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-brand-accent uppercase flex items-center justify-center gap-1.5">
                <FileText className="w-4 h-4 text-brand-accent" /> Bespoke Ordering
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-stone-950">
                Request a Custom Quote
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                Provide your custom dimensions, desired wood finish, and budget preferences. Our master carpenter will analyze and propose a personalized quotation.
              </p>
            </div>

            {/* Success Message Banner */}
            {success ? (
              <div 
                id="quote-success-banner"
                className="bg-emerald-50/50 border border-emerald-200/60 rounded-2xl p-6 text-center space-y-4 max-w-xl mx-auto animate-fadeIn"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-emerald-900">Inquiry Received</h3>
                <p className="text-sm text-emerald-850 font-medium leading-relaxed">
                  "Thank you! Your inquiry has been received. Our team will contact you soon."
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-2 text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              // Inquiry Form
              <form id="quote-inquiry-form" onSubmit={handleSubmit} className="space-y-6">
                
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-r-xl text-xs sm:text-sm font-medium animate-shake">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-brand-accent" /> Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g., Muhammad Ali"
                      required
                      className="w-full bg-brand-bg/30 border border-brand-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-brand-accent" /> Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="e.g., +92 323 4208816"
                      required
                      className="w-full bg-brand-bg/30 border border-brand-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-transparent transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* City */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-accent" /> City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g., Lahore, Karachi, Islamabad"
                      required
                      className="w-full bg-brand-bg/30 border border-brand-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Product Name */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-brand-accent" /> Product Name / Custom Item <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleChange}
                      placeholder="e.g., Royal Sheesham Dining Set"
                      required
                      className="w-full bg-brand-bg/30 border border-brand-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Quantity (Optional) */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-stone-400" /> Quantity <span className="text-stone-400 text-[9px]">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      placeholder="e.g., 1 Set, 2 Chairs"
                      className="w-full bg-brand-bg/30 border border-brand-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Budget (Optional) */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                      <CircleDollarSign className="w-3.5 h-3.5 text-stone-400" /> Budget Range <span className="text-stone-400 text-[9px]">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="e.g., Rs. 150,000 - 200,000"
                      className="w-full bg-brand-bg/30 border border-brand-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-700">
                    Custom Specifications & Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe any custom measurements, preferred wood (Teak, Rosewood, Sheesham), polish type (Glossy, Walnut, Natural Oil), delivery details or special features you desire."
                    required
                    className="w-full bg-brand-bg/30 border border-brand-border rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    id="submit-quote-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-accent hover:opacity-95 text-stone-50 py-4 px-6 rounded-full text-xs font-bold uppercase tracking-widest shadow hover:shadow-md transition-all duration-300 cursor-pointer disabled:bg-stone-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Submitting to Woodshop...</span>
                      </>
                    ) : (
                      <span>Submit Secure Quote Request</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
