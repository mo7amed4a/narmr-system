import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="bg-white dark:bg-gray-900 w-full h-screen min-h-screen flex items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary dark:text-primary-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            الصفحة غير موجودة
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          عذرًا، لا يمكننا العثور على تلك الصفحة. ستجد الكثير لاستكشافه على
          الصفحة الرئيسية
          </p>
          <Link
            to="/"
            className="inline-flex text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            الرجوع للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </section>
  );
}
