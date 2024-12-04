import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";

function capitalizeFirst(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const AppBreadcrumb = () => {
  let location = useLocation();
  const paths = location.pathname.slice(1).split("/");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => {
          if (index === paths.length - 1 && index > 0) {
            return (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{capitalizeFirst(path)}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            );
          }

          if (index > 0) {
            return (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>{capitalizeFirst(path)}</BreadcrumbLink>
                </BreadcrumbItem>
              </>
            );
          }

          return (
            <BreadcrumbItem>
              <BreadcrumbLink>{capitalizeFirst(path)}</BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
