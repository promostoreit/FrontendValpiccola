<script module>

export function convertDigitalProductToSchemaOrg(
  slug, 
  title,
  description,
  imageProfile, 
  price
) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": title,
    "description": description,
    "image": imageProfile,
    "url": slug,
    "brand": {
      "@type": "Organization",
      "name": "Valpiccola"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Valpiccola"
    },
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "EUR",
      "availability": "http://schema.org/InStock",
      "url": slug,
      "seller": {
        "@type": "Organization",
        "name": "Valpiccola"
      }
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Travelers"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "fileFormat",
        "value": "application/pdf"
      },
      {
        "@type": "PropertyValue",
        "name": "language",
        "value": "English"
      },
      {
        "@type": "PropertyValue",
        "name": "digital",
        "value": "true"
      },
      {
        "@type": "PropertyValue",
        "name": "deliveryMethod",
        "value": "ElectronicDelivery"
      }
    ]
  };
}
</script>
