import { SiteBanner } from "./layout/site-banner";
import { SiteFooter } from "./layout/site-footer";
import { SiteHeader } from "./layout/site-header";
import { ThemeProvider } from "./layout/theme";

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