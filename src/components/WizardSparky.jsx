import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MagoSprite } from '../utils/magoSprite';

const WizardSparky = ({ emotion = 'neutral', message = '', flipX = false, overridePos = null }) => {
  const canvasRef = useRef(null);
  const spriteRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && !spriteRef.current) {
      spriteRef.current = new MagoSprite(canvasRef.current, {
        animation: 'walk',
        fps: 10,
        scale: 5,
        loop: true
      });
    }

    return () => {
      if (spriteRef.current) {
        spriteRef.current.stop();
        spriteRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (spriteRef.current) {
      let anim = 'walk';
      if (emotion === 'grab') anim = 'grab';
      else if (emotion === 'celebrate') anim = 'release';
      else anim = 'walk';
      
      spriteRef.current.setAnimation(anim);
    }
  }, [emotion]);

  return (
    <div style={{ 
      position: overridePos ? 'fixed' : 'relative', 
      left: overridePos ? overridePos.x : 'auto',
      top: overridePos ? overridePos.y : 'auto',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      pointerEvents: 'none',
      transition: 'left 0.5s ease-in-out, top 0.5s ease-in-out',
      zIndex: 50
    }}>
      
      {/* Speech Bubble */}
      {message && (
        <motion.div 
          initial={{ opacity: 0, x: -10, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          key={message}
          style={{
            background: 'white',
            color: '#1e1b4b',
            padding: '1rem',
            borderRadius: '16px',
            maxWidth: '250px',
            minWidth: '150px',
            textAlign: 'center',
            fontWeight: '600',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            position: 'absolute',
            left: '90px',
            top: '10px',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        >
          {message}
          <div style={{
            position: 'absolute',
            left: '-10px',
            top: '20px',
            borderWidth: '10px 10px 10px 0',
            borderStyle: 'solid',
            borderColor: 'transparent white transparent transparent'
          }}></div>
        </motion.div>
      )}

      {/* Character */}
      <motion.div
        style={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: flipX ? 'scaleX(-1)' : 'scaleX(1)',
          marginTop: '30px'
        }}
      >
        <canvas ref={canvasRef} style={{ pointerEvents: 'none' }} />
      </motion.div>
    </div>
  );
};

export default WizardSparky;
