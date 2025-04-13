// 2. Dynamic Excel Export Function
import * as XLSX from "xlsx"; // Assuming you're using SheetJS (xlsx library)


// 1. Dynamic Print Function
export const printTable = (data: any[]) => {
  const printWindow = window.open("", "_blank");
  console.log(data);
  
  const isMore = data[2] != null ? true : false
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
            color: #1F1726; /* اللون الداكن للنصوص */
          }
          h1 {
            text-align: center;
            color: #1F1726; /* اللون الداكن للعنوان */
            font-size: 24px;
            margin-bottom: 20px;
            border-bottom: 2px solid #68191A; /* خط سفلي باللون الأحمر الداكن */
            padding-bottom: 8px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            box-shadow: 0 2px 5px rgba(31, 23, 38, 0.1); /* ظل باستخدام اللون الداكن */
          }
          th, td {
            padding: 12px 15px;
            text-align: right;
            border: 2px solid #68191A; /* حدود الجدول باللون الأحمر الداكن */
            font-size: 14px;
            vertical-align: middle;
          }
          th {
            background-color: #68191A; /* خلفية العناوين باللون الداكن */
            font-weight: bold;
            color: #fff; /* نص أبيض للتباين */
            border-bottom: 3px solid #68191A; /* خط سفلي أحمر داكن */
          }
          td {
            background-color: #fff;
          }
          tr:nth-child(even) td {
            background-color: #f9eaea; /* خلفية خفيفة مستوحاة من الأحمر الداكن */
          }
          tr:hover td {
            background-color: #f5dada; /* تأثير hover بلون أحمر باهت */
          }
          .badge {
            padding: 4px 10px;
            border-radius: 6px;
            font-weight: bold;
            display: inline-block;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          }
          .badge-green {
            background-color: #4caf50; /* الاحتفاظ باللون الأخضر للتباين */
            color: white;
          }
          .badge-yellow {
            background-color: #fbc02d; /* الاحتفاظ باللون الأصفر للتباين */
            color: #333;
          }
          /* Print-specific styles */
          @media print {
            body { margin: 0; padding: 10mm; }
            h1 { color: #1F1726; page-break-before: avoid; }
            table { page-break-inside: auto; }
            tr { page-break-inside: avoid; page-break-after: auto; }
            th { background-color: #1F1726 !important; color: #fff !important; }
            td { border: 2px solid #68191A !important; }
            tr:nth-child(even) td { background-color: #f9eaea !important; }
            .badge-green, .badge-yellow {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        <!---<h1>قائمة البيانات</h1>--->
        ${isMore ? `
        <table>
          <thead>
            <tr>
              ${data[2].map((h: any) => `<th>${h}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${data[3] || ""}
          </tbody>
        </table>
        <br />
        ` : ""}
        <table>
          <thead>
            <tr>
              ${data[0].map((h: any) => `<th>${h}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${data[1] || ""}
          </tbody>
        </table>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};

export const printPDF = ([data1, data2]: any, keys?: any[], keys2?: any[]) => {
  console.log(data1);
  
  // Get the keys from the first mapped document for the table header
  const head = keys ? keys : Object.keys(data1[0]);

  // Generate the table body
  const body = data1
    .map((doc: any) => {
      const values = Object.values(doc);
      const cells = values
        .map((value) => {
          return `<td>${value}</td>`;
        })
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");

    if (data2) {
      const head2 = keys2 ? keys2 : Object.keys(data2);
      const body2 = Object.values(data2).map((value) => {
          return `<td>${value}</td>`;
        })
        .join("");

      printTable([head, body,head2, `<tr>${body2}</tr>`]);
    }

    printTable([head, body]);
};

export const exportExcel = (
  data: any[],
  filename: string = "تصدير",
  keys?: any[]
) => {
  // Check if data is valid
  if (!Array.isArray(data) || data.length === 0) {
    console.error("No valid data provided");
    return;
  }

  // Get headers dynamically from the first object if no headerMapping is provided
  const headers = keys || Object.keys(data[0]); // Fallback to raw keys from the first object

  // Map the data to use translated headers and format values if needed
  const mappedData = data.map((item) => {
    const row: Record<string, any> = {};

    // If headerMapping is provided, use it; otherwise, use raw keys
    const keys =  Object.keys(item);

    for (const key of keys) {
      const header = key; // Translated or raw header
      let value = item[key];

      // Optional: Apply formatting (e.g., for dates)
      if (value !== undefined && (key.toLowerCase().includes("date") || key.toLowerCase().includes("time"))) {
        value = formatDate(value);
      }

      row[header] = value !== undefined ? value : ""; // Handle missing values
    }

    return row;
  });

  // Create worksheet and workbook
  const worksheet = XLSX.utils.json_to_sheet(mappedData, { header: headers });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1"); // Use a default sheet name or customize

  // Export to Excel
  XLSX.writeFile(workbook, `${filename}.xlsx`);
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