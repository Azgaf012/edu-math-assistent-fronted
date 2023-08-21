import React from 'react';
import { animated, useSpring } from 'react-spring';
import './styles.css';

const SumaLlevando = ({ content, data }) => {
    const { numbers, result } = data;
    const topNumber = numbers[0].toString().split('').reverse();
    const bottomNumber = numbers[1].toString().split('').reverse();

    // Animación que hace que los números "salten"
    const bounce = useSpring({
        to: { transform: 'scale(1.1)' },
        from: { transform: 'scale(1)' },
        loop: true,
        config: { tension: 200, friction: 1 },
        delay: 500
    });

    return (
        <div className="suma-llevando">
            <div className="explanation">{content}</div>
            <div className="calculation">
                {topNumber.map((digit, index) => (
                    <div key={index} className="column">
                        <animated.span style={bounce} className="digit">{digit}</animated.span>
                        {bottomNumber[index] && <animated.span style={bounce} className="digit">{bottomNumber[index]}</animated.span>}
                    </div>
                ))}
                <div className="result">{result}</div>
            </div>
        </div>
    );
};

export default SumaLlevando;
