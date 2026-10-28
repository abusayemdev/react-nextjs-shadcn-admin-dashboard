
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type BreadcrumbItemType = {
  label: string
  href?: string
}

type AppBreadcrumbProps = {
  items: BreadcrumbItemType[]
}

const AppBreadcrumb = ({ items }: AppBreadcrumbProps) => {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <BreadcrumbItem key={item.href ?? item.label}>
              {isLast || !item.href ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink render={<a href={item.href} />}>
                  {item.label}
                </BreadcrumbLink>
              )}

              {!isLast && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default AppBreadcrumb
