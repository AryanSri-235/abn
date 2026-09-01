'use client';

import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { X, Save, Plus, Trash2, RotateCcw, Building, Info, Layers, FileCode, Camera, Image as ImageIcon } from 'lucide-react';

export const AdminModal: React.FC = () => {
  const {
    data,
    isAdminOpen,
    setIsAdminOpen,
    updateCompany,
    updateAbout,
    addProduct,
    deleteProduct,
    addPhoto,
    deletePhoto,
    addHsnCode,
    deleteHsnCode,
    resetToDefault,
  } = useData();

  const [activeTab, setActiveTab] = useState<'company' | 'about' | 'products' | 'hsn' | 'photos'>('company');

  // Form States
  const [compForm, setCompForm] = useState(data.company);
  const [aboutForm, setAboutForm] = useState(data.about);
  const [newCompanyImg, setNewCompanyImg] = useState('');

  // New Product Form
  const [newProd, setNewProd] = useState({
    title: '',
    category: 'Installation Service',
    description: '',
    image: '/images/img_5.jpg',
    price: 'Get Best Price',
    subServicesStr: '',
    available: true,
  });

  // New Photo Form
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    category: 'Installation Service',
    image: '/images/img_5.jpg',
    description: '',
  });

  // New HSN Form
  const [newHsn, setNewHsn] = useState({
    code: '',
    description: '',
  });

  if (!isAdminOpen) return null;

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompany(compForm);
    alert('Company details updated successfully!');
  };

  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    updateAbout(aboutForm);
    alert('About Us section updated successfully!');
  };

  const handleAddCompanyImage = () => {
    if (!newCompanyImg.trim()) return;
    const currentImgs = aboutForm.companyImages || [];
    const updatedImgs = [...currentImgs, newCompanyImg.trim()];
    const updatedAbout = { ...aboutForm, companyImages: updatedImgs };
    setAboutForm(updatedAbout);
    updateAbout(updatedAbout);
    setNewCompanyImg('');
  };

  const handleRemoveCompanyImage = (index: number) => {
    const currentImgs = aboutForm.companyImages || [];
    const updatedImgs = currentImgs.filter((_, i) => i !== index);
    const updatedAbout = { ...aboutForm, companyImages: updatedImgs };
    setAboutForm(updatedAbout);
    updateAbout(updatedAbout);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.title) return;
    const subServices = newProd.subServicesStr
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    addProduct({
      title: newProd.title,
      category: newProd.category,
      description: newProd.description,
      image: newProd.image || '/images/img_5.jpg',
      price: newProd.price || 'Get Best Price',
      subServices,
      available: true,
    });

    setNewProd({
      title: '',
      category: 'Installation Service',
      description: '',
      image: '/images/img_5.jpg',
      price: 'Get Best Price',
      subServicesStr: '',
      available: true,
    });
    alert('Product added successfully!');
  };

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.title) return;
    await addPhoto({
      title: newPhoto.title,
      category: newPhoto.category,
      image: newPhoto.image || '/images/img_5.jpg',
      description: newPhoto.description,
    });
    setNewPhoto({
      title: '',
      category: 'Installation Service',
      image: '/images/img_5.jpg',
      description: '',
    });
    alert('Photo saved to Neon PostgreSQL Database successfully!');
  };

  const handleAddHsn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHsn.code || !newHsn.description) return;
    addHsnCode(newHsn);
    setNewHsn({ code: '', description: '' });
    alert('HSN Code added successfully!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-slate-300 rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden min-h-0">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800 rounded-t-xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-sm">
              ⚙
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Client Content Control Panel</h3>
              <p className="text-[11px] text-slate-400">Edit company profile, services, photos, and HSN codes saved directly in Neon PostgreSQL DB</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm('Reset all content back to original IndiaMART defaults?')) {
                  resetToDefault();
                  setCompForm(data.company);
                  setAboutForm(data.about);
                }
              }}
              className="flex items-center gap-1 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 text-xs px-2.5 py-1 rounded transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
            <button
              onClick={() => setIsAdminOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Tabs Navigation */}
        <div className="bg-slate-100 border-b border-slate-300 flex items-center gap-1 p-2 overflow-x-auto scrollbar-none text-xs font-bold">
          <button
            onClick={() => setActiveTab('company')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded transition ${
              activeTab === 'company' ? 'bg-[#383a7c] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Building className="w-3.5 h-3.5" /> Company Info
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded transition ${
              activeTab === 'about' ? 'bg-[#383a7c] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Info className="w-3.5 h-3.5" /> About Us
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded transition ${
              activeTab === 'products' ? 'bg-[#383a7c] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Products ({data.products.length})
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded transition ${
              activeTab === 'photos' ? 'bg-[#383a7c] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Camera className="w-3.5 h-3.5" /> Photos DB ({data.photos.length})
          </button>
          <button
            onClick={() => setActiveTab('hsn')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded transition ${
              activeTab === 'hsn' ? 'bg-[#383a7c] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" /> HSN Codes ({data.hsnCodes.length})
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="p-6 overflow-y-auto flex-1 min-h-0 overscroll-contain">
          
          {/* TAB 1: Company Info */}
          {activeTab === 'company' && (
            <form onSubmit={handleSaveCompany} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={compForm.name}
                    onChange={(e) => setCompForm({ ...compForm, name: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#383a7c]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={compForm.tagline}
                    onChange={(e) => setCompForm({ ...compForm, tagline: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#383a7c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">City</label>
                  <input
                    type="text"
                    value={compForm.city}
                    onChange={(e) => setCompForm({ ...compForm, city: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#383a7c]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    value={compForm.state}
                    onChange={(e) => setCompForm({ ...compForm, state: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#383a7c]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nature of Business</label>
                  <input
                    type="text"
                    value={compForm.natureOfBusiness}
                    onChange={(e) => setCompForm({ ...compForm, natureOfBusiness: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#383a7c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Legal Status</label>
                  <input
                    type="text"
                    value={compForm.legalStatus}
                    onChange={(e) => setCompForm({ ...compForm, legalStatus: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#383a7c]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Employees</label>
                  <input
                    type="text"
                    value={compForm.employeeCount}
                    onChange={(e) => setCompForm({ ...compForm, employeeCount: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#383a7c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">GST Number</label>
                  <input
                    type="text"
                    value={compForm.gstNumber}
                    onChange={(e) => setCompForm({ ...compForm, gstNumber: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#383a7c]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">GST Registration Date</label>
                  <input
                    type="text"
                    value={compForm.gstRegistrationDate}
                    onChange={(e) => setCompForm({ ...compForm, gstRegistrationDate: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#383a7c]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Years in Business</label>
                  <input
                    type="number"
                    value={compForm.yearsInBusiness}
                    onChange={(e) => setCompForm({ ...compForm, yearsInBusiness: parseInt(e.target.value) || 0 })}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#383a7c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Primary</label>
                  <input
                    type="text"
                    value={compForm.phonePrimary}
                    onChange={(e) => setCompForm({ ...compForm, phonePrimary: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#383a7c]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={compForm.email}
                    onChange={(e) => setCompForm({ ...compForm, email: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#383a7c]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#383a7c] hover:bg-[#2b2d63] text-white font-bold px-4 py-2 rounded text-xs transition flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" /> Save Company Details
              </button>
            </form>
          )}

          {/* TAB 2: About Us */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <form onSubmit={handleSaveAbout} className="space-y-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Summary Description (Home page preview)</label>
                  <textarea
                    rows={3}
                    value={aboutForm.description}
                    onChange={(e) => setAboutForm({ ...aboutForm, description: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#383a7c]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Description (+ Read More expanded text)</label>
                  <textarea
                    rows={4}
                    value={aboutForm.fullDescription || ''}
                    onChange={(e) => setAboutForm({ ...aboutForm, fullDescription: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#383a7c]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Year of Establishment</label>
                    <input
                      type="number"
                      value={aboutForm.establishedYear}
                      onChange={(e) => setAboutForm({ ...aboutForm, establishedYear: parseInt(e.target.value) || 2011 })}
                      className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#383a7c]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Company CEO / Key Founder</label>
                    <input
                      type="text"
                      value={aboutForm.ceoName}
                      onChange={(e) => setAboutForm({ ...aboutForm, ceoName: e.target.value })}
                      className="w-full border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#383a7c]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-[#383a7c] hover:bg-[#2b2d63] text-white font-bold px-4 py-2 rounded text-xs transition flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Save About Us Section
                </button>
              </form>

              {/* Company Album Images Sub-section */}
              <div className="border-t border-slate-200 pt-6 space-y-4">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#383a7c]" /> Manage Company Album Images
                </h4>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter image URL or asset path (e.g. /images/img_5.jpg)"
                    value={newCompanyImg}
                    onChange={(e) => setNewCompanyImg(e.target.value)}
                    className="flex-1 border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#383a7c]"
                  />
                  <button
                    type="button"
                    onClick={handleAddCompanyImage}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded text-xs transition flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Add Image
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(aboutForm.companyImages || []).map((img, idx) => (
                    <div key={idx} className="border border-slate-200 rounded p-2 bg-slate-50 flex flex-col justify-between space-y-2">
                      <div className="h-24 bg-white border border-slate-200 rounded overflow-hidden flex items-center justify-center p-1">
                        <img src={img} alt={`Album ${idx + 1}`} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] text-slate-500 truncate flex-1">{img}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCompanyImage(idx)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: Products & Services */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              {/* Add New Product Form */}
              <form onSubmit={handleAddProduct} className="bg-slate-50 border border-slate-300 rounded-lg p-4 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase flex items-center gap-1">
                  <Plus className="w-4 h-4 text-emerald-600" /> Add New Service / Product Group
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Service Title *</label>
                    <input
                      type="text"
                      required
                      value={newProd.title}
                      onChange={(e) => setNewProd({ ...newProd, title: e.target.value })}
                      className="w-full border border-slate-300 rounded px-3 py-1.5 text-xs"
                      placeholder="e.g. Utility Piping Installation"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                    <select
                      value={newProd.category}
                      onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                      className="w-full border border-slate-300 rounded px-3 py-1.5 text-xs bg-white"
                    >
                      <option value="Installation Service">Installation Service</option>
                      <option value="Insulation Service">Insulation Service</option>
                      <option value="Electric Heater">Electric Heater</option>
                      <option value="Fire Alarm System Service">Fire Alarm System Service</option>
                      <option value="Industrial Chimney">Industrial Chimney</option>
                      <option value="Turnkey Electrical Project Service">Turnkey Electrical Project Service</option>
                      <option value="Heating Coil">Heating Coil</option>
                      <option value="Storage Tank">Storage Tank</option>
                      <option value="Electrical Control Panel">Electrical Control Panel</option>
                      <option value="Stainless Steel Conveyor">Stainless Steel Conveyor</option>
                      <option value="Ms Tanks">Ms Tanks</option>
                      <option value="Solar Power Plant">Solar Power Plant</option>
                      <option value="HSD Underground Tank">HSD Underground Tank</option>
                      <option value="Stainless Steel Flat Belt Conveyor">Stainless Steel Flat Belt Conveyor</option>
                      <option value="Flexible Heating Jacket">Flexible Heating Jacket</option>
                      <option value="Heat Trace Cable">Heat Trace Cable</option>
                      <option value="Fire Fighting System AMC Service">Fire Fighting System AMC Service</option>
                      <option value="Fire Fighting Service">Fire Fighting Service</option>
                      <option value="Duct">Duct</option>
                      <option value="Cathodic Protection Services">Cathodic Protection Services</option>
                      <option value="Electric Heaters">Electric Heaters</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Image URL / Path</label>
                    <input
                      type="text"
                      value={newProd.image}
                      onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                      className="w-full border border-slate-300 rounded px-3 py-1.5 text-xs"
                      placeholder="/images/img_5.jpg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Price String</label>
                    <input
                      type="text"
                      value={newProd.price}
                      onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                      className="w-full border border-slate-300 rounded px-3 py-1.5 text-xs"
                      placeholder="e.g. Rs 450 / Meter or Ask Price"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={newProd.description}
                    onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-1.5 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded text-xs transition flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add Product / Service
                </button>
              </form>

              {/* Products List Table */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase">Existing Products ({data.products.length})</h4>
                <div className="divide-y divide-slate-200 border border-slate-300 rounded-lg overflow-hidden bg-white text-xs">
                  {data.products.map((prod) => (
                    <div key={prod.id} className="p-3 flex items-center justify-between gap-3 hover:bg-slate-50">
                      <div className="flex items-center gap-3">
                        <img src={prod.image} alt={prod.title} className="w-10 h-10 object-contain rounded bg-white border border-slate-200 p-1 shrink-0" />
                        <div>
                          <h5 className="font-bold text-slate-900">{prod.title}</h5>
                          <span className="text-[11px] text-[#283593] font-semibold">{prod.category}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Delete product "${prod.title}"?`)) {
                            deleteProduct(prod.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-800 p-1.5 rounded hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Photos DB */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              <form onSubmit={handleAddPhoto} className="bg-slate-50 border border-slate-300 rounded-lg p-4 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase flex items-center gap-1">
                  <Plus className="w-4 h-4 text-emerald-600" /> Save New Photo to Neon PostgreSQL DB
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Photo Title *</label>
                    <input
                      type="text"
                      required
                      value={newPhoto.title}
                      onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                      className="w-full border border-slate-300 rounded px-3 py-1.5 text-xs"
                      placeholder="e.g. Mild Steel Chemical Storage Tank"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                    <select
                      value={newPhoto.category}
                      onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                      className="w-full border border-slate-300 rounded px-3 py-1.5 text-xs bg-white"
                    >
                      <option value="Storage Tank">Storage Tank</option>
                      <option value="Heating Coil">Heating Coil</option>
                      <option value="Turnkey Electrical">Turnkey Electrical</option>
                      <option value="Fire Alarm Service">Fire Alarm Service</option>
                      <option value="Industrial Chimney">Industrial Chimney</option>
                      <option value="Electric Heater">Electric Heater</option>
                      <option value="Insulation Service">Insulation Service</option>
                      <option value="Installation Service">Installation Service</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Image URL / Path</label>
                  <input
                    type="text"
                    value={newPhoto.image}
                    onChange={(e) => setNewPhoto({ ...newPhoto, image: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-1.5 text-xs"
                    placeholder="/images/img_5.jpg"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={newPhoto.description}
                    onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
                    className="w-full border border-slate-300 rounded px-3 py-1.5 text-xs"
                    placeholder="Short description of the photo"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded text-xs transition flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Save Photo to Database
                </button>
              </form>

              {/* Photos List */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase">Neon DB Photos ({data.photos.length})</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.photos.map((ph) => (
                    <div key={ph.id} className="border border-slate-300 rounded-lg p-3 bg-white flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={ph.image} alt={ph.title} className="w-12 h-12 object-contain rounded bg-white border border-slate-200 p-1 shrink-0" />
                        <div>
                          <h5 className="font-bold text-slate-900 text-xs">{ph.title}</h5>
                          <span className="text-[10px] text-[#283593] font-bold">{ph.category}</span>
                        </div>
                      </div>
                      <button
                        onClick={async () => {
                          if (confirm(`Delete photo "${ph.title}" from Neon DB?`)) {
                            await deletePhoto(ph.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-800 p-1.5 rounded hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: HSN Codes */}
          {activeTab === 'hsn' && (
            <div className="space-y-6">
              <form onSubmit={handleAddHsn} className="bg-slate-50 border border-slate-300 rounded-lg p-4 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase flex items-center gap-1">
                  <Plus className="w-4 h-4 text-emerald-600" /> Add New HSN Code
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">HSN Code *</label>
                    <input
                      type="text"
                      required
                      value={newHsn.code}
                      onChange={(e) => setNewHsn({ ...newHsn, code: e.target.value })}
                      className="w-full border border-slate-300 rounded px-3 py-1.5 text-xs font-mono"
                      placeholder="e.g. 73110090"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">Description *</label>
                    <input
                      type="text"
                      required
                      value={newHsn.description}
                      onChange={(e) => setNewHsn({ ...newHsn, description: e.target.value })}
                      className="w-full border border-slate-300 rounded px-3 py-1.5 text-xs"
                      placeholder="Description of the HSN item"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded text-xs transition flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add HSN Code
                </button>
              </form>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase">Existing HSN Codes ({data.hsnCodes.length})</h4>
                <div className="divide-y divide-slate-200 border border-slate-300 rounded-lg overflow-hidden bg-white text-xs">
                  {data.hsnCodes.map((hsn) => (
                    <div key={hsn.id} className="p-3 flex items-start justify-between gap-3 hover:bg-slate-50">
                      <div>
                        <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {hsn.code}
                        </span>
                        <p className="text-slate-600 text-xs mt-1 leading-relaxed">{hsn.description}</p>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Delete HSN Code ${hsn.code}?`)) {
                            deleteHsnCode(hsn.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-800 p-1.5 rounded hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
