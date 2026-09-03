import { motion } from 'framer-motion';
import { useEffect } from 'react';

const LoadingScreen = ({ onComplete, setSparkyEmotion, setSparkyMessage }) => {
  useEffect(() => {
    setSparkyEmotion('float');
    setSparkyMessage('Loading Magic...');
    
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete, setSparkyEmotion, setSparkyMessage]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'var(--bg-gradient)',
        zIndex: 9999
      }}
    >
      <div style={{ marginTop: '2rem', width: '200px', height: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '5px', overflow: 'hidden' }}>
        <motion.div 
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{ height: '100%', background: 'var(--primary-color)' }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
