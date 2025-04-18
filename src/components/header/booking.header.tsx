import { Link, useLocation, matchPath } from "react-router-dom";
import { breadcrumbMapApp, titlesBooking } from "@/static/titles";
import User from "./user";

export default function BookingHeader({
  children,
  pagination = false,
}: {
  children: React.ReactNode;
  pagination?: boolean;
}) {
  const location = useLocation();
  const titles: Record<string, string> = {
    ...titlesBooking,
    "/booking": "لوحة التحكم",
  }

  const breadcrumbMap: Record<string, string> = {
    ...breadcrumbMapApp,
    booking: "لوحة التحكم"
  }

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
                  <Link to={crumb.path} className={`hover:underline ${index === breadcrumbs.length - 1 && "text-gray-900"}`}>
                    {crumb.label}
                  </Link>
                </span>
              ))}
            </nav>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
       <User link="/booking/profile" />
      </div>
    </header>
  );
}
