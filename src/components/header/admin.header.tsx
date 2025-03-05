import { Link, useLocation, matchPath } from "react-router-dom";
import { addPrefixToKeys } from "@/utils/utils";
import {
  breadcrumbMapApp,
  titlesAccounting,
  titlesBooking,
} from "@/static/titles";
import User from "./user";

export default function AdminHeader({
  children,
  pagination = false,
}: {
  children: React.ReactNode;
  pagination?: boolean;
}) {
  const location = useLocation();

  // const titles: Record<string, string> = {
  // };

  const titles: Record<string, string> = {
    ...addPrefixToKeys(titlesBooking, "/admin"),
    ...addPrefixToKeys(titlesAccounting, "/admin"),
    "/admin": "لوحة التحكم المسؤل الرئيسي",
    "/admin/branches": "الفروع",
    "/admin/services": "الخدمات",
    "/admin/officials": "المسؤولين",
  };

  const breadcrumbMap: Record<string, string> = {
    ...breadcrumbMapApp,
    booking: "ادوات الحجوزات",
    accounting: "ادوات الحسابات",
    admin: "لوحة التحكم",
    branches: "الفروع",
    services: "الخدمات",
    officials: "المسؤولين",
  };

  const matchedTitle =
    Object.keys(titles).find((path) => matchPath(path, location.pathname)) ||
    "لوحة الحجز";
  const pageTitle = titles[matchedTitle];

  const breadcrumbs = location.pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, arr) => {
      const label = breadcrumbMap[segment] || segment;
      const fullPath = `/${arr.slice(0, index + 1).join("/")}`;
      return { label, path: fullPath };
    });

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 bg-white px-2 md:px-4 w-full justify-between">
      <div className="flex items-center gap-4">
        {children}
        <div className="text-xs md:text-lg font-bold">
          <div>{pageTitle}</div>
          {pagination && location.pathname !== "/booking" && (
            <nav className="text-[10px] md:text-xs text-gray-400 flex gap-1 flex-wrap">
              {breadcrumbs.map((crumb, index) => (
                <span key={crumb.path} className="flex items-center">
                  {index > 0 && <span className="mx-1">/</span>}
                  <Link
                    to={crumb.path}
                    className={`hover:underline ${
                      index === breadcrumbs.length - 1 && "text-gray-900"
                    }`}
                  >
                    {decodeURIComponent(crumb.label)}
                  </Link>
                </span>
              ))}
            </nav>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
       <User link="/admin/profile"/>
      </div>
    </header>
  );
}
