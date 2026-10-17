"use client";

import { useEffect, useState } from "react";
const products = [
  { id: 1, name: "هدفون نوا پرو", price: 4850000, icon: "🎧" },
  { id: 2, name: "ساعت هوشمند نکس", price: 6290000, icon: "⌚" },
  { id: 3, name: "کیبورد سایبر", price: 3750000, icon: "⌨️" },
  { id: 4, name: "اسپیکر پالس", price: 2890000, icon: "🔊" },
  { id: 5, name: "ماوس فانتوم", price: 1950000, icon: "🖱️" },
  { id: 6, name: "عینک هوشمند", price: 8190000, icon: "🕶️" },
];
export default function OrderPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
const [cart, setCart] = useState<Record<number, number>>({});
const [cartReady, setCartReady] = useState(false);
const cartItems = products.filter(
  (product) => (cart[product.id] ?? 0) > 0
);

const cartCount = Object.values(cart).reduce(
  (sum, quantity) => sum + quantity,
  0
);

const cartTotal = cartItems.reduce(
  (sum, product) => sum + product.price * (cart[product.id] ?? 0),
  0
);

const money = (value: number) =>
  new Intl.NumberFormat("fa-IR").format(value) + " تومان";
useEffect(() => {
  try {
    const savedCart = localStorage.getItem("nexora-cart");

    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);

      if (
        parsedCart &&
        typeof parsedCart === "object" &&
        !Array.isArray(parsedCart)
      ) {
        setCart(parsedCart);
      }
    }
  } catch {
    console.log("خواندن سبد خرید ناموفق بود.");
  } finally {
    setCartReady(true);
  }
}, []);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  setOrderNumber(`NX-${Date.now().toString().slice(-6)}`);
  setSubmitted(true);
}

  return (
    <main
      dir="rtl"
     
className="relative isolate min-h-screen overflow-hidden bg-[#070912] px-4 py-10 text-white selection:bg-cyan-300/30 before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(ellipse_at_10%_15%,rgba(34,211,238,0.16),transparent_38%),radial-gradient(ellipse_at_90%_45%,rgba(139,92,246,0.17),transparent_42%),radial-gradient(ellipse_at_45%_100%,rgba(34,211,238,0.08),transparent_45%)]"

    >
      <div className="mx-auto max-w-3xl">
        <a
          href="/"
          className="text-sm text-cyan-300 transition hover:text-cyan-200"
        >
          ← بازگشت به فروشگاه NEXORA
        </a>

<section className="mb-6 rounded-3xl border border-cyan-200/25 bg-gradient-to-br from-white/[0.09] via-white/[0.035] to-violet-400/[0.06] p-5 shadow-[0_18px_50px_rgba(34,211,238,0.08)] ring-1 ring-white/[0.04] backdrop-blur-2xl transition-all duration-300 sm:p-6">
  <h2 className="text-xl font-black">خلاصهٔ سفارش 🛒</h2>

  {!cartReady ? (
    <p className="mt-4 text-gray-400">در حال بارگذاری سبد خرید...</p>
  ) : cartItems.length === 0 ? (
    <div className="mt-4">
      <p className="text-gray-400">سبد خرید شما خالی است.</p>
      <a href="/" className="mt-3 inline-block text-cyan-300 hover:text-cyan-200">
        بازگشت به فروشگاه ←
      </a>
    </div>
  ) : (
    <>
      <div className="mt-5 space-y-3">
        {cartItems.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between gap-3 rounded-2xl border border-white/[0.10] bg-gradient-to-l from-white/[0.07] to-cyan-400/[0.025] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)] backdrop-blur-xl transition duration-300 hover:border-cyan-300/25"          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{product.icon}</span>
              <div>
                <p className="font-bold">{product.name}</p>
                <p className="mt-1 text-sm text-gray-400">
                  تعداد: {cart[product.id]}
                </p>
              </div>
            </div>
            <p className="text-left text-sm font-bold text-cyan-200">
              {money(product.price * cart[product.id])}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-gray-300">تعداد کل کالاها: {cartCount}</span>
        <span className="text-lg font-black text-cyan-200">
          {money(cartTotal)}
        </span>
      </div>
    </>
  )}
</section>

<header className="group relative mb-8 mt-8 overflow-hidden rounded-3xl border border-cyan-300/20 bg-gradient-to-l from-cyan-400/[0.09] via-white/[0.035] to-violet-500/[0.10] p-6 shadow-[0_18px_55px_rgba(34,211,238,0.08)] ring-1 ring-white/[0.04] backdrop-blur-2xl transition-all duration-500 hover:border-cyan-300/35 sm:p-8">
  <div className="pointer-events-none absolute -left-12 -top-16 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl transition-all duration-500 group-hover:bg-violet-500/25" />
  <div className="pointer-events-none absolute -bottom-16 right-10 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl" />

  <div className="relative">
    <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-2 text-xs font-black tracking-[0.2em] text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.08)]">
      <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
      NEXORA CHECKOUT
    </p>

    <h1 className="mt-5 bg-gradient-to-l from-white via-cyan-100 to-violet-200 bg-clip-text text-3xl font-black leading-relaxed text-transparent sm:text-5xl">
      ثبت سفارش
    </h1>

    <p className="mt-3 max-w-xl text-sm leading-7 text-gray-300 sm:text-base">
      اطلاعات تحویل سفارش خود را وارد کنید.
    </p>

    <div className="mt-6 h-px w-full bg-gradient-to-l from-cyan-300/50 via-white/10 to-transparent" />
    <p className="mt-4 text-xs font-medium text-gray-400">
      ✦ تجربه‌ای هوشمند، سریع و متفاوت با NEXORA
    </p>
  </div>
</header>


        {submitted ? (
          <section className="rounded-3xl border border-emerald-400/30 bg-emerald-400/5 p-7">
            <div className="text-4xl">✓</div>
            <h2 className="mt-4 text-2xl font-bold text-emerald-300">
              اطلاعات ثبت شد!
              <div className="mt-4 rounded-xl border border-cyan-300/20 bg-cyan-300/5 p-4">
  <p className="text-sm text-gray-400">شمارهٔ پیگیری آزمایشی</p>
  <p dir="ltr" className="mt-2 text-xl font-black text-cyan-200">
    {orderNumber}
  </p>
</div>
            </h2>
            <p className="mt-3 leading-8 text-gray-300">
              این یک ثبت سفارش آزمایشی است. هنوز سفارش در سرور ذخیره
              نشده و پرداختی انجام نشده است.
            </p>
            <p className="mt-4 text-gray-400">نام مشتری: {name}</p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 rounded-xl bg-cyan-300 px-5 py-3 font-bold text-gray-950 transition hover:bg-cyan-200"
            >
              ویرایش اطلاعات
            </button>
          </section>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-8"
          >
            <div>
              <label htmlFor="customer-name" className="mb-2 block text-sm text-gray-300">
                نام و نام خانوادگی
              </label>
              <input
                id="customer-name"
                required
                minLength={3}
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="نام خود را وارد کنید"
                className="w-full rounded-xl border border-white/10 bg-[#101321] px-4 py-3 outline-none transition focus:border-cyan-300"
              />
            </div>

            <div>
              <label htmlFor="customer-phone" className="mb-2 block text-sm text-gray-300">
                شماره تماس
              </label>
              <input
                id="customer-phone"
                required
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="شماره تماس"
             className="w-full rounded-2xl border border-white/[0.12] bg-gradient-to-l from-white/[0.07] to-cyan-400/[0.025] px-4 py-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_25px_rgba(0,0,0,0.12)] backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-gray-500 hover:border-cyan-300/25 focus:border-cyan-300/60 focus:bg-cyan-300/[0.04] focus:shadow-[0_0_25px_rgba(34,211,238,0.10)]"
              />
            </div>

            <div>
              <label htmlFor="customer-address" className="mb-2 block text-sm text-gray-300">
                نشانی تحویل
              </label>
              <textarea
                id="customer-address"
                required
                minLength={10}
                autoComplete="street-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="نشانی کامل محل تحویل"
                rows={4}
                
className="w-full resize-y rounded-2xl border border-white/[0.12] bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-cyan-400/[0.025] px-4 py-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_25px_rgba(0,0,0,0.12)] backdrop-blur-xl outline-none transition-all duration-300 placeholder:text-gray-500 hover:border-cyan-300/25 focus:border-cyan-300/60 focus:bg-cyan-300/[0.04] focus:shadow-[0_0_25px_rgba(34,211,238,0.10)]"

              />
            </div>

            <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/5 p-4 text-sm leading-7 text-gray-300">
              <p className="font-bold text-cyan-200">مرحلهٔ آزمایشی</p>
              فعلاً این فرم اطلاعات را فقط در همین صفحه نمایش می‌دهد.
              برای ثبت واقعی سفارش، بعداً باید آن را به سرور و پایگاه
              داده متصل کنیم.
            </div>

           
<button
  type="submit"
  disabled={!cartReady || cartCount === 0}
className="group relative w-full overflow-hidden rounded-2xl border border-cyan-200/40 bg-gradient-to-l from-cyan-300 via-cyan-200 to-violet-300 px-5 py-4 font-black text-gray-950 shadow-[0_8px_30px_rgba(34,211,238,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:shadow-[0_14px_40px_rgba(34,211,238,0.28)] active:translate-y-0 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
>
  تأیید اطلاعات سفارش
</button>

          </form>
        )}
      </div>
    </main>
  );
}