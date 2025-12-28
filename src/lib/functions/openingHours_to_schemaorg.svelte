<script module>
	export function convertOpeningHoursToSchemaOrg(data) {
    return {
      "@context": "https://schema.org",
      "@type": data.type,
      "name": data.name,
      "description": data.description,
      "openingHours": data.openingHours,
      "isAccessibleForFree": data.isAccessibleForFree,
      "url": data.url
    }
	}
</script>
