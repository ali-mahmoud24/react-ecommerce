import {
    Box,
    Container,
    Typography,
    Link,
    IconButton,
    useTheme,
    Grid,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import ChatIcon from "@mui/icons-material/Chat";

export default function Footer() {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
                mt: 6,
                pt: 6,
                borderTop: 1,
                borderColor: theme.palette.divider,
            }}
        >
            <Container>
                <Grid
                    container
                    spacing={4}
                >
                    {/* Brand Info */}
                    <Grid
                        size={{ xs: 12, sm: 4, md: 2.4 }}
                        sx={{ textAlign: { xs: "center", sm: "center", md: "left" } }}
                    >
                        <Typography
                            variant="h6"
                            fontWeight={700}
                            gutterBottom
                            sx={{ letterSpacing: 1 }}
                        >
                            Ecommerce
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                        >
                            We have clothes that suit your style and which you’re proud to
                            wear. From women to men.
                        </Typography>
                    </Grid>

                    {/* Company */}
                    <Grid
                        size={{ xs: 12, sm: 4, md: 2.4 }}
                        sx={{ textAlign: { xs: "center", sm: "center", md: "left" } }}
                    >
                        <Typography
                            variant="subtitle2"
                            fontWeight={700}
                            gutterBottom
                            textTransform="uppercase"
                        >
                            Company
                        </Typography>
                        {["About", "Careers", "Brand Center", "Blog"].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                underline="hover"
                                color="text.secondary"
                                display="block"
                                sx={{ mb: 1 }}
                            >
                                {item}
                            </Link>
                        ))}
                    </Grid>

                    {/* Help Center */}
                    <Grid
                        size={{ xs: 12, sm: 4, md: 2.4 }}
                        sx={{ textAlign: { xs: "center", sm: "center", md: "left" } }}
                    >
                        <Typography
                            variant="subtitle2"
                            fontWeight={700}
                            gutterBottom
                            textTransform="uppercase"
                        >
                            Help Center
                        </Typography>
                        {["Discord Server", "Twitter", "Facebook", "Contact Us"].map(
                            (item) => (
                                <Link
                                    key={item}
                                    href="#"
                                    underline="hover"
                                    color="text.secondary"
                                    display="block"
                                    sx={{ mb: 1 }}
                                >
                                    {item}
                                </Link>
                            )
                        )}
                    </Grid>

                    {/* Legal */}
                    <Grid
                        size={{ xs: 12, sm: 4, md: 2.4 }}
                        sx={{ textAlign: { xs: "center", sm: "center", md: "left" } }}
                    >
                        <Typography
                            variant="subtitle2"
                            fontWeight={700}
                            gutterBottom
                            textTransform="uppercase"
                        >
                            Legal
                        </Typography>
                        {["Privacy Policy", "Licensing", "Terms & Conditions"].map(
                            (item) => (
                                <Link
                                    key={item}
                                    href="#"
                                    underline="hover"
                                    color="text.secondary"
                                    display="block"
                                    sx={{ mb: 1 }}
                                >
                                    {item}
                                </Link>
                            )
                        )}
                    </Grid>

                    {/* Download */}
                    <Grid
                        size={{ xs: 12, sm: 4, md: 2.4 }}
                        sx={{ textAlign: { xs: "center", sm: "center", md: "left" } }}
                    >
                        <Typography
                            variant="subtitle2"
                            fontWeight={700}
                            gutterBottom
                            textTransform="uppercase"
                        >
                            Download
                        </Typography>
                        {["iOS", "Android", "Windows", "MacOS"].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                underline="hover"
                                color="text.secondary"
                                display="block"
                                sx={{ mb: 1 }}
                            >
                                {item}
                            </Link>
                        ))}
                    </Grid>
                </Grid>

                {/* Bottom Section */}
                <Box
                    sx={{
                        borderTop: 1,
                        borderColor: theme.palette.divider,
                        mt: 5,
                        py: 3,
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: "center",
                        justifyContent: "space-between",
                        textAlign: { xs: "center", md: "left" },
                    }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: { xs: 2, md: 0 } }}
                    >
                        © 2025 Ecommerce. All Rights Reserved.
                    </Typography>

                    <Box>
                        {[FacebookIcon, ChatIcon, TwitterIcon, GitHubIcon, SportsBasketballIcon].map(
                            (Icon, idx) => (
                                <IconButton
                                    key={idx}
                                    href="#"
                                    color="inherit"
                                    size="small"
                                    sx={{ mx: 0.5 }}
                                >
                                    <Icon />
                                </IconButton>
                            )
                        )}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
