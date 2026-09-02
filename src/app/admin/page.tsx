'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { DataProvider, useData } from '@/context/DataContext';
import { Product, Testimonial, PhotoItem } from '@/types';
import { 
  Lock, User, LogOut, Package, Image as ImageIcon, 
  Star, Building2, Plus, Trash2, Edit3, CheckCircle, 
  ArrowLeft, Save, Eye, ShieldCheck, Upload, Loader2, X, Inbox, Phone, Calendar, Mail
} from 'lucide-react';

function AdminContent() {
  const { 
    data, updateProduct, deleteProduct, addProduct, 
    updateCompany, updateAbout, addTestimonial, deleteTestimonial, 
    addPhoto, deletePhoto, deleteInquiry
  } = useData();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'products' | 'photos' | 'reviews' | 'inquiries' | 'company'>('inquiries');

  // Product Edit/Add State
  const [editingProd, setEditingProd] = useState<Product | null>(null);
  const [isAddProdOpen, setIsAddProdOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [newProd, setNewProd] = useState<Partial<Product>>({
    title: '',
    category: 'Electric Heater',
    categorySummary: '',
    description: '',
    image: '/images/img_5.jpg',
    price: 'Ask Price',
    minimumOrderQuantity: '1 Unit',
    available: true,
    subServices: [],
    specifications: {}
  });

  // Photo Add State
  const [newPhoto, setNewPhoto] = useState<Partial<PhotoItem>>({
    title: '',
    category: 'Project Installation',
    image: '/images/img_5.jpg',
    description: ''
  });
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);

  // Review Add State
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [newAdminReview, setNewAdminReview] = useState({
    author: '',
    company: '',
    location: '',
    rating: 5,
    comment: '',
    productName: '',
  });

  // Spec Editor Temporary State
  const [specKey, setSpecKey] = useState('');
  const [specVal, setSpecVal] = useState('');

  // Notification Toast State
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'danger' } | null>(null);

  const showConfirmation = (message: string, type: 'success' | 'info' | 'danger' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  // Check Session
  useEffect(() => {
    const authStatus = sessionStorage.getItem('abn_admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if ((username.trim().toLowerCase() === 'admin') && (password === 'abn@123' || password === 'admin123' || password === 'admin')) {
      setIsAuthenticated(true);
      sessionStorage.setItem('abn_admin_authenticated', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. (Hint: admin / abn@123)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('abn_admin_authenticated');
  };

  // Image Upload Handler (Vercel Blob with Base64 fallback)
  const handleImageUpload = async (file: File, onSuccess: (url: string) => void) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      const data = await res.json();
      if (data.url) {
        onSuccess(data.url);
      }
    } catch (err) {
      console.error('Image upload error:', err);
      alert('Failed to upload image. You can also paste an image URL directly.');
    } finally {
      setIsUploading(false);
    }
  };

  // Login Screen Component
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-700">
          <div className="bg-[#383a7c] p-6 sm:p-8 text-white text-center relative">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">ABN Thermocare System</h1>
            <p className="text-xs text-slate-200 mt-1">Administrator Portal & Catalog Manager</p>
          </div>

          <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-4 sm:space-y-5">
            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-medium text-center">
                {loginError}
              </div>
            )}

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-slate-700">
              <span className="font-bold text-[#383a7c]">Default Login Credentials:</span>
              <div className="mt-1 flex items-center justify-between">
                <span>Username: <strong className="text-slate-900">admin</strong></span>
                <span>Password: <strong className="text-slate-900">abn@123</strong></span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Username</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#383a7c] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#383a7c] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#383a7c] hover:bg-[#2c2e63] text-white font-bold py-3 rounded-lg text-xs shadow-md transition duration-200"
            >
              Sign In to Admin Panel
            </button>

            <div className="text-center pt-2">
              <Link href="/" className="text-xs text-slate-500 hover:text-[#383a7c] inline-flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Main Website
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* Top Header */}
      <header className="bg-[#383a7c] text-white px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white p-1 rounded-xl flex items-center justify-center border border-white/30 shrink-0 overflow-hidden">
            <img src={data.company.logo || '/images/img_3.JPG'} alt="" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-sm sm:text-base leading-none">ABN Thermocare Admin Dashboard</h1>
            <p className="text-[11px] text-slate-300 mt-1">Catalog & Content Management Panel</p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Link
            href="/"
            className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded border border-white/20 transition"
          >
            <Eye className="w-3.5 h-3.5" /> View Website
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3.5 py-1.5 rounded transition shadow-xs"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">

        {/* Global Confirmation Alert Banner */}
        {notification && (
          <div className={`p-4 rounded-xl border flex items-center justify-between shadow-lg transition-all animate-in fade-in slide-in-from-top-3 duration-300 ${
            notification.type === 'success' 
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
              : notification.type === 'danger'
              ? 'bg-red-50 border-red-300 text-red-900'
              : 'bg-blue-50 border-blue-300 text-blue-900'
          }`}>
            <div className="flex items-center gap-3 font-bold text-xs sm:text-sm">
              <CheckCircle className={`w-5 h-5 shrink-0 ${
                notification.type === 'danger' ? 'text-red-600' : notification.type === 'info' ? 'text-blue-600' : 'text-emerald-600'
              }`} />
              <span>{notification.message}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-slate-700 p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        
        {/* Responsive Tab Bar */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-300 pb-3 scrollbar-none">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'products' ? 'bg-[#383a7c] text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Package className="w-4 h-4" /> Products & Services ({data.products.length})
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'photos' ? 'bg-[#383a7c] text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" /> Photos & Gallery ({data.photos.length})
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'reviews' ? 'bg-[#383a7c] text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Star className="w-4 h-4" /> Testimonials ({data.testimonials.length})
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'inquiries' ? 'bg-[#383a7c] text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Inbox className="w-4 h-4 text-amber-400" /> Quote Inquiries / Leads ({(data.inquiries || []).length})
          </button>

          <button
            onClick={() => setActiveTab('company')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition ${
              activeTab === 'company' ? 'bg-[#383a7c] text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4" /> Company Details
          </button>
        </div>

        {/* Tab 1: Products & Services Manager */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="font-bold text-sm text-slate-800">Product Catalog Management</h2>
                <p className="text-xs text-slate-500">Edit, add, or delete product descriptions, images & specifications</p>
              </div>
              <button
                onClick={() => setIsAddProdOpen(true)}
                className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow-xs transition"
              >
                <Plus className="w-4 h-4" /> Add New Product
              </button>
            </div>

            {/* Add Product Form Modal inline */}
            {isAddProdOpen && (
              <div className="bg-emerald-50 border border-emerald-300 p-5 rounded-xl space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                  <h3 className="font-bold text-sm text-emerald-900">Create New Product Entry</h3>
                  <button onClick={() => setIsAddProdOpen(false)} className="text-xs text-slate-500 hover:text-slate-800">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Product Title *</label>
                    <input
                      type="text"
                      placeholder="e.g. Electric Suction Heater"
                      value={newProd.title}
                      onChange={(e) => setNewProd({ ...newProd, title: e.target.value })}
                      className="w-full p-2 bg-white border border-slate-300 rounded text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Category Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Electric Heater"
                      value={newProd.category}
                      onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                      className="w-full p-2 bg-white border border-slate-300 rounded text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Price String</label>
                    <input
                      type="text"
                      placeholder="e.g. Ask Price or Rs 1,450 / Piece"
                      value={newProd.price}
                      onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                      className="w-full p-2 bg-white border border-slate-300 rounded text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Minimum Order Quantity (MOQ)</label>
                    <input
                      type="text"
                      placeholder="e.g. 1 Unit, 10, 1 Meter"
                      value={newProd.minimumOrderQuantity}
                      onChange={(e) => setNewProd({ ...newProd, minimumOrderQuantity: e.target.value })}
                      className="w-full p-2 bg-white border border-slate-300 rounded text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Availability Status</label>
                    <select
                      value={newProd.available !== false ? 'true' : 'false'}
                      onChange={(e) => setNewProd({ ...newProd, available: e.target.value === 'true' })}
                      className="w-full p-2 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-800"
                    >
                      <option value="true">In Stock (Available)</option>
                      <option value="false">Out of Stock (Unavailable)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Product Description</label>
                  <textarea
                    placeholder="Enter complete product description..."
                    rows={3}
                    value={newProd.description}
                    onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded text-xs"
                  />
                </div>

                {/* Technical Specifications Editor for New Product */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Technical Specifications</label>
                  <div className="bg-white p-3 rounded-lg border border-slate-300 space-y-2">
                    {Object.entries(newProd.specifications || {}).map(([k, v]) => (
                      <div key={k} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={k}
                          readOnly
                          className="w-1/3 p-1.5 bg-slate-100 border border-slate-300 rounded text-xs font-semibold text-slate-700"
                        />
                        <input
                          type="text"
                          value={v}
                          onChange={(e) => {
                            const updated = { ...(newProd.specifications || {}), [k]: e.target.value };
                            setNewProd({ ...newProd, specifications: updated });
                          }}
                          className="flex-1 p-1.5 bg-white border border-slate-300 rounded text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = { ...(newProd.specifications || {}) };
                            delete updated[k];
                            setNewProd({ ...newProd, specifications: updated });
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    {/* Add New Spec Pair */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="New Spec Key (e.g. Voltage)"
                        value={specKey}
                        onChange={(e) => setSpecKey(e.target.value)}
                        className="w-1/3 p-1.5 bg-white border border-slate-300 rounded text-xs"
                      />
                      <input
                        type="text"
                        placeholder="New Spec Value (e.g. 415V)"
                        value={specVal}
                        onChange={(e) => setSpecVal(e.target.value)}
                        className="flex-1 p-1.5 bg-white border border-slate-300 rounded text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (specKey.trim()) {
                            setNewProd({
                              ...newProd,
                              specifications: {
                                ...(newProd.specifications || {}),
                                [specKey.trim()]: specVal.trim()
                              }
                            });
                            setSpecKey('');
                            setSpecVal('');
                          }
                        }}
                        className="bg-[#383a7c] text-white text-xs px-3 py-1.5 rounded font-bold hover:bg-[#2c2e63]"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Image Upload or URL */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Product Image</label>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <input
                      type="text"
                      placeholder="Image Path or URL (e.g. /images/img_5.jpg)"
                      value={newProd.image}
                      onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                      className="w-full p-2 bg-white border border-slate-300 rounded text-xs"
                    />
                    <label className="shrink-0 flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3 py-2 rounded cursor-pointer transition">
                      {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                      <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleImageUpload(file, (url) => setNewProd({ ...newProd, image: url }));
                          }
                        }}
                      />
                    </label>
                  </div>
                  {newProd.image && (
                    <div className="mt-2 flex items-center gap-2">
                      <img src={newProd.image} alt="Preview" className="w-12 h-12 object-cover rounded border border-slate-300" />
                      <span className="text-[10px] text-slate-500">Image Preview</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setIsAddProdOpen(false)}
                    className="px-4 py-2 border border-slate-300 rounded text-xs font-semibold bg-white hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (newProd.title && newProd.category) {
                        const addedTitle = newProd.title;
                        addProduct({
                          title: newProd.title || '',
                          category: newProd.category || '',
                          categorySummary: newProd.categorySummary || `${newProd.category} range`,
                          description: newProd.description || '',
                          image: newProd.image || '/images/img_5.jpg',
                          price: newProd.price || 'Ask Price',
                          minimumOrderQuantity: newProd.minimumOrderQuantity || '1 Unit',
                          available: newProd.available !== false,
                          subServices: [newProd.title || ''],
                          specifications: newProd.specifications || {}
                        });
                        setIsAddProdOpen(false);
                        showConfirmation(`Product "${addedTitle}" saved & published successfully!`);
                        setNewProd({
                          title: '',
                          category: 'Electric Heater',
                          categorySummary: '',
                          description: '',
                          image: '/images/img_5.jpg',
                          price: 'Ask Price',
                          minimumOrderQuantity: '1 Unit',
                          available: true,
                          subServices: [],
                          specifications: {}
                        });
                      } else {
                        alert('Title and Category are required!');
                      }
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded transition"
                  >
                    Save Product
                  </button>
                </div>
              </div>
            )}

            {/* Products Responsive List / Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Product Title & Image</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">MOQ</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-50/80 transition">
                        <td className="p-3 font-semibold text-slate-900 flex items-center gap-2.5">
                          <img src={prod.image} alt="" className="w-9 h-9 rounded object-cover border border-slate-200 shrink-0 bg-white" />
                          <span className="line-clamp-1">{prod.title}</span>
                        </td>
                        <td className="p-3 text-slate-600 whitespace-nowrap">{prod.category}</td>
                        <td className="p-3 font-medium text-emerald-700 whitespace-nowrap">{prod.price}</td>
                        <td className="p-3 text-slate-500 whitespace-nowrap">{prod.minimumOrderQuantity}</td>
                        <td className="p-3 whitespace-nowrap">
                          <button
                            onClick={() => {
                              const newStatus = prod.available === false;
                              updateProduct(prod.id, { available: newStatus });
                              showConfirmation(`Product "${prod.title}" availability status changed to ${newStatus ? 'In Stock ✓' : 'Out of Stock ✕'}.`);
                            }}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer transition hover:scale-105 ${
                              prod.available !== false ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-red-100 text-red-800 border border-red-300'
                            }`}
                            title="Click to toggle availability status"
                          >
                            {prod.available !== false ? 'In Stock ✓' : 'Out of Stock ✕'}
                          </button>
                        </td>
                        <td className="p-3 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => setEditingProd(prod)}
                            className="p-1.5 text-[#383a7c] hover:bg-blue-50 rounded transition"
                            title="Edit Product"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${prod.title}"?`)) {
                                deleteProduct(prod.id);
                                showConfirmation(`Product "${prod.title}" deleted from catalog.`, 'danger');
                              }
                            }}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Product Edit Modal */}
            {editingProd && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
                <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-slate-200 shadow-2xl my-8">
                  <div className="p-5 sm:p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-3rem)]">
                    <div className="flex items-center justify-between border-b pb-3">
                    <h3 className="font-bold text-base text-slate-900">Edit Product: {editingProd.title}</h3>
                    <button onClick={() => setEditingProd(null)} className="text-slate-400 hover:text-slate-700">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={editingProd.title}
                        onChange={(e) => setEditingProd({ ...editingProd, title: e.target.value })}
                        className="w-full p-2 border border-slate-300 rounded text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Category</label>
                      <input
                        type="text"
                        value={editingProd.category}
                        onChange={(e) => setEditingProd({ ...editingProd, category: e.target.value })}
                        className="w-full p-2 border border-slate-300 rounded text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Price String</label>
                      <input
                        type="text"
                        value={editingProd.price}
                        onChange={(e) => setEditingProd({ ...editingProd, price: e.target.value })}
                        className="w-full p-2 border border-slate-300 rounded text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Minimum Order Quantity (MOQ)</label>
                      <input
                        type="text"
                        value={editingProd.minimumOrderQuantity}
                        onChange={(e) => setEditingProd({ ...editingProd, minimumOrderQuantity: e.target.value })}
                        className="w-full p-2 border border-slate-300 rounded text-xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Availability Status</label>
                      <select
                        value={editingProd.available !== false ? 'true' : 'false'}
                        onChange={(e) => setEditingProd({ ...editingProd, available: e.target.value === 'true' })}
                        className="w-full p-2 border border-slate-300 rounded text-xs font-semibold text-slate-800"
                      >
                        <option value="true">In Stock (Available)</option>
                        <option value="false">Out of Stock (Unavailable)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Product Description</label>
                    <textarea
                      rows={3}
                      value={editingProd.description}
                      onChange={(e) => setEditingProd({ ...editingProd, description: e.target.value })}
                      className="w-full p-2 border border-slate-300 rounded text-xs leading-relaxed"
                    />
                  </div>

                  {/* Product Image Upload / URL */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Product Image</label>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <input
                        type="text"
                        value={editingProd.image}
                        onChange={(e) => setEditingProd({ ...editingProd, image: e.target.value })}
                        className="w-full p-2 border border-slate-300 rounded text-xs"
                      />
                      <label className="shrink-0 flex items-center gap-1.5 bg-[#383a7c] hover:bg-[#2c2e63] text-white font-bold text-xs px-3 py-2 rounded cursor-pointer transition">
                        {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                        <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(file, (url) => setEditingProd({ ...editingProd, image: url }));
                            }
                          }}
                        />
                      </label>
                    </div>
                    {editingProd.image && (
                      <div className="mt-2 flex items-center gap-2">
                        <img src={editingProd.image} alt="Preview" className="w-12 h-12 object-cover rounded border border-slate-300" />
                        <span className="text-[10px] text-slate-500">Current Image Preview</span>
                      </div>
                    )}
                  </div>

                  {/* Specifications Editor */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Technical Specifications</label>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
                      {Object.entries(editingProd.specifications || {}).map(([k, v]) => (
                        <div key={k} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={k}
                            readOnly
                            className="w-1/3 p-1.5 bg-slate-200 border border-slate-300 rounded text-xs font-semibold text-slate-700"
                          />
                          <input
                            type="text"
                            value={v}
                            onChange={(e) => {
                              const newSpecs = { ...editingProd.specifications, [k]: e.target.value };
                              setEditingProd({ ...editingProd, specifications: newSpecs });
                            }}
                            className="w-full p-1.5 border border-slate-300 rounded text-xs bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newSpecs = { ...editingProd.specifications };
                              delete newSpecs[k];
                              setEditingProd({ ...editingProd, specifications: newSpecs });
                            }}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="Remove specification"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                        <input
                          type="text"
                          placeholder="New Spec Key (e.g. Voltage)"
                          value={specKey}
                          onChange={(e) => setSpecKey(e.target.value)}
                          className="w-1/3 p-1.5 border border-slate-300 rounded text-xs bg-white"
                        />
                        <input
                          type="text"
                          placeholder="New Spec Value (e.g. 415V)"
                          value={specVal}
                          onChange={(e) => setSpecVal(e.target.value)}
                          className="w-full p-1.5 border border-slate-300 rounded text-xs bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (specKey && specVal) {
                              setEditingProd({
                                ...editingProd,
                                specifications: { ...editingProd.specifications, [specKey]: specVal }
                              });
                              setSpecKey('');
                              setSpecVal('');
                            }
                          }}
                          className="bg-[#383a7c] hover:bg-[#2c2e63] text-white px-3 py-1.5 rounded text-xs font-bold shrink-0 transition"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                      <button
                        onClick={() => setEditingProd(null)}
                        className="px-4 py-2 border border-slate-300 rounded text-xs font-semibold hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          const updatedTitle = editingProd.title;
                          updateProduct(editingProd.id, editingProd);
                          setEditingProd(null);
                          showConfirmation(`Product "${updatedTitle}" updated successfully! Changes saved globally.`);
                        }}
                        className="px-4 py-2 bg-[#383a7c] hover:bg-[#2c2e63] text-white rounded text-xs font-bold flex items-center gap-1.5 shadow-xs transition"
                      >
                        <Save className="w-3.5 h-3.5" /> Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Photos Gallery */}
        {activeTab === 'photos' && (
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <h2 className="font-bold text-sm text-slate-800">Photos & Media Gallery</h2>
                <p className="text-xs text-slate-500">Manage real on-site project installation images</p>
              </div>
              <button
                onClick={() => setIsAddPhotoOpen(true)}
                className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition"
              >
                <Plus className="w-4 h-4" /> Add Photo
              </button>
            </div>

            {/* Add Photo Form inline */}
            {isAddPhotoOpen && (
              <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl space-y-3">
                <h3 className="font-bold text-xs text-emerald-900">Add New Photo</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Photo Title"
                    value={newPhoto.title}
                    onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                    className="p-2 bg-white border border-slate-300 rounded text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Category (e.g. Project Installation)"
                    value={newPhoto.category}
                    onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                    className="p-2 bg-white border border-slate-300 rounded text-xs"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="text"
                    placeholder="Image Path or URL"
                    value={newPhoto.image}
                    onChange={(e) => setNewPhoto({ ...newPhoto, image: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded text-xs"
                  />
                  <label className="shrink-0 flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3 py-2 rounded cursor-pointer transition">
                    {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                    <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageUpload(file, (url) => setNewPhoto({ ...newPhoto, image: url }));
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button onClick={() => setIsAddPhotoOpen(false)} className="px-3 py-1.5 border rounded text-xs">
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (newPhoto.title && newPhoto.image) {
                        const photoTitle = newPhoto.title;
                        addPhoto({
                          title: newPhoto.title || '',
                          category: newPhoto.category || 'Project Installation',
                          image: newPhoto.image || '/images/img_5.jpg',
                          description: newPhoto.description || ''
                        });
                        setIsAddPhotoOpen(false);
                        showConfirmation(`Photo "${photoTitle}" added to gallery successfully!`);
                      }
                    }}
                    className="bg-emerald-600 text-white font-bold text-xs px-3 py-1.5 rounded"
                  >
                    Save Photo
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.photos.map((item) => (
                <div key={item.id} className="border border-slate-200 rounded-lg overflow-hidden bg-white relative group shadow-xs">
                  <img src={item.image} alt="" className="w-full h-40 object-cover" />
                  <div className="p-3">
                    <h3 className="font-bold text-xs text-slate-800">{item.title}</h3>
                    <p className="text-[11px] text-slate-500">{item.category}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Delete photo "${item.title}"?`)) {
                        deletePhoto(item.id);
                        showConfirmation(`Photo removed from gallery.`, 'danger');
                      }
                    }}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full opacity-90 sm:opacity-0 group-hover:opacity-100 transition shadow-md cursor-pointer"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Ratings & Reviews */}
        {activeTab === 'reviews' && (
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <h2 className="font-bold text-sm text-slate-800">Client Testimonials & Ratings</h2>
                <p className="text-xs text-slate-500">Manage client reviews shown on website</p>
              </div>
              <button
                onClick={() => setIsAddReviewOpen(!isAddReviewOpen)}
                className="flex items-center justify-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition"
              >
                <Plus className="w-4 h-4" /> {isAddReviewOpen ? 'Cancel' : 'Add Review'}
              </button>
            </div>

            {/* Add Review Inline Form */}
            {isAddReviewOpen && (
              <div className="bg-amber-50/80 border border-amber-300 p-4 rounded-xl space-y-3">
                <h3 className="font-bold text-xs text-amber-900">Post New Client Review</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Author / Client Name *"
                    value={newAdminReview.author}
                    onChange={(e) => setNewAdminReview({ ...newAdminReview, author: e.target.value })}
                    className="p-2 bg-white border border-slate-300 rounded text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={newAdminReview.company}
                    onChange={(e) => setNewAdminReview({ ...newAdminReview, company: e.target.value })}
                    className="p-2 bg-white border border-slate-300 rounded text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Location (e.g. Greater Noida)"
                    value={newAdminReview.location}
                    onChange={(e) => setNewAdminReview({ ...newAdminReview, location: e.target.value })}
                    className="p-2 bg-white border border-slate-300 rounded text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Product Sourced (optional)"
                    value={newAdminReview.productName}
                    onChange={(e) => setNewAdminReview({ ...newAdminReview, productName: e.target.value })}
                    className="p-2 bg-white border border-slate-300 rounded text-xs"
                  />

                  <select
                    value={newAdminReview.rating}
                    onChange={(e) => setNewAdminReview({ ...newAdminReview, rating: Number(e.target.value) })}
                    className="p-2 bg-white border border-slate-300 rounded text-xs font-bold text-amber-600"
                  >
                    <option value={5}>5 ★★★★★ (Excellent)</option>
                    <option value={4}>4 ★★★★☆ (Good)</option>
                    <option value={3}>3 ★★★☆☆ (Average)</option>
                    <option value={2}>2 ★★☆☆☆ (Below Average)</option>
                    <option value={1}>1 ★☆☆☆☆ (Poor)</option>
                  </select>
                </div>

                <textarea
                  rows={3}
                  placeholder="Review comment *"
                  value={newAdminReview.comment}
                  onChange={(e) => setNewAdminReview({ ...newAdminReview, comment: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-300 rounded text-xs"
                />

                <div className="flex justify-end gap-2 pt-2">
                  <button onClick={() => setIsAddReviewOpen(false)} className="px-3 py-1.5 border rounded text-xs">
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (newAdminReview.author && newAdminReview.comment) {
                        const reviewAuthor = newAdminReview.author;
                        addTestimonial({
                          author: newAdminReview.author,
                          company: newAdminReview.company || 'Verified Client',
                          location: newAdminReview.location || 'Greater Noida',
                          rating: Number(newAdminReview.rating),
                          comment: newAdminReview.comment,
                          productName: newAdminReview.productName || 'Thermal System',
                          date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                        });
                        setIsAddReviewOpen(false);
                        showConfirmation(`Client review by "${reviewAuthor}" published successfully!`);
                        setNewAdminReview({
                          author: '',
                          company: '',
                          location: '',
                          rating: 5,
                          comment: '',
                          productName: '',
                        });
                      } else {
                        alert('Please enter Author name and Review comment.');
                      }
                    }}
                    className="bg-amber-600 text-white font-bold text-xs px-3 py-1.5 rounded hover:bg-amber-700 transition"
                  >
                    Save Review
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {data.testimonials.map((t) => (
                <div key={t.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-xs text-slate-900">{t.author} - <span className="text-amber-600">{t.company}</span> ({t.rating} ★)</h3>
                    <p className="text-xs text-slate-600 mt-1">"{t.comment}"</p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm(`Delete review by "${t.author}"?`)) {
                        deleteTestimonial(t.id);
                        showConfirmation(`Review by "${t.author}" deleted successfully.`, 'danger');
                      }
                    }}
                    className="text-red-600 hover:bg-red-50 p-2 rounded transition shrink-0 cursor-pointer"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Company & About Us Profile */}
        {activeTab === 'company' && (
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="font-bold text-base text-slate-800">About Us & Company Profile Settings</h2>
              <p className="text-xs text-slate-500 mt-0.5">Edit company overview narrative, factsheet metrics, and legal business details</p>
            </div>

            {/* Narrative Overview Section */}
            <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="font-bold text-xs text-[#383a7c] uppercase tracking-wide">About Us Narrative Description</h3>
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Short Overview (Homepage summary snippet)</label>
                <textarea
                  rows={3}
                  value={data.about.description}
                  onChange={(e) => updateAbout({ description: e.target.value })}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs leading-relaxed focus:ring-2 focus:ring-[#383a7c]"
                  placeholder="Short introductory summary for homepage..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Detailed Narrative (Read More / Profile view)</label>
                <textarea
                  rows={6}
                  value={data.about.fullDescription || data.about.description}
                  onChange={(e) => updateAbout({ fullDescription: e.target.value })}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs leading-relaxed focus:ring-2 focus:ring-[#383a7c]"
                  placeholder="Complete business history, manufacturing facilities, equipment capabilities..."
                />
              </div>
            </div>

            {/* Factsheet & Corporate Details */}
            <div className="space-y-4">
              <h3 className="font-bold text-xs text-[#383a7c] uppercase tracking-wide">Factsheet & Statutory Metrics</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700">Company Name</label>
                  <input
                    type="text"
                    value={data.company.name}
                    onChange={(e) => updateCompany({ name: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700">Nature of Business</label>
                  <input
                    type="text"
                    value={data.company.natureOfBusiness || 'Manufacturer & Service Provider'}
                    onChange={(e) => updateCompany({ natureOfBusiness: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700">Legal Status of Firm</label>
                  <input
                    type="text"
                    value={data.company.legalStatus || 'Sole Proprietorship'}
                    onChange={(e) => updateCompany({ legalStatus: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700">Total Number of Employees</label>
                  <input
                    type="text"
                    value={data.company.employeeCount || '26 to 50 People'}
                    onChange={(e) => updateCompany({ employeeCount: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700">CEO / Managing Director</label>
                  <input
                    type="text"
                    value={data.about.ceoName || 'Mr. A. B. N. Sharma'}
                    onChange={(e) => updateAbout({ ceoName: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700">Established Year</label>
                  <input
                    type="number"
                    value={data.about.establishedYear || 2011}
                    onChange={(e) => updateAbout({ establishedYear: Number(e.target.value) })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700">GST Number</label>
                  <input
                    type="text"
                    value={data.company.gstNumber}
                    onChange={(e) => updateCompany({ gstNumber: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700">Primary Phone</label>
                  <input
                    type="text"
                    value={data.company.phonePrimary}
                    onChange={(e) => updateCompany({ phonePrimary: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700">Primary Email</label>
                  <input
                    type="text"
                    value={data.company.email}
                    onChange={(e) => updateCompany({ email: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-slate-700">City / Location</label>
                  <input
                    type="text"
                    value={data.company.city}
                    onChange={(e) => updateCompany({ city: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold mb-1 text-slate-700">Full Business Address</label>
                  <input
                    type="text"
                    value={data.company.address}
                    onChange={(e) => updateCompany({ address: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-200">
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-md border border-emerald-200">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Changes save automatically and reflect globally across the website</span>
              </div>
              <button
                onClick={() => showConfirmation("Company profile & About Us details saved and updated globally!")}
                className="bg-[#383a7c] hover:bg-[#2c2e63] text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Company Details
              </button>
            </div>
          </div>
        )}

        {/* Tab 5: Quote Inquiries / Leads */}
        {activeTab === 'inquiries' && (
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h2 className="font-bold text-base text-slate-900">Received Price Quote Inquiries ({(data.inquiries || []).length})</h2>
                <p className="text-xs text-slate-500">Live lead submissions received from website visitors requesting price quotes</p>
              </div>
            </div>

            {(data.inquiries || []).length === 0 ? (
              <div className="p-12 text-center text-slate-400 space-y-2">
                <Inbox className="w-12 h-12 mx-auto text-slate-300" />
                <p className="font-bold text-sm">No price quote inquiries received yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {(data.inquiries || []).map((inq) => (
                  <div
                    key={inq.id}
                    className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3 hover:border-slate-300 transition"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
                      <div className="flex items-center gap-3">
                        {inq.productImage && (
                          <img
                            src={inq.productImage}
                            alt=""
                            className="w-12 h-12 object-contain bg-white p-1 rounded-lg border border-slate-200 shrink-0"
                          />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-extrabold text-sm text-slate-900">{inq.name}</h3>
                            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                              {inq.productCategory || 'Product Quote'}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-[#383a7c] mt-0.5">{inq.productTitle}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {inq.date}
                        </span>
                        <button
                          onClick={() => {
                            if (confirm(`Delete lead entry for "${inq.name}"?`)) {
                              deleteInquiry(inq.id);
                              showConfirmation(`Lead entry for "${inq.name}" deleted.`, 'danger');
                            }
                          }}
                          className="text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition cursor-pointer"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center gap-2 bg-white p-2.5 rounded-lg border border-slate-200">
                        <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold block">Mobile Contact:</span>
                          <a href={`tel:${inq.phone}`} className="font-extrabold text-slate-900 hover:text-emerald-700">
                            {inq.phone}
                          </a>
                        </div>
                      </div>

                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-400 font-semibold block">Client Specific Requirements:</span>
                        <p className="text-slate-800 font-medium leading-relaxed mt-0.5">
                          {inq.notes || 'Standard quote requested.'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <DataProvider>
      <AdminContent />
    </DataProvider>
  );
}
