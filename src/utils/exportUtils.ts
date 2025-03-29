import { utils, writeFile } from "xlsx";

// 1. Dynamic Print Function
export const printTable = (head: string[], body: string, ...more : any[]) => {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;
  const htmlContent = `
    <html dir="rtl">
      <head>
        <title>طباعة البيانات</title>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;700&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: Cairo, sans-serif;
            margin: 20px;
            padding: 0;
            background-color: #fff;
            color: #333;
          }
          h1 {
            text-align: center;
            color: #2c3e50;
            font-size: 24px;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          th, td {
            padding: 12px 15px;
            text-align: right;
            border: 2px solid #bdc3c7;
            font-size: 14px;
            vertical-align: middle;
          }
          th {
            background-color: #ecf0f1;
            font-weight: bold;
            color: #2c3e50;
            border-bottom: 3px solid #7f8c8d;
          }
          td {
            background-color: #fff;
          }
          tr:nth-child(even) td {
            background-color: #f9f9f9;
          }
          tr:hover td {
            background-color: #f1f1f1;
          }
          .badge {
            padding: 4px 10px;
            border-radius: 6px;
            font-weight: bold;
            display: inline-block;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          }
          .badge-green { background-color: #4caf50; color: white; }
          .badge-yellow { background-color: #fbc02d; color: #333; }
          /* Print-specific styles */
          @media print {
            body { margin: 0; padding: 10mm; }
            h1 { color: #000; page-break-before: avoid; }
            table { page-break-inside: auto; }
            tr { page-break-inside: avoid; page-break-after: auto; }
            .badge-green, .badge-yellow {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        <h1>قائمة البيانات</h1>
        <table>
          <thead>
            <tr>
              ${head.map((h) => `<th>${h}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${body}
          </tbody>
        </table>
        ${more && `<table>
          <thead>
            <tr>
              ${more[0]}
            </tr>
          </thead>
          <tbody>
            ${more[1]}
          </tbody>
        </table>`}
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};

// 2. Dynamic Excel Export Function
export const exportTableToExcel = (data: any[], headerMapping: Record<string, string>, filename: string = "تصدير") => {
  const mappedData = data.map((item) => {
    const row: Record<string, any> = {};
    for (const key in headerMapping) {
      if (Object.prototype.hasOwnProperty.call(headerMapping, key)) {
        row[headerMapping[key]] = item[key];
      }
    }
    return row;
  });

  const worksheet = utils.json_to_sheet(mappedData);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, filename);
  writeFile(workbook, `${filename}.xlsx`);
};

// Helper functions (remain the same or can be adjusted based on your needs)
export const translateDocumentType = (type: string) => {
  return type === "receipt" ? "سند قبض" : "سند صرف";
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString("ar-EG", { day: "numeric", month: "short", year: "numeric" }) +
    ", " +
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  );
};