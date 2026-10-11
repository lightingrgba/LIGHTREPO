export const runtime = 'edge'

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, ShieldCheck, Zap } from "lucide-react"
import { LocaleLink } from "@/components/ui/locale-link"
import { ArticleBody } from "@/components/blog/article-body"
import { articles, getArticle } from "@/lib/blog"
import { OG_IMAGE, SITE_NAME, SITE_URL, pageMetadata } from "@/lib/seo"

type Params = Promise<{ lang: string; slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  const meta = pageMetadata({
    lang,
    path: `/blog/${slug}`,
    title: article.title,
    description: article.description,
    englishOnly: true,
  })
  return {
    ...meta,
    // Article titles are long enough already; skip the "| LightBurn Pros" suffix.
    title: { absolute: article.title },
    openGraph: { ...meta.openGraph, type: "article", publishedTime: article.published, modifiedTime: article.updated },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const url = `${SITE_URL}/en/blog/${article.slug}`
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.description,
      image: [`${SITE_URL}${OG_IMAGE}`],
      datePublished: article.published,
      dateModified: article.updated,
      author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-icon.webp` },
      },
      mainEntityOfPage: url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/en/blog` },
        { "@type": "ListItem", position: 3, name: article.title, item: url },
      ],
    },
  ]

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3)

  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-14">
        <LocaleLink href="/blog" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          All guides
        </LocaleLink>

        <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 md:text-[40px]">{article.title}</h1>
        <p className="mb-8 flex items-center gap-1.5 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          {article.readMinutes} min read · Updated {formatDate(article.updated)}
        </p>

        <ArticleBody blocks={article.blocks} />

        {/* Call to action */}
        <aside className="mt-12 rounded-2xl bg-gradient-to-br from-primary to-red-600 p-6 text-white shadow-lg shadow-red-600/20 md:p-8">
          <h2 className="mb-2 text-2xl font-bold">Get LightBurn Pro today</h2>
          <p className="mb-5 text-white/90">
            One-time payment, no subscription. Your licence is delivered by email within minutes.
          </p>
          <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/90">
            <span className="flex items-center gap-1.5"><Zap className="h-4 w-4" /> Instant delivery</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4" /> 30-day money-back guarantee</span>
          </div>
          <LocaleLink
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-bold text-primary transition-colors hover:bg-red-50"
          >
            View LightBurn Pro
          </LocaleLink>
        </aside>
      </article>

      {/* Related guides */}
      <section className="border-t border-gray-100 bg-bg">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-xl font-bold text-gray-900">More guides</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((a) => (
              <LocaleLink
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="rounded-xl border border-gray-200 bg-white p-5 transition-colors hover:border-primary/30"
              >
                <h3 className="mb-2 font-semibold text-gray-900">{a.title}</h3>
                <p className="text-sm text-gray-600">{a.readMinutes} min read</p>
              </LocaleLink>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
