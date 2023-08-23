import React, { useState, useEffect } from "react";
import { animated, useSpring } from "react-spring";
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
const AnimatedSum = (props) => <Box {...props} sx={{ width: "80%", display: "grid", gridTemplateColumns: "repeat(3, 1fr) auto", gap: 2, fontSize: "15px", border: 1, borderColor: "#FF69B4", borderRadius: 1, p: 4 }} />;
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

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 1000 * animationStep,
  });

  const highlight = useSpring({
    backgroundColor: animationStep > 0 ? "yellow" : "transparent",
    from: { backgroundColor: "transparent" },
    delay: 1000 * animationStep,
  });

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
  
  const DividerSum = () => {
    return (
      <>
       {Array(4)
        .fill()
        .map((_, index) => (
          <Divider orientation="horizontal" flexItem />
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
                <AnimatedSum>
                  <CarryDigits carryDigits={data.carry_digits} fadeInStyle={fadeIn} />
                  <EmptySpace />
                  <EmptySpace />

                  <AnimatedNumber number={data.numbers[0]} animationStep={animationStep} highlightStyle={highlight} />
                  <Typography variant="h5" component="span">
                    +
                  </Typography>
                  <AnimatedNumber number={data.numbers[1]} animationStep={animationStep} highlightStyle={highlight} />
                  <EmptySpace />
                  

                  <ResultDigits result={data.result} fadeInStyle={fadeIn} />
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
