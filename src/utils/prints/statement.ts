import { DocumentType } from "@/apps/accounting/accounts/bonds/bonds.page";
import { exportTableToExcel, formatDate, printTable, translateDocumentType } from "../exportUtils";

export const printStatement = (documents: any[]) => {
  const head = [
    "رقم السند",
    "نوع السند",
    "المبلغ",
    "طريقة الدفع",
    "أُلوصف",
    "ملاحظات",
    "تاريخ الإضافة",
  ];

  const body = documents
    .map(
      (doc) => `
        <tr>
          <td style="color: #007bff; font-weight: bold;">${doc.document_number}</td>
          <td><span class="badge ${
            doc.document_type === "receipt" ? "badge-green" : "badge-yellow"
          }">${translateDocumentType(doc.document_type)}</span></td>
          <td style="color: ${
            doc.amount < 10000 ? "#e74c3c" : doc.amount < 20000 ? "#f1c40f" : "#2ecc71"
          };">$${doc.amount}</td>
          <td>${doc.payment_method === "cash" ? "نقدي" : doc.payment_method}</td>
          <td>${doc.party}</td>
          <td>${doc.notes}</td>
          <td>${formatDate(doc.document_date)}</td>
        </tr>
      `
    )
    .join("");

  printTable(head, body);
};

export const exportStatement = (documents: DocumentType[], filename: string = "كسف-حساب") => {
  const headerMapping = {
    document_number: "التاريخ",
    document_type: "نوع السند",
    amount: "المبلغ",
    payment_method: "طريقة الدفع",
    party: "الوصف",
    notes: "ملاحظات",
    document_date: "تاريخ الإضافة",
  };

  const mappedDocuments = documents.map(doc => ({
    ...doc,
    document_type: translateDocumentType(doc.document_type),
    payment_method: doc.payment_method === "cash" ? "نقدي" : doc.payment_method,
    document_date: formatDate(doc.document_date),
  }));

  exportTableToExcel(mappedDocuments, headerMapping, filename);
};