import { ThemeProvider } from "./ThemeProvider";

export default function PublicLayout({ children }) {
  return (
    <>
    <ThemeProvider>
    {children}
    </ThemeProvider>
    </>
  );
}
