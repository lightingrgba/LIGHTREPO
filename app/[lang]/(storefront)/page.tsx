export const runtime = 'edge'

import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"
import { pageMetadata, SITE_URL, OG_IMAGE } from "@/lib/seo"
import { products } from "@/lib/products"
import { CURRENCY_CONFIG } from "@/lib/currency"
import { OfferBanner } from "@/components/sections/offer-banner"
import { SalesHeroSection } from "@/components/sections/sales-hero-section"
import { StatsBar } from "@/components/sections/stats-bar"
import { ProblemSection } from "@/components/sections/problem-section"
import { SolutionSection } from "@/components/sections/solution-section"
import { MotivationSection } from "@/components/sections/motivation-section"
import { ProductDetailsSection } from "@/components/sections/product-details-section"
import { ProductShowcase } from "@/components/sections/product-showcase"
import { WhyChooseSection } from "@/components/sections/why-choose-section"
import { TrustedPartners } from "@/components/sections/trusted-partners"
import { ReviewsSection } from "@/components/sections/reviews-section"
import { FAQSection } from "@/components/sections/faq-section"
import { SaleBanner } from "@/components/sections/sale-banner"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const meta = pageMetadata({ lang, path: "", title: dict.meta.title, description: dict.meta.description })
  // The home page title already names the product; skip the "| LightBurn Pros" suffix.
  return { ...meta, title: { absolute: dict.meta.title } }
}

/** Product + Offer structured data so search results can show price and availability. */
function productJsonLd(lang: string) {
  const product = products[0]
  const currency = lang === "de" || lang === "fr" ? "EUR" : "USD"
  const { price } = CURRENCY_CONFIG[currency]
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [`${SITE_URL}${OG_IMAGE}`, `${SITE_URL}${product.image}`],
    sku: product.id,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/${lang}`,
      price: price.toFixed(2),
      priceCurrency: currency,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  }
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(lang)) }}
      />
      {/* Offer + hero */}
      <OfferBanner dict={dict.hero} />
      <SalesHeroSection dict={dict.hero} common={dict.common} />
      <StatsBar dict={dict.stats} />

      {/* Problem → solution */}
      <ProblemSection dict={dict.problem} />
      <SolutionSection dict={dict.solution} />

      {/* Informational sections */}
      <MotivationSection dict={dict.motivation} />
      <ProductDetailsSection dict={dict.productDetails} />
      <ProductShowcase dict={dict.productShowcase} common={dict.common} />
      <WhyChooseSection dict={dict.whyChoose} />

      {/* Proof */}
      <TrustedPartners dict={dict.trustedPartners} />
      <ReviewsSection dict={dict.reviews} />

      {/* Objections + closing offer */}
      <FAQSection dict={dict.faq} />
      <SaleBanner dict={dict.saleBanner} />
    </>
  )
}
