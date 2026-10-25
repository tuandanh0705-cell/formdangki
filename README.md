# TRANG ĐĂNG KÝ TRẢI NGHIỆM DEMO INPRO (CLONE THEO FORM MẪU BASE.VN)

Trang web này được xây dựng độc lập bên trong thư mục `d:\#5. Antigravity\[ME] INPRO\#5. FORM ĐĂNG KÍ` dựa theo cấu trúc UX/Layout chuyển đổi cao của [signup.base.vn](https://signup.base.vn/), chuẩn hóa 100% theo Bộ nhận diện thương hiệu INPRO 2026 (Màu tím thương hiệu `#9333EA`, Navy `#18233D`, Grey `#F8FAFC`, Font chữ Mulish).

---

## 1. Cấu Trúc Các Section Được Triển Khai

| Section | Tên Section | Nội Dung Triển Khai |
|---|---|---|
| **Header** | Fixed Navigation | Logo INPRO, Hotline: `0869 634 683` (click gọi ngay), nút CTA "Đăng ký trải nghiệm" mượt mà |
| **Section 1** | **Hero Banner + Form Inline (Base.vn style)** | **Bên trái**: Tiêu đề "INPRO – PHẦN MỀM AI GIÚP NHÀ BÁN HÀNG TĂNG TRƯỞNG LỢI NHUẬN", slogan "Tăng lời, vững lãi", 3 gạch đầu dòng giá trị cốt lõi, logo hệ sinh thái bán lẻ Nonelab (Nerman, Lion Bartender, Menow, Mistory) doanh thu 600–700 tỷ/năm.<br>**Bên phải**: Form đăng ký nhận demo nổi bật có badge "Trải nghiệm miễn phí" |
| **Section 2** | **Rào Cản Của Doanh Nghiệp** | **3 Thẻ Thống kê lớn**: `70%` Doanh nghiệp chưa ứng dụng công nghệ cao, `58%` CEO ra quyết định trực giác do dữ liệu quá tải, `31%` CEO quá tải vì đội ngũ chưa thể tự vận hành.<br>**Hộp Điểm Nghẽn Báo Động Đỏ**: 5 gạch đầu dòng có biểu tượng `❌` chỉ rõ các nỗi đau về dữ liệu phân tán, không rõ lãi thực, quy trình nằm trong đầu từng người, thiếu liên kết kho - đơn, sếp liên tục đốc thúc |
| **Section 3** | **Giải Pháp Cho Doanh Nghiệp** | **8 Khối Giải Pháp**: 1. Quản lý bán hàng đa kênh (realtime 30s, Ads AI, tính lãi thực) · 2. Quản lý KOC, Affiliate · 3. Quản lý CSKH đa kênh · 4. Quản trị bán sỉ B2B · 5. Quản lý kho tồn · 6. Tối ưu xử lý đơn (Wave Picking) · 7. Điều phối quà/hàng mẫu theo chiến dịch · 8. Giám sát & báo cáo vận hành.<br>Kèm banner kêu gọi hành động giữa trang |
| **Section 4** | **Tại Sao Lựa Chọn INPRO?** | **5 Trụ cột cốt lõi**: 1. AI tích lũy tri thức · 2. Dữ liệu rõ ràng, quản trị chủ động · 3. Giải pháp thực chiến từ CEO Thành Định & NoneLab (600–700 tỷ/năm) · 4. Lợi ích kinh tế đo lường được · 5. Lợi ích tri thức & kế thừa |
| **Section 6** | **Đăng Ký Trải Nghiệm (Cuối trang)** | Form đăng ký lặp lại cuối trang gồm đủ 5 trường thông tin: 1. Họ và tên, 2. Số điện thoại, 3. Email, 4. Ngành hàng kinh doanh (Mẹ & bé, FMCG, Thời trang, Khác), 5. Nhu cầu quan tâm (Checkbox chọn nhiều tính năng), nút CTA "ĐĂNG KÝ TƯ VẤN" |
| **Section 7** | **Footer** | Logo thương hiệu, giới thiệu hệ sinh thái NoneLab, liên kết nhanh các phân hệ, Hotline, Zalo, Website inpro.vn, Copyright 2026 |
| **Mobile** | **Sticky Action Bar** | Thanh ghim cố định ở đáy màn hình điện thoại gồm nút gọi nhanh Hotline và nút Đăng ký tư vấn |

---

## 2. Kết Nối Google Sheets & Xử Lý Dữ Liệu Lead

Hiện tại file `index.html` **đã được kết nối sẵn** với Google Apps Script Web App của bạn:
```javascript
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbw1DxceJORyQEXRUeEmfLitqnfjZvl4hduDqFFYkCsZpCWK12kkXRBBpVWdrQiYJWq4kg/exec';
```

Dữ liệu gửi từ form được tự động chuyển đổi thông minh:
- `name` ➔ Cột **HỌ TÊN**
- `phone` ➔ Cột **SỐ ĐIỆN THOẠI** (chuẩn hóa về định dạng `0xxxxxxxxx`)
- `email` ➔ Cột **EMAIL**
- `industry` ➔ Cột **QUY MÔ CÔNG TY / NGÀNH HÀNG**
- `needs` (các ô tích chọn) ➔ Cột **KHUNG GIỜ TƯ VẤN / NHU CẦU** & Gộp vào cột **LỜI NHẮN**
- Tự động bắt thêm nguồn thiết bị (Mobile/Desktop), URL truy cập, thời gian nộp.

### Muốn tạo một trang Google Sheet mới riêng cho form này?
Bạn có thể dùng file `google-apps-script.gs` được tạo sẵn trong thư mục này với định dạng 12 cột chuyên nghiệp:
`THỜI GIAN | MÃ LEAD | HỌ TÊN | SỐ ĐIỆN THOẠI | EMAIL | NGÀNH HÀNG | NHU CẦU QUAN TÂM | NGUỒN FORM | THIẾT BỊ | TRẠNG THÁI | NGƯỜI PHỤ TRÁCH | GHI CHÚ`

---

## 3. Cách Mở & Xem Trang

- Bạn có thể nhấp đúp trực tiếp vào file [index.html](file:///d:/#5.%20Antigravity/[ME]%20INPRO/#5.%20FORM%20%C4%90%C4%82NG%20K%C3%8D/index.html) để mở trên trình duyệt bất kỳ (Chrome, Cốc Cốc, Edge, Safari...).
- Hoặc dùng Live Server / Web Server của Antigravity để xem thử trên cả máy tính và điện thoại.
