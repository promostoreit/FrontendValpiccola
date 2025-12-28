<script module>
	export function convertFaqToSchemaOrg(data) {
    let output = [];
    for (var key in data) {
      output.push(
        {
          "@type": "Question",
          "name": data[key]["question"],
          "acceptedAnswer": {
            "@type": "Answer",
            "text": data[key]["answer"]
          }
        }
      )
    };
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": output
    }
	}
</script>
