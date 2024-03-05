import { googleResponseFindProduct, googleResponseParseProducts } from "./googleCustomSearchResponse"

describe("googleCustomSearch", () => {
  it("should find prducts", () => {
    const products = googleResponseParseProducts(responseClubMate)
    expect(products.length).toBe(4)
  })

  it("should pick the first name", () => {
    const products = googleResponseParseProducts(responseClubMate)
    const { name } = googleResponseFindProduct(products)!
    expect(name).toBe("Club Mate - 0.5l")
  })

  it("should pick the images from the first product that has an image", () => {
    const products = googleResponseParseProducts(responseClubMate)
    const { image } = googleResponseFindProduct(products)!
    expect(image).toBe("https://www.digit-eyes.com/thumbs/216/764/4029764001807.jpg")
  })
})

const responseClubMate = {
  kind: "customsearch#search",
  url: {
    type: "application/json",
    template:
      "https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json",
  },
  queries: {
    request: [
      {
        title: "Google Custom Search - 4029764001807",
        totalResults: "318",
        searchTerms: "4029764001807",
        count: 10,
        startIndex: 1,
        inputEncoding: "utf8",
        outputEncoding: "utf8",
        safe: "off",
        cx: "2246defd0e6e749f5",
      },
    ],
    nextPage: [
      {
        title: "Google Custom Search - 4029764001807",
        totalResults: "318",
        searchTerms: "4029764001807",
        count: 10,
        startIndex: 11,
        inputEncoding: "utf8",
        outputEncoding: "utf8",
        safe: "off",
        cx: "2246defd0e6e749f5",
      },
    ],
  },
  context: {
    title: "grocery-scanner",
  },
  searchInformation: {
    searchTime: 0.325532,
    formattedSearchTime: "0.33",
    totalResults: "318",
    formattedTotalResults: "318",
  },
  items: [
    {
      kind: "customsearch#result",
      title: "Club Mate - 0.5l",
      htmlTitle: "Club Mate - 0.5l",
      link: "https://world.openfoodfacts.org/product/4029764001807/club-mate",
      displayLink: "world.openfoodfacts.org",
      snippet:
        "Sep 6, 2012 ... ... 4029764001807 (EAN / EAN-13). Common name: Koffeinhaltiges Erfrischungsgetränk auf Mate-Tee-Basis. Quantity: 0.5l. Packaging: Metal, Glass ...",
      htmlSnippet:
        "Sep 6, 2012 <b>...</b> ... <b>4029764001807</b> (EAN / EAN-13). Common name: Koffeinhaltiges Erfrischungsgetränk auf Mate-Tee-Basis. Quantity: 0.5l. Packaging: Metal, Glass&nbsp;...",
      cacheId: "eGnNECxKkEMJ",
      formattedUrl: "https://world.openfoodfacts.org/product/4029764001807/club-mate",
      htmlFormattedUrl: "https://world.openfoodfacts.org/product/<b>4029764001807</b>/club-mate",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTb85RLKwlYZUUMNP3mU44MJIM0jXPl5BeclNI0T1JjyDV4mD2a2Gea2oY",
            width: "225",
            height: "225",
          },
        ],
        product: [
          {
            license: "https://creativecommons.org/licenses/by-sa/3.0/",
            contenturl: "https://images.openfoodfacts.org/images/products/402/976/400/1807/front_en.153.full.jpg",
            gtin13: "4029764001807",
            representativeofpage: "false",
            name: "Club Mate - 0.5l",
            caption: "Club-Mate Original - Product",
            description: "Koffeinhaltiges Erfrischungsgetränk auf Mate-Tee-Basis",
            brand: "Club Mate",
          },
        ],
        imageobject: [
          {
            thumbnail: "https://images.openfoodfacts.org/images/products/402/976/400/1807/front_en.153.400.jpg",
            imgid: "front",
          },
          {
            thumbnail: "https://images.openfoodfacts.org/images/products/402/976/400/1807/ingredients_en.188.400.jpg",
            imgid: "ingredients",
          },
          {
            thumbnail: "https://images.openfoodfacts.org/images/products/402/976/400/1807/nutrition_en.184.400.jpg",
            imgid: "nutrition",
          },
          {
            thumbnail: "https://images.openfoodfacts.org/images/products/402/976/400/1807/packaging_en.174.400.jpg",
            imgid: "packaging",
          },
        ],
        metatags: [
          {
            "msapplication-tilecolor": "#ffffff",
            "og:image": "https://static.openfoodfacts.org/images/logos/logo-vertical-white-social-media-preview.png",
            "msapplication-config": "/images/favicon/browserconfig.xml",
            "apple-itunes-app": "app-id=588797948",
            "og:type": "food",
            "theme-color": "#ffffff",
            "twitter:card": "product",
            "twitter:title": "Club Mate - 0.5l",
            "twitter:label1": "brand",
            "twitter:label2": "category",
            "twitter:creator": "@OpenFoodFacts",
            "twitter:data1": "Club Mate",
            "twitter:image": "https://images.openfoodfacts.org/images/products/402/976/400/1807/front_en.153.full.jpg",
            "twitter:data2": "Sweetened beverages",
            "fb:app_id": "219331381518041",
            "twitter:site": "@OpenFoodFacts",
            viewport: "width=device-width, initial-scale=1.0",
            "twitter:description":
              "Ingredients, allergens, additives, nutrition facts, labels, origin of ingredients and information on product Club Mate - 0.5l",
            "flattr:id": "dw637l",
            "og:url": "https://world.openfoodfacts.org/product/4029764001807/club-mate",
          },
        ],
        cse_image: [
          {
            src: "https://static.openfoodfacts.org/images/logos/logo-vertical-white-social-media-preview.png",
          },
        ],
        hproduct: [
          {
            fn: "Club Mate - 0.5l",
            description: "Koffeinhaltiges Erfrischungsgetränk auf Mate-Tee-Basis",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "4029764001807 EAN - Club Mate Der Prickelnde Mate Eistee 0,5 L ...",
      htmlTitle: "<b>4029764001807</b> EAN - Club Mate Der Prickelnde Mate Eistee 0,5 L ...",
      link: "https://www.buycott.com/upc/4029764001807",
      displayLink: "www.buycott.com",
      snippet:
        "UPC 4029764001807, buy Club Mate Der Prickelnde Mate Eistee 0,5 L 4029764001807 Learn about Club-Mate Upc lookup, find upc 4029764001807.",
      htmlSnippet:
        "UPC <b>4029764001807</b>, buy Club Mate Der Prickelnde Mate Eistee 0,5 L <b>4029764001807</b> Learn about Club-Mate Upc lookup, find upc <b>4029764001807</b>.",
      cacheId: "pCHuEl9_JcMJ",
      formattedUrl: "https://www.buycott.com/upc/4029764001807",
      htmlFormattedUrl: "https://www.buycott.com/upc/<b>4029764001807</b>",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqrMm-H-QOL-Jc8fJALkXXGwwNJ7LasLsbiBrOXzx49LN9Q6IsxK45J_g",
            width: "160",
            height: "240",
          },
        ],
        metatags: [
          {
            viewport: "width=device-width,minimum-scale=1,initial-scale=1",
            "format-detection": "telephone=no",
          },
        ],
        cse_image: [
          {
            src: "https://s3.amazonaws.com/buycott/images/attachments/000/581/931/w_thumb/ef8cc51d15d099da14f90a95183ae48d?1368557189",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Club Mate, Original, Zero, Energy Drink, 500 Ml. - Veli store",
      htmlTitle: "Club Mate, Original, Zero, Energy Drink, 500 Ml. - Veli store",
      link: "https://veli.store/en/details/club-mate-original-zero-energy-drink-500-ml/?sku=4029764001807",
      displayLink: "veli.store",
      snippet:
        "Club Mate, Original, Zero, Energy Drink, 500 Ml. ID: 4029764001807. Translated by Google. Club Mate, Original, Zero, energy drink, 500 ml. Vegan, gluten ...",
      htmlSnippet:
        "Club Mate, Original, Zero, Energy Drink, 500 Ml. ID: <b>4029764001807</b>. Translated by Google. Club Mate, Original, Zero, energy drink, 500 ml. Vegan, gluten&nbsp;...",
      cacheId: "MXjF5DQVFpIJ",
      formattedUrl: "https://veli.store/.../club-mate-original-zero-energy-drink-500-ml/?...40297...",
      htmlFormattedUrl: "https://veli.store/.../club-mate-original-zero-energy-drink-500-ml/?...<b>40297</b>...",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSL1TO6wWes32d6TtpA_bWfFDccN7GfY2Q3RCxzozEnxL_lTxHGvk8NhJs",
            width: "225",
            height: "225",
          },
        ],
        metatags: [
          {
            "next-head-count": "20",
            viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
            "product:price:currency": "GEL",
            name: "Veli Store",
            "product:retailer_item_id": "52535",
            "product:price:amount": "6.5",
            "product:availability": "out of stock",
            "product:condition": "new",
          },
        ],
        cse_image: [
          {
            src: "https://media.veli.store/media/product/Club_Mate_50cl.png",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "4029764001807 UPC Club Mate, Original",
      htmlTitle: "<b>4029764001807</b> UPC Club Mate, Original",
      link: "http://www.digit-eyes.com/upcCode/4029764001807.html?l=de",
      displayLink: "www.digit-eyes.com",
      snippet:
        "UPC 4029764001807: Club Mate, Original. Digit-Eyes UPC database API / barcode scanner app: information, images and product links for UPC 4 029764 001807.",
      htmlSnippet:
        "UPC <b>4029764001807</b>: Club Mate, Original. Digit-Eyes UPC database API / barcode scanner app: information, images and product links for UPC 4 029764 001807.",
      cacheId: "HR2zTA95N88J",
      formattedUrl: "http://www.digit-eyes.com/upcCode/4029764001807.html?l=de",
      htmlFormattedUrl: "http://www.digit-eyes.com/upcCode/<b>4029764001807</b>.html?l=de",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQev4EwgZ0Bcd9-8al4cEBgU3o9kPWIjsQ76cQumchbCyRIUhJSnaxgYik",
            width: "300",
            height: "158",
          },
        ],
        product: [
          {
            image: "https://www.digit-eyes.com/thumbs/216/764/4029764001807.jpg",
            name: "4029764001807 Club Mate, Original",
            description:
              "Club Mate, Original. Digit-Eyes UPC database and bar code scanner app: information, images and product links for Club Mate, Original (UPC 4 029764 001807)",
            upc: "4 029764 001807 / 4029764001807",
            unitofmeasure: "5 L",
          },
        ],
        metatags: [
          {
            template: "/stores/digiteyes/templates/upcInfoNoGoogleAds.html",
            "og:type": "addshoppers:product",
            rating: "general",
            language: "de",
          },
        ],
        cse_image: [
          {
            src: "https://www.digit-eyes.com/thumbs/216/764/4029764001807.jpg",
          },
        ],
        hproduct: [
          {
            fn: "Club Mate, Original",
            description:
              "Club Mate, Original. Digit-Eyes UPC database and bar code scanner app: information, images and product links for Club Mate, Original (UPC 4 029764 001807)",
            photo: "https://www.digit-eyes.com/thumbs/216/764/4029764001807.jpg",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Club-Mate 0,5 l Glas Mehrweg - Ihr zuverlässiger Lieferservice",
      htmlTitle: "Club-Mate 0,5 l Glas Mehrweg - Ihr zuverlässiger Lieferservice",
      link: "https://www.getraenke-hax.de/p/Club-Mate-0-5-l-Glas-Mehrweg/10526",
      displayLink: "www.getraenke-hax.de",
      snippet:
        "4029764001807. Pfand: 0,15 €, MEHRWEG. Hersteller / Anbieter: Brauerei Loscher GmbH & Co. KGSteigerwaldstr. 21-23 91481 Münchsteinach DE. Referenz: 180.",
      htmlSnippet:
        "<b>4029764001807</b>. Pfand: 0,15 €, MEHRWEG. Hersteller / Anbieter: Brauerei Loscher GmbH &amp; Co. KGSteigerwaldstr. 21-23 91481 Münchsteinach DE. Referenz: 180.",
      cacheId: "VcWWsTeUmjMJ",
      formattedUrl: "https://www.getraenke-hax.de/p/Club-Mate-0-5-l-Glas.../10526",
      htmlFormattedUrl: "https://www.getraenke-hax.de/p/Club-Mate-0-5-l-Glas.../10526",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRPCzsVOsQ8UF-phV83J9ffPSIX9TZ80uA_IxPNwICV6HwB06mUUJNE6b8",
            width: "310",
            height: "163",
          },
        ],
        metatags: [
          {
            "og:image":
              "https://mediafile.deloma.de/image/upload/c_lpad,f_auto,h_630,q_auto,w_1200/v1/images/product/6897b941-a666-408d-a55e-e1439d8404f3.png",
            "geo.region": "DE-NW",
            icbm: "51.41985110, 6.96044990",
            "og:image:url":
              "https://mediafile.deloma.de/image/upload/c_lpad,f_auto,h_630,q_auto,w_1200/v1/images/product/6897b941-a666-408d-a55e-e1439d8404f3.png",
            viewport: "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=1",
            "apple-mobile-web-app-capable": "yes",
            "og:locale": "de_DE",
            "geo.position": "51.41985110;6.96044990",
            "geo.placename": "Essen",
          },
        ],
        cse_image: [
          {
            src: "https://mediafile.deloma.de/image/upload/c_lpad,f_auto,h_630,q_auto,w_1200/v1/images/product/6897b941-a666-408d-a55e-e1439d8404f3.png",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "4029764001807 Open EAN Database - Datenbank und ...",
      htmlTitle: "<b>4029764001807</b> Open EAN Database - Datenbank und ...",
      link: "http://www.opengtindb.org/index.php?cmd=ean1&ean=4029764001807&sq=1",
      displayLink: "www.opengtindb.org",
      snippet:
        "EAN/GTIN Barcodenummern online abfragen: 4029764001807. API/Datenbankzugriff | FAQ - häufige Fragen. EAN/GTIN abfragen. EAN/GTIN Barcodenummer: Produkt suchen.",
      htmlSnippet:
        "EAN/GTIN Barcodenummern online abfragen: <b>4029764001807</b>. API/Datenbankzugriff | FAQ - häufige Fragen. EAN/GTIN abfragen. EAN/GTIN Barcodenummer: Produkt suchen.",
      cacheId: "ipiq6PhHfqcJ",
      formattedUrl: "http://www.opengtindb.org/index.php?cmd=ean1...4029764001807...1",
      htmlFormattedUrl: "http://www.opengtindb.org/index.php?cmd=ean1...<b>4029764001807</b>...1",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL6wBluhZ3vj0hHkdB7PAfwM9bmjP695jzlUKWXnO8Crp4WFKXvHqS8w",
            width: "246",
            height: "180",
          },
        ],
        metatags: [
          {
            author: "VWPDesign/ QXC",
          },
        ],
        cse_image: [
          {
            src: "http://www.opengtindb.org/barcode.php?f=png&s=ean-13&d=4029764001807&sf=2&ts=2",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Club-mate jäätee 500ml, club-mate - prisma | alati odavad hinnad ...",
      htmlTitle: "Club-mate jäätee 500ml, club-mate - prisma | alati odavad hinnad ...",
      link: "https://prismamarket.ee/entry/club-mate-jaatee-500ml/4029764001807",
      displayLink: "prismamarket.ee",
      snippet:
        "Club-mate jäätee 500ml, club-mate, 4029764001807, koostisosad: vesi, glükoosi-fruktoosi siirup, suhkur, karastusjoogi põhi (mate tee ekstrakt (vähemalt 0,40 ...",
      htmlSnippet:
        "Club-mate jäätee 500ml, club-mate, <b>4029764001807</b>, koostisosad: vesi, glükoosi-fruktoosi siirup, suhkur, karastusjoogi põhi (mate tee ekstrakt (vähemalt 0,40&nbsp;...",
      cacheId: "RnmwbsvvRRkJ",
      formattedUrl: "https://prismamarket.ee/entry/club-mate-jaatee-500ml/4029764001807",
      htmlFormattedUrl: "https://prismamarket.ee/entry/club-mate-jaatee-500ml/<b>4029764001807</b>",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQIDXsxc0VlDMfbrUoW9He5DJtLRMgjno07pHWXNeQTSMnkVKJzcxY0kIU",
            width: "225",
            height: "225",
          },
        ],
        product: [
          {
            image:
              "https://s3-eu-west-1.amazonaws.com/balticsimages/images/180x220/4a6aad2a1ab77be032363cd11f91378a.png",
            name: "Club-Mate jäätee 500ml",
            sku: "4029764001807",
            category: "Joogid / Karastusjoogid / Jäätee",
            brand: "CLUB-MATE",
          },
        ],
        aggregaterating: [
          {
            reviewcount: "5",
            ratingvalue: "5",
          },
        ],
        metatags: [
          {
            "og:image": "https://prismamarket.ee/images/custom/fb-shared-logo.png",
            "og:type": "website",
            "og:site_name": "Club-mate jäätee 500ml, club-mate - prisma | alati odavad hinnad, telli kaup otse koju",
            author: "Prisma | Alati odavad hinnad, telli kaup otse koju",
            "og:title": "Club-mate jäätee 500ml, club-mate - prisma | alati odavad hinnad, telli kaup otse koju",
            "apple-mobile-web-app-title": "Prisma | Alati odavad hinnad, telli kaup otse koju",
            "csrf-param": "authenticity_token",
            "og:description":
              "Club-mate jäätee 500ml, club-mate, 4029764001807, koostisosad: vesi, glükoosi-fruktoosi siirup, suhkur, karastusjoogi põhi (mate tee ekstrakt (vähemalt 0,40 g 100 ml karastusjoogi kohta)), happesuse regulaator, sidrunhape, kofeiin, looduslikud lõhnaained, toiduvärv e 150d, süsihape., päritolumaa: saksamaa - prisma | alati odavad hinnad, telli kaup otse koju",
            "fb:app_id": "197277740455346",
            "apple-mobile-web-app-status-bar-style": "black",
            viewport: "user-scalable=no, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0",
            "apple-mobile-web-app-capable": "yes",
            "csrf-token": "ERGllJuJMTe4uXY2VpIU47Z/zBzOQUbUtnWTUvPE/PxE4b2cvqyLhM2VFkD1QwMgU1lkmGeZAd0IZxlhx3ileQ==",
            page: "1",
            "og:url": "https://prismamarket.ee/entry/club-mate-jaatee-500ml/4029764001807",
          },
        ],
        cse_image: [
          {
            src: "https://prismamarket.ee/images/custom/fb-shared-logo.png",
          },
        ],
        hproduct: [
          {
            fn: "Club-Mate jäätee 500ml",
            photo:
              "https://s3-eu-west-1.amazonaws.com/balticsimages/images/180x220/4a6aad2a1ab77be032363cd11f91378a.png",
            currency: "EUR",
            currency_iso4217: "978",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Podrobné informace o potravině CLUB-MATE nápoj",
      htmlTitle: "Podrobné informace o potravině CLUB-MATE nápoj",
      link: "https://www.ferpotravina.cz/napoje/club-mate-napoj-loscher-gmbh",
      displayLink: "www.ferpotravina.cz",
      snippet:
        "EAN: 4029764001807. Data ze dne: 7. 11. 2020 ; Data ze dne: 7. 11. 2020 ; Energie, 20 kcal, 100 kcal ; Bílkoviny, 0 g, 0 g, 0 % ; Sacharidy, 5 g, 25 g, 6 %.",
      htmlSnippet:
        "EAN: <b>4029764001807</b>. Data ze dne: 7. 11. 2020 ; Data ze dne: 7. 11. 2020 ; Energie, 20 kcal, 100 kcal ; Bílkoviny, 0 g, 0 g, 0 % ; Sacharidy, 5 g, 25 g, 6 %.",
      cacheId: "myZzv6UWFM8J",
      formattedUrl: "https://www.ferpotravina.cz/napoje/club-mate-napoj-loscher-gmbh",
      htmlFormattedUrl: "https://www.ferpotravina.cz/napoje/club-mate-napoj-loscher-gmbh",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS22rVnn7PGc-0g7fqCjH0U26zyXNj1ZHCL5VwdCdm7mgHItU4wsHcy4y0",
            width: "194",
            height: "260",
          },
        ],
        metatags: [
          {
            "application-name": "FÉR potravina",
            "msapplication-tilecolor": "#ce1126",
            "theme-color": "#ffffff",
            viewport: "width=device-width",
            "apple-mobile-web-app-title": "FÉR potravina",
            "msapplication-tileimage": "/images/favicons/mstile-144x144.png",
          },
        ],
        cse_image: [
          {
            src: "https://www.ferpotravina.cz/foto/554/274554.jpg",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "4029764001807 Club-Mate (500ml)",
      htmlTitle: "<b>4029764001807</b> Club-Mate (500ml)",
      link: "https://kaypu.com/gi/EN/537cbe2fcebbeea17a0657ec/4029764001807/Club%20Mate%20%28500ml%29",
      displayLink: "kaypu.com",
      snippet:
        "Price 1.53 - 4.06 USD ... Club-Mate is a carbonated energy drink invented 90 years ago by the Loscher Brewery company in Germany. The taste is best described as ...",
      htmlSnippet:
        "Price 1.53 - 4.06 USD ... Club-Mate is a carbonated energy drink invented 90 years ago by the Loscher Brewery company in Germany. The taste is best described as&nbsp;...",
      cacheId: "SDVtZlp9vkQJ",
      formattedUrl: "https://kaypu.com/gi/.../4029764001807/Club%20Mate%20%28500ml%29",
      htmlFormattedUrl: "https://kaypu.com/gi/.../<b>4029764001807</b>/Club%20Mate%20%28500ml%29",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQuOCnS2aLTCmSvHDrpwP1wpy08Mm7a0j57JVktO05nd60RWMVPTFcZ-Q",
            width: "40",
            height: "160",
          },
        ],
        product: [
          {
            image: "https://kaypu.com/photo/537cbf7bfb88301d38000001.jpg",
            gtin13: "4029764001807",
            name: "Club-Mate (500ml)",
            description:
              'Club-Mate is a carbonated energy drink invented 90 years ago by the Loscher Brewery company in Germany. The taste is best described as simply "unique" and falls somewhere between tonic water...',
            brand: "Club-Mate",
            manufacturer: "Brauerei Loscher GmbH & Co. KG",
          },
        ],
        aggregateoffer: [
          {
            pricecurrency: "USD",
            highprice: "4.06",
            lowprice: "1.53",
            offercount: "2",
          },
        ],
        metatags: [
          {
            "og:image": "https://kaypu.com/icon/537cbf7bfb88301d38000001.jpg",
            "apple-itunes-app": "app-id=465639700,app-argument=https://kaypu.com/gi/EN/537cbe2fcebbeea17a0657ec",
            "og:type": "website",
            viewport: "width=device-width, initial-scale=1.0",
            "og:title": "4029764001807 Club-Mate (500ml)",
            "og:url": "https://kaypu.com/gi/EN/537cbe2fcebbeea17a0657ec/4029764001807/Club%20Mate%20%28500ml%29",
            "google-play-app": "app-id=com.kaypu.goods",
            "og:description": "Kaypu Goods by barcode UPC or EAN or ISBN 4029764001807",
          },
        ],
        cse_image: [
          {
            src: "https://kaypu.com/icon/537cbf7bfb88301d38000001.jpg",
          },
        ],
        hproduct: [
          {
            fn: "Club-Mate (500ml)",
            description:
              'Club-Mate is a carbonated energy drink invented 90 years ago by the Loscher Brewery company in Germany. The taste is best described as simply "unique" and falls somewhere between tonic water...',
            photo: "https://kaypu.com/photo/537cbf7ebbbfb21f38000003.jpg",
            currency: "USD",
            currency_iso4217: "840",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Club Mate, boisson au maté 50cl - MyGermanMarket.com",
      htmlTitle: "Club Mate, boisson au maté 50cl - MyGermanMarket.com",
      link: "https://www.mygermanmarket.com/fr/club-mate-50cl.html",
      displayLink: "www.mygermanmarket.com",
      snippet:
        "Club Mate 50cl. EAN : 4029764001807 MARQUE : Club-Mate. Boisson gazeuse énergisante naturelle à l'extrait de Maté. Bouteille en verre de 0,50 L. Prix par Kg: 5 ...",
      htmlSnippet:
        "Club Mate 50cl. EAN : <b>4029764001807</b> MARQUE : Club-Mate. Boisson gazeuse énergisante naturelle à l&#39;extrait de Maté. Bouteille en verre de 0,50 L. Prix par Kg: 5&nbsp;...",
      cacheId: "e_4h_oeEpIQJ",
      formattedUrl: "https://www.mygermanmarket.com/fr/club-mate-50cl.html",
      htmlFormattedUrl: "https://www.mygermanmarket.com/fr/club-mate-50cl.html",
      pagemap: {
        cse_thumbnail: [
          {
            src: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS-SOgYyjWHLT2NGL7oRrBZHzEV6ADCS0dpkfqSc1ZYijuZCG-8z62LZ-pc",
            width: "255",
            height: "198",
          },
        ],
        cse_image: [
          {
            src: "https://www.mygermanmarket.com/media/catalog/product/cache/1/image/370x288/9df78eab33525d08d6e5fb8d27136e95/c/l/club_mate_bouteille_50cl.jpg",
          },
        ],
        hproduct: [
          {
            fn: "Club Mate 50cl",
            photo:
              "https://www.mygermanmarket.com/media/catalog/product/cache/1/image/370x288/9df78eab33525d08d6e5fb8d27136e95/c/l/club_mate_bouteille_50cl.jpg",
          },
        ],
      },
    },
  ],
}
