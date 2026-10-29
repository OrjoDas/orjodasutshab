import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  X,
  LogOut,
  ExternalLink,
  LayoutDashboard,
  User,
  Zap,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Award,
  MessageSquare,
  Bot,
  Settings,
  Trash2,
  CheckCircle,
  Plus,
  Save,
  RefreshCw,
  Loader2,
  Lock,
  Globe,
  Radio,
  Eye,
  Mail,
  Phone,
  Calendar,
  Sparkles
} from 'lucide-react';
import {
  auth,
  logoutAdmin,
  fetchContactMessages,
  deleteContactMessage,
  markMessageRead,
  updatePortfolioSection,
  getPortfolioSection,
  ContactMessage
} from '../lib/firebase';
import { PERSONAL_INFO, PROJECTS_DATA, SKILLS_DATA, SERVICES_DATA } from '../data/portfolioData';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'hero' | 'about' | 'skills' | 'services' | 'projects' | 'messages' | 'settings'>('dashboard');

  // Local state for editable sections
  const [heroData, setHeroData] = useState({
    name: PERSONAL_INFO.name,
    title: 'FULL STACK DEVELOPER × CYBER SECURITY',
    intro: 'Engineering high-performance web systems and bulletproof security architectures.',
    availability: 'Available for Freelance & Remote Work',
  });

  const [aboutData, setAboutData] = useState({
    name: PERSONAL_INFO.name,
    bio: PERSONAL_INFO.bio,
    experienceYrs: '5+',
    projectsCount: '120+',
    techCount: '25+',
    certCount: '12+',
  });

  const [skillsList, setSkillsList] = useState(SKILLS_DATA);
  const [projectsList, setProjectsList] = useState(PROJECTS_DATA);
  const [servicesList, setServicesList] = useState(SERVICES_DATA);
  const [messagesList, setMessagesList] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const [newSkill, setNewSkill] = useState({ name: '', category: 'frontend', level: 90, icon: 'Code' });
  const [newProject, setNewProject] = useState({ title: '', category: 'fullstack', description: '', tech: '', github: '#', demo: '#' });

  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Load Firestore data on mount
  useEffect(() => {
    if (isOpen) {
      loadMessages();
      loadStoredSections();
    }
  }, [isOpen]);

  const loadMessages = async () => {
    setLoadingMessages(true);
    const msgs = await fetchContactMessages();
    setMessagesList(msgs);
    setLoadingMessages(false);
  };

  const loadStoredSections = async () => {
    const heroSnap = await getPortfolioSection('hero');
    if (heroSnap) setHeroData(heroSnap);

    const aboutSnap = await getPortfolioSection('about');
    if (aboutSnap) setAboutData(aboutSnap);

    const skillsSnap = await getPortfolioSection('skills');
    if (skillsSnap) setSkillsList(skillsSnap);

    const projectsSnap = await getPortfolioSection('projects');
    if (projectsSnap) setProjectsList(projectsSnap);

    const servicesSnap = await getPortfolioSection('services');
    if (servicesSnap) setServicesList(servicesSnap);
  };

  const handleSaveSection = async (sectionKey: string, data: any) => {
    setSaving(true);
    setSaveStatus(null);
    const res = await updatePortfolioSection(sectionKey, data);
    setSaving(false);
    if (res.success) {
      setSaveStatus(`[✓] ${sectionKey.toUpperCase()} updated in Firebase Firestore!`);
      setTimeout(() => setSaveStatus(null), 3000);
    } else {
      setSaveStatus(`[×] Failed to update: ${res.error}`);
    }
  };

  const handleDeleteMsg = async (id: string) => {
    if (window.confirm('Delete this contact message permanently?')) {
      await deleteContactMessage(id);
      setMessagesList(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleMarkRead = async (id: string) => {
    await markMessageRead(id);
    setMessagesList(prev => prev.map(m => m.id === id ? { ...m, status: 'read' } : m));
  };

  const handleAddSkill = () => {
    if (!newSkill.name) return;
    const updated = [...skillsList, { ...newSkill, icon: 'Code' }];
    setSkillsList(updated);
    setNewSkill({ name: '', category: 'frontend', level: 90, icon: 'Code' });
    handleSaveSection('skills', updated);
  };

  const handleDeleteSkill = (index: number) => {
    const updated = skillsList.filter((_, i) => i !== index);
    setSkillsList(updated);
    handleSaveSection('skills', updated);
  };

  const handleAddProject = () => {
    if (!newProject.title) return;
    const updated = [
      ...projectsList,
      {
        id: `proj-${Date.now()}`,
        title: newProject.title,
        category: newProject.category as any,
        description: newProject.description,
        tech: newProject.tech.split(',').map(t => t.trim()),
        github: newProject.github,
        demo: newProject.demo,
        featured: true,
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
      }
    ];
    setProjectsList(updated);
    setNewProject({ title: '', category: 'fullstack', description: '', tech: '', github: '#', demo: '#' });
    handleSaveSection('projects', updated);
  };

  const handleDeleteProject = (id: string) => {
    const updated = projectsList.filter(p => p.id !== id);
    setProjectsList(updated);
    handleSaveSection('projects', updated);
  };

  const handleLogout = async () => {
    await logoutAdmin();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-2xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl bg-slate-900 border border-cyan-500/40 rounded-3xl shadow-[0_0_60px_rgba(6,182,212,0.25)] text-slate-100 flex flex-col max-h-[92vh] overflow-hidden font-mono"
        >
          {/* Cyber Control Center Header */}
          <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-slate-950 border-b border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white tracking-widest uppercase flex items-center gap-2">
                  ORJO // CONTROL CENTER
                </h2>
                <div className="flex items-center gap-3 text-[11px] font-mono">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Radio className="w-3 h-3 animate-pulse" /> FIREBASE CONNECTED
                  </span>
                  <span className="text-cyan-400 flex items-center gap-1">
                    <Globe className="w-3 h-3" /> WEBSITE ONLINE
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-slate-300 flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-400" /> View Website
              </button>
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-xs font-bold text-rose-400 flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Status Alert Banner if Any */}
          {saveStatus && (
            <div className="px-6 py-2 bg-cyan-950/80 border-b border-cyan-500/30 text-cyan-300 text-xs flex items-center justify-between font-mono animate-fadeIn">
              <span>{saveStatus}</span>
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            </div>
          )}

          {/* Main Layout: Sidebar Navigation + Content Area */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar Controls */}
            <div className="w-48 sm:w-56 bg-slate-950/80 border-r border-white/10 p-3 space-y-1.5 overflow-y-auto text-xs font-bold">
              {[
                { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
                { id: 'hero', label: 'HERO CONTROL', icon: Zap },
                { id: 'about', label: 'ABOUT CONTROL', icon: User },
                { id: 'skills', label: 'SKILLS CONTROL', icon: Settings },
                { id: 'services', label: 'SERVICES', icon: Briefcase },
                { id: 'projects', label: 'PROJECTS', icon: FolderGit2 },
                { id: 'messages', label: 'MESSAGES', icon: MessageSquare, badge: messagesList.filter(m => m.status === 'unread').length },
                { id: 'settings', label: 'SITE SETTINGS', icon: Lock },
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-cyan-400" />
                      <span>{tab.label}</span>
                    </div>
                    {tab.badge && tab.badge > 0 ? (
                      <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black">
                        {tab.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            {/* Tab Content Panel */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-slate-900/50">
              {/* TAB 1: DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 shadow-lg">
                      <div className="text-2xl font-black text-cyan-400">12,840</div>
                      <div className="text-[11px] text-slate-400 uppercase mt-1">TOTAL VISITORS</div>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 shadow-lg">
                      <div className="text-2xl font-black text-purple-400">{projectsList.length}</div>
                      <div className="text-[11px] text-slate-400 uppercase mt-1">TOTAL PROJECTS</div>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 shadow-lg">
                      <div className="text-2xl font-black text-emerald-400">{messagesList.length}</div>
                      <div className="text-[11px] text-slate-400 uppercase mt-1">CONTACT MESSAGES</div>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 shadow-lg">
                      <div className="text-2xl font-black text-indigo-400">{servicesList.length}</div>
                      <div className="text-[11px] text-slate-400 uppercase mt-1">ACTIVE SERVICES</div>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-5 rounded-2xl border border-cyan-500/30 space-y-4">
                    <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2 uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" /> SYSTEM HEALTH & FIREBASE AUTH
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                      <div className="bg-slate-900 p-3 rounded-xl border border-white/5 space-y-1">
                        <div className="text-slate-400">Logged in User:</div>
                        <div className="font-bold text-white">{auth.currentUser?.email || 'orjodasutshab@gmail.com'}</div>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-white/5 space-y-1">
                        <div className="text-slate-400">Database Engine:</div>
                        <div className="font-bold text-emerald-400">Firestore Realtime DB</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: HERO CONTROL */}
              {activeTab === 'hero' && (
                <div className="space-y-6">
                  <h3 className="text-base font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <Zap className="w-4 h-4" /> HERO SECTION CONTROL
                  </h3>
                  <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-white/10">
                    <div>
                      <label className="text-xs text-slate-400">Display Name</label>
                      <input
                        type="text"
                        value={heroData.name}
                        onChange={e => setHeroData({ ...heroData, name: e.target.value })}
                        className="w-full mt-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Primary Subtitle / Title</label>
                      <input
                        type="text"
                        value={heroData.title}
                        onChange={e => setHeroData({ ...heroData, title: e.target.value })}
                        className="w-full mt-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Hero Introduction Text</label>
                      <textarea
                        rows={3}
                        value={heroData.intro}
                        onChange={e => setHeroData({ ...heroData, intro: e.target.value })}
                        className="w-full mt-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Availability Tag</label>
                      <input
                        type="text"
                        value={heroData.availability}
                        onChange={e => setHeroData({ ...heroData, availability: e.target.value })}
                        className="w-full mt-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 outline-none"
                      />
                    </div>

                    <button
                      onClick={() => handleSaveSection('hero', heroData)}
                      disabled={saving}
                      className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-2 cursor-pointer transition-all"
                    >
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      <span>SAVE HERO CHANGES TO FIREBASE</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: ABOUT CONTROL */}
              {activeTab === 'about' && (
                <div className="space-y-6">
                  <h3 className="text-base font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <User className="w-4 h-4" /> ABOUT SECTION CONTROL
                  </h3>
                  <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-white/10">
                    <div>
                      <label className="text-xs text-slate-400">Biography Summary</label>
                      <textarea
                        rows={4}
                        value={aboutData.bio}
                        onChange={e => setAboutData({ ...aboutData, bio: e.target.value })}
                        className="w-full mt-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="text-xs text-slate-400">Years Exp</label>
                        <input
                          type="text"
                          value={aboutData.experienceYrs}
                          onChange={e => setAboutData({ ...aboutData, experienceYrs: e.target.value })}
                          className="w-full mt-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">Projects Count</label>
                        <input
                          type="text"
                          value={aboutData.projectsCount}
                          onChange={e => setAboutData({ ...aboutData, projectsCount: e.target.value })}
                          className="w-full mt-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">Tech Count</label>
                        <input
                          type="text"
                          value={aboutData.techCount}
                          onChange={e => setAboutData({ ...aboutData, techCount: e.target.value })}
                          className="w-full mt-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400">Certs Count</label>
                        <input
                          type="text"
                          value={aboutData.certCount}
                          onChange={e => setAboutData({ ...aboutData, certCount: e.target.value })}
                          className="w-full mt-1 bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handleSaveSection('about', aboutData)}
                      disabled={saving}
                      className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs flex items-center gap-2 cursor-pointer transition-all"
                    >
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      <span>SAVE ABOUT CHANGES</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: SKILLS CONTROL */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <h3 className="text-base font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <Settings className="w-4 h-4" /> MANAGE TECHNICAL SKILLS
                  </h3>

                  {/* Add New Skill Bar */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 space-y-3">
                    <div className="text-xs font-bold text-slate-300">ADD NEW SKILL NODE</div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                      <input
                        type="text"
                        placeholder="Skill Name (e.g. Docker)"
                        value={newSkill.name}
                        onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
                        className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none"
                      />
                      <select
                        value={newSkill.category}
                        onChange={e => setNewSkill({ ...newSkill, category: e.target.value })}
                        className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none"
                      >
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="security">Security</option>
                        <option value="cloud">Cloud & DevOps</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Proficiency % (95)"
                        value={newSkill.level}
                        onChange={e => setNewSkill({ ...newSkill, level: Number(e.target.value) })}
                        className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none"
                      />
                      <button
                        onClick={handleAddSkill}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl px-4 py-2 flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> Add Skill
                      </button>
                    </div>
                  </div>

                  {/* Existing Skills List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {skillsList.map((sk, idx) => (
                      <div key={idx} className="bg-slate-950 p-3 rounded-2xl border border-white/10 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-white">{sk.name}</div>
                          <div className="text-[10px] text-cyan-400 capitalize">{sk.category} • {sk.level}%</div>
                        </div>
                        <button
                          onClick={() => handleDeleteSkill(idx)}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: PROJECTS CONTROL */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <h3 className="text-base font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4" /> MANAGE PORTFOLIO PROJECTS
                  </h3>

                  {/* Add New Project Form */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 space-y-3">
                    <div className="text-xs font-bold text-slate-300">ADD NEW PROJECT</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={newProject.title}
                        onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                        className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Technologies (comma separated)"
                        value={newProject.tech}
                        onChange={e => setNewProject({ ...newProject, tech: e.target.value })}
                        className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none"
                      />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Project description..."
                      value={newProject.description}
                      onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={handleAddProject}
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl px-5 py-2 flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> Publish Project
                      </button>
                    </div>
                  </div>

                  {/* Project List */}
                  <div className="space-y-3">
                    {projectsList.map((p) => (
                      <div key={p.id} className="bg-slate-950 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                        <div className="space-y-1 max-w-lg">
                          <h4 className="text-xs font-bold text-white">{p.title}</h4>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{p.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {p.tech.map((t, i) => (
                              <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-mono">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: MESSAGES INBOX */}
              {activeTab === 'messages' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" /> FIRESTORE CONTACT MESSAGES ({messagesList.length})
                    </h3>
                    <button
                      onClick={loadMessages}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-400 cursor-pointer"
                    >
                      <RefreshCw className={`w-4 h-4 ${loadingMessages ? 'animate-spin' : ''}`} />
                    </button>
                  </div>

                  {messagesList.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-xs bg-slate-950 rounded-2xl border border-white/5">
                      No contact messages stored in Firestore yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messagesList.map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-4 rounded-2xl border transition-all ${
                            msg.status === 'unread'
                              ? 'bg-slate-950 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                              : 'bg-slate-950/60 border-white/10 opacity-80'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-xs">{msg.name}</span>
                                {msg.status === 'unread' && (
                                  <span className="px-1.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[9px] font-black">
                                    NEW
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-cyan-400 flex items-center gap-1">
                                <Mail className="w-3 h-3" /> {msg.email}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {msg.status === 'unread' && (
                                <button
                                  onClick={() => msg.id && handleMarkRead(msg.id)}
                                  className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-bold hover:bg-emerald-500/20 cursor-pointer"
                                >
                                  Mark Read
                                </button>
                              )}
                              <button
                                onClick={() => msg.id && handleDeleteMsg(msg.id)}
                                className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="mt-2 text-xs text-slate-200 bg-slate-900/80 p-3 rounded-xl border border-white/5">
                            {msg.message}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 7: SITE SETTINGS */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h3 className="text-base font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <Lock className="w-4 h-4" /> FIREBASE AUTH & SITE CONFIGURATION
                  </h3>

                  <div className="bg-slate-950 p-5 rounded-2xl border border-white/10 space-y-4 text-xs text-slate-300">
                    <div className="font-bold text-white border-b border-white/10 pb-2">AUTHORIZED ADMIN EMAILS</div>
                    <ul className="space-y-1 font-mono text-cyan-300">
                      <li>• orjodasutshab@gmail.com</li>
                      <li>• orjodas832@gmail.com</li>
                      <li>• r6379616@gmail.com</li>
                    </ul>
                    <p className="text-[11px] text-slate-400">
                      Passwords are kept securely in Firebase Console Authentication under Email/Password providers.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
