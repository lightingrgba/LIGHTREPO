import type { Metadata } from "next"
import { getDictionary } from "@/lib/dictionary"
import { pageMetadata } from "@/lib/seo"
import { ContactClient } from "@/components/contact-client"

export const runtime = 'edge'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return pageMetadata({ lang, path: "/contact", title: dict.contact.title, description: dict.contact.subtitle })
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  return <ContactClient dict={dict.contact} />
}
