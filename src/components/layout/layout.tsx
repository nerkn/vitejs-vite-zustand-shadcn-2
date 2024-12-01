import { SiteBanner } from "./site-banner";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { ThemeProvider } from "./theme";

export function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
          <SiteBanner />
          <ThemeProvider  defaultTheme="system">
            <SiteHeader />
            {children}
            <SiteFooter /> 
          </ThemeProvider>
    </>
  )}