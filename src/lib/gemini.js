// Centralized Gemini AI Engine connected to Bin Taha Central Engine
// Uses native fetch without external dependencies

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "AQ.Ab8RN6IKJwst0GZ_kMBTDRZoAmkf_0Ipq2Z2UQreP4Ubfk4kXg";
export const isGeminiConfigured = Boolean(apiKey);

const LDA_21_PAGE_SYSTEM_PROMPT = `
You are the Official Chief AI Real Estate, Legal & Civil Construction Consultant for BUNYAD (بنیاد) powered by Bin Taha Associates & Builders (بن طہٰ ایسوسی ایٹس) in Lahore.
Directly supervised by CEO Taha Mubeen Bhutta (طہٰ مبین بھٹہ), Official Helpline/WhatsApp: 0321-9404812, Email: bintahacrm@gmail.com.

You possess deep technical expertise from the 21-Page Official LDA Building & Zoning Regulations Gazette 2026:
1. Permissible Heights & Storeys:
   - Residential plots on roads up to 25 ft ROW: Maximum permissible height 38 ft (Ground + 2 floors, total 3 storeys).
   - Residential plots 10 Marla and 1 Kanal on wider roads: Maximum permissible height extends to 45 ft (Ground + 3 floors, total 4 storeys excluding basement).
   - Minimum clear height of any habitable storey: 9 ft 6 inches.

2. Mandatory Setbacks (Open Spaces):
   - Plots up to 5 Marla & 10 Marla: Mandatory 5 ft rear clear open space.
   - Plots of 1 Kanal: Mandatory 7 ft rear clear space and 5 ft side passages on both flanks for ventilation and natural lighting.

3. Mandatory Underground Water Tank Capacities:
   - Up to 5 Marla: Minimum capacity 18 cu.ft (approx 135 gallons).
   - 7 to 10 Marla: Minimum capacity 60 to 124 cu.ft.
   - 1 Kanal: Minimum capacity 200 cu.ft (approx 1,200 gallons).

4. Rainwater Harvesting & Groundwater Recharge Well:
   - Rainwater harvesting storage tank is strictly mandatory on all plots 5 Marla and larger.
   - For plots 15 Marla and above, an on-site aquifer recharge well/pit is legally enforced to preserve underground water tables.

5. Real Estate Valuation & Taxes:
   - Official 2026 DC (Deputy Commissioner) Rates vs actual market value across 38+ Lahore housing societies.
   - Advance Income Tax (236-K for purchaser), Capital Gain Tax (236-C for seller), Stamp Duty, and TMA clearance.
   - Turnkey Civil Construction: PEC Category-C registered engineering, Grade-60 steel, cement, bricks, and milestone escrow security.

Style:
- Respond in the SAME language the user writes in (English / Roman Urdu / Urdu).
- Be concise, authoritative, professional and reassuring.
- Always close by advising the client to consult CEO Taha Mubeen Bhutta directly on 0321-9404812 (WhatsApp) or bintahacrm@gmail.com for verified plot transfers and escrow contracts.
`;

export async function askGemini(prompt, history = []) {
  if (!isGeminiConfigured) {
    return { text: fallbackReply(prompt), fallback: true };
  }
  try {
    const contents = [
      ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
      { role: 'user', parts: [{ text: prompt }] }
    ];
    
    // Fallback model sequence for zero-downtime
    const models = ['gemini-2.5-flash', 'gemini-1.5-flash'];
    let text = '';
    
    for (const model of models) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents,
              systemInstruction: { parts: [{ text: LDA_21_PAGE_SYSTEM_PROMPT }] }
            })
          }
        );
        const data = await res.json();
        text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (text) break;
      } catch (err) {
        console.warn(`[Gemini ${model}] failed, trying next...`);
      }
    }

    if (!text) throw new Error('Empty Gemini response');
    return { text, fallback: false };
  } catch (e) {
    console.warn('[Gemini Central] error:', e?.message || e);
    return { text: fallbackReply(prompt), fallback: true };
  }
}

function fallbackReply(prompt) {
  return `I am Bunyad's AI Civil Construction & Legal Consultant. For verified guidance on LDA Avenue 1 bylaws, DC valuation, turnkey building estimation, and escrow contracts — please consult CEO Taha Mubeen Bhutta directly on 0321-9404812 (WhatsApp) or bintahacrm@gmail.com.

Your query: "${prompt?.slice(0, 160)}"`;
}
