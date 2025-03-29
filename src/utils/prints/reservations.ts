import { exportTableToExcel, formatDate, printTable } from "../exportUtils";

export const printReservations = (documents: any) => {
  const head = [
    "الموعد",
    "الطبيب المعالج	",
    "اسم العميل",
    "فرع الحجز",
    "حالة الحجز",
    "أنشئ بواسطة",
    "تاريخ العملية",
  ];

  const body = documents?.data?.map(
      (doc:any) => `
        <tr>
          <td style="color: #007bff; font-weight: bold;">${doc.reservation_date}</td>
          <td><span >${doc.doctor_name}</span></td>
          <td style="color: ${
            doc.customer_name };">$${doc.customer_name}</td>
          <td>${doc.branch_name === "cash" ? "نقدي" : doc.branch_name}</td>
          <td>${doc.status}</td>
          <td>${doc.created_by}</td>
          <td>${formatDate(doc.operation_date)}</td>
        </tr>
      `
    )
    .join("");

  const head2 = `<th>العملة</th> <th>دينار عراقي	</th>`;

  const body2 =`
        <tr>
          <td>الرصيد الافتتاحي	</td>
          <td><span >${documents?.summary?.opening_balance}</span></td>
        </tr>
        <tr>
          <td>إجمالي الفواتير		</td>
          <td><span >${documents?.summary?.total_invoices}</span></td>
        </tr>
        <tr>
          <td>إجمالي الدفع		</td>
          <td><span >${documents?.summary?.total_payments}</span></td>
        </tr>
        <tr>
          <td>الرصيد	</td>
          <td><span >${documents?.summary?.final_balance}</span></td>
        </tr>
      `

  printTable(head, body, [head2, body2]);
};

export const exportReservations = (documents: any[], filename: string = "كسف-حساب") => {
  const headerMapping = {
    reservation_date: "الموعد",
    doctor_name: "الطبيب المعالج	",
    customer_name: "اسم العميل	",
    branch_name: "فرع الحجز",
    status: "حالة الحجز",
    created_by: "أنشئ بواسطة",
    document_date: "تاريخ العملية",
  };

  const mappedDocuments = documents.map(doc => ({
    ...doc,
    operation_date: formatDate(doc.operation_date),
  }));

  exportTableToExcel(mappedDocuments, headerMapping, filename);
};