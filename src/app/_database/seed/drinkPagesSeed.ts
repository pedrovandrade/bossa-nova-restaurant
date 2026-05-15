import { DrinkMenuPageData } from '@/types/DrinkMenuPageData';

const lastUpdatedDate = new Date('2026-04-27T15:05:00.000Z');

const drinkPages: DrinkMenuPageData[] = [
  {
    title: {
      fr: "Boissons sans alcool",
      en: "Non-alcoholic beverages",
      pt: "Bebidas sem álcool"
    },
    items: [
      {
        category: {
          fr: "Mocktails",
          en: "Mocktails",
          pt: "Mocktails"
        },
        drinks: [
          {
            name: {
              text: {
                fr: "Copacabana",
                en: "Copacabana",
                pt: "Copacabana"
              },
              bold: true
            },
            description: {
              text: {
                fr: "Citron vert, fraise, eua gazeuse, sucre de canne et glaçons",
                en: "Lime, strawberry, sparkling water, cane sugar and ice",
                pt: "Limão verde, morango, água com gás, açúcar de cana e gelo"
              }
            },
            price: 8
          },
          {
            name: {
              text: {
                fr: "Ipanema",
                en: "Ipanema",
                pt: "Ipanema"
              },
              bold: true
            },
            description: {
              text: {
                fr: "Citron vert, fruit de la passion, eua gazeuse, sucre de canne et glaçons",
                en: "Lime, passion fruit, sparkling water, cane sugar and ice",
                pt: "Limão verde, maracujá, água com gás, açúcar de cana e gelo"
              }
            },
            price: 9
          }
        ]
      },
      {
        category: {
          fr: "Bière",
          en: "Beer",
          pt: "Cerveja"
        },
        drinks: [
          {
            name: {
              text: {
                fr: "Super Bock sans alcool",
                en: "Super Bock without alcohol",
                pt: "Super Bock sem álcool"
              },
              bold: true
            },
            price: 5
          }
        ]
      },
      {
        category: {
          fr: "Softs",
          en: "Softs",
          pt: "Softs"
        },
        drinks: [
          {
            name: {
              text: {
                fr: "Guaraná 33 cl",
                en: "Guaraná 33 cl",
                pt: "Guaraná 33 cl"
              }
            },
            description: {
              text: {
                fr: "Soda brésilien fabriqué à partir du fruit guarana, typique de l'Amazonie.",
                en: "Brazilian soda made from the guarana fruit, typical of the Amazon.",
                pt: "Refrigerante brasileiro feito a partir do fruto guaraná, típico da Amazônia."
              },
              small: true
            },
            price: 4.5
          },
          {
            name: {
              text: {
                fr: "Guaraná zero 33 cl",
                en: "Guaraná zero 33 cl",
                pt: "Guaraná zero 33 cl"
            }
            },
            price: 4.5
          },
          {
            name: {
              text: {
                fr: "Coca-cola 33 cl",
                en: "Coca-cola 33 cl",
                pt: "Coca-cola 33 cl"
              }
            },
            price: 4
          },
          {
            name: {
              text: {
                fr: "Coca-cola zero 33 cl",
                en: "Coca-cola zero 33 cl",
                pt: "Coca-cola zero 33 cl"
              }
            },
            price: 4
          },
          {
            name: {
              text: {
                fr: "Fusetea 25 cl",
                en: "Fusetea 25 cl",
                pt: "Fusetea 25 cl"
              }
            },
            price: 4
          },
          {
            name: {
              text: {
                fr: "Schweppes Agrumes 25 cl",
                en: "Schweppes Agrumes 25 cl",
                pt: "Schweppes Agrumes 25 cl"
              }
            },
            price: 4
          },
          {
            name: {
              text: {
                fr: "Sirop à la fraise/grenadine/kiwi/citron/framboise",
                en: "Strawberry/grenadine/kiwi/lime/raspberry syrup",
                pt: "Xarope de morango/granadina/kiwi/limão/framboesa"
              }
            },
            price: 2.5
          }
        ]
      },
      {
        category: {
            fr: "Jus de fruits",
            en: "Juices",
            pt: "Sucos"
        },
        note: {
            text: {
                fr: "(non préssé sur place, mais toujours bien frais)",
                en: "(not pressed on site, but always fresh)",
                pt: "(não espremido no local, mas sempre bem fresco)"
            },
            inline: true,
            bold: true
        },
        drinks: [
            {
                name: {
                    text: {
                        fr: "Jus d'orange 25 cl",
                        en: "Orange juice 25 cl",
                        pt: "Suco de laranja 25 cl"
                    }
                },
                price: 3.5
            },
            {
                name: {
                    text: {
                        fr: "Jus d'ananas 25 cl",
                        en: "Pineapple juice 25 cl",
                        pt: "Suco de abacaxi 25 cl"
                    }
                },
                price: 3.5
            }
        ]
      },
      {
        category: {
          fr: "Eaux",
          en: "Waters",
          pt: "Águas"
        },
        drinks: [
          {
            name: {
              text: {
                fr: "San Pellegrino 50 cl (eau pétillante)",
                en: "San Pellegrino 50 cl (sparkling water)",
                pt: "San Pellegrino 50 cl (água com gás)"
              }
            },
            price: 4
          },
          {
            name: {
              text: {
                fr: "Evian 50 cl",
                en: "Evian 50 cl",
                pt: "Evian 50 cl"
              }
            },
            price: 4
          }
        ]
      },
      {
        category: {
          fr: "Café du Brésil",
          en: "Brazilian coffee",
          pt: "Café do Brasil"
        },
        drinks: [
          {
            name: {
              text: {
                fr: "Expresso, allongée",
                en: "Expresso, long coffee",
                pt: "Expresso, café longo"
              }
            },
            price: 2
          },
          {
            name: {
              text: {
                fr: "Double expresso",
                en: "Double expresso",
                pt: "Duplo expresso"
              }
            },
            price: 3.5
          },
          {
            name: {
              text: {
                fr: "Pingado (café noisette)",
                en: "Pingado (coffee with just a drop of milk)",
                pt: "Pingado (café com um pouco de leite)"
              }
            },
            price: 2.3
          }
        ]
      },
      {
        category: {
          fr: "Thé",
          en: "Tea",
          pt: "Chá"
        },
        drinks: [
          {
            name: {
              text: {
                fr: "Thés ou infusions",
                en: "Teas or infusions",
                pt: "Chás ou infusões"
              }
            },
            price: 1.5
          }
        ]
      }
    ],
    lastUpdated: lastUpdatedDate,
  },
  {
    title: {
      fr: "Boissons alcoolisées",
      en: "Alcoholic beverages",
      pt: "Bebidas alcoólicas"
    },
    items: [
      {
        category: {
          fr: "Caipirinhas",
          en: "Caipirinhas",
          pt: "Caipirinhas"
        },
        drinks: [
          {
            name: {
              text: {
                fr: "Classique",
                en: "Classic",
                pt: "Clássica"
              },
              bold: true
            },
            description: {
              text: {
                fr: "Cachaça Ypioca, citron et sucre de canne.",
                en: "Ypioca cachaça, lime and cane sugar.",
                pt: "Cachaça Ypioca, limão e açúcar de cana."
              },
              position: "inline"
            },
            price: 10
          },
          {
            name: {
              text: {
                fr: "Maracuja",
                en: "Passion fruit",
                pt: "Maracujá"
              },
              bold: true
            },
            description: {
              text: {
                fr: "Cachaça Ypioca, fruit de la passion, citron et sucre de canne.",
                en: "Ypioca cachaça, passion fruit, lime and cane sugar.",
                pt: "Cachaça Ypioca, maracujá, limão e açúcar de cana."
              },
              position: "inline"
            },
            price: 12
          },
          {
            name: {
                text: {
                  fr: "Fraise",
                  en: "Strawberry",
                  pt: "Morango"
                },
                bold: true
            },
            description: {
              text: {
                fr: "Cachaça Ypioca, fraise, citron et sucre de canne.",
                en: "Ypioca cachaça, strawberry, lime and cane sugar.",
                pt: "Cachaça Ypioca, morango, limão e açúcar de cana."
              },
              position: "inline"
            },
            price: 12
          }
        ]
      },
      {
          category: {
              fr: "Caipiroska",
              en: "Caipiroska",
              pt: "Caipiroska"
          },
          drinks: [
              {
                  name: {
                      text: {
                          fr: "Classique",
                          en: "Classic",
                          pt: "Clássica"
                      },
                      bold: true
                  },
                  description: {
                      text: {
                          fr: "Vodka, citron et sucre de canne.",
                          en: "Vodka, lime and cane sugar.",
                          pt: "Vodka, limão e açúcar de cana."
                      },
                      position: "inline"
                  },
                  price: 10
              },
              {
                  name: {
                      text: {
                          fr: "Maracuja",
                          en: "Passion fruit",
                          pt: "Maracujá"
                      },
                      bold: true
                  },
                  description: {
                      text: {
                          fr: "Vodka, fruit de la passion, citron et sucre de canne.",
                          en: "Vodka, passion fruit, lime and cane sugar.",
                          pt: "Vodka, maracujá, limão e açúcar de cana."
                      },
                      position: "inline"
                  },
                  price: 12
              },
              {
                  name: {
                      text: {
                          fr: "Fraise",
                          en: "Strawberry",
                          pt: "Morango"
                      },
                      bold: true
                  },
                  description: {
                      text: {
                          fr: "Vodka, fraise, citron et sucre de canne.",
                          en: "Vodka, strawberry, lime and cane sugar.",
                          pt: "Vodka, morango, limão e açúcar de cana."
                      },
                      position: "inline"
                  },
                  price: 12
              }
          ]
      },
      {
        category: {
          fr: "Bières",
          en: "Beers",
          pt: "Cervejas"
        },
        drinks: [
          {
            name: {
                text: {
                    fr: "Super Bock 33 cl (Portugal)",
                    en: "Super Bock 33 cl (Portugal)",
                    pt: "Super Bock 33 cl (Portugal)"
                }
            },
            description: {
                text: {
                    fr: "La bière blonde iconique du Portugal, fraîche et maltée.",
                    en: "The iconic Portuguese beer, fresh and malted.",
                    pt: "A cerveja portuguesa icônica, fresca e com malte."
                },
                position: "bottom",
                bold: false
            },
            price: 5
          },
          {
            name: {
                text: {
                    fr: "Antártica Original, Pilsen Standard 30 cl (Brésil)",
                    en: "Antártica Original, Pilsen Standard 30 cl (Brazil)",
                    pt: "Antártica Original, Pilsen Standard 30 cl (Brasil)"
                }
            },
            description: {
                text: {
                    fr: "Un classique des bars brésiliens, légère avec une amertume très subtile.",
                    en: "A Brasilian classic, light with a very subtle bitterness.",
                    pt: "Um clássico dos bares brasileiros, leve com uma sutil amargura."
                },
                position: "bottom",
                bold: false
            },
            price: 6.5
          },
          {
            name: {
                text: {
                    fr: "PRAYA Blonde, Premium lager artisanale 35 cl (Brésil)",
                    en: "PRAYA Blonde, premium craft lager 35 cl (Brazil)",
                    pt: "PRAYA Blonde, lager artesanal premium 35 cl (Brasil)"
                }
            },
            description: {
                text: {
                    fr: "Une bière artisanale de Rio, 100% malt, limpide.",
                    en: "A Rio's craft beer, 100% malt, clear.",
                    pt: "Uma cerveja artesanal do Rio, 100% malte, límpida."
                },
                position: "bottom",
                bold: false
            },
            price: 7
          }
        ]
      },
      {
          category: {
              fr: "Vin rouge",
              en: "Red wine",
              pt: "Vinho tinto"
          },
          inline: false,
          drinks: [
              {
                  name: {
                      text: {
                          fr: "Verre vin rouge Français (Gaillac) 12,5 cl",
                          en: "French red wine glass (Gaillac) 12.5 cl",
                          pt: "Taça de vinho tinto francês (Gaillac) 12,5 cl"
                      }
                  },
                  price: 5
              },
              {
                  name: {
                      text: {
                          fr: "Vin rouge brésilien selon arrivage (servi uniquement en bouteille 75 cl).",
                          en: "Brazilian red wine according to arrival (served only in 75 cl bottles).",
                          pt: "Vinho tinto brasileiro conforme chegada (servido apenas em garrafas de 75 cl)."
                      }
                  },
                  price: 30
              }
          ]
      },
      {
          category: {
              fr: "Vin blanc",
              en: "White wine",
              pt: "Vinho branco"
          },
          inline: true,
          note: {
              text: {
                  fr: "Vin blanc CHÂTEAU CLEMENT TERMES Gaillac",
                  en: "White wine CHÂTEAU CLEMENT TERMES Gaillac",
                  pt: "Vinho branco CHÂTEAU CLEMENT TERMES Gaillac"
              },
              bold: true
          },
          drinks: [
              {
                  name: {
                      text: {
                          fr: "Verre 12,5 cl",
                          en: "Glass 12.5 cl",
                          pt: "Taça 12,5 cl"
                      }
                  },
                  price: 5
              },
              {
                  name: {
                      text: {
                          fr: "Bouteille 75 cl",
                          en: "Bottle 75 cl",
                          pt: "Garrafa 75 cl"
                      }
                  },
                  price: 24
              }
          ]
      },
      {
          category: {
              fr: "Vin rosé",
              en: "Rosé wine",
              pt: "Vinho rosé"
          },
          inline: true,
          note: {
              text: {
                  fr: "Vin rosé Ines Fronton",
                  en: "Rosé wine Ines Fronton",
                  pt: "Vinho rosé Ines Fronton"
              },
              bold: true
          },
          drinks: [
              {
                  name: {
                      text: {
                          fr: "Verre 12,5 cl",
                          en: "Glass 12.5 cl",
                          pt: "Taça 12,5 cl"
                      }
                  },
                  price: 5
              },
              {
                  name: {
                      text: {
                          fr: "Bouteille 75 cl",
                          en: "Bottle 75 cl",
                          pt: "Garrafa 75 cl"
                      }
                  },
                  price: 24
              }
          ]
      },
      {
          category: {
              fr: "Digestifs",
              en: "Digestifs",
              pt: "Digestivos"
          },
          drinks: [
              {
                  name: {
                      text: {
                          fr: "Cachaça Ypioca 5 cl",
                          en: "Cachaça Ypioca 5 cl",
                          pt: "Cachaça Ypioca 5 cl"
                      },
                      bold: true
                  },
                  price: 7
              },
              {
                  name: {
                      text: {
                        fr: "Vodka 5 cl",
                        en: "Vodka 5 cl",
                        pt: "Vodka 5 cl"
                      },
                      bold: true
                  },
                  price: 7
              },
              {
                  name: {
                      text: {
                        fr: "Cachaça arrangée mangue et piment 5 cl",
                        en: "Cachaça flavored mango and pepper 5 cl",
                        pt: "Cachaça aromatizada manga e pimenta 5 cl"
                      },
                      bold: true
                  },
                  price: 8.5
              },
              {
                  name: {
                      text: {
                        fr: "Cachaça vieillie Ypioca 150 5 cl",
                        en: "Aged cachaça Ypioca 150 5 cl",
                        pt: "Cachaça envelhecida Ypioca 150 5 cl"
                    },
                      bold: true
                  },
                  description: {
                      text: {
                          fr: "Distillée à partir de jus de canne à sucre, a été vieillie pendant six ans, trois ans en fûts de baume et trois ans en fûts de chêne, ce qui lui confère un goût et des saveurs incomparables.",
                          en: "Distilled from sugarcane juice, it was aged for six years, three years in balsam barrels and three years in oak barrels, which gives it an incomparable taste and flavors.",
                          pt: "Destilada a partir do suco de cana-de-açúcar, foi envelhecida por seis anos, três anos em barris de bálsamo e três anos em barris de carvalho, o que lhe confere um sabor e sabores incomparáveis."
                      },
                      small: true
                  },
                  price: 8.5
              },
              {
                  name: {
                      text: {
                          fr: "Cachaça Brazilian Kiss 5 cl",
                          en: "Cachaça Brazilian Kiss 5 cl",
                          pt: "Cachaça Brazilian Kiss 5 cl"
                      },
                      bold: true
                  },
                  description: {
                      text: {
                          fr: "Distillée de manière artisanale dans un alambic en cuivre à repasse, cette cachaça exceptionnelle est infusée avec le Jambu, une plante emblématique de l'Amazonie, réputée pour ses vertus anesthésiante, rafraîchissante et aphrodisiaque.",
                          en: "Distilled artisanally in a copper pot still, this exceptional cachaça is infused with Jambu, an emblematic plant of the Amazon, known for its anesthetic, refreshing and aphrodisiac properties.",
                          pt: "Destilada artesanalmente em um alambique de cobre de repasse, esta excepcional cachaça é infundida com Jambu, uma planta emblemática da Amazônia, conhecida por suas propriedades anestésicas, refrescantes e afrodisíacas."
                      },
                      small: true
                  },
                  price: 8.5
              }
          ]
      }
    ],
    lastUpdated: lastUpdatedDate
  }
];

export { drinkPages };