"use client";

import { FormEvent, useEffect, useState } from "react";
import { Loader2, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

const categories = [
  ["sofa", "Sofa"],
  ["ban", "Bàn"],
  ["ghe", "Ghế"],
  ["giuong", "Giường"],
  ["tu", "Tủ"],
  ["den", "Đèn"],
  ["decor", "Decor"],
];

type FormState = {
  name: string;
  category: string;
  price: string;
  originalPrice: string;
  description: string;
  material: string;
  dimensions: string;
  colors: string;
  images: string;
  featured: boolean;
  isNew: boolean;
};

const emptyForm: FormState = {
  name: "",
  category: "sofa",
  price: "",
  originalPrice: "",
  description: "",
  material: "",
  dimensions: "",
  colors: "",
  images: "",
  featured: false,
  isNew: false,
};

function formFromProduct(product: Product): FormState {
  return {
    name: product.name,
    category: product.category,
    price: String(product.price),
    originalPrice: product.originalPrice ? String(product.originalPrice) : "",
    description: product.description,
    material: product.material,
    dimensions: product.dimensions,
    colors: product.colors.join(", "),
    images: product.images.join("\n"),
    featured: product.featured ?? false,
    isNew: product.isNew ?? false,
  };
}

function payloadFromForm(form: FormState) {
  return {
    ...form,
    price: Number(form.price),
    originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
    colors: form.colors
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
    images: form.images
      .split("\n")
      .map((value) => value.trim())
      .filter(Boolean),
  };
}

export function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  async function loadProducts(search = "") {
    const suffix = search ? `?q=${encodeURIComponent(search)}` : "";
    const response = await fetch(`/api/admin/products${suffix}`);
    if (!response.ok) throw new Error("Không thể tải danh sách sản phẩm.");
    const data = await response.json();
    setProducts(data.products);
  }

  useEffect(() => {
    async function initialize() {
      try {
        const userResponse = await fetch("/api/auth/me");
        const userData = await userResponse.json();
        const isAdmin = userData.user?.role === "ADMIN";
        setAuthorized(isAdmin);
        if (isAdmin) await loadProducts();
      } catch {
        setError("Không thể kết nối máy chủ.");
      } finally {
        setLoading(false);
      }
    }

    initialize();
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
    setError("");
  }

  function openEdit(product: Product) {
    setEditing(product);
    setForm(formFromProduct(product));
    setShowForm(true);
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch(
        editing ? `/api/admin/products/${editing.id}` : "/api/admin/products",
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payloadFromForm(form)),
        },
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error ?? "Không thể lưu sản phẩm.");
      setEditing(null);
      setForm(emptyForm);
      setShowForm(false);
      await loadProducts(query);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Không thể lưu sản phẩm.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(product: Product) {
    if (!window.confirm(`Xóa sản phẩm “${product.name}”?`)) return;

    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Không thể xóa sản phẩm.");
      setProducts((current) =>
        current.filter((item) => item.id !== product.id),
      );
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Không thể xóa sản phẩm.",
      );
    }
  }

  async function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await loadProducts(query);
    } catch {
      setError("Không thể tìm kiếm sản phẩm.");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-12 text-sm text-stone-500">
        <Loader2 className="h-4 w-4 animate-spin" /> Đang tải dữ liệu...
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="border border-stone-200 bg-white p-8 text-sm text-stone-500">
        Bạn cần đăng nhập bằng tài khoản admin để truy cập khu vực này.
      </div>
    );
  }

  return (
    <section className="mt-12">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="luxury-label text-gold">Catalog</p>
          <h2 className="mt-2 text-xl font-medium">
            Quản lý sản phẩm{" "}
            <span className="text-sm font-normal text-stone-400">
              ({products.length})
            </span>
          </h2>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="luxury-btn-primary px-5 py-3"
        >
          <Plus className="h-4 w-4" /> Thêm sản phẩm
        </button>
      </div>

      <form onSubmit={handleSearch} className="mb-5 flex max-w-xl gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-0 top-3 h-4 w-4 text-stone-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm theo tên sản phẩm..."
            className="luxury-input pl-7"
          />
        </div>
        <button type="submit" className="luxury-btn-outline px-5 py-3">
          Tìm
        </button>
      </form>

      {error && (
        <p className="mb-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <div className="overflow-hidden bg-white shadow-sm">
        <div className="hidden grid-cols-[1fr_140px_140px_100px] gap-4 border-b border-stone-200 px-6 py-3 text-[10px] uppercase tracking-luxury text-stone-400 md:grid">
          <span>Sản phẩm</span>
          <span>Danh mục</span>
          <span>Giá</span>
          <span className="text-right">Thao tác</span>
        </div>
        {products.map((product) => (
          <div
            key={product.id}
            className="grid gap-3 border-b border-stone-100 px-6 py-4 last:border-0 md:grid-cols-[1fr_140px_140px_100px] md:items-center md:gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 shrink-0 overflow-hidden bg-stone-100">
                {product.images[0] && (
                  <img
                    src={product.images[0]}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="mt-1 text-xs text-stone-400">
                  {product.featured ? "Nổi bật" : ""}
                  {product.featured && product.isNew ? " · " : ""}
                  {product.isNew ? "Mới" : ""}
                </p>
              </div>
            </div>
            <span className="text-sm text-stone-500">
              {categories.find(([value]) => value === product.category)?.[1] ??
                product.category}
            </span>
            <span className="text-sm font-medium">
              {formatPrice(product.price)}
            </span>
            <div className="flex gap-3 md:justify-end">
              <button
                type="button"
                onClick={() => openEdit(product)}
                aria-label={`Sửa ${product.name}`}
                className="text-stone-400 hover:text-charcoal"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(product)}
                aria-label={`Xóa ${product.name}`}
                className="text-stone-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <p className="px-6 py-12 text-center text-sm text-stone-500">
            Không tìm thấy sản phẩm.
          </p>
        )}
      </div>

      {showForm && (
        <ProductFormModal
          editing={editing}
          form={form}
          saving={saving}
          onChange={setForm}
          onClose={() => {
            setEditing(null);
            setForm(emptyForm);
            setShowForm(false);
            setError("");
          }}
          onSubmit={handleSubmit}
        />
      )}
    </section>
  );
}

function ProductFormModal({
  editing,
  form,
  saving,
  onChange,
  onClose,
  onSubmit,
}: {
  editing: Product | null;
  form: FormState;
  saving: boolean;
  onChange: (form: FormState) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 px-4 py-6">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-ivory p-6 shadow-xl lg:p-8">
        <div className="mb-7 flex items-center justify-between">
          <h3 className="font-display text-3xl font-light">
            {editing ? "Sửa sản phẩm" : "Thêm sản phẩm"}
          </h3>
          <button type="button" onClick={onClose} aria-label="Đóng">
            <X className="h-5 w-5 text-stone-500" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="luxury-label mb-2 block">Tên sản phẩm</span>
            <input
              required
              value={form.name}
              onChange={(event) =>
                onChange({ ...form, name: event.target.value })
              }
              className="luxury-input"
            />
          </label>
          <label>
            <span className="luxury-label mb-2 block">Danh mục</span>
            <select
              value={form.category}
              onChange={(event) =>
                onChange({ ...form, category: event.target.value })
              }
              className="luxury-input"
            >
              {categories.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="luxury-label mb-2 block">Giá bán</span>
            <input
              required
              min="0"
              type="number"
              value={form.price}
              onChange={(event) =>
                onChange({ ...form, price: event.target.value })
              }
              className="luxury-input"
            />
          </label>
          <label>
            <span className="luxury-label mb-2 block">Giá gốc</span>
            <input
              min="0"
              type="number"
              value={form.originalPrice}
              onChange={(event) =>
                onChange({ ...form, originalPrice: event.target.value })
              }
              className="luxury-input"
            />
          </label>
          <label>
            <span className="luxury-label mb-2 block">Chất liệu</span>
            <input
              value={form.material}
              onChange={(event) =>
                onChange({ ...form, material: event.target.value })
              }
              className="luxury-input"
            />
          </label>
          <label>
            <span className="luxury-label mb-2 block">Kích thước</span>
            <input
              value={form.dimensions}
              onChange={(event) =>
                onChange({ ...form, dimensions: event.target.value })
              }
              className="luxury-input"
            />
          </label>
          <label className="sm:col-span-2">
            <span className="luxury-label mb-2 block">Mô tả</span>
            <textarea
              rows={3}
              value={form.description}
              onChange={(event) =>
                onChange({ ...form, description: event.target.value })
              }
              className="w-full resize-none border-b border-stone-300 bg-transparent py-3 text-sm outline-none focus:border-gold"
            />
          </label>
          <label>
            <span className="luxury-label mb-2 block">
              Màu sắc, ngăn cách bằng dấu phẩy
            </span>
            <input
              value={form.colors}
              onChange={(event) =>
                onChange({ ...form, colors: event.target.value })
              }
              className="luxury-input"
            />
          </label>
          <label>
            <span className="luxury-label mb-2 block">
              Ảnh, mỗi URL một dòng
            </span>
            <textarea
              rows={2}
              value={form.images}
              onChange={(event) =>
                onChange({ ...form, images: event.target.value })
              }
              className="w-full resize-none border-b border-stone-300 bg-transparent py-3 text-sm outline-none focus:border-gold"
            />
          </label>
          <div className="flex gap-6 sm:col-span-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) =>
                  onChange({ ...form, featured: event.target.checked })
                }
              />{" "}
              Nổi bật
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.isNew}
                onChange={(event) =>
                  onChange({ ...form, isNew: event.target.checked })
                }
              />{" "}
              Sản phẩm mới
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-3 sm:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="luxury-btn-outline px-5 py-3"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={saving}
              className="luxury-btn-primary px-5 py-3 disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />} Lưu sản
              phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
