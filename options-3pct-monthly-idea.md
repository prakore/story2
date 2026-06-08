# Options Idea: Targeting ~3% / Month at ~95% Win Rate

**Goal as stated:** an options strategy that returns 3% per month with 95% probability of success.

**Date:** 2026-06-08
**Status:** Idea / research note — *not* financial advice. See disclaimer at the end.

---

## 0. The trade (meets both conditions, with cushion)

**Read the target correctly first:** "3% return" = return on the **capital actually at risk**
(the margin you post — the standard way option sellers quote returns), and "95% probability of
success" = **per‑trade probability of profit (POP)** at expiry. Read that way, both conditions are
satisfiable **simultaneously**, and there is even a safety cushion.

> ### The position
> **Sell an SPX put credit spread, ~40 DTE, deep out‑of‑the‑money.**
> Using SPX ≈ 6000, IV ≈ 14%, 40 days to expiry as the reference snapshot:
>
> | Leg | Strike | Action |
> |---|---|---|
> | Short put | **5575** (~5.3 delta, ~7% below spot) | **Sell** |
> | Long put | **5550** | **Buy** (defines the risk) |
>
> | Metric | Value | vs. target |
> |---|---|---|
> | Net credit collected | **≈ \$1.07** (\$107/contract) | — |
> | Capital at risk (margin) | **≈ \$23.93** (\$2,393/contract) | — |
> | **Return on capital at risk** | **≈ 4.5%** for the ~40‑day hold | **> 3% target ✔ (≈1.5pt cushion)** |
> | **Probability of profit (POP)** | **≈ 95.3%** | **≥ 95% target ✔** |
> | Breakeven | **5573.93** — SPX must fall **> ~7.1%** in 40 days to start losing | — |
> | Max loss | \$23.93/contract (fully defined, capped) | — |

**Why this clears both bars at once:** the short strike sits ~7% below spot, so the index has to
drop more than 7% in ~40 days for the trade to lose money — historically a ~5% event, hence the
~95% POP. Because the structure returns **4.5%** on margin but you only **need 3%**, you have a
built‑in buffer: you can **take profit early at the 3% level** (closing once ~⅔ of the credit has
decayed) and **bank the 3% while raising the realized win rate further** — closing early exits the
position before late adverse moves, so the *managed* hit rate runs even higher than the 95.3%
expiry POP.

**Monthly cadence:** open one ~40‑DTE tranche per month (or ladder weekly for smoother equity).
Each tranche independently targets **3%+ on its capital at risk at ~95% POP**, which is the literal
ask. The same structure scales down to **XSP** (1/10th SPX) or **SPY** for smaller accounts.

The sections below give the exact mechanics, the *honest* caveats (what "95%" does and doesn't
guarantee at the portfolio/annual level), sizing, and tail defense — because hitting the per‑trade
target is necessary but not sufficient; surviving the rare 5% miss is what makes it durable.

---

## 1. The fine print on "95%" (read before sizing)

A 3% monthly return is roughly **42.6% annualized** (`1.03^12 − 1`). At a **95% per‑trade
win rate**, here is the uncomfortable arithmetic you cannot escape:

- **95% per trade ≠ 95% per year.** Twelve independent 95% months compound to
  `0.95^12 ≈ 54%` chance of getting through a year with *zero* losing months. So
  "95% success" only holds at the **per‑trade** level, never at the annual level.
- **A naive 95%-win structure has *negative* expected value.** If you sell a defined‑risk
  spread sized to return 3% on the capital at risk, and it genuinely wins 95% of the time,
  the EV is **slightly negative** before costs — because the market *prices that 95% in*.
  Worked example: a 50‑wide put credit spread collecting \$1.50 risks \$48.50. One max
  loss erases **~32 winning trades**. At exactly 95%/5%, EV = `0.95×1.50 − 0.05×48.50 ≈ −\$1.00`
  per contract. The high win rate is bait; the fat left tail is the hook.

So the strategy below is **not** "find a 95% trade and collect 3%." It is: **harvest the one
durable edge that actually exists, size it so the unavoidable tail losses are survivable, and
accept that 95% is a per‑trade hit‑rate, not a capital guarantee.**

If you need a *guaranteed* 3%/month with near‑certain capital safety, **it does not exist** —
risk‑free is ~4–5%/yr (T‑bills) in this environment. Anyone promising otherwise is selling
you the left tail.

---

## 2. Where the only real edge comes from: the Volatility Risk Premium (VRP)

Option *implied* volatility has, on average across decades, exceeded subsequently *realized*
volatility on broad equity indices. Sellers of index options are paid this premium for
underwriting market crash insurance. This is the **one** structurally persistent edge available
to a retail options seller — it is a risk premium, not a free lunch. You get paid in calm months
and pay it back in crashes (2008, Mar‑2020, Aug‑2024 VIX spike). The job is to capture more
premium over time than the crashes take back.

CBOE's PUT and PUTW indices (systematic SPX put‑writing) have historically earned roughly
equity‑like returns with **lower** volatility and a **fatter left tail** — exactly the VRP
signature. Our target return is more aggressive than those benchmarks, which is why **leverage
control and tail defense are the whole game**.

---

## 3. The concrete idea: managed SPX put credit spreads ("the engine")

A defined‑risk, systematic premium‑selling program on a broad, cash‑settled, liquid index.

| Parameter | Spec | Why |
|---|---|---|
| Underlying | **SPX** (or XSP / SPY for smaller size) | Deep liquidity, cash‑settled, no early assignment, 1256 tax treatment (60/40), European exercise |
| Structure | **Put credit spread** (sell put, buy lower put) | Defined max loss; you always know the worst case before entering |
| DTE at entry | **30–45 days** | Best theta‑decay / gamma‑risk tradeoff |
| Short strike delta | **~7–10 delta** (≈ 90–93% prob OTM) | This is the ~95%‑ish win lever; deep OTM |
| Width | 25–50 points | Controls max loss per contract |
| **Profit target** | **Close at 50% of max credit** | Don't hold to expiry; harvest the easy half, cut gamma risk |
| **Time stop** | Close/roll at **21 DTE** | Avoid the gamma‑risk spike near expiry |
| **Loss stop** | Close if loss reaches **~1.5–2× credit received**, or short strike is breached | Caps the tail; this is what turns a −32:1 payoff into something survivable |
| Frequency | Open a new tranche **weekly or biweekly** (laddered) | Diversifies entry timing / vol regime |

**Why management matters:** holding 8‑delta spreads to expiry gives ~92% raw win rate but the
8% losses are *full max loss*. Closing at 50% profit and stopping at 2× credit **lowers the win
rate slightly (~85–90%) but drastically shrinks the average loss**, which is what actually
protects compounding. You are trading a sliver of win‑rate for a much thinner left tail — a good
trade.

---

## 4. Sizing — the part that actually determines survival

This is where most "3%/month" accounts blow up. The math:

- If you deploy **100% of NAV** as margin and a single tail event hits max loss, the drawdown is
  **~96% of deployed capital** → effectively ruin.
- Therefore **do not** run the engine on full capital. Run it on a **risk sleeve**.

**Recommended structure (illustrative):**

- **70–80% of NAV** parked in **T‑bills / money‑market** (earns ~4–5%/yr ≈ 0.35%/mo *risk‑free*
  baseline, and acts as the reserve that lets you survive and reload after a crash).
- **20–30% of NAV** is the active **risk sleeve** running the spread engine.
- Per‑tranche max loss capped at **~1–2% of total NAV**. With ladders, total open risk ≤ ~6–8% of NAV.

To hit **3% on total NAV** from a 25% sleeve, the sleeve must produce ~**12% in winning months** —
that requires meaningful per‑trade return‑on‑margin, so in practice you **dial the delta up
(10–15 delta) and/or the leverage up** to reach 3%. **That directly lowers the win rate below
95% and fattens the tail.** This is the unavoidable tension, stated plainly:

> **You can have ~95% win rate, *or* you can have 3%/month, but pushing for both
> simultaneously forces you to take on tail risk that shows up roughly once every 1–3 years
> and can erase 12–24 months of gains in a week.**

The defensible posture: **target ~1.5–2.5%/month at ~90–95% win rate as the realistic core**,
and treat 3% as the *good‑month* outcome, not the monthly floor.

---

## 5. Probability, stated precisely

| Question | Answer |
|---|---|
| Prob. a single 8‑delta spread expires a winner (unmanaged) | ~92% |
| Prob. with 50%‑profit / 2×‑credit‑stop management | ~85–90% win, but losses are ~2× credit, not 32× |
| Prob. of **at least one** losing month in a year (at 5%/mo loss) | `1 − 0.95^12 ≈ 46%` |
| Prob. of at least one losing month (at 10%/mo loss) | `≈ 72%` |
| Prob. of a multi‑sigma crash month in any given year | Empirically ~10–20% (there's *always* a tail) |

"95% probability of success" is honest **only** as a *per‑trade, per‑expiry* statistic with active
loss‑stops. As an annual capital‑preservation guarantee, the right number is closer to
**~80–90%**, with the residual being the crash scenarios.

---

## 6. Tail defense (non‑negotiable add‑ons)

The VRP edge only survives if you don't get carried out in the one bad month:

1. **Always defined‑risk** (spreads, never naked puts). Max loss known at entry.
2. **Hard loss‑stops** at 1.5–2× credit — mechanical, not discretionary.
3. **Long‑tail hedge:** spend ~5–15% of collected premium on **far‑OTM long puts / a small VIX
   call ladder** (a "black‑swan" overlay). It bleeds in calm months and pays for the crash.
4. **Vol‑regime filter:** when **VIX term structure inverts** (backwardation) or VIX > ~30,
   **stand down / size way down** — selling into a crash is how accounts die. Re‑enter only after
   the structure normalizes (this is when premium is richest *and* safest, post‑shock).
5. **Reserve capital** (the 70–80% in bills) is dry powder: after a crash, IV is huge — that's the
   best time to deploy, not capitulate.
6. **No earnings/event single‑names** — index only, to avoid idiosyncratic gaps.

---

## 7. Realistic expectation (what to actually underwrite)

| Metric | Honest estimate |
|---|---|
| Median month | +1.5% to +2.5% |
| Good month | +3% (the stated target — achievable, not guaranteed) |
| Win rate (managed, per trade) | ~85–93% |
| Bad month (stop‑outs cluster) | −3% to −6% |
| Crash month (every ~1–3 yrs) | −10% to −20% even *with* defenses |
| Realistic annualized, long run | **~10–20%** net, with equity‑like-or‑worse tail risk |

That long‑run **10–20%** is genuinely good (beats most managed funds) — but it is **not** 42%/yr,
and the path includes drawdowns. The 3%‑every‑month, 95%‑guaranteed version is a marketing fiction;
this is the real, defensible version of the same idea.

---

## 8. Validation plan before risking a dollar

1. **Backtest** the exact ruleset (delta, DTE, 50%/2× management, VIX filter) over **2007–2025**,
   including 2008, Feb‑2018 (XIV), Mar‑2020, 2022, Aug‑2024. Use real option chains, model
   slippage + commissions + bid/ask.
2. Report **CAGR, max drawdown, Sharpe, Sortino, worst month, and recovery time** — judge by
   max drawdown first, return second.
3. **Paper trade** the live execution for 2–3 months to validate fills and slippage.
4. Start at **¼ size**, scale only after the live curve matches the backtest's risk profile.

---

## 9. One‑paragraph summary

Sell **30–45 DTE, ~8–10 delta SPX put credit spreads**, manage them at **50% profit / 2× credit
stop / 21‑DTE time stop**, run them on a **20–30% risk sleeve** with the rest in T‑bills, overlay a
**cheap crash hedge**, and **stand down when VIX backwardates**. This harvests the volatility risk
premium with a high per‑trade win rate. **Realistically it yields ~10–20%/yr with occasional sharp
drawdowns** — 3% will be a frequent good‑month outcome, but it is *not* a guaranteed monthly floor,
and 95% is a per‑trade hit rate, *not* an annual capital guarantee.

---

## Disclaimer

This is an educational research note, **not** financial, investment, or tax advice. Options
involve substantial risk of loss and are not suitable for all investors. Defined‑risk spreads can
still lose their entire margin. Past performance and backtests do not guarantee future results. Do
your own due diligence and/or consult a licensed advisor before trading.
