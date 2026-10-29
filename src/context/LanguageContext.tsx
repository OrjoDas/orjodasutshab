import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'EN' | 'BN' | 'HI' | 'JA';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  EN: {
    // Nav
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.certificates': 'Certificates',
    'nav.pricing': 'Pricing',
    'nav.contact': 'Contact',
    'nav.clientPortal': 'Client Portal',
    'nav.seoTool': 'SEO Analyzer',
    'nav.digitalWorld': 'DIGITAL WORLD →',
    
    // Hero
    'hero.badge': 'Senior Full Stack Web Developer & 3D Web Architect',
    'hero.title': 'Building Scalable Web Systems, 3D Experiences & Cloud Architecture',
    'hero.desc': '5+ years crafting high-speed React & Next.js web applications, immersive 3D WebGL experiences with Three.js, and high-throughput Node.js microservices.',
    'hero.cta.projects': 'Explore 120+ Projects',
    'hero.cta.contact': 'Hire Orjo Das Utshab',
    'hero.stat.experience': 'Years Experience',
    'hero.stat.projects': 'Projects Delivered',
    'hero.stat.security': 'Production SLA Uptime',

    // Architecture Panel
    'cyber.panelTitle': 'Live Full-Stack Architecture Center',
    'cyber.panelDesc': 'Real-time API Telemetry, Core Web Vitals & Microservices Profiler',
    'cyber.threatLevel': 'SYSTEM STATUS: 100% OPERATIONAL',
    'cyber.aes': 'SSL / TLS 1.3 End-to-End',
    'cyber.firewall': 'Docker Microservices ACTIVE',
    'cyber.penTest': 'Lighthouse 99+ Audited',
    'cyber.ddos': 'CDN Edge Cache Active',

    // Buttons
    'btn.endorse': 'Endorse Skill',
    'btn.endorsed': 'Endorsed!',
    'btn.caseStudy': 'View Case Study',
    'btn.liveDemo': 'Live Demo',
    'btn.sourceCode': 'GitHub Code',
    'btn.schedule': 'Book a Meeting',
    'btn.askAi': 'Ask AI Assistant',
    'btn.clientPortal': 'Client Portal Demo',
    'btn.seoAnalyzer': 'Free SEO Audit Tool',
  },
  BN: {
    // Nav
    'nav.about': 'সম্পর্কে',
    'nav.skills': 'দক্ষতা',
    'nav.services': 'সেবাসমূহ',
    'nav.projects': 'প্রজেক্ট',
    'nav.experience': 'অভিজ্ঞতা',
    'nav.certificates': 'সার্টিফিকেট',
    'nav.pricing': 'মূল্যতালিকা',
    'nav.contact': 'যোগাযোগ',
    'nav.clientPortal': 'ক্লায়েন্ট পোর্টাল',
    'nav.seoTool': 'SEO অ্যানালাইজার',
    'nav.digitalWorld': 'ডিজিটাল ওয়ার্ল্ড →',

    // Hero
    'hero.badge': 'সিনিয়র ফুল-স্ট্যাক ওয়েব ডেভেলপার ও ৩ডি ওয়েব আর্কিটেক্ট',
    'hero.title': 'স্কেলেবল ওয়েব সিস্টেম, ৩ডি এক্সপেরিয়েন্স ও ক্লাউড সলিউশন',
    'hero.desc': '৫+ বছরের অভিজ্ঞতায় হাই-স্পিড রিয়্যাক্ট ও নেক্সট.জেএস ওয়েব অ্যাপ, থ্রি.জেএস ৩ডি ওয়েবজিএল ইন্টারফেস এবং নোড.জেএস ক্লাউড মাইক্রোসার্ভিস তৈরি করছি।',
    'hero.cta.projects': '১২০+ প্রজেক্ট দেখুন',
    'hero.cta.contact': 'অর্জো দাস উৎসব-কে হায়ার করুন',
    'hero.stat.experience': 'বছরের অভিজ্ঞতা',
    'hero.stat.projects': 'সফল প্রজেক্ট',
    'hero.stat.security': 'প্রোডাকশন আপটাইম রেট',

    // Architecture Panel
    'cyber.panelTitle': 'লাইভ ফুল-স্ট্যাক আর্কিটেকচার সেন্টার',
    'cyber.panelDesc': 'রিয়েল-টাইম ক্লাউড টেলিমেট্রি, কোর ওয়েব ভাইটালস ও সার্ভিস হেলথ',
    'cyber.threatLevel': 'সিস্টেম স্ট্যাটাস: ১০০% সচল',
    'cyber.aes': 'SSL / TLS ১.৩ এনক্রিপ্টেড',
    'cyber.firewall': 'ডকার মাইক্রোসার্ভিসেস সক্রিয়',
    'cyber.penTest': 'লাইটহাউস ৯৯+ অপ্টিমাইজড',
    'cyber.ddos': 'CDN এজ ক্যাশিং অ্যাক্টিভ',

    // Buttons
    'btn.endorse': 'দক্ষতা এনডোর্স করুন',
    'btn.endorsed': 'এনডোর্সড!',
    'btn.caseStudy': 'কেস স্টাডি দেখুন',
    'btn.liveDemo': 'লাইভ ডেমো',
    'btn.sourceCode': 'গিটহাব কোড',
    'btn.schedule': 'মিটিং সিডিউল করুন',
    'btn.askAi': 'AI-কে প্রশ্ন করুন',
    'btn.clientPortal': 'ক্লায়েন্ট ড্যাশবোর্ড',
    'btn.seoAnalyzer': 'ফ্রি SEO টেস্ট টুল',
  },
  HI: {
    // Nav
    'nav.about': 'परिचय',
    'nav.skills': 'कौशल',
    'nav.services': 'सेवाएं',
    'nav.projects': 'प्रोजेक्ट्स',
    'nav.experience': 'अनुभव',
    'nav.certificates': 'प्रमाणपत्र',
    'nav.pricing': 'मूल्य',
    'nav.contact': 'संपर्क',
    'nav.clientPortal': 'क्लाइंट पोर्टल',
    'nav.seoTool': 'SEO विश्लेषक',
    'nav.digitalWorld': 'डिजिटल दुनिया →',

    // Hero
    'hero.badge': 'वरिष्ठ फुल-स्टैक वेब डेवलपर और 3D वेब आर्किटेक्ट',
    'hero.title': 'स्केलेबल वेब सिस्टम, 3D अनुभव और क्लाउड आर्किटेक्चर का निर्माण',
    'hero.desc': '5+ वर्षों के अनुभव के साथ आधुनिक रिएक्ट व नेक्स्ट.जेएस ऐप्स, Three.js 3D अनुभव और हाई-थ्रूपुट नोड.जेएस माइक्रोसर्विसेज का निर्माण।',
    'hero.cta.projects': '120+ प्रोजेक्ट्स देखें',
    'hero.cta.contact': 'अर्जो दास उत्सव को हायर करें',
    'hero.stat.experience': 'वर्षों का अनुभव',
    'hero.stat.projects': 'पूरे किए गए प्रोजेक्ट्स',
    'hero.stat.security': 'प्रोडक्शन अपटाइम स्कोर',

    // Architecture Panel
    'cyber.panelTitle': 'लाइव फुल-स्टैक आर्किटेक्चर सेंटर',
    'cyber.panelDesc': 'रीयल-टाइम API टेलीमेट्री, कोर वेब वाइटल्स और सर्वर हेल्थ',
    'cyber.threatLevel': 'सिस्टम स्थिति: 100% चालू',
    'cyber.aes': 'SSL / TLS 1.3 एंड-टू-एंड',
    'cyber.firewall': 'डॉकर माइक्रोसर्विसेज सक्रिय',
    'cyber.penTest': 'लाइटहाउस 99+ अनुकूलित',
    'cyber.ddos': 'CDN एज कैश सक्रिय',

    // Buttons
    'btn.endorse': 'कौशल की पुष्टि करें',
    'btn.endorsed': 'पुष्टि की गई!',
    'btn.caseStudy': 'केस स्टडी देखें',
    'btn.liveDemo': 'लाइव डेमो',
    'btn.sourceCode': 'गिटहब कोड',
    'btn.schedule': 'मीटिंग बुक करें',
    'btn.askAi': 'AI सहायक से पूछें',
    'btn.clientPortal': 'क्लाइंट पोर्टल डेमो',
    'btn.seoAnalyzer': 'मुफ़्त SEO टूल',
  },
  JA: {
    // Nav
    'nav.about': '概要',
    'nav.skills': 'スキル',
    'nav.services': 'サービス',
    'nav.projects': '実績',
    'nav.experience': '経歴',
    'nav.certificates': '資格証',
    'nav.pricing': '料金プラン',
    'nav.contact': 'お問い合わせ',
    'nav.clientPortal': 'クライアントポータル',
    'nav.seoTool': 'SEO分析ツール',
    'nav.digitalWorld': '3Dデジタル空間 →',

    // Hero
    'hero.badge': 'シニアフルスタックWeb開発者 & 3D Webアーキテクト',
    'hero.title': '高パフォーマンスWebシステム、3D体験、クラウド設計の構築',
    'hero.desc': '5年以上の実績。高速React & Next.jsアプリケーション、Three.jsによる没入型3D体験、スケーラブルなNode.jsマイクロサービス開発。',
    'hero.cta.projects': '120+ の実績を見る',
    'hero.cta.contact': 'Orjo Das Utshab に相談する',
    'hero.stat.experience': '年の実績',
    'hero.stat.projects': '納品プロジェクト',
    'hero.stat.security': 'クラウド稼働率SLA',

    // Architecture Panel
    'cyber.panelTitle': 'ライブフルスタックアーキテクチャセンター',
    'cyber.panelDesc': 'リアルタイムAPIテレメトリ・Core Web Vitals・サービス監視',
    'cyber.threatLevel': 'システム状態: 100% 稼働中',
    'cyber.aes': 'SSL / TLS 1.3 暗号化',
    'cyber.firewall': 'Dockerマイクロサービス稼働中',
    'cyber.penTest': 'Lighthouse 99+ 最適化済み',
    'cyber.ddos': 'CDNエッジキャッシュ有効',

    // Buttons
    'btn.endorse': 'スキルを推薦',
    'btn.endorsed': '推薦済み！',
    'btn.caseStudy': 'ケーススタディ',
    'btn.liveDemo': 'ライブデモ',
    'btn.sourceCode': 'GitHubソース',
    'btn.schedule': '面談を予約する',
    'btn.askAi': 'AIアシスタントに質問',
    'btn.clientPortal': 'クライアントポータル',
    'btn.seoAnalyzer': '無料SEO診断',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'EN',
  setLang: () => {},
  toggleLang: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('EN');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_lang') as Language;
    if (saved && ['EN', 'BN', 'HI', 'JA'].includes(saved)) {
      setLang(saved);
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('portfolio_lang', newLang);
  };

  const toggleLang = () => {
    const sequence: Language[] = ['EN', 'BN', 'HI', 'JA'];
    const nextIndex = (sequence.indexOf(lang) + 1) % sequence.length;
    handleSetLang(sequence[nextIndex]);
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations.EN[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
