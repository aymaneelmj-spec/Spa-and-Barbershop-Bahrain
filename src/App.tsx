import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Scissors, Star, ChevronDown, ChevronUp,
  MessageSquare, X, MapPin, Clock, Phone,
  ChevronLeft, ChevronRight,
  Instagram, Menu, Sparkles, Navigation,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import i18n from './i18n';

const B = {
  gold:      '#b8860b',
  goldLight: '#d4a017',
  goldGlow:  '#f0c040',
  goldDark:  '#7a5900',
  bg:        '#080b10',
  surface:   '#0e1219',
  panel:     '#141920',
  border:    'rgba(184,134,11,0.22)',
  borderGlow:'rgba(184,134,11,0.45)',
  white:     '#f0ede8',
  silver:    '#9ca8b4',
  navy:      '#0d1829',
};

const MAPS_URL = 'https://www.google.com/maps/place/The+Barber+shop+and+spa+-+Men/@26.240931,50.5435207,13z/data=!4m10!1m2!2m1!1sbarbershop+%23bahrain!3m6!1s0x3e49a50d347b9465:0x97ebfa25dcf386ff!8m2!3d26.2782808!4d50.5957885!15sChNiYXJiZXJzaG9wICNiYWhyYWluWhUiE2JhcmJlcnNob3AgI2JhaHJhaW6SAQNzcGGaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVUklMVzlZVVRaQlJSQULgAQD6AQQIABBC!16s%2Fg%2F11pb19qrcl?entry=ttu';
const WALINK = 'https://wa.me/97339777136';

const SERVICES = [
  { en: 'Hair Cut',              ar: 'قص الشعر',                 price: '2.5',  icon: '✂️' },
  { en: 'Beard Shave',           ar: 'حلاقة اللحية',             price: '1.5',  icon: '🪒' },
  { en: 'Hair Wash',             ar: 'الشاور',                   price: '2',    icon: '🚿' },
  { en: 'Hair Drying',           ar: 'ويفي ابتداءً من',          price: '4',    icon: '💨' },
  { en: 'Protein Hair Treatment',ar: 'بروتين ابتداءً من',        price: '15',   icon: '✨' },
  { en: 'Opti Smooth',           ar: 'اوبيتي سموث ابتداءً من',   price: '35',   icon: '💎' },
  { en: 'Hair Dye',              ar: 'لون واحد ابتداءً من',      price: '8',    icon: '🎨' },
  { en: 'Highlights',            ar: 'هايلايت ابتداءً من',       price: '18',   icon: '🖌️' },
  { en: 'Hair Mask',             ar: 'ماسك الشعر',               price: '4',    icon: '🧴' },
  { en: 'Regular Hair Mask',     ar: 'ماسك عادي',                price: '5',    icon: '🌿' },
  { en: '99% Natural Treatment', ar: 'ماسك بعلاج 99% طبيعي',     price: '6',    icon: '🍃' },
  { en: 'Classic Manicure',      ar: 'منكير اليدين',             price: '3',    icon: '💅' },
  { en: 'Classic Pedicure',      ar: 'بدكير القدمين',            price: '4',    icon: '🦶' },
  { en: 'Classic Mani + Pedi',   ar: 'منكير + بدكير',            price: '6',    icon: '✨' },
  { en: 'Spa Manicure',          ar: 'سبا منكير اليدين',         price: '4',    icon: '🛁' },
  { en: 'Spa Pedicure',          ar: 'سبا بدكير القدمين',        price: '5',    icon: '🧖' },
  { en: 'Spa Mani + Pedi',       ar: 'سبا منكير + بدكير',        price: '8',    icon: '💎' },
  { en: 'Royal Manicure',        ar: 'رويال منكير اليدين',       price: '5',    icon: '👑' },
  { en: 'Royal Pedicure',        ar: 'رويال بدكير القدمين',      price: '6',    icon: '👑' },
  { en: 'Royal Mani + Pedi',     ar: 'رويال منكير + بدكير',      price: '10',   icon: '🏆' },
  { en: 'Foot Massage',          ar: 'مساج القدمين',             price: '1',    icon: '💆' },
  { en: 'Regular Facial',        ar: 'العادي',                   price: '5',    icon: '✨' },
  { en: 'Professional Facial',   ar: 'البروفيشنال',              price: '8',    icon: '🌟' },
];

const HOURS = [
  { day: 'Monday',    hours: '10 AM – 10 PM' },
  { day: 'Tuesday',   hours: '10 AM – 10 PM' },
  { day: 'Wednesday', hours: '10 AM – 10 PM' },
  { day: 'Thursday',  hours: '10 AM – 11 PM' },
  { day: 'Friday',    hours: '10 AM – 11 PM' },
  { day: 'Saturday',  hours: '10 AM – 10 PM' },
  { day: 'Sunday',    hours: '10 AM – 10 PM' },
];

/* ══════════════════════════════════
   LOADING SCREEN
══════════════════════════════════ */
function LoadingScreen({ isRTL }: { isRTL: boolean }) {
  return (
    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ background: B.bg }} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(${B.gold} 1px, transparent 1px), linear-gradient(90deg, ${B.gold} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      {[
        { t: '9%',  l: '7%',  sz: '2.4rem', d: '0s'   },
        { t: '15%', r: '9%',  sz: '1.7rem', d: '1.2s'  },
        { t: '58%', l: '5%',  sz: '2.1rem', d: '2.5s'  },
        { t: '74%', r: '7%',  sz: '1.5rem', d: '0.6s'  },
        { t: '85%', l: '32%', sz: '1.4rem', d: '3.0s'  },
      ].map((s, i) => (
        <div key={i} className="absolute pointer-events-none" style={{
          top: s.t, left: (s as any).l, right: (s as any).r,
          fontSize: s.sz, color: B.gold, opacity: 0.1,
          animation: `loadFloat 5s ease-in-out infinite`, animationDelay: s.d,
        }}>✂</div>
      ))}
      <div className="relative flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          className="absolute w-56 h-56 rounded-full"
          style={{ background: `conic-gradient(from 0deg, ${B.gold}, ${B.goldDark}, transparent, ${B.goldLight}, ${B.gold})`, padding: 3 }} />
        <div className="relative z-10 w-52 h-52 rounded-full flex items-center justify-center"
          style={{ background: B.bg, boxShadow: 'inset 0 0 60px rgba(0,0,0,0.9)' }}>
          <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}>
            <img src="/gallery/logo.webp" alt="Logo" className="w-44 h-44 object-contain"
              onError={e => {
                const img = e.target as HTMLImageElement;
                img.src = '/gallery/logo.png';
                img.onerror = () => { img.style.display = 'none'; };
              }} />
          </motion.div>
        </div>
        <div className="absolute w-72 h-72 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, rgba(184,134,11,0.25) 0%, transparent 70%)`, filter: 'blur(40px)' }} />
      </div>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }} className="mt-8 text-center">
        <div className="text-3xl md:text-4xl font-black tracking-[0.18em] mb-1" style={{ color: B.white }}>
          <span style={{ color: B.gold }}>THE BARBER </span>SHOP & SPA
        </div>
        <div className="text-[10px] tracking-[0.5em] uppercase font-bold mt-1" style={{ color: B.goldDark }}>
          Busaiteen · Bahrain
        </div>
      </motion.div>
      <motion.div className="mt-8 h-[2px] rounded-full overflow-hidden"
        style={{ width: '200px', background: 'rgba(255,255,255,0.05)' }}>
        <motion.div className="h-full rounded-full"
          initial={{ width: '0%' }} animate={{ width: '100%' }}
          transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.2 }}
          style={{ background: `linear-gradient(90deg, ${B.goldDark}, ${B.gold}, ${B.goldGlow})` }} />
      </motion.div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
        className="mt-4 text-[10px] tracking-[0.35em] uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>
        {isRTL ? 'جاري التحميل...' : 'Loading...'}
      </motion.p>
      <style>{`@keyframes loadFloat { 0%,100%{transform:translateY(0)rotate(0)} 40%{transform:translateY(-14px)rotate(5deg)} 70%{transform:translateY(-7px)rotate(-3deg)} }`}</style>
    </motion.div>
  );
}

/* ══════════════════════════════════
   LANGUAGE BUTTON — flag only, no text
══════════════════════════════════ */
function LangButton({ isRTL, onClick }: { isRTL: boolean; onClick: () => void }) {
  return (
    <motion.button onClick={onClick} whileTap={{ scale: 0.93 }}
      title={isRTL ? 'Switch to English' : 'التبديل إلى العربية'}
      className="flex items-center gap-1.5 rounded-xl px-2 py-1.5 transition-all"
      style={{ border: `1px solid ${B.border}`, background: 'rgba(184,134,11,0.06)' }}>
      {/* Show the INACTIVE language as the one to switch TO */}
      {isRTL ? (
        /* Currently Arabic → show GB flag to switch to English */
        <span className="text-xl leading-none" title="Switch to English">🇬🇧</span>
      ) : (
        /* Currently English → show SA flag to switch to Arabic */
        <span className="text-xl leading-none" title="التبديل إلى العربية">🇸🇦</span>
      )}
      <span className="text-[9px] font-black tracking-widest" style={{ color: B.gold }}>
        {isRTL ? 'EN' : 'ع'}
      </span>
    </motion.button>
  );
}

/* ══════════════════════════════════
   HERO
══════════════════════════════════ */
function HeroSection({ isRTL }: { isRTL: boolean }) {
  const { t } = useTranslation();
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ background: B.bg }} />
        {/* Hero background — 2.jpg, opacity tuned to be visible but not overwhelming */}
        <img src="/gallery/2.jpg" alt="bg"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{
            objectPosition: 'center 30%',
            opacity: imgLoaded ? 0.38 : 0,
            filter: 'saturate(0.6) brightness(0.75)',
            animation: imgLoaded ? 'heroZoom 28s ease-in-out infinite alternate' : 'none',
          }}
          onLoad={() => setImgLoaded(true)}
          onError={e => {
            const img = e.target as HTMLImageElement;
            img.src = '/gallery/1.jpg';
            img.onerror = () => { setImgLoaded(true); img.style.display = 'none'; };
          }}
        />
        {/* Overlay: darker at top+bottom, lighter in center so image shows */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(8,11,16,0.88) 0%, rgba(8,11,16,0.30) 30%, rgba(8,11,16,0.30) 65%, rgba(8,11,16,0.88) 88%, ${B.bg} 100%)` }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.55) 100%)' }} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 38%, rgba(184,134,11,0.05) 0%, transparent 65%)` }} />
      </div>

      <div className="absolute top-[15%] left-[6%] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(184,134,11,0.07) 0%, transparent 70%)`, filter: 'blur(70px)', animation: 'floatOrb 10s ease-in-out infinite' }} />
      <div className="absolute bottom-[18%] right-[5%] w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(184,134,11,0.06) 0%, transparent 70%)`, filter: 'blur(55px)', animation: 'floatOrb 13s ease-in-out infinite reverse' }} />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 pt-28 pb-32 sm:pb-40">
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-center gap-2.5 mb-8">
          <div className="flex items-center gap-1">
            {[0,1,2,3].map(i => (
              <Star key={i} className="w-4 h-4 fill-current" style={{ color: B.gold }} />
            ))}
            <Star className="w-4 h-4" style={{ color: B.gold, opacity: 0.4 }} />
          </div>
          <span className="text-sm font-bold tracking-widest" style={{ color: B.silver }}>4.7 · 83 Reviews</span>
          <span className="text-[10px] font-black tracking-[0.3em] px-2 py-0.5 rounded-full uppercase"
            style={{ color: B.gold, background: 'rgba(184,134,11,0.1)', border: `1px solid ${B.border}` }}>Google</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.80, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.05, type: 'spring', damping: 13, stiffness: 80 }}
          className="mb-10">
          <div className="inline-block relative">
            <div className="absolute inset-0 rounded-3xl translate-x-4 translate-y-4" style={{ background: B.navy, opacity: 0.9, filter: 'blur(3px)' }} />
            <div className="absolute inset-0 rounded-3xl translate-x-2 translate-y-2" style={{ background: B.goldDark, opacity: 0.25 }} />
            <div className="relative rounded-3xl px-7 py-7 md:px-12 md:py-9"
              style={{
                background: 'rgba(6,8,14,0.88)',
                backdropFilter: 'blur(36px) saturate(2)',
                WebkitBackdropFilter: 'blur(36px) saturate(2)',
                border: `1px solid ${B.borderGlow}`,
                boxShadow: `0 0 0 1px rgba(184,134,11,0.10), 0 0 50px rgba(184,134,11,0.20), inset 0 1px 0 rgba(255,255,255,0.07), 0 60px 120px rgba(0,0,0,0.75)`,
                transform: 'perspective(900px) rotateX(2deg)',
              }}>
              <div className="flex items-center gap-3 justify-center mb-5">
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${B.gold}70, transparent)` }} />
                <div className="text-xl">💈</div>
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${B.gold}70, transparent)` }} />
              </div>
              <div className="text-sm md:text-base font-black mb-3 leading-none" style={{ direction: 'rtl', color: B.silver, letterSpacing: '0.08em' }}>
                <span style={{ color: B.goldGlow, textShadow: `0 0 22px ${B.gold}90` }}>ذا باربر شوب </span>
                <span style={{ color: B.white }}>آند سبا · البحرين</span>
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[0.08em] leading-none" style={{ fontFamily: '"Playfair Display", serif' }}>
                <span style={{ color: B.gold, textShadow: `0 0 40px ${B.gold}, 0 0 80px ${B.goldDark}80` }}>THE BARBER</span>
                <br />
                <span style={{ color: B.white, textShadow: `0 0 30px rgba(255,255,255,0.15)` }}>SHOP & SPA</span>
              </div>
              <div className="mt-4 text-[11px] tracking-[0.45em] uppercase font-bold" style={{ color: B.goldDark }}>
                Men's Grooming · Busaiteen · Bahrain
              </div>
              <div className="flex items-center gap-3 justify-center mt-5">
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${B.gold}70, transparent)` }} />
                <Scissors className="w-3.5 h-3.5" style={{ color: B.goldDark }} />
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${B.gold}70, transparent)` }} />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ color: B.silver }}>
          {t('Tagline')}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.a
            href={`${WALINK}?text=${encodeURIComponent(i18n.language === 'ar' ? 'السلام عليكم، أريد الحجز' : 'Hello, I would like to book an appointment')}`}
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-black tracking-[0.15em] uppercase"
            style={{
              background: `linear-gradient(135deg, ${B.gold}, ${B.goldDark})`,
              color: '#06080e',
              boxShadow: `0 0 40px rgba(184,134,11,0.4), 0 15px 40px rgba(0,0,0,0.5)`,
            }}>
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            {t('BookNow')}
          </motion.a>
          <motion.a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-black tracking-[0.15em] uppercase"
            style={{ background: 'rgba(184,134,11,0.08)', color: B.goldGlow, border: `1px solid ${B.border}` }}>
            <Navigation className="w-4 h-4" />
            {i18n.language === 'ar' ? 'احصل على الاتجاهات' : 'Get Directions'}
          </motion.a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-2">
          <div className="w-px h-10 rounded-full" style={{ background: `linear-gradient(to bottom, transparent, ${B.gold}, transparent)` }} />
          <span className="text-[9px] tracking-[0.45em] uppercase" style={{ color: B.goldDark }}>Scroll</span>
        </motion.div>
      </div>

      <style>{`
        @keyframes heroZoom { from { transform: scale(1); } to { transform: scale(1.06); } }
        @keyframes floatOrb {
          0%,100% { transform: translateY(0) translateX(0); }
          33%      { transform: translateY(-22px) translateX(10px); }
          66%      { transform: translateY(-11px) translateX(-6px); }
        }
      `}</style>
    </section>
  );
}

/* ══════════════════════════════════
   SERVICES
══════════════════════════════════ */
function ServicesSection({ isRTL }: { isRTL: boolean }) {
  const { t } = useTranslation();
  return (
    <section id="services" className="py-28 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${B.bg} 0%, ${B.surface} 60%, ${B.panel} 100%)` }}>
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${B.gold}, transparent)` }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.42em] uppercase mb-5 px-5 py-2 rounded-full"
            style={{ color: B.gold, background: 'rgba(184,134,11,0.07)', border: `1px solid ${B.border}` }}>
            <Sparkles className="w-3 h-3" />
            {isRTL ? 'خدماتنا وأسعارنا' : 'Our Services & Pricing'}
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-wider uppercase" style={{ color: B.white, fontFamily: '"Playfair Display", serif' }}>
            {t('Services')}
          </h2>
          <div className="w-24 h-[2px] mx-auto rounded-full mt-5" style={{ background: `linear-gradient(90deg, transparent, ${B.gold}, transparent)` }} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
          <div className="absolute inset-0 rounded-3xl translate-x-2 translate-y-3"
            style={{ background: B.navy, opacity: 0.7, filter: 'blur(5px)', borderRadius: '24px' }} />
          <div className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(10,13,20,0.97)', border: `1px solid ${B.border}`,
              boxShadow: `0 0 80px rgba(184,134,11,0.07), 0 50px 100px rgba(0,0,0,0.6), inset 0 1px 0 rgba(184,134,11,0.12)`,
              transform: 'perspective(1000px) rotateX(1deg)',
            }}>
            <div className="h-1" style={{ background: `linear-gradient(90deg, ${B.goldDark}, ${B.gold}, ${B.goldGlow}, ${B.gold}, ${B.goldDark})` }} />
            <div className="px-8 pt-7 pb-5 text-center" style={{ borderBottom: `1px solid rgba(184,134,11,0.10)` }}>
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${B.gold}50)` }} />
                <div className="text-2xl">💈</div>
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${B.gold}50, transparent)` }} />
              </div>
              <div className="text-base font-black tracking-[0.32em] uppercase" style={{ color: B.gold }}>
                {isRTL ? 'قائمة الأسعار' : 'Pricelist'}
              </div>
              <div className="text-[11px] tracking-widest mt-1" style={{ color: 'rgba(255,255,255,0.28)' }}>
                {isRTL ? 'الأسعار تقريبية بالدينار البحريني' : 'Approximate prices in Bahraini Dinar (BD)'}
              </div>
            </div>
            <div className="px-6 md:px-10 py-4">
              {SERVICES.map((svc, idx) => (
                <motion.div key={idx}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: idx * 0.04, duration: 0.35 }}
                  className="flex items-center justify-between py-3.5 group relative"
                  style={{ borderBottom: idx < SERVICES.length - 1 ? `1px solid rgba(184,134,11,0.08)` : 'none' }}>
                  <div className="absolute inset-x-0 inset-y-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ background: 'rgba(184,134,11,0.04)' }} />
                  <div className="flex items-center gap-3 relative z-10">
                    <span className="text-base">{svc.icon}</span>
                    <span className="font-semibold text-sm md:text-base transition-colors group-hover:text-white" style={{ color: B.silver }}>
                      {i18n.language === 'ar' ? svc.ar : svc.en}
                    </span>
                  </div>
                  <div className="flex-1 mx-5 min-w-0" style={{ borderBottom: `1px dotted rgba(184,134,11,0.14)`, marginTop: '-2px' }} />
                  <div className="flex items-baseline gap-1.5 relative z-10">
                    <span className="font-black text-xl tabular-nums" style={{ color: B.gold, textShadow: `0 0 12px ${B.gold}50` }}>{svc.price}</span>
                    <span className="text-[10px] font-bold tracking-wider" style={{ color: 'rgba(184,134,11,0.5)' }}>BD</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="px-8 pb-6 text-center" style={{ borderTop: `1px solid rgba(184,134,11,0.08)` }}>
              <p className="text-[11px] tracking-wide mt-4" style={{ color: 'rgba(255,255,255,0.18)' }}>
                {isRTL ? '* الأسعار تقريبية · اتصل للتأكيد' : '* Prices approximate · Call to confirm'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   GALLERY — auto-scroll with emojis
══════════════════════════════════ */
function GallerySection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);
  const [selected, setSelected] = useState<string | null>(null);
  const lang = i18n.language;
  const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(n => `/gallery/${n}.jpg`);

  // Smooth continuous auto-scroll — stops on hover/touch, resumes after 2s
  useEffect(() => {
    let dir = 1;
    const tick = () => {
      if (!isPausedRef.current && scrollRef.current) {
        const el = scrollRef.current;
        const max = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= max - 2) dir = -1;
        else if (el.scrollLeft <= 2) dir = 1;
        el.scrollLeft += dir * 0.9;
      }
      autoRef.current = requestAnimationFrame(tick);
    };
    autoRef.current = requestAnimationFrame(tick);
    return () => { if (autoRef.current) cancelAnimationFrame(autoRef.current); };
  }, []);

  const pause = () => { isPausedRef.current = true; };
  const resume = () => { setTimeout(() => { isPausedRef.current = false; }, 2000); };

  const scroll = (dir: number) => {
    pause();
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });
    resume();
  };

  return (
    <section id="gallery" className="py-24 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${B.panel} 0%, ${B.surface} 100%)` }}>
      <div className="absolute inset-x-0 top-0 h-px opacity-40" style={{ background: `linear-gradient(90deg, transparent, ${B.gold}, transparent)` }} />
      <div className="absolute inset-x-0 bottom-0 h-px opacity-40" style={{ background: `linear-gradient(90deg, transparent, ${B.gold}, transparent)` }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.42em] uppercase mb-5 px-5 py-2 rounded-full"
            style={{ color: B.gold, background: 'rgba(184,134,11,0.07)', border: `1px solid ${B.border}` }}>
            <Sparkles className="w-3 h-3" />
            {lang === 'ar' ? 'معرض الصور' : 'Photo Gallery'}
          </span>
          {/* ✂️ Gallery 💈 — emojis on both sides */}
          <h2 className="text-3xl md:text-5xl font-black tracking-wider uppercase" style={{ color: B.white, fontFamily: '"Playfair Display", serif' }}>
            ✂️ &nbsp;{lang === 'ar' ? 'المعرض' : 'Gallery'}&nbsp; 💈
          </h2>
          <div className="w-28 h-[2px] mx-auto rounded-full mt-5" style={{ background: `linear-gradient(90deg, transparent, ${B.gold}, transparent)` }} />
        </motion.div>
      </div>

      <div className="relative w-full" dir="ltr"
        onMouseEnter={pause} onMouseLeave={resume}
        onTouchStart={pause} onTouchEnd={resume}>

        {/* Arrow fade edges */}
        <div className="absolute left-0 top-0 bottom-10 w-16 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to right, ${B.panel}, transparent)` }} />
        <div className="absolute right-0 top-0 bottom-10 w-16 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to left, ${B.surface}, transparent)` }} />

        <button onClick={() => scroll(-1)}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all hover:scale-110"
          style={{ background: 'rgba(6,8,14,0.95)', border: `1px solid ${B.borderGlow}`, color: B.gold, boxShadow: `0 0 20px rgba(184,134,11,0.18)` }}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => scroll(1)}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all hover:scale-110"
          style={{ background: 'rgba(6,8,14,0.95)', border: `1px solid ${B.borderGlow}`, color: B.gold, boxShadow: `0 0 20px rgba(184,134,11,0.18)` }}>
          <ChevronRight className="w-5 h-5" />
        </button>

        <div ref={scrollRef}
          className="flex overflow-x-auto gap-5 pb-10 pt-4 px-8 lg:px-20"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
          {images.map((src, idx) => (
            <motion.div key={idx}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }} transition={{ delay: idx * 0.05, duration: 0.5 }}
              className="shrink-0 w-[72vw] sm:w-[250px] md:w-[260px] aspect-[3/4] overflow-hidden rounded-2xl relative group cursor-pointer"
              style={{ border: `1px solid ${B.border}`, boxShadow: `0 0 20px rgba(184,134,11,0.08), 0 20px 50px rgba(0,0,0,0.6)` }}
              onClick={() => { pause(); setSelected(src); }}
              whileHover={{ scale: 1.03, y: -6 }}>
              <img src={src} alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={e => { (e.target as HTMLImageElement).style.opacity = '0'; }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to top, rgba(184,134,11,0.38) 0%, transparent 60%)` }} />
            </motion.div>
          ))}
        </div>
        <p className="text-center text-xs mt-1 md:hidden tracking-widest font-bold" style={{ color: B.goldDark }}>← swipe →</p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
            style={{ background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(20px)' }}
            onClick={() => { setSelected(null); resume(); }}>
            <button className="absolute top-6 right-6 p-3 rounded-full z-10"
              style={{ background: 'rgba(6,8,14,0.98)', border: `1px solid ${B.borderGlow}`, color: B.gold }}
              onClick={() => { setSelected(null); resume(); }}>
              <X className="w-6 h-6" />
            </button>
            <motion.img initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }} transition={{ type: 'spring', damping: 22, stiffness: 260 }}
              src={selected} alt="Selected"
              className="max-w-full max-h-full object-contain rounded-2xl"
              style={{ boxShadow: `0 0 80px rgba(184,134,11,0.25)` }}
              onClick={e => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ══════════════════════════════════
   REVIEWS
══════════════════════════════════ */
const REVIEWS = [
  { name: 'Ahmad Al-Mansoori', rating: 5, text: 'Best barbershop in Bahrain. The facial and haircut combo was absolutely premium. Staff is very professional.', ar: 'أفضل محل حلاقة في البحرين. تجربة الفيشل وقصة الشعر كانت ممتازة. الموظفون محترفون جداً.' },
  { name: 'Khalid Hassan',     rating: 5, text: 'Amazing spa services. The foot massage and pedicure were top notch. Clean, modern and relaxing atmosphere.', ar: 'خدمات سبا رائعة. تدليك القدم والبديكير كانا ممتازين. جو نظيف وحديث ومريح.' },
  { name: 'Mohammed Saleh',    rating: 5, text: 'Friendly barbers, great attention to detail. Located conveniently inside Alsayh Centre in Busaiteen.', ar: 'حلاقون ودودون، اهتمام كبير بالتفاصيل. موقع مريح داخل مركز الصايح في البسيتين.' },
  { name: 'Faisal Al-Dosari',  rating: 4, text: 'Very good services and reasonable prices. The manicure and pedicure are excellent. Will definitely return.', ar: 'خدمات جيدة جداً وأسعار معقولة. المانيكير والبديكير ممتازان. سأعود بالتأكيد.' },
  { name: 'Yusuf Al-Bahrani',  rating: 5, text: 'Visited for hair color and a shave. Professional job done with great care. Highly recommended!', ar: 'زرتهم لصباغة الشعر والحلاقة. عمل احترافي بعناية فائقة. أنصح بهم بشدة!' },
];

function ReviewsSection({ isRTL }: { isRTL: boolean }) {
  return (
    <section id="reviews" className="py-28 relative overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${B.surface} 0%, ${B.panel} 100%)` }}>
      <div className="absolute inset-x-0 top-0 h-px opacity-40" style={{ background: `linear-gradient(90deg, transparent, ${B.gold}, transparent)` }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.42em] uppercase mb-5 px-5 py-2 rounded-full"
            style={{ color: B.gold, background: 'rgba(184,134,11,0.07)', border: `1px solid ${B.border}` }}>
            <Star className="w-3 h-3 fill-current" style={{ color: B.gold }} />
            {isRTL ? '4.7 تقييم جوجل' : '4.7 on Google'}
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-wider uppercase" style={{ color: B.white, fontFamily: '"Playfair Display", serif' }}>
            {isRTL ? 'تقييمات العملاء' : 'Customer Reviews'}
          </h2>
          <div className="w-24 h-[2px] mx-auto rounded-full mt-5" style={{ background: `linear-gradient(90deg, transparent, ${B.gold}, transparent)` }} />
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((r, idx) => (
            <motion.div key={idx}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: idx * 0.09, duration: 0.5 }}
              className="rounded-2xl p-6"
              style={{ background: 'rgba(10,13,20,0.9)', border: `1px solid ${B.border}`, boxShadow: `0 0 30px rgba(184,134,11,0.05), 0 20px 50px rgba(0,0,0,0.4)` }}>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: B.gold }} />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: B.silver }}>"{isRTL ? r.ar : r.text}"</p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black"
                  style={{ background: `linear-gradient(135deg, ${B.gold}, ${B.goldDark})`, color: B.bg }}>
                  {r.name.charAt(0)}
                </div>
                <span className="text-xs font-bold" style={{ color: B.white }}>{r.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black tracking-widest uppercase transition-all hover:scale-105"
            style={{ color: B.gold, border: `1px solid ${B.border}`, background: 'rgba(184,134,11,0.06)' }}>
            <Star className="w-4 h-4 fill-current" style={{ color: B.gold }} />
            {isRTL ? 'اقرأ كل التقييمات على جوجل' : 'Read All Reviews on Google'}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════
   CHATBOT — button-driven, no AI
══════════════════════════════════ */
type Msg = { from: 'bot' | 'user'; text: string };

const INFO = {
  en: {
    address: '📍 Alsayh Centre, 2811 Busaiteen / Al Sayh, Bahrain\n🗺️ ' + MAPS_URL,
    phone:   '📞 +973 3977 7136\n💬 WhatsApp: wa.me/97339777136',
    hours:   '🕙 Mon–Wed & Sat–Sun: 10 AM – 10 PM\n🕙 Thu–Fri: 10 AM – 11 PM',
    prices:  '✂️ Hair Cut — 2.5 BD\n🪒 Beard Shave — 1.5 BD\n🚿 Hair Wash — 2 BD\n💨 Hair Drying — from 4 BD\n✨ Protein Treatment — from 15 BD\n💎 Opti Smooth — from 35 BD\n🎨 Hair Dye — from 8 BD\n🖌️ Highlights — from 18 BD\n💅 Classic Manicure — 3 BD\n🦶 Classic Pedicure — 4 BD\n🛁 Spa Manicure — 4 BD\n🧖 Spa Pedicure — 5 BD\n👑 Royal Manicure — 5 BD\n👑 Royal Pedicure — 6 BD\n💆 Foot Massage — 1 BD\n✨ Regular Facial — 5 BD\n🌟 Professional Facial — 8 BD',
    services:'We offer: Haircuts, Beard Shaving, Hair Treatments (Protein, Opti-Smooth, Highlights, Dye), Manicure & Pedicure (Classic / Spa / Royal), Foot Massage, Facials (Regular & Professional).',
    book:    '📲 Book easily via WhatsApp:\n+973 3977 7136\nwa.me/97339777136\n\nWalk-ins are also welcome!',
    welcome: 'Hi! 👋 Welcome to The Barber Shop & Spa.\nTap a button below to get the info you need instantly:',
  },
  ar: {
    address: '📍 مركز الصايح، 2811 البسيتين / الصايح، البحرين\n🗺️ ' + MAPS_URL,
    phone:   '📞 97339777136+\n💬 واتساب: wa.me/97339777136',
    hours:   '🕙 الإثنين–الأربعاء والسبت–الأحد: 10ص – 10م\n🕙 الخميس–الجمعة: 10ص – 11م',
    prices:  '✂️ قص الشعر — 2.5 BD\n🪒 حلاقة اللحية — 1.5 BD\n🚿 الشاور — 2 BD\n💨 ويفي — من 4 BD\n✨ بروتين — من 15 BD\n💎 أوبتي سموث — من 35 BD\n🎨 صبغة — من 8 BD\n🖌️ هايلايت — من 18 BD\n💅 منكير — 3 BD\n🦶 بدكير — 4 BD\n🛁 سبا منكير — 4 BD\n🧖 سبا بدكير — 5 BD\n👑 رويال منكير — 5 BD\n👑 رويال بدكير — 6 BD\n💆 مساج القدم — 1 BD\n✨ فيشل عادي — 5 BD\n🌟 فيشل بروفيشنال — 8 BD',
    services:'نقدم: قص الشعر، الحلاقة، علاجات الشعر (بروتين، أوبتي سموث، هايلايت، صبغة)، المانيكير والبديكير (عادي / سبا / رويال)، تدليك القدم، الفيشل.',
    book:    '📲 احجز موعدك عبر واتساب:\n97339777136+\nwa.me/97339777136\n\nالزيارات المباشرة مرحب بها أيضاً!',
    welcome: 'أهلاً! 👋 مرحباً بك في ذا باربر شوب آند سبا.\nاضغط على أحد الأزرار للحصول على المعلومات التي تحتاجها:',
  },
};

const BUTTONS = {
  en: [
    { label: '📍 Address',       key: 'address'  },
    { label: '📞 Phone',         key: 'phone'    },
    { label: '🕙 Hours',         key: 'hours'    },
    { label: '💰 Prices',        key: 'prices'   },
    { label: '💈 Services',      key: 'services' },
    { label: '📲 Book Now',      key: 'book'     },
  ],
  ar: [
    { label: '📍 الموقع',        key: 'address'  },
    { label: '📞 الهاتف',        key: 'phone'    },
    { label: '🕙 ساعات العمل',   key: 'hours'    },
    { label: '💰 الأسعار',       key: 'prices'   },
    { label: '💈 الخدمات',       key: 'services' },
    { label: '📲 احجز الآن',     key: 'book'     },
  ],
};

function ChatInterface({ isRTL }: { isRTL: boolean }) {
  const lang = isRTL ? 'ar' : 'en';
  const info = INFO[lang];
  const btns = BUTTONS[lang];

  const [messages, setMessages] = useState<Msg[]>([
    { from: 'bot', text: info.welcome },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  // Reset welcome message when language changes
  useEffect(() => {
    setMessages([{ from: 'bot', text: INFO[lang].welcome }]);
  }, [lang]);

  const handle = (key: string, label: string) => {
    const reply = (info as any)[key] as string;
    setMessages(prev => [
      ...prev,
      { from: 'user', text: label },
      { from: 'bot',  text: reply },
    ]);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: 'rgba(4,6,10,0.98)' }}>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
              style={m.from === 'user' ? {
                background: `linear-gradient(135deg, ${B.gold}, ${B.goldDark})`,
                color: B.bg, fontWeight: 600,
              } : {
                background: 'rgba(255,255,255,0.05)',
                border: `1px solid ${B.border}`,
                color: B.silver,
              }}>
              {m.text}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick buttons */}
      <div className="px-3 py-3 grid grid-cols-2 gap-2" style={{ borderTop: `1px solid rgba(184,134,11,0.08)` }}>
        {btns.map((b, i) => (
          <button key={i} onClick={() => handle(b.key, b.label)}
            className="px-3 py-2.5 rounded-xl text-[12px] font-bold tracking-wide transition-all hover:scale-105 active:scale-95 text-left"
            style={{ background: 'rgba(184,134,11,0.08)', border: `1px solid ${B.border}`, color: B.gold }}>
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════
   FAQ
══════════════════════════════════ */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div layout className="rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: open ? 'rgba(184,134,11,0.05)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${open ? B.borderGlow : 'rgba(255,255,255,0.06)'}`,
        transition: 'background 0.3s, border-color 0.3s',
      }}
      onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between px-6 py-5">
        <span className="font-black text-sm md:text-base" style={{ color: open ? B.gold : B.white }}>{question}</span>
        <div className="flex-shrink-0 ml-4">
          {open
            ? <ChevronUp className="w-5 h-5" style={{ color: B.gold }} />
            : <ChevronDown className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.3)' }} />}
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <p className="px-6 pb-6 text-sm leading-relaxed" style={{ color: B.silver }}>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ══════════════════════════════════
   APP ROOT
══════════════════════════════════ */
export default function App() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [isLoading, setIsLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
    setIsMobileMenuOpen(false);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'services', label: t('Services') },
    { id: 'gallery',  label: t('Photos')   },
    { id: 'reviews',  label: t('Reviews')  },
    { id: 'faq',      label: t('FAQ')      },
  ];

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen isRTL={isRTL} />}
      </AnimatePresence>

      <div className={`min-h-screen ${isRTL ? 'dir-rtl' : 'dir-ltr'}`}
        style={{ background: B.bg, color: B.white }} dir={isRTL ? 'rtl' : 'ltr'}>

        {/* ══ NAVBAR ══ */}
        <nav className="fixed top-0 w-full z-50"
          style={{
            background: 'rgba(8,11,16,0.97)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderBottom: `1px solid rgba(184,134,11,0.15)`,
          }}>
          <div className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${B.gold}, ${B.goldGlow}, ${B.gold}, transparent)` }} />

          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">

              {/* Brand */}
              <div className="flex items-center gap-3 flex-shrink-0 group cursor-pointer" onClick={() => scrollTo('hero')}>
                <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0"
                  style={{ border: `2px solid rgba(184,134,11,0.55)`, boxShadow: `0 0 16px rgba(184,134,11,0.30)` }}>
                  <img src="/gallery/logo.webp" alt="Logo"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={e => {
                      const img = e.target as HTMLImageElement;
                      img.src = '/gallery/2.jpg';
                      img.onerror = () => { img.style.display = 'none'; };
                    }} />
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-black tracking-[0.1em] leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                    <span style={{ color: B.gold }}>THE BARBER </span>
                    <span style={{ color: B.white }}>SHOP & SPA</span>
                  </div>
                  <div className="text-[9px] tracking-[0.22em] uppercase font-bold" style={{ color: B.goldDark }}>Busaiteen · Bahrain</div>
                </div>
              </div>

              {/* Desktop nav — dividers between items */}
              <div className="hidden lg:flex items-center">
                {navLinks.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="w-px h-5 mx-5" style={{ background: 'rgba(184,134,11,0.25)' }} />
                    <button onClick={() => scrollTo(item.id)}
                      className="text-[12px] font-black tracking-[0.22em] uppercase transition-all duration-200 hover:tracking-[0.28em] bg-transparent border-0 cursor-pointer relative group"
                      style={{ color: B.white }}>
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-[2px] transition-all duration-300 rounded-full"
                        style={{ background: `linear-gradient(90deg, ${B.gold}, ${B.goldGlow})` }} />
                    </button>
                  </div>
                ))}
                <div className="w-px h-5 mx-5" style={{ background: 'rgba(184,134,11,0.25)' }} />
                {/* WhatsApp CTA */}
                <a href={`${WALINK}?text=${encodeURIComponent(isRTL ? 'السلام عليكم، أريد الحجز' : 'Hello, I would like to book an appointment')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-black tracking-[0.18em] uppercase mr-3 transition-all hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${B.gold}, ${B.goldDark})`, color: '#06080e', boxShadow: `0 0 20px rgba(184,134,11,0.3)` }}>
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  {isRTL ? 'احجز' : 'Book'}
                </a>
                <LangButton isRTL={isRTL} onClick={toggleLang} />
              </div>

              {/* Mobile controls */}
              <div className="flex lg:hidden items-center gap-2">
                <LangButton isRTL={isRTL} onClick={toggleLang} />
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: B.white, background: isMobileMenuOpen ? 'rgba(184,134,11,0.1)' : 'transparent' }}>
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden"
                style={{ borderTop: `1px solid rgba(184,134,11,0.12)`, background: 'rgba(8,11,16,0.99)' }}>
                {navLinks.map((item, i) => (
                  <button key={i} onClick={() => scrollTo(item.id)}
                    className="w-full flex justify-between items-center px-6 py-4 text-sm font-black tracking-[0.2em] uppercase transition-colors hover:bg-white/[0.02]"
                    style={{ color: B.white, borderBottom: `1px solid rgba(184,134,11,0.08)` }}>
                    <span>{item.label}</span>
                    <span style={{ color: B.gold, fontSize: '1.1rem' }}>›</span>
                  </button>
                ))}
                <a href={`${WALINK}?text=${encodeURIComponent(isRTL ? 'السلام عليكم، أريد الحجز' : 'Hello, I would like to book an appointment')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-between px-6 py-4 text-sm font-black tracking-[0.2em] uppercase"
                  style={{ color: '#25D366', borderBottom: `1px solid rgba(184,134,11,0.08)` }}
                  onClick={() => setIsMobileMenuOpen(false)}>
                  <span>{isRTL ? 'احجز عبر واتساب' : 'Book on WhatsApp'}</span>
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <main>
          <HeroSection isRTL={isRTL} />
          <ServicesSection isRTL={isRTL} />
          <GallerySection />
          <ReviewsSection isRTL={isRTL} />

          {/* ── FAQ ── */}
          <section id="faq" className="py-28"
            style={{ background: `linear-gradient(180deg, ${B.surface} 0%, ${B.bg} 100%)` }}>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} className="text-center mb-14">
                <span className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.4em] uppercase mb-5 px-5 py-2 rounded-full"
                  style={{ color: B.gold, background: 'rgba(184,134,11,0.07)', border: `1px solid ${B.border}` }}>
                  <Sparkles className="w-3 h-3" />
                  {isRTL ? 'لديك سؤال؟' : 'Got Questions?'}
                </span>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest" style={{ color: B.white, fontFamily: '"Playfair Display", serif' }}>
                  {t('FAQ')}
                </h2>
                <div className="w-24 h-[2px] mx-auto rounded-full mt-5" style={{ background: `linear-gradient(90deg, transparent, ${B.gold}, transparent)` }} />
              </motion.div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map(n => (
                  <FAQItem key={n} question={t(`FaqQ${n}` as any)} answer={t(`FaqA${n}` as any)} />
                ))}
              </div>
            </div>
          </section>

          {/* ── CONTACT ── */}
          <section id="contact" className="py-20" style={{ background: B.navy }}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest" style={{ color: B.white, fontFamily: '"Playfair Display", serif' }}>
                  {t('Contact')}
                </h2>
                <div className="w-20 h-[2px] mx-auto rounded-full mt-4" style={{ background: `linear-gradient(90deg, transparent, ${B.gold}, transparent)` }} />
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <motion.a href="tel:+97339777136" whileHover={{ scale: 1.03 }}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl text-center"
                  style={{ background: 'rgba(184,134,11,0.05)', border: `1px solid ${B.border}` }}>
                  <Phone className="w-7 h-7" style={{ color: B.gold }} />
                  <span className="text-xs font-black tracking-[0.3em] uppercase" style={{ color: B.goldDark }}>
                    {isRTL ? 'اتصل بنا' : 'Call Us'}
                  </span>
                  <span className="font-black text-lg tracking-wide" style={{ color: B.white }} dir="ltr">+973 3977 7136</span>
                </motion.a>
                <motion.a href={MAPS_URL} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03 }}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl text-center"
                  style={{ background: 'rgba(184,134,11,0.05)', border: `1px solid ${B.border}` }}>
                  <MapPin className="w-7 h-7" style={{ color: B.gold }} />
                  <span className="text-xs font-black tracking-[0.3em] uppercase" style={{ color: B.goldDark }}>
                    {isRTL ? 'احصل على الاتجاهات' : 'Get Directions'}
                  </span>
                  <span className="text-sm leading-snug" style={{ color: B.silver }}>{t('Address')}</span>
                </motion.a>
                <motion.div whileHover={{ scale: 1.03 }}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl text-center"
                  style={{ background: 'rgba(184,134,11,0.05)', border: `1px solid ${B.border}` }}>
                  <Clock className="w-7 h-7" style={{ color: B.gold }} />
                  <span className="text-xs font-black tracking-[0.3em] uppercase" style={{ color: B.goldDark }}>
                    {isRTL ? 'ساعات العمل' : 'Hours'}
                  </span>
                  <div className="text-sm text-center whitespace-pre-line" style={{ color: B.silver }}>
                    {isRTL
                      ? 'الإثنين–الأربعاء: 10ص–10م\nالخميس–الجمعة: 10ص–11م\nالسبت–الأحد: 10ص–10م'
                      : 'Mon–Wed: 10 AM–10 PM\nThu–Fri: 10 AM–11 PM\nSat–Sun: 10 AM–10 PM'}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── FOOTER ── */}
          <footer style={{ background: '#04060b', borderTop: `1px solid rgba(184,134,11,0.08)` }}>
            <div className="h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${B.goldDark}, ${B.gold}, ${B.goldGlow}, ${B.gold}, ${B.goldDark}, transparent)` }} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
                <div>
                  <div className="text-xl font-black tracking-[0.1em] mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>
                    <span style={{ color: B.gold }}>THE BARBER </span>
                    <span style={{ color: B.white }}>SHOP & SPA</span>
                  </div>
                  <div className="text-[10px] tracking-[0.3em] uppercase mb-5 font-bold" style={{ color: B.goldDark }}>Men's Grooming · Bahrain</div>
                  <p className="text-zinc-500 text-sm leading-relaxed">{t('Tagline')}</p>
                  <div className="flex gap-3 mt-6">
                    <a href="https://www.instagram.com/thebarbershop.bh" target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-all"
                      style={{ background: 'rgba(184,134,11,0.08)', border: `1px solid ${B.border}` }}>
                      <Instagram className="w-4 h-4" style={{ color: B.gold }} />
                    </a>
                    <a href={`${WALINK}?text=${encodeURIComponent(isRTL ? 'السلام عليكم، أريد الحجز' : 'Hello, I would like to book an appointment')}`}
                      target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-all"
                      style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)' }}>
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#25D366">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <div>
                  <h4 className="font-black mb-5 text-[10px] uppercase tracking-[0.32em]" style={{ color: B.gold }}>{t('Contact')}</h4>
                  <div className="space-y-4 text-zinc-400 text-sm">
                    <a href={MAPS_URL} target="_blank" rel="noopener noreferrer"
                      className="flex items-start gap-3 hover:text-white transition-colors">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: B.gold }} />
                      <span className="leading-snug">{t('Address')}</span>
                    </a>
                    <a href="tel:+97339777136" className="flex items-center gap-3 hover:text-white transition-colors">
                      <Phone className="w-4 h-4 flex-shrink-0" style={{ color: B.gold }} />
                      <span dir="ltr" className="font-bold text-white tracking-wide">+973 3977 7136</span>
                    </a>
                  </div>
                </div>
                <div>
                  <h4 className="font-black mb-5 text-[10px] uppercase tracking-[0.32em]" style={{ color: B.gold }}>{t('Hours')}</h4>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4" style={{ color: B.gold }} />
                    <span className="text-zinc-300 text-sm font-semibold">{t('Opening_Hours')}</span>
                  </div>
                  <div className={`grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-sm ${isRTL ? 'pr-2' : 'pl-2'}`}>
                    {HOURS.map(({ day, hours }) => (
                      <>
                        <span key={day + 'a'} className="text-zinc-500">{t(day)}</span>
                        <span key={day + 'b'} dir="ltr" className="font-semibold" style={{ color: B.white }}>{hours}</span>
                      </>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-8 text-center text-xs text-zinc-700"
                style={{ borderTop: `1px solid rgba(184,134,11,0.06)` }}>
                © {new Date().getFullYear()} The Barber Shop and Spa — Bahrain. All rights reserved.
              </div>
            </div>
          </footer>
        </main>

        {/* ══ CHAT FAB ══ */}
        <motion.button onClick={() => setIsChatOpen(!isChatOpen)}
          className="fixed bottom-24 right-4 sm:right-6 w-14 h-14 rounded-full flex items-center justify-center z-50"
          whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }}
          style={{
            background: `linear-gradient(135deg, ${B.gold}, ${B.goldDark})`,
            boxShadow: `0 0 30px rgba(184,134,11,0.5), 0 10px 35px rgba(0,0,0,0.5)`,
          }}>
          <AnimatePresence mode="wait">
            <motion.div key={isChatOpen ? 'x' : 'msg'}
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}>
              {isChatOpen
                ? <X className="w-6 h-6" style={{ color: B.bg }} />
                : <MessageSquare className="w-6 h-6" style={{ color: B.bg }} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>

        {/* ══ CHAT PANEL ══ */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.94 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              className="fixed bottom-[108px] right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-80 md:w-96 max-w-[400px] rounded-2xl z-[60] overflow-hidden flex flex-col"
              style={{
                maxHeight: '560px', height: '65vh',
                border: `1px solid ${B.border}`,
                boxShadow: `0 0 50px rgba(184,134,11,0.10), 0 40px 80px rgba(0,0,0,0.6)`,
              }}>
              {/* Chat header */}
              <div className="p-4 flex justify-between items-center flex-shrink-0"
                style={{ background: 'rgba(8,11,16,0.99)', borderBottom: `1px solid rgba(184,134,11,0.09)` }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${B.gold}, ${B.goldDark})`, boxShadow: `0 0 16px rgba(184,134,11,0.4)` }}>
                    <Scissors className="w-5 h-5" style={{ color: B.bg }} />
                  </div>
                  <div>
                    <h3 className="font-black text-sm" style={{ color: B.white }}>
                      {isRTL ? 'مساعد المحل' : 'Shop Assistant'}
                    </h3>
                    <p className="text-xs flex items-center gap-1.5" style={{ color: B.gold }}>
                      <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse"
                        style={{ background: '#25D366', boxShadow: `0 0 6px #25D366` }} />
                      {isRTL ? 'متاح الآن' : 'Online now'}
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ChatInterface isRTL={isRTL} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══ WHATSAPP FAB ══ */}
        <motion.a
          href={`${WALINK}?text=${encodeURIComponent(isRTL ? 'السلام عليكم، أريد الحجز' : 'Hello, I would like to book an appointment')}`}
          target="_blank" rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.12 }}
          className="fixed bottom-6 right-4 sm:right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full"
          style={{
            background: '#25D366',
            animation: 'waPulse 2.5s ease-out infinite',
          }}
          aria-label="Contact on WhatsApp">
          <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </motion.a>

      </div>

      <style>{`
        @keyframes waPulse {
          0%   { box-shadow: 0 0 0 0 rgba(37,211,102,0.55); }
          70%  { box-shadow: 0 0 0 18px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
        ::-webkit-scrollbar { display: none; }
        .dir-rtl { direction: rtl; }
        .dir-ltr { direction: ltr; }
      `}</style>
    </>
  );
}