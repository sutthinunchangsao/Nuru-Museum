@echo off
chcp 65001 >nul
echo ========================================================
echo   🏛️ GRURU MUSEUM - Executive Presentation Deck
echo   Theme: "New Knowledge. New Storytelling. Built for Everyday Living."
echo   Target: นำเสนอรัฐมนตรีว่าการกระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม
echo ========================================================
echo.
echo กำลังเปิด Presentation บนเว็บบราวเซอร์ของคุณ...
start "" "%~dp0presentation\index.html"
echo.
echo Presentation เปิดเรียบร้อยแล้ว! 
echo • กด [Arrow Right] หรือ [Space] เพื่อเลื่อนสไลด์
echo • กด [Arrow Left] เพื่อย้อนกลับ
echo • กด [F] เพื่อแสดงผลแบบเต็มจอ (Fullscreen)
echo • กด [N] เพื่อเปิด/ปิด โน้ตผู้นำเสนอ (Speaker Notes)
echo • กดปุ่ม [พิมพ์ PDF] เพื่อบันทึกเป็นเอกสารนำเสนอ
echo ========================================================
pause
