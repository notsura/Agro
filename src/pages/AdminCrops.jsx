import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Sprout,
    X,
    Target
} from 'lucide-react';
import { api } from '../services/api';

const AdminCrops = () => {
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [editingCrop, setEditingCrop] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const fetchCrops = async () => {
        try {
            const data = await api.get('/crops');
            setCrops(data);
        } catch (err) {
            console.error('Failed to fetch crops:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCrops();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this crop? This action cannot be undone.')) {
            try {
                await api.delete(`/admin/crops/${id}`);
                fetchCrops();
            } catch (err) {
                alert('Delete failed');
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingCrop._id) {
                await api.put(`/admin/crops/${editingCrop._id}`, editingCrop);
            } else {
                await api.post('/admin/crops', editingCrop);
            }
            setIsFormOpen(false);
            fetchCrops();
        } catch (err) {
            alert('Save failed');
        }
    };

    const filteredCrops = crops.filter(c => (c.name || '').toLowerCase().includes(search.toLowerCase()));

    const openForm = (crop = null) => {
        setEditingCrop(crop || {
            name: '',
            category: 'Grain',
            growing_season: 'Kharif',
            avg_duration: '120 Days',
            soil_preference: 'Alluvial',
            water_requirement: 'Moderate',
            routine: [],
            alerts: []
        });
        setIsFormOpen(true);
    };

    return (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem' }}>Crop Library Management</h1>
                    <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Update roadmaps, tips, and cultivation parameters.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ position: 'relative', width: '320px' }}>
                        <Search style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
                        <input
                            type="text"
                            placeholder="Search knowledge base..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ width: '100%', padding: '1.1rem 1.1rem 1.1rem 3.75rem', borderRadius: '16px', border: '1px solid var(--border)', background: 'white', fontWeight: 600, fontSize: '0.95rem' }}
                        />
                    </div>
                    <button onClick={() => openForm()} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem 1.75rem' }}>
                        <Plus size={20} /> New Crop
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.75rem' }}>
                {loading ? (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '6rem', color: 'var(--text-muted)', fontWeight: 700, fontSize: '1.1rem' }}>Synchronizing agricultural records...</div>
                ) : filteredCrops.length === 0 ? (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '6rem', color: 'var(--text-muted)', fontWeight: 700, fontSize: '1.1rem' }}>No crops found. Try a different search.</div>
                ) : filteredCrops.map(crop => (
                    <motion.div
                        key={crop._id}
                        className="card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ padding: '2rem', borderRadius: '28px', position: 'relative', background: 'white', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.03)' }}
                    >
                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div style={{ width: '90px', height: '90px', background: '#f8fafc', borderRadius: '20px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f1f5f9' }}>
                                {crop.image ? <img src={crop.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Sprout size={36} color="var(--primary)" />}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>{crop.category}</div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontWeight: 800 }}>{crop.name}</h3>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'var(--primary-light)', padding: '0.35rem 0.75rem', borderRadius: '8px', color: 'var(--primary)' }}>{crop.growing_season}</span>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#f1f5f9', padding: '0.35rem 0.75rem', borderRadius: '8px', color: 'var(--text-muted)' }}>{crop.soil_preference}</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem', padding: '1.25rem', background: '#f8fafc', borderRadius: '18px' }}>
                            <div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Lifecycle</div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{crop.avg_duration}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Moisture</div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{crop.water_requirement}</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={() => openForm(crop)}
                                style={{ flex: 1, padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'white', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', fontSize: '0.9rem', transition: 'all 0.2s ease' }}
                                className="btn-hover-light"
                            >
                                <Edit2 size={16} /> Edit Details
                            </button>
                            <button
                                onClick={() => handleDelete(crop._id)}
                                style={{ padding: '0.85rem', width: '50px', borderRadius: '12px', border: 'none', background: '#fee2e2', color: '#ef4444', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal Form Overlay */}
            <AnimatePresence>
                {isFormOpen && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(10px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 30, scale: 0.95 }}
                            style={{ background: 'white', borderRadius: '32px', width: '100%', maxWidth: '850px', maxHeight: '90vh', overflowY: 'auto', padding: '3.5rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                                <div>
                                    <h2 style={{ fontSize: '2rem', marginBottom: '0.4rem', fontWeight: 800 }}>{editingCrop._id ? 'Refine Crop Intel' : 'New Agricultural Entry'}</h2>
                                    <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Configure the core parameters for this cultivation roadmap.</p>
                                </div>
                                <button onClick={() => setIsFormOpen(false)} style={{ border: 'none', background: '#f1f5f9', cursor: 'pointer', color: 'var(--text-muted)', width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                                    <div className="input-group">
                                        <label style={{ fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.8rem', display: 'block', color: 'var(--text)' }}>Varity Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g., Basmati Rice, Hybrid Tomato"
                                            value={editingCrop.name}
                                            onChange={(e) => setEditingCrop({ ...editingCrop, name: e.target.value })}
                                            required
                                            style={{ width: '100%', padding: '1.1rem 1.25rem', borderRadius: '16px', border: '2px solid #f1f5f9', background: '#f8fafc', fontSize: '1rem', fontWeight: 600 }}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label style={{ fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.8rem', display: 'block', color: 'var(--text)' }}>Classification</label>
                                        <select
                                            value={editingCrop.category}
                                            onChange={(e) => setEditingCrop({ ...editingCrop, category: e.target.value })}
                                            style={{ width: '100%', padding: '1.1rem 1.25rem', borderRadius: '16px', border: '2px solid #f1f5f9', background: '#f8fafc', fontSize: '1rem', fontWeight: 600 }}
                                        >
                                            <option>Grain</option>
                                            <option>Vegetable</option>
                                            <option>Fruit</option>
                                            <option>Commercial</option>
                                            <option>Oilseed</option>
                                            <option>Fiber</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                                    <div className="input-group">
                                        <label style={{ fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.8rem', display: 'block', color: 'var(--text)' }}>Growing Season</label>
                                        <input
                                            type="text"
                                            placeholder="Kharif / Rabi / Zaid"
                                            value={editingCrop.growing_season}
                                            onChange={(e) => setEditingCrop({ ...editingCrop, growing_season: e.target.value })}
                                            style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '14px', border: '2px solid #f1f5f9', background: '#f8fafc', fontWeight: 600 }}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label style={{ fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.8rem', display: 'block', color: 'var(--text)' }}>Soil Preference</label>
                                        <input
                                            type="text"
                                            placeholder="Alluvial / Black / Clay"
                                            value={editingCrop.soil_preference}
                                            onChange={(e) => setEditingCrop({ ...editingCrop, soil_preference: e.target.value })}
                                            style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '14px', border: '2px solid #f1f5f9', background: '#f8fafc', fontWeight: 600 }}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label style={{ fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.8rem', display: 'block', color: 'var(--text)' }}>Water Intensity</label>
                                        <input
                                            type="text"
                                            placeholder="Low / Moderate / High"
                                            value={editingCrop.water_requirement}
                                            onChange={(e) => setEditingCrop({ ...editingCrop, water_requirement: e.target.value })}
                                            style={{ width: '100%', padding: '1rem 1.25rem', borderRadius: '14px', border: '2px solid #f1f5f9', background: '#f8fafc', fontWeight: 600 }}
                                        />
                                    </div>
                                </div>

                                <div style={{ marginTop: '2rem', display: 'flex', gap: '1.25rem' }}>
                                    <button
                                        type="button"
                                        onClick={() => setIsFormOpen(false)}
                                        style={{ flex: 1, padding: '1.25rem', borderRadius: '18px', border: '2px solid #f1f5f9', background: 'white', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer' }}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1.5, padding: '1.25rem', borderRadius: '18px', fontSize: '1.1rem', fontWeight: 900, boxShadow: 'var(--shadow-primary)' }}>
                                        {editingCrop._id ? 'Synchronize Updates' : 'Publish to Library'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminCrops;
