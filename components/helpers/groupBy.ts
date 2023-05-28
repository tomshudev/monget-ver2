export const groupBy = (
  propertyName: string,
  list: any[]
): { [type: string]: any[] } => {
  const groups = {}

  list.forEach((item) => {
    if (!groups[item[propertyName]]) {
      groups[item[propertyName]] = [item]
    } else {
      groups[item[propertyName]].push(item)
    }
  })

  return groups
}
