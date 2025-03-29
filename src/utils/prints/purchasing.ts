import { exportTableToExcel, formatDate, printTable } from "../exportUtils";

export const printPurchasing = (documents: any) => {
  const head = [
    "الوقت والتاريخ",
    "المنتج",
    "المورد",
    "الكمية المشتراة",
    "سعر الوحدة",
    "إجمالي المشتريات",
  ];

  const body = documents?.data?.map(
      (doc:any) => `
        <tr>
          <td style="color: #007bff; font-weight: bold;">${doc.datetime}</td>
          <td><span >${doc.product_name}</span></td>
          <td>$${doc.supplier_name}</td>
          <td>${doc.quantity}</td>
          <td>${doc.unit_price}</td>
          <td>${doc.total_purchase}</td>
        </tr>
      `
    )
    .join("");

  const head2 = `<th>العملة</th> <th>دينار عراقي	</th>`;

  const body2 =`
        <tr>
          <td><span>${documents?.summary?.currency}</span></td>
          <td><span>${documents?.summary?.total_purchases}</span></td>
        </tr>
       
      `

  printTable(head, body, [head2, body2]);
};

export const exportPurchasing = (documents: any[], filename: string = "كسف-حساب") => {
  const headerMapping = {
    datetime:"الوقت والتاريخ",
    product_name:"المنتج",
    supplier_name:"المورد",
    quantity:"الكمية المشتراة",
    unit_price:"سعر الوحدة",
    total_purchase:"إجمالي المشتريات",
  };

  const mappedDocuments = documents.map(doc => ({
    ...doc,
    operation_date: formatDate(doc.operation_date),
  }));

  exportTableToExcel(mappedDocuments, headerMapping, filename);
};