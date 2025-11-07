import { Box, Typography, Button, useTheme, Grid } from "@mui/material";
import { motion } from "framer-motion";
import bgImage from "@/assets/images/landing.svg";

export default function Landing() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: {
                    xs: "column", md: "row"
                },
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: theme.palette.background.default,
                overflow: "hidden",
                minHeight: { md: "100vh" },
            }}
        >
            {/* Text */}
            <Box
                component={motion.div}
                initial={{
                    opacity: 0, x: -40
                }}
                animate={{
                    opacity: 1, x: 0
                }}
                transition={{
                    duration: 1
                }}
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: { xs: "center", md: "flex-start" },
                    textAlign: { xs: "start", md: "left" },
                    px: { xs: 2, md: 8 },
                    color: theme.palette.text.primary,
                    mb: { xs: 6, md: 0 },
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 900,
                        mb: 3,
                        lineHeight: { lg: "60px" },
                        fontSize: { xs: "1.875rem", sm: "3rem" },
                    }}
                >
                    FIND CLOTHES THAT MATCHES YOUR STYLE
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        mb: 4,
                        color: theme.palette.text.secondary,
                        maxWidth: 600,
                        fontSize: { xs: "1rem" },
                    }}
                >
                    Browse through our diverse range of meticulously crafted garments,
                    designed to bring out your individuality and cater to your sense of style.
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                        px: 8,
                        py: 1.5,
                        fontWeight: "bold",
                        boxShadow: theme.palette.mode === "light"
                            ? theme.palette.text.primary
                            : theme.palette.primary.main,
                        "&:hover": {
                            bgcolor:
                                theme.palette.mode === "light"
                                    ? theme.palette.text.primary
                                    : theme.palette.primary.main,
                        },
                    }
                    }
                >
                    Shop Now
                </Button>
                {/* Stats Section */}
                <Grid
                    container
                    spacing={4}
                    sx={{
                        mt: 8,
                        textAlign: { xs: "center", md: "left" },
                        color: theme.palette.text.primary,
                    }}
                >
                    {[
                        { value: "200+", label: "International Brands" },
                        { value: "2,000+", label: "High-Quality Products" },
                        { value: "30,000+", label: "Happy Customers" },
                    ].map((item) => (
                        <Grid size={{ xs: 12, sm: 4 }} key={item.label}>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 800,
                                    color: theme.palette.text.primary,
                                    mb: 1,
                                }}
                            >
                                {item.value}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontSize: "1rem",
                                }}
                            >
                                {item.label}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Background Image  */}
            <Box
                component={motion.div}
                initial={{
                    opacity: 0,
                    y: 40
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 1
                }}
                sx={{
                    flex: 1,
                    width: "100%",
                    height: {
                        xs: "auto", md: "100vh"
                    },
                    minHeight: {
                        xs: "auto", md: "auto"
                    },
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: {
                        xs: "contain", md: "contain"
                    },
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    display: { xs: "none", md: "block" },
                }}
            />
        </Box >
    );
}
