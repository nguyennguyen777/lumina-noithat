# LUMINA Interior

Nội thất hiện đại cho không gian sống — Frontend preview (mock data).

## Chạy project

```bash
cd D:\LUMINA-Interior
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000)

## Trang chính

| Trang | URL |
|-------|-----|
| Trang chủ | `/` |
| Sản phẩm | `/products` |
| Chi tiết SP | `/products/[slug]` |
| Giỏ hàng | `/cart` |
| Yêu thích | `/favorites` |
| Đặt lịch tư vấn | `/consultation` |
| Tài khoản | `/account` |
| Đơn hàng | `/account/orders` |
| Admin demo | `/admin` |

## Tech stack

- Next.js 15 + TypeScript
- Tailwind CSS
- Framer Motion
- Mock data (localStorage cho giỏ hàng & yêu thích)

## Phase tiếp theo

- Backend API + Database
- Authentication
- Admin CRUD thật
- Thanh toán
