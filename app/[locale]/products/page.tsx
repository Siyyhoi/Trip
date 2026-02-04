"use client";
import { motion, Variants } from "framer-motion";
import { products } from "@/src/data/products";
import { useLocale } from "next-intl";
import { useEffect, useState, useRef } from "react";

export default function RefactoredProductShowcase() {
  const locale = useLocale();
  const [mounted, setMounted] = useState(false);
  const [favorite, setFavorite] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("Red");
  const [quantity, setQuantity] = useState<number>(1);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, [locale]);

  useEffect(() => {
    const raw = localStorage.getItem("favorites");
    if (raw) setFavorite(JSON.parse(raw));
  }, []);
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorite));
  }, [favorite]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorite((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setSelectedColor("Red");
    setQuantity(1);
  };

  const colors = [
    { name: "Red", code: "bg-red-500" },
    { name: "Purple", code: "bg-purple-500" },
    { name: "Black", code: "bg-gray-900" },
    { name: "Blue", code: "bg-blue-900" },
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  if (!mounted) return null;

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat(locale === "en" ? "en-US" : "zh-CN", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(p / 100);
  };

  return (
    <div className="min-h-screen text-gray-900 antialiased">
      {/* HERO */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
              {locale === "en" ? "The Modern Collection" : "新品系列"}
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-xl">
              {locale === "en"
                ? "Handpicked pieces combining premium materials with sharp, contemporary design. Crafted for everyday elegance."
                : "精心挑选的精品，将优质材料与现代设计相结合，为日常优雅而生。"}
            </p>

            <div className="flex gap-4">
              <a href="#products" className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-md font-semibold shadow-lg hover:scale-[1.02] transition">
                {locale === "en" ? "Shop the Collection" : "购买系列"}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div
            onClick={() => setSelectedProduct(products[0])}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img src={products[0].image} alt={products[0].name} className="w-full h-120 object-cover" />
              <div className="absolute bottom-6 left-6 bg-white/90 rounded-lg p-4 shadow-md max-w-xs">
                <h3 className="font-bold text-lg">{locale === "en" ? products[0].name : products[0].nameCN}</h3>
                <p className="text-sm text-gray-600">{formatPrice(products[0].price)}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* PRODUCTS GRID */}
      <main id="products" className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-500">{locale === "en" ? "Complete Collection" : "完整系列"}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold">{locale === "en" ? "Browse Our Favorites" : "我们的展示"}</h2>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products.map((product) => (
            <motion.article
              onClick={() => setSelectedProduct(product)}
              key={product.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover" loading="lazy" />

                <div className={`absolute inset-0 flex items-end p-6 transition-opacity ${hoveredProduct === product.id ? "opacity-100" : "opacity-0"}`}>
                  <div className="w-full">
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{locale === "en" ? product.name : product.nameCN}</h3>
                    <p className="text-sm text-gray-500 mt-1">{product.icon} {locale === "en" ? product.nameCN : product.name}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-extrabold">{formatPrice(product.price)}</div>
                    <div className="text-yellow-400 text-sm">★★★★★</div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mt-4 line-clamp-2">{locale === "en" ? product.description : product.descriptionCN}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </main>

      {/* MODAL */}
      {selectedProduct && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-96 object-contain" />
              </div>

              <div className="p-2 md:p-6 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm text-gray-500">{locale === "en" ? "Brand" : "品牌"}</p>
                    <h2 className="text-2xl font-bold">{locale === "en" ? selectedProduct.name : selectedProduct.nameCN}</h2>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold">{formatPrice(selectedProduct.price)}</div>
                  </div>
                </div>

                <p className="text-gray-600 mt-2 mb-4">{locale === "en" ? selectedProduct.description : selectedProduct.descriptionCN}</p>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">{locale === "en" ? "Color" : "颜色"}</label>
                  <div className="flex gap-3">
                    {colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-8 h-8 rounded-full ${c.code} ${selectedColor === c.name ? "ring-2 ring-offset-2 ring-gray-900" : ""}`}
                        aria-label={c.name}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2">−</button>
                    <div className="px-4 py-2 font-medium">{quantity}</div>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2">+</button>
                  </div>

                  <button className="flex-1 bg-linear-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold py-3 rounded-lg shadow hover:scale-[1.01] transition">
                    {locale === "en" ? "Add to bag" : "加入购物袋"}
                  </button>
                </div>
              </div>
            </div>

            <button onClick={closeModal} className="absolute top-4 right-4 bg-white rounded-full p-2 shadow">✕</button>
          </motion.div>
        </div>
      )}
    </div>
  );
}