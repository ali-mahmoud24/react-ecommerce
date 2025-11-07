import { Card, CardContent, Skeleton, useTheme } from "@mui/material";

export default function SkeletonCard() {
    const theme = useTheme();

    return (
        <Card
            sx={{
                width: "100%",
                height: "100%",
                boxShadow: 2,
                overflow: "hidden",
            }}
        >
            <Skeleton
                variant="rectangular"
                height={200}
                sx={{
                    animation: "pulse 1.2s ease-in-out infinite",
                }}
            />
            <CardContent
                sx={{
                    textAlign: "center",
                    bgcolor: theme.palette.background.default,
                }}
            >
                <Skeleton variant="text" width="60%" sx={{ mx: "auto" }} />
                <Skeleton variant="text" width="80%" sx={{ mx: "auto" }} />
                <Skeleton variant="text" width="60%" sx={{ mx: "auto" }} />
            </CardContent>
        </Card>
    );
}
