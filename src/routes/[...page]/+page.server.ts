import { error } from '@sveltejs/kit';
import { sanity } from '$lib/sanity';

export async function load(url: URL) {
  var slug = decodeURIComponent(url.url.pathname);
  const query = `
    {
      "base": *[slug.current == '${slug}'][0]{
        "id": _id,
        "slug": slug.current,
        isActive,
        hasProduct,
        hasDigitalGuide
      },
      "imageProfile": *[slug.current == '${slug}'][0]{
        "asset": imageProfile.asset,
        "alt": imageProfile.alt,
        "title": imageProfile.title,
      },
      "metadata": *[slug.current == '${slug}'][0]{
        "metaTitle": metadata.metaTitle,
        "metaKeyword": metadata.metaKeyword,
        "metaDescription": metadata.metaDescription,
        "metaAuthor": metadata.metaAuthor,
        "metaViewport": metadata.metaViewport,
        "metaImageUrl": metadata.metaImage.asset->path,
        "metaLanguage": string::split('${slug}', '/')[1]
      },
      "navbar": *[_type == 'navbar' && title == string::split('${slug}', '/')[1]][0]{
        "firstLevelCategory": firstLevelCategory[] {
          title,
          "page": page->{"slug": slug.current},
          "secondLevelCategory": secondLevelCategory[] {
            "title": title,
            "page": page->{"slug": slug.current},
            "thirdLevelCategory": thirdLevelCategory[] {
              "title": title,
              "page": page->{"slug": slug.current},
            }    
          }
        }
      },
      "footer": *[_type == 'footer' && title == string::split('${slug}', '/')[1]][0]{
        email,
        legal {
          categoryTitle,
          "listPages": listPages{
            pages[]->{
              slug,
              "keyword": metadata.metaKeyword
            }
          }
        },
        pagesLink {
          categoryTitle,
          "listPages": listPages{
            pages[]->{
              slug,
              "keyword": metadata.metaKeyword
            }
          }
        },
        reference,
        rights,
        companyId
      },
      "content": *[slug.current == '${slug}'][0]{
        "translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
          title,
          slug,
          language
        },
        _type == "page" => {
          _type,
          title,
          intro,
          text[]{
            ...,
            _type == "hub" => {
              "pages": pages[]->{
                isActive == true => {
                  "slug": slug.current,
                  "imageProfile": imageProfile.asset,
                  "imageAlt": imageProfile.alt,
                  "imageTitle": imageProfile.title,
                  "keyword": metadata.metaKeyword,
                  "title": metadata.metaTitle,
                  "intro": metadata.metaDescription
                }
              }
            },
            _type == "bannerBuyPDF" => {
              eventId,
              "price": @.reference->price,
              "slug": @.reference->slug,
              "title": @.reference->title,
              "description": @.reference->description,
              "img": @.reference->imageProfile.asset,
              "imgTitle": @.reference->imageProfile.title,
              "imgAlt": @.reference->imageProfile.alt,
              "carousel": @.reference->heroCarousel,
              "highlights": @.reference->highlights,
              "tags": @.reference->tags
            },
            _type == "bannerBuyDigitalGuide" => {
              eventId,
              "price": @.reference->price,
              "slug": @.reference->slug,
              "title": @.reference->title,
              "description": @.reference->description,
              "img": @.reference->imageProfile.asset,
              "imgTitle": @.reference->imageProfile.title,
              "imgAlt": @.reference->imageProfile.alt,
              "carousel": @.reference->heroCarousel,
              "highlights": @.reference->highlights,
              "categoryStats": @.reference->categoryScores,
              "guideCards": @.reference->cards,
              "tags": @.reference->tags
            },
            _type == "simpleBannerBuyDigitalGuide" => {
              eventId,
              "price": @.reference->price,
              "slug": @.reference->slug,
              "parent": @.reference->parent->slug.current,
              "imageProfile": @.reference->parent->imageProfile,
              "title": @.reference->title,
              "description": @.reference->description,
              "carousel": @.reference->heroCarousel,
              "highlights": @.reference->highlights,
              "categoryStats": @.reference->categoryScores,
              "guideCards": @.reference->cards,
              "tags": @.reference->tags
            },
            _type == "hubQueryBased" => {
              groqFilter
            }
          }
        },
        _type == "event" => {
          _type,
          slug,
          title,
          latitude,
          longitude,
          startDate,
          endDate,
          intro,
          location,
          organizer,
          program,
          website,
          price,
          text[]{
            ...,
            pages[]{
              ...
            }
          },
          website
        }
      }
    }`

  let data = await sanity.fetch(query);

  let hubQueryBasedData = "";
  const hubQueryItem = data?.content?.text?.find(item => item._type === 'hubQueryBased');
  if (hubQueryItem?.groqFilter) {
    const queryFilter = hubQueryItem.groqFilter;
    hubQueryBasedData = await sanity.fetch(queryFilter);
  }

  data = {
    ...data,
    content: {
      ...data.content,
      text: data?.content?.text?.map(item =>
        item._type === 'hubQueryBased'
          ? { ...item, hubQueryBasedData }
          : item
      ),
    },
  };

  if (data?.navbar?.firstLevelCategory.length == 0) {
    error(404);
  } else if (data?.navbar?.firstLevelCategory[0]?.page?.slug == undefined) {
    error(404);
  }

  if (!data?.base?.isActive) {
    error(404);
  }

  return data;
}
