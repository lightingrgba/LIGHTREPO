export const runtime = 'edge'
import { getDictionary } from "@/lib/dictionary"
import { legalMetadata } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return legalMetadata(lang, "/refund-policy", "refundPolicy")
}
import { LegalPage } from "@/components/legal-page"
import { RefreshCw } from "lucide-react"

export default async function RefundPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)
  const legal = dict.legal

  return (
    <LegalPage
      icon={RefreshCw}
      title={legal.refundPolicy.title}
      updated={legal.updated}
      email={legal.contactEmail}
      sections={legal.refundPolicy.sections}
    />
  )
}
