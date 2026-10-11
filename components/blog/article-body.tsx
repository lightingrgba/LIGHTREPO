import type { ReactNode } from "react"
import { Lightbulb } from "lucide-react"
import { LocaleLink } from "@/components/ui/locale-link"
import type { Block } from "@/lib/blog"

// Inline marks used in lib/blog.ts: **bold**, `code` and [text](href).
const INLINE = /\*\*(.+?)\*\*|`(.+?)`|\[(.+?)\]\((.+?)\)/g

function inline(text: string): ReactNode[] {
    const out: ReactNode[] = []
    let last = 0
    for (const m of text.matchAll(INLINE)) {
        const i = m.index ?? 0
        if (i > last) out.push(text.slice(last, i))
        const key = `${i}`
        if (m[1]) out.push(<strong key={key} className="font-semibold text-gray-900">{m[1]}</strong>)
        else if (m[2]) out.push(<code key={key} className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.9em]">{m[2]}</code>)
        else if (m[3] && m[4])
            out.push(
                <LocaleLink key={key} href={m[4]} className="font-medium text-primary underline underline-offset-2 hover:text-primary-dark">
                    {m[3]}
                </LocaleLink>,
            )
        last = i + m[0].length
    }
    if (last < text.length) out.push(text.slice(last))
    return out
}

function slugify(text: string) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export function ArticleBody({ blocks }: { blocks: Block[] }) {
    return (
        <div className="space-y-5 text-[17px] leading-relaxed text-gray-700">
            {blocks.map((b, i) => {
                switch (b.type) {
                    case "p":
                        return <p key={i}>{inline(b.text)}</p>
                    case "h2":
                        return (
                            <h2 key={i} id={slugify(b.text)} className="scroll-mt-24 pt-6 text-2xl font-bold text-gray-900 md:text-[28px]">
                                {b.text}
                            </h2>
                        )
                    case "h3":
                        return (
                            <h3 key={i} className="pt-2 text-xl font-semibold text-gray-900">
                                {b.text}
                            </h3>
                        )
                    case "ul":
                        return (
                            <ul key={i} className="list-disc space-y-2 pl-6 marker:text-primary">
                                {b.items.map((item, j) => (
                                    <li key={j}>{inline(item)}</li>
                                ))}
                            </ul>
                        )
                    case "ol":
                        return (
                            <ol key={i} className="list-decimal space-y-2 pl-6 marker:font-semibold marker:text-primary">
                                {b.items.map((item, j) => (
                                    <li key={j}>{inline(item)}</li>
                                ))}
                            </ol>
                        )
                    case "tip":
                        return (
                            <div key={i} className="flex gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-base">
                                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                                <p>{inline(b.text)}</p>
                            </div>
                        )
                    case "table":
                        return (
                            <div key={i} className="overflow-x-auto rounded-xl border border-gray-200">
                                <table className="w-full min-w-[520px] text-left text-sm">
                                    <thead className="bg-gray-50 text-gray-900">
                                        <tr>
                                            {b.head.map((h, j) => (
                                                <th key={j} className="px-4 py-3 font-semibold">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 bg-white">
                                        {b.rows.map((row, j) => (
                                            <tr key={j}>
                                                {row.map((cell, k) => (
                                                    <td key={k} className={`px-4 py-3 align-top ${k === 0 ? "font-medium text-gray-900" : ""}`}>
                                                        {inline(cell)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                }
            })}
        </div>
    )
}
