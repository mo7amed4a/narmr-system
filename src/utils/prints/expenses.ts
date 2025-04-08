import { exportTableToExcel, formatDate, printTable } from "../exportUtils";

export const printExpenses = (documents: any) => {
  const head = ["الوقت والتاريخ", "الوصف", "المبلغ", "انشئ بواسطة", "ملاحظات"];

  const body = documents?.data
    ?.map((doc: any) => {
      const values = Object.values(doc);
      return `
        <tr>
          <td style="color: #007bff; font-weight: bold;">${values[0]}</td>
          <td><span>${values[1]}</span></td>
          <td>${values[2]}</td>
          <td>${values[3]}</td>
          <td>${values[4]}</td>
        </tr>
      `;
    })
    .join("");

  const head2 = `<th>العملة</th> <th>دولار</th>`;

  const body2 = `
        <tr>
          <td><span>${Object.values(documents?.summary)[0]}</span></td>
          <td><span>${Object.values(documents?.summary)[1]}</span></td>
        </tr>
      `;

  printTable(head, body, [head2, body2]);
};

export const exportExpenses = (
  documents: any[],
  filename: string = "كشف-حساب"
) => {
  const headerMapping = {
    datetime: "الوقت والتاريخ",
    description: "الوصف",
    amount: "المبلغ",
    created_by: "انشئ بواسطة",
    notes: "ملاحظات",
  };

  const mappedDocuments = documents.map((doc) => {
    const values = Object.values(doc); // استخراج القيم بالفهرس
    return {
      datetime: formatDate(values[0] as string), // تحويل التاريخ
      description: values[1],
      amount: values[2],
      created_by: values[3],
      notes: values[4],
    };
  });

  exportTableToExcel(mappedDocuments, headerMapping, filename);
};
