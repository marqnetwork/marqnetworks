import { NextResponse } from 'next/server'

async function shortenWithIsGd(url: string, alias?: string) {
  const api = `https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}${alias ? `&shorturl=${encodeURIComponent(alias)}` : ''}`
  const res = await fetch(api, { method: 'GET' })
  const data = await res.json().catch(() => ({} as any))
  if (data && data.shorturl && typeof data.shorturl === 'string') {
    return { shortUrl: data.shorturl as string, provider: 'isgd' as const }
  }
  const msg = (data && (data.errormessage as string)) || 'Unable to shorten with is.gd'
  throw new Error(msg)
}

async function shortenWithCleanURI(url: string) {
  const res = await fetch('https://cleanuri.com/api/v1/shorten', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `url=${encodeURIComponent(url)}`,
  })
  const data = await res.json().catch(() => ({} as any))
  if (data && data.result_url && typeof data.result_url === 'string') {
    return { shortUrl: data.result_url as string, provider: 'cleanuri' as const }
  }
  throw new Error('Unable to shorten with CleanURI')
}

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => ({})) as { url?: string; alias?: string }
    const url = (payload.url || '').trim()
    const alias = (payload.alias || '').trim()
    if (!url) {
      return NextResponse.json({ error: 'Missing url' }, { status: 400 })
    }
    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: 'Invalid url' }, { status: 400 })
    }

    try {
      const first = await shortenWithIsGd(url, alias || undefined)
      return NextResponse.json(first)
    } catch {
      const fallback = await shortenWithCleanURI(url)
      return NextResponse.json(fallback)
    }
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Shortening failed' }, { status: 500 })
  }
}

