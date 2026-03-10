import { motion, useScroll, useTransform } from 'framer-motion';

function Hero() {
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, 300]);
    return (
        <div className="w-full h-screen">
            <motion.div className='absolute inset-0' style={{ y: heroY }}>
                <img src="/img/5.jpg" alt="hero" className='w-full h-screen object-cover' />
                <div>
                    <div className='absolute inset-0 bg-gradient-to-t from-[#2d1c10]/50 via-[#2d1c10]/20 to-transparent '></div>
                </div>
            </motion.div>
        </div>
    )
}

export default Hero