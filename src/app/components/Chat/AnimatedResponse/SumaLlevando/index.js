import React, { useState, useEffect } from 'react';
import { animated,  } from 'react-spring';
import { Typography, Box, useTheme, useMediaQuery, List, ListItem, Divider, Paper } from '@mui/material';

const ProcessContainer = (props) => (
  <Box
    {...props}
    sx={{
      width: "80%",
      p: 1,
      borderRadius: 2,
      bgcolor: "#FFF0F5",
      boxShadow: 1,
      ml: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    }}
  />
);

const Number = (props) => (
  <Paper {...props} elevation={3} sx={{ justifySelf: "center", p: 1, borderRadius: 1, textAlign: "center", bgcolor: "#ADD8E6" }} />
);

const Result = (props) => (
  <Paper {...props} elevation={3} sx={{ justifySelf: "center", p: 1, borderRadius: 1, textAlign: "center", bgcolor: "#98FB98" }} />
);

const EmptySpace = (props) => <Box {...props} />;

const CarryOver = (props) => (
  <Paper {...props} elevation={3} sx={{ justifySelf: "center", p: 1, borderRadius: 1, textAlign: "center", bgcolor: "#FFD700" }} />
);

const CarryOverDigits = ({ carryOverDigits }) => (
  <>
    {Array(2 - carryOverDigits.length)
      .fill()
      .map((_, index) => (
        <EmptySpace key={"empty-carry-" + index}></EmptySpace>
      ))}
    {carryOverDigits.map((digit, index) => (
      digit !== 0 ? (
        <animated.div key={index}>
          <CarryOver>
            <Typography variant="span">{digit}</Typography>
          </CarryOver>
        </animated.div>
      ) : (
        <EmptySpace key={"empty-carry-" + index}></EmptySpace>
      )
    ))}
  </>
);

const AnimatedNumber = ({ number}) => (
  <>
    {Array(3 - number.toString().length)
      .fill()
      .map((_, index) => (
        <EmptySpace key={"empty-" + index}></EmptySpace>
      ))}
    {number.toString().split("").map((digit, index) => (
      <animated.div key={index} >
        <Number>
          <Typography variant="span">{digit}</Typography>
        </Number>
      </animated.div>
    ))}
  </>
);

const ResultDigits = ({ result }) => (
  <>
    {Array(3 - result.toString().length)
      .fill()
      .map((_, index) => (
        <EmptySpace key={"empty-result-" + index}></EmptySpace>
      ))}
    {result.toString().split("").map((digit, index) => (
      <animated.div key={index}>
        <Result>
          <Typography variant="span">{digit}</Typography>
        </Result>
      </animated.div>
    ))}
  </>
);

const AnimatedSum = ({ data}) => {


  return (
    <Box sx={{ width: "50%", display: "grid", gridTemplateColumns: "repeat(3, 1fr) auto", gap: 2, fontSize: "15px", border: 1, borderColor: "#FF69B4", borderRadius: 1, p: 4 }}>
      <Typography variant="span" sx={{ gridColumn: "1", textAlign: "center" }}>C</Typography>
      <Typography variant="span" sx={{ gridColumn: "2", textAlign: "center" }}>D</Typography>
      <Typography variant="span" sx={{ gridColumn: "3", textAlign: "center" }}>U</Typography>
      <EmptySpace />  {/* Esto ocupará la 4ta columna */}
      <CarryOverDigits carryOverDigits={data.carry_digits}/>
      <EmptySpace />
      <EmptySpace />
      <AnimatedNumber number={data.numbers[0]} />
      <Typography variant="h5" component="span">+</Typography>
      <AnimatedNumber number={data.numbers[1]} />
      <EmptySpace />
      <ResultDigits result={data.result} f />
    </Box>
  );
};

const ProcessStep = ({ children }) => <ListItem>{children}</ListItem>;

const SumProcess = ({ content, data }) => {
  console.log(data);
  const [animationStep, setAnimationStep] = useState(0);
  const contentJson = JSON.parse(content);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (animationStep < Math.max(data.numbers[0].toString().length, data.numbers[1].toString().length)) {
      const timer = setTimeout(() => {
        setAnimationStep(prev => prev + 1);
      }, 1000);
      
      return () => clearTimeout(timer); // Limpiamos el timer para evitar efectos secundarios no deseados.
    }
  }, [animationStep, data.numbers]);

  

  return (
    <Box my={2} p={2} display="flex" flexDirection={isSmallScreen ? "column" : "row"} justifyContent="space-between"
    
    >
      <ProcessContainer>
        <List>
          {contentJson.ejemplo.pasos.map((step, index) => (
            <React.Fragment key={index}>
              <ProcessStep>
                <Typography>{step}</Typography>
              </ProcessStep>
              {index !== contentJson.ejemplo.pasos.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </ProcessContainer>
      <AnimatedSum data={data} animationStep={animationStep} />
    </Box>
  );
};

export default SumProcess;
