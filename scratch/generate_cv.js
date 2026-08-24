const fs = require('fs');
const path = require('path');

// Minimal valid PDF generator
function createSimplePdf() {
  const content = `%PDF-1.4
1 0 obj
<< /Title (CV - Isnan Rizqi Kurniawan)
   /Author (Isnan Rizqi Kurniawan)
   /Creator (Portfolio Generator)
   /Producer (PDFKit)
   /CreationDate (D:20260824115000)
>>
endobj
2 0 obj
<< /Type /Catalog
   /Pages 3 0 R
>>
endobj
3 0 obj
<< /Type /Pages
   /Kids [4 0 R]
   /Count 1
>>
endobj
4 0 obj
<< /Type /Page
   /Parent 3 0 R
   /MediaBox [0 0 595.28 841.89]
   /Contents 5 0 R
   /Resources << /Font << /F1 6 0 R /F2 7 0 R >> >>
>>
endobj
5 0 obj
<< /Length 720 >>
stream
BT
/F2 20 Tf
50 780 Td
(ISNAN RIZQI KURNIAWAN) Tj
/F1 11 Tf
0 -22 Td
(Senior Data Analyst | isnan.rizqikurniawan@gmail.com | linkedin.com/in/rizisnan) Tj
0 -30 Td
/F2 14 Tf
(PROFESSIONAL SUMMARY) Tj
/F1 10 Tf
0 -16 Td
(Senior Data Analyst with 6+ years of experience transforming raw multi-source data warehouses) Tj
0 -14 Td
(into actionable executive dashboards, dbt dimensional models, and strategic predictive intelligence.) Tj
0 -28 Td
/F2 14 Tf
(CORE EXPERTISE) Tj
/F1 10 Tf
0 -16 Td
(- Data Modeling, dbt Semantic Layers, Star Schema Design) Tj
0 -14 Td
(- Executive BI: Tableau, Power BI, Looker, Metabase) Tj
0 -14 Td
(- Statistical Experimentation & A/B Testing Frameworks) Tj
0 -14 Td
(- SQL, Python, Snowflake, BigQuery, PostgreSQL) Tj
0 -28 Td
/F2 14 Tf
(EXPERIENCE SUMMARY) Tj
/F1 10 Tf
0 -16 Td
(- Senior Data Analyst | Enterprise Tech Solutions (2022 - Present)) Tj
0 -14 Td
(- Lead BI & Analytics Analyst | E-Commerce Scaleup (2020 - 2022)) Tj
0 -14 Td
(- Data Analyst | Global Digital Agency (2018 - 2020)) Tj
ET
endstream
endobj
6 0 obj
<< /Type /Font
   /Subtype /Type1
   /BaseFont /Helvetica
>>
endobj
7 0 obj
<< /Type /Font
   /Subtype /Type1
   /BaseFont /Helvetica-Bold
>>
endobj
xref
0 8
0000000000 65535 f 
0000000010 00000 n 
0000000170 00000 n 
0000000223 00000 n 
0000000282 00000 n 
0000000418 00000 n 
0000001211 00000 n 
0000001289 00000 n 
trailer
<< /Size 8
   /Root 2 0 R
   /Info 1 0 R
>>
startxref
1372
%%EOF`;

  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'Isnan_Rizqi_Kurniawan_CV.pdf'), content);
  fs.writeFileSync(path.join(publicDir, 'cv.pdf'), content);
  console.log('CV PDF files generated successfully in public/');
}

createSimplePdf();
