import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box, Grid } from "@mui/material";

export const LoadingSkeleton = () => {
  return (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}

      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="rectangular" width={"100%"} height={'10vh'} />
      <Grid container wrap="nowrap">
        <Box sx={{ width: "10%", marginRight: 0.5, my: 0 }}>
          <Skeleton variant="rectangular" width={"100%"} height={"100vh"} />
        </Box>
        <Box sx={{ width: "100%", marginRight: 0.5, my: 0 }}>
          <Skeleton variant="rectangular" width={"100%"} height={"75vh"} />
        </Box>
      </Grid>
    </Stack>
  );
}
