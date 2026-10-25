/**
 * ============================================================
 * GOOGLE APPS SCRIPT CHO FORM ĐĂNG KÝ DEMO INPRO (CLONE BASE.VN)
 * ============================================================
 * 
 * Hướng dẫn thiết lập:
 * 1. Mở Google Sheet mới hoặc tab mới.
 * 2. Vào Tiện ích mở rộng (Extensions) > Apps Script.
 * 3. Xóa code cũ, dán toàn bộ nội dung file này vào.
 * 4. Chạy hàm setupSheet() một lần để tự động tạo tiêu đề 12 cột & định dạng.
 * 5. Chọn Triển khai (Deploy) > Tùy chọn triển khai mới (New deployment):
 *    - Chọn loại: Ứng dụng web (Web app)
 *    - Thực thi dưới tên: Tôi (Me)
 *    - Ai có quyền truy cập: Bất kỳ ai (Anyone)
 * 6. Sao chép URL Web App nhận được và thay vào SHEET_URL trong index.html.
 */

// Tên tab lưu lead (để trống '' = ghi vào tab đầu tiên)
const SHEET_NAME = '';

// Tiêu đề 12 cột chuẩn hóa cho Form đăng ký Demo INPRO
const HEADERS = [
  'THỜI GIAN',        // A: Tự động ghi nhận thời gian gửi
  'MÃ LEAD',          // B: Tự động tạo mã LD-YYMMDD-XXXX
  'HỌ TÊN',           // C: Từ form (Họ và tên)
  'SỐ ĐIỆN THOẠI',    // D: Chuẩn hóa về 0xxxxxxxxx
  'EMAIL',            // E: Từ form (Email)
  'NGÀNH HÀNG',       // F: Mẹ & bé / FMCG / Thời trang / Khác
  'NHU CẦU QUAN TÂM', // G: Danh sách các nhu cầu quan tâm đã chọn
  'NGUỒN FORM',       // H: Form trên hero hay form cuối trang
  'THIẾT BỊ',         // I: Mobile / Tablet / Desktop
  'TRẠNG THÁI',       // J: Mặc định "Mới"
  'NGƯỜI PHỤ TRÁCH',  // K: Nhân viên sales phụ trách
  'GHI CHÚ'           // L: Script tự cảnh báo nếu trùng SĐT với lead trước
];

const STATUS_OPTIONS = [
  'Mới',
  'Đã gọi - chưa nghe máy',
  'Đã liên hệ',
  'Hẹn demo',
  'Đã demo',
  'Báo giá',
  'Chốt',
  'Không phù hợp',
  'Rác/Trùng'
];

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : ss.getSheets()[0];
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    
    // Style tiêu đề chuyên nghiệp
    const headerRange = sh.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground('#9333ea');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    headerRange.setHorizontalAlignment('center');
  }
  return sh;
}

/** Chạy 1 lần: Thiết lập định dạng cột và dropdown Trạng thái */
function setupSheet() {
  const sh = getSheet_();
  const maxRows = Math.max(sh.getMaxRows() - 1, 500);

  // Cột A: Thời gian
  sh.getRange(2, 1, maxRows, 1).setNumberFormat('dd/MM/yyyy HH:mm:ss');
  // Cột D: Số điện thoại (dạng text để không mất số 0)
  sh.getRange(2, 4, maxRows, 1).setNumberFormat('@');
  // Cột J: Dropdown trạng thái
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(STATUS_OPTIONS, true)
    .setAllowInvalid(true)
    .build();
  sh.getRange(2, 10, maxRows, 1).setDataValidation(rule);
}

function clean_(v) {
  let s = (v === undefined || v === null ? '' : String(v)).trim().slice(0, 1000);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function normalizePhone_(p) {
  let s = String(p || '').replace(/[^\d+]/g, '');
  if (s.indexOf('+84') === 0) s = '0' + s.slice(3);
  else if (s.indexOf('84') === 0 && s.length >= 11) s = '0' + s.slice(2);
  return s;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const sh = getSheet_();
    const d = JSON.parse(e.postData.contents);
    const phone = normalizePhone_(d.phone);

    // Kiểm tra trùng SĐT
    let note = '';
    if (phone && sh.getLastRow() > 1) {
      const phones = sh.getRange(2, 4, sh.getLastRow() - 1, 1).getValues().flat().map(String);
      if (phones.indexOf(phone) !== -1) {
        note = 'Trùng SĐT với lead trước';
      }
    }

    const id = 'LD-' + Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'yyMMdd') + '-' + String(sh.getLastRow()).padStart(4, '0');
    
    // Gộp nhu cầu quan tâm
    let needsStr = '';
    if (Array.isArray(d.needs)) {
      needsStr = d.needs.join(', ');
    } else if (d.message) {
      needsStr = d.message;
    }

    sh.appendRow([
      new Date(d.ts || Date.now()), // A: THỜI GIAN
      id,                           // B: MÃ LEAD
      clean_(d.name),               // C: HỌ TÊN
      phone,                        // D: SỐ ĐIỆN THOẠI
      clean_(d.email),              // E: EMAIL
      clean_(d.industry || d.company_size), // F: NGÀNH HÀNG
      clean_(needsStr),             // G: NHU CẦU QUAN TÂM
      clean_(d.source_form || 'Form Demo Base-clone'), // H: NGUỒN FORM
      clean_(d.device || ''),       // I: THIẾT BỊ
      'Mới',                        // J: TRẠNG THÁI
      '',                           // K: NGƯỜI PHỤ TRÁCH
      note                          // L: GHI CHÚ
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true, id: id }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
