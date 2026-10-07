import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"

export const SITE_URL = "https://lightburnpros.com"
export const SITE_NAME = "LightBurn Pros"

// Languages that have their own translations. es/it fall back to English
// content, so they are left out of hreflang and the sitemap to avoid
// duplicate pages.
export const SEO_LOCALES = ["en", "de", "fr"] as const

const OG_LOCALES: Record<string, string> = { en: "en_US", de: "de_DE", fr: "fr_FR" }

export const OG_IMAGE = "/lightburn-pro-software-box-3d-futuristic.jpg"

/** Public pages, as app-relative paths ("" is the home page). */
export const PUBLIC_PATHS = [
    "",
    "/contact",
    "/terms",
    "/privacy-policy",
    "/refund-policy",
    "/delivery-policy",
] as const

function url(lang: string, path: string) {
    return `${SITE_URL}/${lang}${path}`
}

/** hreflang map for one page across every translated language. */
export function languageAlternates(path: string): Record<string, string> {
    const languages: Record<string, string> = {}
    for (const l of SEO_LOCALES) languages[l] = url(l, path)
    languages["x-default"] = url("en", path)
    return languages
}

/** Keep descriptions inside the ~155 characters search results show. */
function clip(text: string, max = 155) {
    if (text.length <= max) return text
    return text.slice(0, text.lastIndexOf(" ", max - 1)) + "…"
}

/**
 * Metadata for an indexable page: unique title and description, canonical
 * URL, hreflang alternates and social preview tags.
 */
export function pageMetadata({
    lang,
    path,
    title,
    description,
}: {
    lang: string
    path: string
    title: string
    description: string
}): Metadata {
    const translated = (SEO_LOCALES as readonly string[]).includes(lang)
    const canonical = url(translated ? lang : "en", path)
    const desc = clip(description)

    return {
        title,
        description: desc,
        alternates: { canonical, languages: languageAlternates(path) },
        openGraph: {
            title,
            description: desc,
            url: canonical,
            siteName: SITE_NAME,
            type: "website",
            locale: OG_LOCALES[lang] ?? OG_LOCALES.en,
            images: [{ url: OG_IMAGE, alt: title }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: desc,
            images: [OG_IMAGE],
        },
    }
}

/** Pages that should never appear in search results (cart, checkout, admin). */
export const NO_INDEX: Metadata = { robots: { index: false, follow: false } }

type LegalKey = "termsOfService" | "privacyPolicy" | "refundPolicy" | "shippingPolicy"

/** Metadata for a legal page, built from its translated title and first paragraph. */
export async function legalMetadata(lang: string, path: string, key: LegalKey): Promise<Metadata> {
    const dict = await getDictionary(lang)
    const page = dict.legal[key] as {
        title: string
        sections?: { paragraphs?: string[] }[]
        intro?: string
    }
    const firstParagraph = page.intro ?? page.sections?.[0]?.paragraphs?.[0] ?? dict.meta.description
    return pageMetadata({ lang, path, title: page.title, description: firstParagraph })
}
