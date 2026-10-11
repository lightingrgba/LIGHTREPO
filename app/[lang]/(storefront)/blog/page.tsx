export const runtime = 'edge'

import type { Metadata } from "next"
import { ArrowRight, Clock } from "lucide-react"
import { LocaleLink } from "@/components/ui/locale-link"
import { articles } from "@/lib/blog"
import { pageMetadata } from "@/lib/seo"

const TITLE = "LightBurn Guides & Tutorials"
const DESCRIPTION =
  "Practical LightBurn guides: diode laser settings, material tests, connecting Ruida CO2 lasers, galvo fiber setup and choosing the right laser software."

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return pageMetadata({ lang, path: "/blog", title: TITLE, description: DESCRIPTION, englishOnly: true })
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

export default function BlogIndexPage() {
  return (
    <div className="bg-bg">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <header className="mb-10 max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">Blog</p>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">{TITLE}</h1>
          <p className="text-lg text-gray-600">
            Step-by-step help to get better results from your laser, whether you run a diode, CO2 or fiber machine.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((a) => (
            <LocaleLink
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
            >
              <h2 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-primary">{a.title}</h2>
              <p className="mb-5 flex-1 text-gray-600">{a.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {a.readMinutes} min read · {formatDate(a.published)}
                </span>
                <span className="flex items-center gap-1 font-semibold text-primary">
                  Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </LocaleLink>
          ))}
        </div>
      </div>
    </div>
  )
}
