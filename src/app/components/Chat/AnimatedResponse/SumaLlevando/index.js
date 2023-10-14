import React, { useState, useEffect } from "react";
import { animated } from "react-spring";
import { Typography, Card, CardContent, Grid, Box, Paper, Container, useTheme, useMediaQuery, List, ListItem, Divider } from "@mui/material";

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
const Carry = (props) => <Paper {...props} elevation={3} sx={{ justifySelf: "center", p: 1, borderRadius: 1, textAlign: "center", bgcolor: "#FFA07A" }} />;
const Number = (props) => <Paper {...props} elevation={3} sx={{ justifySelf: "center", p: 1, borderRadius: 1, textAlign: "center", bgcolor: "#ADD8E6" }} />;
const Result = (props) => <Paper {...props} elevation={3} sx={{ justifySelf: "center", p: 1, borderRadius: 1, textAlign: "center", bgcolor: "#98FB98", border: "top" }} />;
const EmptySpace = (props) => <Box {...props} />;

const SumaLlevando = ({ content, data }) => {
  const [animationStep, setAnimationStep] = useState(0);
  const contentJson = JSON.parse(content);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (animationStep < data.numbers[0].toString().length) {
      setTimeout(() => {
        const sum = parseInt(data.numbers[0].toString().charAt(data.numbers[0].toString().length - 1 - animationStep)) + parseInt(data.numbers[1].toString().charAt(data.numbers[1].toString().length - 1 - animationStep));
        setAnimationStep((prev) => prev + (sum >= 10 ? 2 : 1));
      }, 1000);
    }
  }, [animationStep, data.numbers]);

  const CarryDigits = ({ carryDigits, fadeInStyle }) => {
    return (
      <>
        {Array(2 - carryDigits.length)
          .fill()
          .map((_, index) => (
            <EmptySpace key={"empty3-" + index}></EmptySpace>
          ))}
        {carryDigits.map((digit, index) =>
          digit !== 0 ? (
            <animated.div key={index} style={fadeInStyle}>
              <Carry>
                <Typography variant="span">{digit}</Typography>
              </Carry>
            </animated.div>
          ) : (
            <EmptySpace key={"empty-carry-" + index}></EmptySpace>
          )
        )}
      </>
    );
  };

  const AnimatedNumber = ({ number, animationStep, highlightStyle }) => {
    return (
      <>
        {Array(3 - number.toString().length)
          .fill()
          .map((_, index) => (
            <EmptySpace key={"empty-" + index}></EmptySpace>
          ))}
        {number
          .toString()
          .split("")
          .map((digit, index) => (
            <animated.div key={index} style={index === animationStep ? highlightStyle : {}}>
              <Number>
                <Typography variant="span">{digit}</Typography>
              </Number>
            </animated.div>
          ))}
      </>
    );
  };
  

  const ResultDigits = ({ result, fadeInStyle }) => {
    return (
      <>
        {Array(3 - result.toString().length)
          .fill()
          .map((_, index) => (
            <EmptySpace key={"empty-result-" + index}></EmptySpace>
          ))}
        {result
          .toString()
          .split("")
          .map((digit, index) => (
            <animated.div key={index} style={fadeInStyle}>
              <Result>
                <Typography variant="span">{digit}</Typography>
              </Result>
            </animated.div>
          ))}
      </>
    );
  };

  const AnimatedSum = (props) => (
    <Box {...props} sx={{ width: "80%", display: "grid", gridTemplateColumns: "repeat(3, 1fr) auto", gap: 2, fontSize: "15px", border: 1, borderColor: "#FF69B4", borderRadius: 1, p: 4 }}>
      {/* Header Labels */}
      <Typography variant="span" sx={{ gridColumn: "1", textAlign: "center" }}>C</Typography>
      <Typography variant="span" sx={{ gridColumn: "2", textAlign: "center" }}>D</Typography>
      <Typography variant="span" sx={{ gridColumn: "3", textAlign: "center" }}>U</Typography>
      <EmptySpace />  {/* This will occupy the 4th column */}
  
      {/* The rest of your components follow here */}
      <CarryDigits carryDigits={props.data.carry_digits} fadeInStyle={props.fadeInStyle} />
      <EmptySpace />
      <EmptySpace />
  
      <AnimatedNumber number={props.data.numbers[0]} animationStep={props.animationStep} highlightStyle={props.highlightStyle} />
      <Typography variant="h5" component="span">
        +
      </Typography>
      <AnimatedNumber number={props.data.numbers[1]} animationStep={props.animationStep} highlightStyle={props.highlightStyle} />
      <EmptySpace />
  
      <ResultDigits result={props.data.result} fadeInStyle={props.fadeInStyle} />
    </Box>
  );

  const ProcessStep = ({ children }) => <ListItem>{children}</ListItem>;

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="body1">
                {contentJson.saludo}. {contentJson.tema}
              </Typography>
              <Typography variant="h5">{contentJson.ejemplo.problema}</Typography>

              <Box my={2} display="flex" flexDirection={isSmallScreen ? "column" : "row-reverse"} justifyContent="space-between">
                {/* Sección de la suma animada */}
                <AnimatedSum data={data}>
                  {/* Todos tus componentes internos fueron movidos dentro de AnimatedSum */}
                </AnimatedSum>

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
              </Box>

              <Typography variant="h6">{contentJson.ejemplo.resultado}</Typography>
              <Typography variant="body1">
                {contentJson.conclusion}. {contentJson.sugerencia_practica}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SumaLlevando;
