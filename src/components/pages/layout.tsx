
export function Layout(){
  return (
          <SiteBanner />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SiteHeader />
            {children}
            <SiteFooter />
            <TailwindIndicator />
            <Script
            src="https://cloud.umami.is/script.js"
            strategy="afterInteractive"
            data-website-id="7ad28072-1308-433d-abce-2e92a70ab64d"
            defer
          />
          </ThemeProvider>
  )}