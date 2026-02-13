import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send,
    User,
    MessageSquare,
    Phone,
    Video,
    MoreVertical,
    Paperclip,
    Smile,
    ShieldCheck,
    Zap,
    Leaf,
    Droplets,
    TrendingUp,
    ArrowLeft,
    ChevronRight
} from 'lucide-react';

const ExpertChat = () => {
    const user = JSON.parse(localStorage.getItem('agro_user'));
    const [messages, setMessages] = useState([]);
    const [department, setDepartment] = useState(null);
    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);

    const departments = [
        { name: 'Crop Science', desc: 'Genetics, variety selection & growth cycles.', icon: <Leaf size={32} />, color: 'var(--primary)', bg: 'var(--primary-light)' },
        { name: 'Pest Control', desc: 'Biological & chemical defense protocols.', icon: <Droplets size={32} />, color: '#e84393', bg: '#fce4ec' },
        { name: 'Soil & Health', desc: 'Nutrient mapping & fertilization strategies.', icon: <Zap size={32} />, color: '#ff922b', bg: '#fff4e6' },
        { name: 'Market Intel', desc: 'Price hedging & regional trade logistics.', icon: <TrendingUp size={32} />, color: '#0984e3', bg: '#e1f5ff' },
        { name: 'Schemes', desc: 'Government grants & insurance guidance.', icon: <ShieldCheck size={32} />, color: '#2ed573', bg: '#eefcf5' }
    ];

    useEffect(() => {
        if (department) {
            setMessages([
                { sender: 'expert', text: `Hello! I am a specialist in ${department.name}. How can I assist you with your farming today, ${user ? user.fullname.split(' ')[0] : 'Farmer'}?`, time: '09:00 AM' }
            ]);
        }
    }, [department]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const userMsg = { sender: 'user', text: input, time };
        setMessages([...messages, userMsg]);
        setInput('');

        setTimeout(() => {
            const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const expertMsg = { sender: 'expert', text: `I've analyzed your query regarding ${department.name}. Based on current patterns, I recommend optimizing your strategy for the upcoming week. Would you like a detailed plan?`, time: botTime };
            setMessages(prev => [...prev, expertMsg]);
        }, 1500);
    };

    if (!department) {
        return (
            <div className="main-container section-padding">
                <header style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ background: 'var(--primary-light)', padding: '0.8rem', borderRadius: '16px' }}>
                                <MessageSquare color="var(--primary)" size={32} />
                            </div>
                        </div>
                        <h2 style={{ fontSize: '3.5rem' }}>Expert <span className="serif" style={{ color: 'var(--primary)', fontStyle: 'italic' }}>Consultation</span></h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0.75rem auto 0' }}>Direct 1-on-1 access to verified agricultural specialists and agronomists.</p>
                    </motion.div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                    {departments.map((dept, i) => (
                        <motion.div
                            key={dept.name}
                            className="card"
                            onClick={() => setDepartment(dept)}
                            style={{
                                padding: '3rem 2rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                borderRadius: '32px',
                                border: '2px solid transparent',
                                background: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1.5rem',
                                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10, borderColor: dept.color, boxShadow: `0 20px 40px ${dept.color}15` }}
                        >
                            <div style={{ background: dept.bg, color: dept.color, padding: '1.25rem', borderRadius: '24px' }}>{dept.icon}</div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{dept.name} Specialists</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500, lineHeight: 1.6 }}>{dept.desc}</p>
                            </div>
                            <div style={{ color: dept.color, fontWeight: 800, fontSize: '0.9rem', marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Start Chat <ChevronRight size={18} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="main-container section-padding" style={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
            <motion.div
                className="card"
                style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 0, overflow: 'hidden', border: 'none', boxShadow: 'var(--shadow-lg)', borderRadius: 'var(--radius-xl)' }}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                {/* Chat Header */}
                <div style={{ padding: '1.5rem 2.5rem', borderBottom: '1px solid var(--border)', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <button onClick={() => setDepartment(null)} style={{ background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}><ArrowLeft size={24} /></button>
                        <div style={{ position: 'relative' }}>
                            <div style={{ width: '56px', height: '56px', background: department.bg, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${department.bg}` }}>
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${department.name}`} alt="Expert" style={{ width: '100%' }} />
                            </div>
                            <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '16px', height: '16px', background: '#00b894', border: '3px solid white', borderRadius: '50%' }}></div>
                        </div>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {department.name} Desk <ShieldCheck size={18} color="var(--primary)" />
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#00b894', fontWeight: 700 }}>Agricultural Specialist • Online</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-secondary" style={{ borderRadius: '12px', padding: '0.75rem' }}><Phone size={20} /></button>
                        <button className="btn btn-secondary" style={{ borderRadius: '12px', padding: '0.75rem' }}><Video size={20} /></button>
                        <button className="btn btn-secondary" style={{ borderRadius: '12px', padding: '0.75rem' }}><MoreVertical size={20} /></button>
                    </div>
                </div>

                {/* Messages Area */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '2.5rem', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '0.1em', background: '#edf2f7', padding: '0.4rem 1rem', borderRadius: '100px' }}>Today</span>
                    </div>

                    <AnimatePresence>
                        {messages.map((msg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={{
                                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '70%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                                }}
                            >
                                <div style={{
                                    padding: '1.25rem 1.75rem',
                                    borderRadius: msg.sender === 'user' ? '24px 24px 4px 24px' : '24px 24px 24px 4px',
                                    background: msg.sender === 'user' ? 'var(--primary)' : 'white',
                                    color: msg.sender === 'user' ? 'white' : 'var(--text)',
                                    boxShadow: msg.sender === 'user' ? 'var(--shadow-primary)' : 'var(--shadow-sm)',
                                    fontSize: '1.05rem',
                                    lineHeight: 1.6,
                                    fontWeight: 500,
                                    border: msg.sender === 'expert' ? '1px solid var(--border)' : 'none'
                                }}>
                                    {msg.text}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#a0aec0', marginTop: '0.5rem', fontWeight: 600 }}>{msg.time}</div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <div style={{ padding: '1.5rem 2.5rem', background: 'white', borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                        <button className="btn btn-secondary" style={{ border: 'none', padding: '0.5rem' }}><Paperclip size={24} color="var(--text-muted)" /></button>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <input
                                type="text"
                                placeholder="Type your agricultural query here..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                style={{
                                    margin: 0,
                                    padding: '1.25rem 1.75rem',
                                    borderRadius: '16px',
                                    border: '2px solid #f1f5f9',
                                    background: '#f8fafc',
                                    fontSize: '1.1rem',
                                    width: '100%',
                                    transition: 'var(--transition)'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                onBlur={(e) => e.target.style.borderColor = '#f1f5f9'}
                            />
                            <div style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '0.75rem' }}>
                                <Smile size={24} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
                                <Zap size={24} color="var(--primary)" style={{ cursor: 'pointer' }} />
                            </div>
                        </div>
                        <button
                            onClick={handleSend}
                            className="btn btn-primary"
                            style={{ borderRadius: '16px', width: '60px', height: '60px', padding: 0 }}
                        >
                            <Send size={24} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ExpertChat;
