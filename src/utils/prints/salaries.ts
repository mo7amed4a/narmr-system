import { exportTableToExcel, formatDate, printTable } from "../exportUtils";

export const printSalaries = (documents: any) => {
  const head = [
    "الوقت والتاريخ",
    "اسم الموظف",
    "الراتب الاساسي",
    "البدلات",
    "الخصومات",
    "صافي الراتب"
  ];

  const body = documents?.data?.map(
      (doc: any) => {
        const values = Object.values(doc); 
        return `
        <tr>
          <td style="color: #007bff; font-weight: bold;">${values[0]}</td>
          <td><span>${values[1]}</span></td>
          <td>${values[2]}</td>
          <td>${values[3]}</td>
          <td>${values[4]}</td>
          <td>${values[5]}</td>
        </tr>
      `;
      }
    ).join("");

  const head2 = `<th>العملة</th> <th>دينار عراقي</th>`;

  const body2 = `
        <tr>
          <td><span>${Object.values(documents?.summary)[0]}</span></td>
          <td><span>${Object.values(documents?.summary)[1]}</span></td>
        </tr>
      `;

  printTable(head, body, [head2, body2]);
};



export const exportSalaries = (documents: any[], filename: string = "كشف-حساب") => {
  const headerMapping = {
    datetime: "الوقت والتاريخ",
    employee_name: "اسم الموظف",
    basic_salary: "الراتب الاساسي",
    allowances: "البدلات",
    deductions: "الخصومات",
    net_salary: "صافي الراتب"
  };

  const mappedDocuments = documents.map((doc) => {
    const values = Object.values(doc); // استخراج القيم بالفهرس
    return {
      datetime: formatDate(values[0] as string), // تحويل التاريخ
      employee_name: values[1],
      basic_salary: values[2],
      allowances: values[3],
      deductions: values[4],
      net_salary: values[5],
    };
  });

  exportTableToExcel(mappedDocuments, headerMapping, filename);
};
