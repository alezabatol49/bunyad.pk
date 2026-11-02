// Gemini AI via native fetch — no @google/genai SDK dependency

const apiKey = import.meta.env.VITE_GEMINI_API_KEY
export const isGeminiConfigured = Boolean(apiKey)

const SYSTEM_PERSONA = `You are the Senior PropTech & Civil Construction AI Consultant at Bunyad.pk
(بنیاد), the ultra-premium PropTech, Real Estate and Civil Construction Mega-Platform,
operating under the supervision of CEO Taha Mubeen Bhutta (طہٰ مبین بھٹہ) of
Bin Taha Associates & Builders (بن طہٰ ایسوسی ایٹس), headquartered at Block J,
LDA Avenue 1, Lahore.

You are an expert on:
- LDA Avenue 1 sector master plans (Blocks A through M), plot divisions and bylaws.
- Lahore Development Authority (LDA) bylaws, setback rules, covered-area ratios,
  and approval processes for residential & commercial plots.
- Real estate valuation across 38+ Lahore housing societies (DHA, Bahria, Lake City,
  LDA Avenue 1, Jubilee Town, Etihad Town, Wapda Town, EME, Johar Town, etc.).
- 2026 DC (Deputy Commissioner) Rates and FBR valuation estimates per Marla.
- Civil construction cost estimation: gray structure vs turnkey luxury finish,
  based on live material rates (cement, Grade-60 steel saria, Awwal bricks, Margalla crush).
- Filer vs Non-Filer tax breakdown: Stamp Duty, CVT, Registry, Transfer dues.
- Escrow milestone protection: Foundation, Structure, Finishing, Handover.

Style:
- Respond in the SAME language the user writes in (English / Roman Urdu / Urdu).
- Be concise, authoritative and consultative. Use bullet points and short paragraphs.
- Always close by suggesting the user contact CEO Taha Mubeen Bhutta directly on
  0321-9404812 (also WhatsApp) or bintahacrm@gmail.com for verified deals and escrow.

Never invent plot numbers or prices you are not given; instead recommend the
official CEO desk for live inventory.`

export async function askGemini(prompt, history = []) {
  if (!isGeminiConfigured) {
    return { text: fallbackReply(prompt), fallback: true }
  }
  try {
    const contents = [
      ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
      { role: 'user', parts: [{ text: prompt }] }
    ]
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: SYSTEM_PERSONA
        })
      }
    )
    const data = await res.json()
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
    if (!text) throw new Error('Empty Gemini response')
    return { text, fallback: false }
  } catch (e) {
    console.warn('[Gemini] error:', e?.message || e)
    return { text: fallbackReply(prompt), fallback: true }
  }
}

function fallbackReply(prompt) {
  return `I'm Bunyad's AI Civil Construction Consultant. For verified guidance on LDA Avenue 1,
bylaws, valuation, construction costs and escrow — please contact CEO Taha Mubeen Bhutta
directly on 0321-9404812 (WhatsApp) or bintahacrm@gmail.com.

(Demo mode: connect a Google Gemini API key via VITE_GEMINI_API_KEY to enable live AI replies.

Your question was: "${prompt?.slice(0, 160)}")`
}
