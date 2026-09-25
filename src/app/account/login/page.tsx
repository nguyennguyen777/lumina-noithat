"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [registerMode, setRegisterMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(
        registerMode ? "/api/auth/register" : "/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Có lỗi xảy ra, vui lòng thử lại.");
        return;
      }

      const next = new URLSearchParams(window.location.search).get("next");
      router.push(next || "/account");
      router.refresh();
    } catch {
      setError("Không thể kết nối máy chủ.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-12 px-6 py-12 lg:grid-cols-2 lg:px-8">
      <div className="hidden bg-charcoal p-12 text-ivory lg:block">
        <p className="luxury-label text-gold">LUMINA Interior</p>
        <h1 className="mt-6 font-display text-6xl font-light leading-tight">
          Không gian sống bắt đầu từ một lựa chọn tinh tế.
        </h1>
        <p className="mt-8 max-w-md text-sm leading-7 text-stone-300">
          Lưu lại những thiết kế yêu thích và theo dõi hành trình đặt hàng của
          bạn.
        </p>
      </div>

      <div className="mx-auto w-full max-w-md">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-stone-500 hover:text-charcoal"
        >
          <ArrowLeft className="h-4 w-4" /> Về trang chủ
        </Link>
        <p className="luxury-label text-gold">Tài khoản LUMINA</p>
        <h1 className="luxury-heading mt-3 text-4xl">
          {registerMode ? "Tạo tài khoản" : "Chào mừng trở lại"}
        </h1>
        <p className="mt-3 text-sm text-stone-500">
          {registerMode
            ? "Đăng ký để bắt đầu lưu giữ không gian của riêng bạn."
            : "Đăng nhập để tiếp tục hành trình của bạn."}
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          {registerMode && (
            <div>
              <label htmlFor="name" className="luxury-label mb-2 block">
                Họ và tên
              </label>
              <input
                id="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="luxury-input"
                autoComplete="name"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="luxury-label mb-2 block">
              Email
            </label>
            <input
              id="email"
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="luxury-input"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="luxury-label mb-2 block">
              Mật khẩu
            </label>
            <input
              id="password"
              required
              minLength={8}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="luxury-input"
              autoComplete={registerMode ? "new-password" : "current-password"}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="luxury-btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {registerMode ? "Đăng ký" : "Đăng nhập"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setRegisterMode(!registerMode);
            setError("");
          }}
          className="mt-8 w-full text-center text-xs uppercase tracking-luxury text-stone-500 hover:text-gold"
        >
          {registerMode
            ? "Đã có tài khoản? Đăng nhập"
            : "Chưa có tài khoản? Đăng ký"}
        </button>
      </div>
    </div>
  );
}
