import "@/styles/globals.css";
import { Box } from "@mui/material";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Box maxWidth={1920} maxHeight={900} margin={"auto"}>
    <Component  {...pageProps} />
  </Box>;
}
