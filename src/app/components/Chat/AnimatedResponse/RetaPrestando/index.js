import React, { useState, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
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
    <Paper {...props} elevation={3} sx={{ justifySelf: "center", p: 1, borderRadius: 1, textAlign: "center", bgcolor: "#98FB98", border: "top" }} />
);

const EmptySpace = (props) => <Box {...props} />;

const Borrow = (props) => (
    <Paper {...props} elevation={3} sx={{ justifySelf: "center", p: 1, borderRadius: 1, textAlign: "center", bgcolor: "#FFA07A" }} />
);

const BorrowDigits = ({ borrowDigits, fadeInStyle }) => (
    <>
        {Array(2 - borrowDigits.length)
            .fill()
            .map((_, index) => (
                <EmptySpace key={"empty3-" + index}></EmptySpace>
            ))}
        {borrowDigits.map((digit, index) => (
            digit !== 0 ? (
                <animated.div key={index} style={fadeInStyle}>
                    <Borrow>
                        <Typography variant="span">{digit}</Typography>
                    </Borrow>
                </animated.div>
            ) : (
                <EmptySpace key={"empty-borrow-" + index}></EmptySpace>
            )
        ))}
    </>
);

const AnimatedNumber = ({ number, animationStep, highlightStyle }) => (
    <>
        {Array(3 - number.toString().length)
            .fill()
            .map((_, index) => (
                <EmptySpace key={"empty-" + index}></EmptySpace>
            ))}
        {number.toString().split("").map((digit, index) => (
            <animated.div key={index} style={index === animationStep ? highlightStyle : {}}>
                <Number>
                    <Typography variant="span">{digit}</Typography>
                </Number>
            </animated.div>
        ))}
    </>
);

const ResultDigits = ({ result, fadeInStyle }) => (
    <>
        {Array(3 - result.toString().length)
            .fill()
            .map((_, index) => (
                <EmptySpace key={"empty-result-" + index}></EmptySpace>
            ))}
        {result.toString().split("").map((digit, index) => (
            <animated.div key={index} style={fadeInStyle}>
                <Result>
                    <Typography variant="span">{digit}</Typography>
                </Result>
            </animated.div>
        ))}
    </>
);

const AnimatedSubtraction = ({ data, fadeInStyle, highlightStyle, animationStep }) => (
    <Box sx={{ width: "80%", display: "grid", gridTemplateColumns: "repeat(3, 1fr) auto", gap: 2, fontSize: "15px", border: 1, borderColor: "#FF69B4", borderRadius: 1, p: 4 }}>
        <Typography variant="span" sx={{ gridColumn: "1", textAlign: "center" }}>C</Typography>
        <Typography variant="span" sx={{ gridColumn: "2", textAlign: "center" }}>D</Typography>
        <Typography variant="span" sx={{ gridColumn: "3", textAlign: "center" }}>U</Typography>
        <EmptySpace />  {/* This will occupy the 4th column */}
        <BorrowDigits borrowDigits={data.borrow_digits} fadeInStyle={fadeInStyle} />
        <EmptySpace />
        <EmptySpace />
        <AnimatedNumber number={data.numbers[0]} animationStep={animationStep} highlightStyle={highlightStyle} />
        <Typography variant="h5" component="span">-</Typography>
        <AnimatedNumber number={data.numbers[1]} animationStep={animationStep} highlightStyle={highlightStyle} />
        <EmptySpace />
        <ResultDigits result={data.result} fadeInStyle={fadeInStyle} />
    </Box>
);

const ProcessStep = ({ children }) => <ListItem>{children}</ListItem>

const SubtractionProcess = ({ content, data }) => {
    const [animationStep, setAnimationStep] = useState(0);
    const contentJson = JSON.parse(content);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (animationStep < data.numbers[0].toString().length) {
            setTimeout(() => {
                const diff = parseInt(data.numbers[0].toString().charAt(data.numbers[0].toString().length - 1 - animationStep)) -
                    parseInt(data.numbers[1].toString().charAt(data.numbers[1].toString().length - 1 - animationStep)) -
                    (data.borrow_digits[animationStep] || 0);
                setAnimationStep((prev) => prev + (diff < 0 ? 2 : 1));
            }, 1000);
        }
    }, [animationStep, data.numbers, data.borrow_digits]);

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

    return (
        <Box my={2} display="flex" flexDirection={isSmallScreen ? "column" : "row-reverse"} justifyContent="space-between">
            <AnimatedSubtraction data={data} fadeInStyle={fadeIn} highlightStyle={highlight} animationStep={animationStep} />
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
    );
};

export default SubtractionProcess;
