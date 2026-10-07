import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import "../globals.css"
import { AnalyticsTracker } from "@/components/analytics-tracker"
import { Suspense } from "react"
import { headers } from "next/headers"
import { getCurrencyFromCountry } from "@/lib/currency"
import { CurrencyProvider } from "@/components/currency-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>
}): Promise<Metadata> {
    const { lang } = await params
    const dict = await getDictionary(lang)

    return {
        title: dict.meta.title,
        description: dict.meta.description,
        keywords: ["lightburn", "laser engraving", "laser cutting", "software", "CNC"],
        icons: {
            icon: "/logo-icon.webp",
            apple: "/logo-icon.webp",
        },
        openGraph: {
            title: dict.meta.title,
            description: dict.meta.description,
            type: "website",
            locale: lang,
        },
    }
}

export const viewport: Viewport = {
    themeColor: "#B91C1C",
    width: "device-width",
    initialScale: 1,
}

import { getDictionary } from "@/lib/dictionary"

import Script from "next/script"
import { GOOGLE_ADS_ID } from "@/lib/gtag"

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ lang: string }>
}) {
    const { lang } = await params
    const headersList = await headers()
    const country = headersList.get("cf-ipcountry")
    let currency = getCurrencyFromCountry(country)

    // If language is an EU language and currency defaulted to USD (e.g. no country detected or non-EU IP), force EUR
    const EU_LANGS = ['de', 'fr', 'es', 'it', 'nl', 'pt']
    if (EU_LANGS.includes(lang) && currency === 'USD') {
        currency = 'EUR'
    }

    return (
        <html lang={lang} className={`${inter.variable} ${geistMono.variable}`}>
            <body className="font-sans antialiased">
                {/* Google tag (gtag.js), only when NEXT_PUBLIC_GOOGLE_ADS_ID is set */}
                {GOOGLE_ADS_ID && (
                    <>
                        <Script
                            async
                            src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
                            strategy="afterInteractive"
                        />
                        <Script id="google-tag" strategy="afterInteractive">
                            {`
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());

                                gtag('config', '${GOOGLE_ADS_ID}');
                            `}
                        </Script>
                    </>
                )}
                <CurrencyProvider initialCurrency={currency}>
                    <Suspense fallback={null}>
                        <AnalyticsTracker />
                    </Suspense>
                    {children}
                </CurrencyProvider>
            </body>
        </html>
    )
}
