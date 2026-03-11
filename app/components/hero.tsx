import { motion, useScroll, useTransform } from 'framer-motion';
import { translations } from '../lib/translations';
import { useState } from 'react';

function Hero() {
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, 300]);
    const [language, setLanguage] = useState<'en' | 'es'>('en');
    const t = translations[language].hero;
    return (
        <div className="w-full h-screen">
            <motion.div className='absolute inset-0 -z-10' style={{ y: heroY }}>
                <img src="/img/5.jpg" alt="hero" className='w-full h-screen object-cover' />
                <div>
                    <div className='absolute inset-0 bg-gradient-to-t from-[#2d1c10]/50 via-[#2d1c10]/20 to-transparent '></div>
                </div>
            </motion.div>
            <div className='absolute h-full w-full flex flex-col justify-center items-center z-10'>
                <div className='flex flex-col justify-center items-center space-y-6'>
                    <motion.h1 className='text-white  text-5xl lg:text-7xl tracking-wider font-bold shadow-2xl' initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} >{t.headline1}</motion.h1>
                    <motion.h2 className='text-5xl mb-6 lg:text-8xl tracking-wide font-extrabold text-center bg-gradient-to-r from-[#E8D88E] via-[#F4E5A1] to-[#D4AF37] bg-clip-text text-transparent' initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}  >{t.headline2}</motion.h2>
                </div>
                <div>
                    <motion.p className='text-lg lg:text-2xl shadow-2xl text-white/90 max-w-3xl font-light text-center trackimg-wide' initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} >{t.subtitle}</motion.p>
                </div>
                <motion.button className='px-10 py-4 font-bold text-lg shadow-2xl mt-8 text-[#0A1628] bg-gradient-to-r from-[#E8D88E] to-[#C19A2E] hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#A88525] rounded-full transition-all' initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.8 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} >{t.searchButton}</motion.button>
            </div>
        </div>
    )
}

export default Hero