import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="luxury-label mb-4">404</p>
      <h1 className="font-display text-4xl font-light">Không tìm thấy trang</h1>
      <p className="mt-4 text-sm text-stone-500">
        Trang bạn tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <Link href="/" className="luxury-btn-primary mt-8">
        Về trang chủ
      </Link>
    </div>
  );
}
