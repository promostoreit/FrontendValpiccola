<script module>
export function convertBreadCrumbsToSchemaOrg(origin, data) {
  let output = [];
  data.forEach(function (value, i) {
    output.push(
      {
        "@type": "ListItem",
        "position": i + 1,
        "name": value,
        "item": origin + '/' + data.slice(0, i + 1).join("/")
      }
    )
  })
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": output
  }
}
</script>
