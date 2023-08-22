import React, { useState, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import './styles.css';

const SumaLlevando = ({ content, data }) => {
    const [animationStep, setAnimationStep] = useState(0);
    const [carry, setCarry] = useState([]);
    const [showExample, setShowExample] = useState(false);
  
    useEffect(() => {
      if (animationStep < data.numbers[0].toString().length) {
        setTimeout(() => {
          const sum = parseInt(data.numbers[0].toString().charAt(data.numbers[0].toString().length - 1 - animationStep)) + 
                      parseInt(data.numbers[1].toString().charAt(data.numbers[1].toString().length - 1 - animationStep));
          if (sum >= 10) {
            setCarry(prev => [...prev, 1]);
          } else {
            setCarry(prev => [...prev, 0]);
          }
          setAnimationStep(prev => prev + 1);
        }, 1000); 
      }
    }, [animationStep]);

    const fadeIn = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        delay: 1000 * animationStep
    });
    
    const highlight = useSpring({
        backgroundColor: animationStep > 0 ? 'yellow' : 'transparent',
        from: { backgroundColor: 'transparent' },
        delay: 1000 * animationStep
    });
  
    return (
      <div className="animated-sum-container">
        <div className="explanation-section">
              <div 
                  className="explanation-text"
                  dangerouslySetInnerHTML={{ __html: content }}
              />
              <button onClick={() => setShowExample(true)}>Ver Ejemplo</button>
          </div>
        <div className="animated-sum">
            {Array(3 - data.carry_digits.length).fill().map((_, index) => <div key={'empty3-' + index} className="empty"></div>)} 
            {data.carry_digits.map((digit, index) => (
                digit !== 0 ? 
                <animated.div key={index} style={fadeIn} className="carry">{digit}</animated.div> 
                : <div key={'empty-carry-' + index} className="empty"></div>
            ))}
            <div className="empty"></div>
            <div className="empty"></div>
    
            {Array(4 - data.numbers[0].toString().length).fill().map((_, index) => <div key={'empty1-' + index} className="empty"></div>)} 
            {data.numbers[0].toString().split('').map((digit, index) => (
                <animated.div key={index} style={index === animationStep ? highlight : {}} className="number">{digit}</animated.div>
            ))}
            <div className="operator">+</div>
    
            {Array(4 - data.numbers[1].toString().length).fill().map((_, index) => <div key={'empty2-' + index} className="empty"></div>)} 
            {data.numbers[1].toString().split('').map((digit, index) => (
                <animated.div key={index} style={index === animationStep ? highlight : {}} className="number">{digit}</animated.div>
            ))}
            <div className="empty"></div>
    
            {Array(4 - data.result.toString().length).fill().map((_, index) => <div key={'empty3-' + index} className="empty"></div>)} 
            {data.result.toString().split('').map((digit, index) => (
                <animated.div key={index} style={fadeIn} className="result">{digit}</animated.div>
            ))}
            
        </div>
      </div>
    );
    
   
};

export default SumaLlevando;
