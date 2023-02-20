import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box, Grid } from "@mui/material";

export const LoadingSkeleton = () => {
  return (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}

      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="rectangular" width={"90%"} height={'10vh'} sx={{ml:10, mt:5}} />
      <Grid container wrap="nowrap">
        <Box sx={{ width: "5%", marginRight: 0.5, my:0, ml:10}}>
          <Skeleton variant="rectangular" width={"100%"} height={"100vh"} />
        </Box>
        <Box sx={{ width: "100%", marginRight: 0.5, my: 0 }}>
          <Skeleton variant="rectangular" width={"95%"} height={"20vh"} />
          <Skeleton variant="rectangular" width={"95%"} height={"5vh"} sx={{mt:3}} />
          <Skeleton variant="rectangular" width={"95%"} height={"10vh"} sx={{mt:3}} />
          <Skeleton variant="rectangular" width={"95%"} height={"8vh"} sx={{mt:3}} />
          <Skeleton variant="rectangular" width={"95%"} height={"15vh"} sx={{mt:3}} />
          <Skeleton variant="rectangular" width={"95%"} height={"3vh"} sx={{mt:3}} />
        </Box>
      </Grid>
    </Stack>
  );
}
