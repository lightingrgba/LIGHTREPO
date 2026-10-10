// Google Ads conversion reporting.
//
// Mirrors Google's gtag_report_conversion snippet, with one important
// difference: navigation is also fired from a timeout, so a blocked, slow or
// failed tag can never strand the customer on the page instead of sending
// them to checkout.

// Google Analytics 4 measurement ID.
export const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "G-WMYWT95VBY"
// Your Google Ads account, e.g. "AW-123456789". Leave unset to skip Ads tracking.
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18434816305"
// Every Google product configured on the single gtag.js tag.
export const GOOGLE_TAG_IDS = [GOOGLE_ANALYTICS_ID, GOOGLE_ADS_ID].filter(Boolean)
// Conversion labels from Google Ads (the part after the "/" in send_to).
const BEGIN_CHECKOUT_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_BEGIN_CHECKOUT_LABEL ?? ""
const PURCHASE_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL ?? ""

export const BEGIN_CHECKOUT_SEND_TO =
    GOOGLE_ADS_ID && BEGIN_CHECKOUT_LABEL ? `${GOOGLE_ADS_ID}/${BEGIN_CHECKOUT_LABEL}` : ""
// Conversion targets ("AW-.../label"). Empty until the new Ads account has them.
const ADD_TO_BASKET_SEND_TO =
    process.env.NEXT_PUBLIC_GOOGLE_ADS_ADD_TO_BASKET_SEND_TO || "AW-18434816305/EKcdCIeUnZgdELHys9ZE"

const PAGE_VIEW_SEND_TO =
    process.env.NEXT_PUBLIC_GOOGLE_ADS_PAGE_VIEW_SEND_TO || "AW-18434816305/GJMkCMuEnpgdELHys9ZE"

/**
 * Queue a gtag command. Works before gtag.js has loaded: commands wait in
 * dataLayer and are sent once the tag arrives, so an early event isn't lost.
 */
function queueGtag(..._args: unknown[]) {
    if (typeof window === "undefined" || !GOOGLE_ADS_ID) return
    const w = window as any
    w.dataLayer = w.dataLayer || []
    // gtag.js expects the Arguments object itself, exactly as its own snippet pushes it.
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments)
}

/** Google Ads "Add to basket" conversion; fired whenever a product enters the cart. */
export function reportAddToBasket() {
    if (!ADD_TO_BASKET_SEND_TO) return
    queueGtag("event", "conversion", { send_to: ADD_TO_BASKET_SEND_TO, value: 1.0, currency: "USD" })
}

/** Google Ads "Page view" conversion; fired on every page the visitor opens. */
export function reportPageView() {
    if (!PAGE_VIEW_SEND_TO) return
    queueGtag("event", "conversion", { send_to: PAGE_VIEW_SEND_TO, value: 1.0, currency: "USD" })
}

export const PURCHASE_SEND_TO =
    GOOGLE_ADS_ID && PURCHASE_LABEL ? `${GOOGLE_ADS_ID}/${PURCHASE_LABEL}` : ""

// Google's snippet defaults; used when a caller has no live price to pass.
const DEFAULT_VALUE = 1.0
const DEFAULT_CURRENCY = "EUR"

// Longest we wait for the tag before navigating anyway.
const NAVIGATE_TIMEOUT_MS = 1000

type ConversionOptions = {
    /** Where to send the customer once the event has been reported. */
    url?: string
    /** Order value; falls back to Google's placeholder when unknown. */
    value?: number
    /** ISO currency code matching `value`. */
    currency?: string
    /** Which button was used, e.g. "hero" — recorded for the admin panel. */
    location?: string
}

/**
 * Record the click in our own database as well as Google Ads, so the admin
 * panel can show which buttons actually drive checkouts. Fire-and-forget:
 * a tracking failure must never delay or block the checkout handoff.
 */
function recordClick(url: string | undefined, location: string | undefined) {
    if (!location) return
    try {
        const body = JSON.stringify({ linkUrl: url ?? "unknown", location })
        // keepalive lets the request survive the page navigating away.
        fetch("/api/track-click", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
            keepalive: true,
        }).catch(() => {})
    } catch {
        /* never block checkout on analytics */
    }
}

/**
 * Report a "begin checkout" conversion, then navigate to `url` if given.
 * Safe to call when gtag is unavailable — navigation still happens.
 */
export function reportBeginCheckout({ url, value, currency, location }: ConversionOptions = {}) {
    recordClick(url, location)

    const navigate = () => {
        if (url) window.location.href = url
    }

    const gtag = typeof window !== "undefined" ? (window as any).gtag : undefined

    if (typeof gtag !== "function" || !BEGIN_CHECKOUT_SEND_TO) {
        navigate()
        return
    }

    let navigated = false
    const navigateOnce = () => {
        if (navigated) return
        navigated = true
        navigate()
    }

    // Whichever comes first: the tag's callback, or the timeout.
    if (url) {
        window.setTimeout(navigateOnce, NAVIGATE_TIMEOUT_MS)
    }

    gtag("event", "conversion", {
        send_to: BEGIN_CHECKOUT_SEND_TO,
        value: value ?? DEFAULT_VALUE,
        currency: currency ?? DEFAULT_CURRENCY,
        event_callback: navigateOnce,
    })
}
