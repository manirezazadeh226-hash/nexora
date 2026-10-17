
"use client";

import { useState, useEffect, useMemo } from "react";

const products = [
  { id: 1, name: "هدفون نوا پرو", category: "صوتی", price: 4850000, icon: "🎧",image: "/products/image.webp", color: "from-cyan-500/20 to-blue-900/40", tag: "پرفروش" },
  { id: 2, name: "ساعت هوشمند نکس", category: "پوشیدنی", price: 6290000, icon: "⌚",image: "/products/watch.jpg", color: "from-violet-500/20 to-purple-900/40", tag: "جدید" },
  { id: 3, name: "کیبورد سایبر", category: "گیمینگ", price: 3750000, icon: "⌨️",image: "/products/keyboard.jpg", color: "from-fuchsia-500/20 to-indigo-900/40", tag: "محبوب" },
  { id: 4, name: "اسپیکر پالس", category: "صوتی", price: 2890000, icon: "🔊",image: "/products/speaker.jpg", color: "from-emerald-500/20 to-teal-900/40", tag: "ویژه" },
  { id: 5, name: "ماوس فانتوم", category: "گیمینگ", price: 1950000, icon: "🖱️",image: "/products/mouse.jpg", color: "from-blue-500/20 to-violet-900/40", tag: "پرفروش" },
  { id: 6, name: "عینک هوشمند", category: "پوشیدنی", price: 8190000, icon: "🕶️",image: "/products/glasses.jpg", color: "from-amber-500/20 to-rose-900/40", tag: "جدید" },
];
const productSpecs: Record<number, { title: string; features: string[] }> = {
  1: {
    title: "هدفون نوا پرو",
    features: ["اتصال بی‌سیم", "صدای استریو", "طراحی راحت", "مناسب موسیقی و بازی"],
  },
  2: {
    title: "ساعت هوشمند نکس",
    features: ["نمایشگر رنگی", "اعلان تماس و پیام", "پایش فعالیت روزانه", "بند قابل تعویض"],
  },
  3: {
    title: "کیبورد سایبر",
    features: ["کلیدهای مکانیکی‌نما", "نورپردازی RGB", "طراحی گیمینگ", "مناسب بازی و تایپ"],
  },
  4: {
    title: "اسپیکر پالس",
    features: ["اتصال بی‌سیم", "صدای استریو", "طراحی قابل حمل", "مناسب خانه و سفر"],
  },
  5: {
    title: "ماوس فانتوم",
    features: ["حسگر نوری", "طراحی گیمینگ", "فرم ارگونومیک", "مناسب بازی و کار روزانه"],
  },
  6: {
    title: "عینک هوشمند",
    features: ["طراحی مدرن", "قاب سبک", "ظاهر فناورانه", "مناسب استفاده روزمره"],
  },
};


const categories = ["همه", "صوتی", "گیمینگ", "پوشیدنی"];

const money = (value: number) =>
  new Intl.NumberFormat("fa-IR").format(value) + " تومان";
export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("همه");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  
useEffect(() => {
  localStorage.setItem("nexora-cart", JSON.stringify(cart));
}, [cart]);

  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[number] | null>(null);
  
const [compareIds, setCompareIds] = useState<number[]>([]);
const [compareOpen, setCompareOpen] = useState(false);

  const [assistantOpen, setAssistantOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
const [ratings, setRatings] = useState<Record<number, number[]>>({});
const [reviews, setReviews] = useState<
  Record<number, { name: string; text: string; rating: number }[]>
>({});
const [myRating, setMyRating] = useState(5);
const [reviewName, setReviewName] = useState("");
const [reviewText, setReviewText] = useState("");

const cartCount = Object.values(cart).reduce(
  (sum, quantity) => sum + quantity,
  0
);

const cartTotal = products.reduce(
  (sum, product) => sum + product.price * (cart[product.id] ?? 0),
  0
);


  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesName = p.name.includes(search.trim());
      const matchesCategory =
        category === "همه" || p.category === category;
      return matchesName && matchesCategory;
    });
  }, [search, category]);

  
async function askAssistant() {
  const message = question.trim();

  if (!message) return;

  setAnswer("در حال دریافت پاسخ از دستیار هوشمند...");

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    if (!response.ok) {
      setAnswer(data.error || "دریافت پاسخ ناموفق بود.");
      return;
    }

    setAnswer(data.answer);
  } catch {
    setAnswer(
      "ارتباط با دستیار برقرار نشد. لطفاً اتصال و تنظیمات را بررسی کن."
    );
  }
}


  
  return (
   <main dir="rtl" className="min-h-screen overflow-hidden bg-[#070912] text-white selection:bg-cyan-300/30">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute left-0 top-[500px] h-96 w-96 rounded-full bg-violet-600/10 blur-[130px]" />
      </div>

      <div className="relative z-10">
        <div className="border-b border-white/[0.07] bg-white/[0.025] px-4 py-2 text-center text-xs text-gray-400">
          ✦ به نسل جدید خرید آنلاین خوش آمدید — تجربه‌ای متفاوت با NEXORA
        </div>


        <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5">
          <a href="#" className="flex items-center gap-2 text-2xl font-black tracking-tight">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 to-violet-500 text-lg text-black shadow-lg shadow-cyan-500/20">
              N
            </span>
            NEXORA<span className="text-cyan-300">.</span>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-gray-400 md:flex">
            <a href="#home" className="transition hover:text-cyan-300">خانه</a>
            <a href="#products" className="transition hover:text-cyan-300">محصولات</a>
            <a href="#features" className="transition hover:text-cyan-300">ویژگی‌ها</a>
          </nav>

         
<button
  onClick={() => setCartOpen(true)}
  className="rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-2.5 text-sm font-bold text-cyan-200 transition hover:bg-cyan-300/20"
>
  سبد خرید 🛒 <span className="mr-1">{cartCount}</span>
</button>

        </header>

        
<section id="home" className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-12 md:grid-cols-2 md:pb-28 md:pt-20">

          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-2 text-xs text-cyan-200">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
              آیندهٔ خرید از اینجا شروع می‌شود
            </div>

            
<h1 className="text-4xl font-black leading-[1.5] tracking-tight sm:text-5xl md:text-6xl">

              فراتر از خرید،
              <br />
              <span className="bg-gradient-to-l from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                تجربه‌ای نو.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-gray-400 md:text-lg">
              دنیایی از فناوری، طراحی و انتخاب هوشمند؛
              محصولات موردعلاقه‌ات را در تجربه‌ای متفاوت کشف کن.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#products" className="rounded-xl bg-gradient-to-l from-cyan-300 to-blue-400 px-6 py-3.5 font-bold text-[#071019] shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5">
                کشف محصولات ←
              </a>
              <button onClick={() => setAssistantOpen(true)} className="rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 font-semibold transition hover:border-violet-300/40 hover:bg-violet-300/10">
                ✧ دستیار خرید
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-8 border-t border-white/[0.08] pt-6">
              <div><p className="text-2xl font-black">۰۱</p><p className="mt-1 text-xs text-gray-500">نسل جدید خرید</p></div>
              <div><p className="text-2xl font-black">∞</p><p className="mt-1 text-xs text-gray-500">امکان کشف</p></div>
              <div><p className="text-2xl font-black text-cyan-300">N+</p><p className="mt-1 text-xs text-gray-500">تجربهٔ متفاوت</p></div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute inset-8 rounded-full bg-cyan-400/10 blur-[80px]" />
            
<div className="relative rounded-[2rem] border border-cyan-200/20 bg-gradient-to-br from-white/[0.10] via-white/[0.035] to-violet-500/[0.08] p-5 shadow-[0_25px_80px_rgba(34,211,238,0.10)] ring-1 ring-white/[0.05] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-200/40 hover:shadow-[0_35px_90px_rgba(34,211,238,0.16)] sm:p-8">

              <div className="flex items-center justify-between">
                <div><p className="text-xs text-gray-500">NEXORA / SELECTED</p><p className="mt-1 font-bold">انتخاب این هفته</p></div>
                <span className="rounded-full border border-cyan-300/20 px-3 py-1 text-xs text-cyan-200">ویژه</span>
              </div>
              <div className="my-8 flex aspect-square items-center justify-center rounded-3xl border border-white/[0.06] bg-gradient-to-br from-cyan-400/[0.08] via-blue-500/[0.05] to-violet-500/[0.12]">
                <div className="text-center">
                  <div className="text-8xl drop-shadow-[0_0_35px_rgba(34,211,238,0.25)] sm:text-9xl">🎧</div>
                  <div className="mt-5 text-xs tracking-[0.35em] text-cyan-200/70">PURE SOUND</div>
                </div>
              </div>
              <div className="flex items-end justify-between gap-3">
                <div><h2 className="text-xl font-bold">هدفون نوا پرو</h2><p className="mt-2 text-sm text-gray-500">طراحی مدرن · صدای شفاف</p></div>
                <div className="text-left"><p className="text-xs text-gray-500">شروع قیمت</p><p className="mt-1 font-bold text-cyan-200">۴,۸۵۰,۰۰۰</p></div>
              </div>
            </div>
            <div className="absolute -left-3 top-24 rounded-2xl border border-white/10 bg-[#111522]/95 px-4 py-3 shadow-xl sm:-left-7">
              <p className="text-xs text-gray-500">تجربهٔ خرید</p><p className="mt-1 text-sm font-bold">هوشمندتر ✦</p>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto grid max-w-7xl gap-3 px-5 pb-20 sm:grid-cols-3">
          {[
            ["✧", "انتخاب هوشمند", "محصول مناسب خودت را پیدا کن"],
            ["◇", "طراحی آینده‌نگر", "جزئیات با دقت و سادگی"],
            ["↗", "تجربه‌ای سریع", "جست‌وجو و انتخاب آسان"],
          ].map(([icon, title, desc]) => (
            <div key={title} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:border-cyan-300/20">
              <span className="text-2xl text-cyan-300">{icon}</span>
              <h3 className="mt-4 font-bold">{title}</h3>
              <p className="mt-2 text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </section>

        <section id="products" className="mx-auto max-w-7xl px-5 pb-24">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div><p className="text-sm font-bold text-cyan-300">مجموعهٔ NEXORA</p><h2 className="mt-3 text-3xl font-black">محصولات منتخب</h2><p className="mt-3 text-sm text-gray-500">محصول موردنظرت را جست‌وجو و دسته‌بندی کن.</p></div>
            <div className="w-full max-w-sm">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="جست‌وجوی محصول..." className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none transition placeholder:text-gray-600 focus:border-cyan-300/50" />
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setCategory(c)} className={`rounded-full border px-4 py-2 text-sm transition ${category === c ? "border-cyan-300 bg-cyan-300 text-[#071019]" : "border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/25"}`}>
                {c}
              </button>
            ))}
          </div>

          
          

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-violet-300/25 bg-gradient-to-l from-violet-500/[0.12] via-white/[0.04] to-cyan-400/[0.08] p-5 shadow-[0_12px_40px_rgba(139,92,246,0.10)] ring-1 ring-white/[0.04] backdrop-blur-xl transition duration-300 hover:border-violet-300/40">
            <div>
              <p className="font-bold text-violet-200">
                مقایسهٔ محصولات
              </p>
              <p className="mt-1 text-sm text-gray-400">
                {compareIds.length} محصول از ۲ محصول انتخاب شده
              </p>
            </div>

            <button
              onClick={() => {
                if (compareIds.length !== 2) {
                  alert("لطفاً دقیقاً دو محصول برای مقایسه انتخاب کن.");
                  return;
                }
                setCompareOpen(true);
              }}
              className="rounded-xl bg-violet-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-violet-300"
            >
              ⇄ مقایسهٔ دو محصول
            </button>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {filtered.map((p) => (
              <article key={p.id} className="group overflow-hidden rounded-3xl border border-white/[0.10] bg-gradient-to-br from-white/[0.09] via-white/[0.035] to-cyan-400/[0.025] shadow-[0_12px_35px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/40 hover:shadow-[0_22px_55px_rgba(34,211,238,0.12)]">
                <div className={`relative flex aspect-[1.4] items-center justify-center bg-gradient-to-br ${p.color}`}>
                  <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-gray-200">{p.tag}</span>
                  {p.image ? (
  <img
    src={p.image}
    alt={p.name}
    className="h-full w-full object-contain p-6 transition duration-300 group-hover:scale-110"
  />
) : (
  <span className="text-7xl transition duration-300 group-hover:scale-110">
    {p.icon}
  </span>
)}
                </div>
                <div className="p-5">
                  <p className="text-xs text-gray-500">{p.category}</p>
                  <h3 className="mt-2 text-lg font-bold">{p.name}</h3>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-cyan-200">{money(p.price)}</span>
                    <button onClick={() => 
setCart((old) => ({
  ...old,
  [p.id]: (old[p.id] ?? 0) + 1,
}))
} className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-100 transition hover:bg-cyan-300/20">
                      + افزودن
                    </button>
<button
  onClick={() => {
    if (compareIds.includes(p.id)) {
      setCompareIds((old) => old.filter((id) => id !== p.id));
    } else if (compareIds.length < 2) {
      setCompareIds((old) => [...old, p.id]);
    } else {
      alert("برای مقایسه فقط دو محصول انتخاب کن.");
    }
  }}
  className="mt-3 w-full rounded-lg border border-violet-400/30 bg-violet-400/10 px-3 py-2 text-sm text-violet-200 transition hover:bg-violet-400/20"
>
  {compareIds.includes(p.id) ? "✓ انتخاب برای مقایسه" : "⇄ مقایسه محصول"}
</button>

                    <button
  onClick={() => setSelectedProduct(p)}
  className="rounded-lg border border-violet-300/30 bg-violet-300/10 px-3 py-2 text-sm text-violet-200 transition hover:bg-violet-300/20"
>
  جزئیات
</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && <p className="py-16 text-center text-gray-500">محصولی با این مشخصات پیدا نشد.</p>}
          <p className="mt-5 text-xs leading-6 text-gray-600">قیمت‌ها و محصولات فعلاً نمونه هستند و از پایگاه دادهٔ واقعی دریافت نمی‌شوند.</p>
        </section>

        <section className="mx-5 mb-16 rounded-3xl border border-violet-300/15 bg-gradient-to-l from-violet-500/[0.10] via-cyan-500/[0.06] to-transparent px-6 py-10 text-center sm:mx-auto sm:max-w-7xl sm:py-14">
          <p className="text-3xl">✧</p>
          <h2 className="mt-4 text-2xl font-black sm:text-3xl">برای انتخاب آماده‌ای؟</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-gray-400">دستیار خرید NEXORA را باز کن و دربارهٔ محصول مناسب خودت سؤال بپرس.</p>
          <button onClick={() => setAssistantOpen(true)} className="mt-6 rounded-xl bg-white px-6 py-3 font-bold text-[#101323] transition hover:bg-cyan-100">شروع گفت‌وگو ←</button>
        </section>

        <footer className="border-t border-white/[0.08] px-5 py-8 text-center text-sm text-gray-500">
          <p className="font-black tracking-widest text-white">NEXORA<span className="text-cyan-300">.</span></p>
          <p className="mt-3">فناوری، طراحی و تجربه‌ای متفاوت.</p>
          <p className="mt-5 text-xs">© NEXORA — نسخهٔ اولیهٔ نمایشی</p>
        </footer>
      </div>

{cartOpen && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
    onClick={() => setCartOpen(false)}
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-label="سبد خرید"
      className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-cyan-200/25 bg-gradient-to-br from-[#192333]/95 via-[#101321]/90 to-[#17132b]/95 p-6 shadow-[0_25px_80px_rgba(34,211,238,0.12)] ring-1 ring-white/[0.06] backdrop-blur-2xl transition-all duration-300"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-cyan-300">NEXORA / CART</p>
          <h2 className="mt-2 text-2xl font-black">سبد خرید 🛒</h2>
        </div>
        <button
          onClick={() => setCartOpen(false)}
          className="rounded-lg px-3 py-2 text-gray-400 hover:bg-white/10"
          aria-label="بستن سبد خرید"
        >
          ✕
        </button>
      </div>

      {cartCount === 0 ? (
        <div className="py-12 text-center">
          <p className="text-5xl">🛍️</p>
          <p className="mt-4 font-bold">سبد خریدت خالیه!</p>
          <p className="mt-2 text-sm text-gray-400">
            از محصولات فروشگاه چیزی انتخاب کن.
          </p>
          <button
            onClick={() => {
              setCartOpen(false);
              document.getElementById("products")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="mt-5 rounded-xl bg-cyan-300 px-5 py-3 font-bold text-[#071019]"
          >
            دیدن محصولات
          </button>
        </div>
      ) : (
        <>
          <div className="mt-6 space-y-3">
            {products
              .filter((product) => (cart[product.id] ?? 0) > 0)
              .map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-3xl">
                    {product.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-bold">{product.name}</p>
                    <p className="mt-1 text-sm text-cyan-200">
                      {money(product.price * cart[product.id])}
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <button
                        aria-label={`کاهش تعداد ${product.name}`}
                        onClick={() =>
                          setCart((old) => {
                            const next = { ...old };
                            if ((next[product.id] ?? 0) <= 1) {
                              delete next[product.id];
                            } else {
                              next[product.id] -= 1;
                            }
                            return next;
                          })
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 hover:bg-white/10"
                      >
                        −
                      </button>

                      <span className="min-w-5 text-center">
                        {cart[product.id]}
                      </span>

                      <button
                        aria-label={`افزایش تعداد ${product.name}`}
                        onClick={() =>
                          setCart((old) => ({
                            ...old,
                            [product.id]: (old[product.id] ?? 0) + 1,
                          }))
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 hover:bg-white/10"
                      >
                        +
                      </button>

                      <button
                        onClick={() =>
                          setCart((old) => {
                            const next = { ...old };
                            delete next[product.id];
                            return next;
                          })
                        }
                        className="mr-auto text-xs text-rose-300 hover:text-rose-200"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-gray-300">تعداد کل کالاها</span>
              <span className="font-bold">{cartCount}</span>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="font-bold">مبلغ کل</span>
              <span className="text-lg font-black text-cyan-200">
                {money(cartTotal)}
              </span>
            </div>
          </div>

  
          
          <div className="mt-4 space-y-3">
            <button
              onClick={() => setCartOpen(false)}
              className="w-full rounded-xl border border-white/10 px-4 py-3 font-bold text-white transition hover:bg-white/5"
            >
              ادامهٔ خرید
            </button>

            <button
              onClick={() => {
                setCartOpen(false);
                window.location.href = "/order";
              }}
              disabled={cartCount === 0}
              className="w-full rounded-xl bg-gradient-to-l from-cyan-300 to-blue-400 px-4 py-3 font-bold text-[#071019] transition hover:brightness-110 disabled:opacity-40"
            >
              ثبت سفارش و ادامه ←
            </button>
          </div>

        </>
      )}
    </div>
  </div>
)}
{compareOpen && (
  
<div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4">

    
<div className="mx-auto my-4 w-full max-w-2xl rounded-3xl border border-cyan-300/20 bg-slate-950 p-6 text-white shadow-2xl">

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-violet-300">
          مقایسهٔ محصولات NEXORA
        </h2>
        <button
          onClick={() => setCompareOpen(false)}
          className="rounded-lg bg-white/10 px-3 py-2 hover:bg-white/20"
        >
          ✕ بستن
        </button>
      </div>

      {compareIds.length !== 2 ? (
        <p className="py-8 text-center text-slate-300">
          برای مقایسه، دقیقاً دو محصول انتخاب کن.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {compareIds.map((id) => {
            const product = products.find((item) => item.id === id);
            if (!product) return null;

            return (
              <div
                key={product.id}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-40 w-full object-contain"
                  />
                )}

                <h3 className="mt-3 text-lg font-bold">
                  {product.name}
                </h3>

                <p className="mt-2 font-bold text-cyan-300">
                  {money(product.price)}
                </p>

                <p className="mt-3 text-sm text-slate-400">
                  دسته‌بندی: {product.category}
                </p>

                <ul className="mt-4 space-y-2">
                  {productSpecs[product.id]?.features.map((feature) => (
                    <li key={feature} className="text-sm text-slate-300">
                      ✦ {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() =>
                    setCompareIds((old) => old.filter((item) => item !== product.id))
                  }
                  className="mt-5 rounded-lg border border-red-400/20 px-3 py-2 text-sm text-red-300 hover:bg-red-400/10"
                >
                  حذف از مقایسه
                </button>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={() => setCompareOpen(false)}
        className="mt-6 w-full rounded-xl bg-violet-400 px-4 py-3 font-bold text-slate-950 hover:bg-violet-300"
      >
        بازگشت به فروشگاه
      </button>
    </div>
  </div>
)}

{selectedProduct && (
  
<div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/80 p-4">

    
<div className="mx-auto my-4 w-full max-w-2xl rounded-3xl border border-cyan-300/20 bg-slate-950 p-6 text-white shadow-2xl">

      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold">جزئیات محصول</h2>
        <button
          onClick={() => setSelectedProduct(null)}
          className="rounded-lg bg-white/10 px-3 py-2 hover:bg-white/20"
        >
          ✕ بستن
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div
          className={`flex min-h-56 items-center justify-center rounded-2xl bg-gradient-to-br ${selectedProduct.color}`}
        >
          
{selectedProduct.image ? (
  <img
    src={selectedProduct.image}
    alt={selectedProduct.name}
    className="h-56 w-full rounded-2xl object-contain p-4"
  />
) : (
  <span className="text-8xl">{selectedProduct.icon}</span>
)}

        </div>



        <div className="flex flex-col justify-center gap-4">
          <h3 className="text-2xl font-extrabold">
            {selectedProduct.name}
          </h3>

<div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
  <h4 className="font-bold text-amber-300">
    ⭐ امتیاز مشتریان
  </h4>

  <p className="mt-2 text-sm text-slate-300">
    {ratings[selectedProduct.id]?.length
      ? `میانگین امتیاز: ${(
          ratings[selectedProduct.id].reduce((sum, value) => sum + value, 0) /
          ratings[selectedProduct.id].length
        ).toFixed(1)} از ۵`
      : "هنوز امتیازی ثبت نشده است."}
  </p>

  <div className="mt-3 flex gap-2" dir="ltr">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => setMyRating(star)}
        className={`text-3xl transition ${
          star <= myRating ? "text-amber-400" : "text-slate-600"
        }`}
        aria-label={`${star} ستاره`}
      >
        ★
      </button>
    ))}
  </div>

  <form
    className="mt-5 space-y-3"
    onSubmit={(event) => {
      event.preventDefault();

      if (!reviewName.trim() || !reviewText.trim()) {
        alert("لطفاً نام و متن نظر را وارد کن.");
        return;
      }

      const productId = selectedProduct.id;

      setRatings((old) => ({
        ...old,
        [productId]: [...(old[productId] ?? []), myRating],
      }));

      setReviews((old) => ({
        ...old,
        [productId]: [
          ...(old[productId] ?? []),
          {
            name: reviewName.trim(),
            text: reviewText.trim(),
            rating: myRating,
          },
        ],
      }));

      setReviewName("");
      setReviewText("");
      setMyRating(5);
    }}
  >
    <input
      value={reviewName}
      onChange={(event) => setReviewName(event.target.value)}
      placeholder="نام نمایشی شما"
      maxLength={40}
      className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
      required
    />

    <textarea
      value={reviewText}
      onChange={(event) => setReviewText(event.target.value)}
      placeholder="نظر خود را دربارهٔ محصول بنویس..."
      maxLength={500}
      rows={3}
      className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
      required
    />

    <button
      type="submit"
      className="w-full rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
    >
      ثبت امتیاز و نظر
    </button>
  </form>

  <div className="mt-5 space-y-3">
    <h4 className="font-bold text-cyan-300">نظرات مشتریان</h4>

    {(reviews[selectedProduct.id] ?? []).length === 0 ? (
      <p className="text-sm text-slate-400">
        هنوز نظری ثبت نشده است؛ اولین نفر باش!
      </p>
    ) : (
      reviews[selectedProduct.id].map((review, index) => (
        <div
          key={`${selectedProduct.id}-${index}`}
          className="rounded-xl border border-white/10 p-3"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-white">{review.name}</span>
            <span className="text-amber-400">
              {"★".repeat(review.rating)}
              <span className="text-slate-600">
                {"★".repeat(5 - review.rating)}
              </span>
            </span>
          </div>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            {review.text}
          </p>
        </div>
      ))
    )}
  </div>
</div>

          <p className="text-sm text-slate-300">
            دسته‌بندی: {selectedProduct.category}
          </p>

<div className="mt-2 space-y-3">
  <h4 className="font-bold text-cyan-300">
    ویژگی‌های محصول
  </h4>

  <ul className="space-y-2">
    {productSpecs[selectedProduct.id]?.features.map((feature) => (
      <li
        key={feature}
        className="flex items-center gap-2 text-sm text-slate-300"
      >
        <span className="text-cyan-300">✦</span>
        {feature}
      </li>
    ))}
  </ul>
</div>

          <p className="leading-8 text-slate-300">
            این محصول از محصولات فروشگاه NEXORA است. برای آشنایی بیشتر،
            مشخصات و کاربرد آن را بررسی کن.
          </p>

          <p className="text-xl font-bold text-cyan-300">
            {money(selectedProduct.price)}
          </p>

          <button
            onClick={() => {
              setCart((old) => ({
                ...old,
                [selectedProduct.id]:
                  (old[selectedProduct.id] ?? 0) + 1,
              }));
              setSelectedProduct(null);
            }}
            className="rounded-xl bg-cyan-300 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-200"
          >
            افزودن به سبد خرید 🛒
          </button>
        </div>
      </div>
    </div>
  </div>
)}
      {assistantOpen && (
        
<div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-4 backdrop-blur-sm" onClick={() => setAssistantOpen(false)}>

          <div role="dialog" aria-modal="true" aria-label="دستیار خرید" className="w-full max-w-md rounded-3xl border border-white/10 bg-[#101321] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div><p className="text-xs text-cyan-300">NEXORA AI</p><h2 className="mt-2 text-xl font-black">دستیار خرید ✧</h2></div>
              <button aria-label="بستن" onClick={() => setAssistantOpen(false)} className="rounded-lg px-3 py-2 text-gray-400 hover:bg-white/10">✕</button>
            </div>
            <p className="mt-4 text-sm leading-7 text-gray-400">چه محصولی می‌خواهی؟ بودجه یا کاربردت را بنویس.</p>
            <input value={question} onChange={(e) => setQuestion(e.target.value)} onKeyDown={(e) => e.key === "Enter" && askAssistant()} placeholder="مثلاً هدفون برای موسیقی..." className="mt-4 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none focus:border-cyan-300/50" />
            <button onClick={askAssistant} className="mt-3 w-full rounded-xl bg-cyan-300 px-4 py-3 font-bold text-[#071019]">ارسال سؤال</button>
            {answer && <p className="mt-4 rounded-xl border border-cyan-300/15 bg-cyan-300/[0.06] p-4 text-sm leading-7 text-gray-300">{answer}</p>}
            <p className="mt-4 text-xs text-gray-600">این دستیار در حال حاضر نمایشی است؛ اتصال به هوش مصنوعی واقعی در مرحلهٔ بعد انجام می‌شود.</p>
          </div>
        </div>
      )}
    </main>
  );
}
