import { DrinkMenuPageData } from '@/types/DrinkMenuPageData';

const lastUpdatedDate = new Date('2024-06-01T00:00:00Z');

const drinkPages: DrinkMenuPageData[] = [
  {
    lastUpdated: lastUpdatedDate,
    title: {
      fr: 'Boissons sans alcool',
      pt: 'Bebidas sem álcool',
      en: 'Non-alcoholic beverages',
    },
    items: [
      {
        category: {
          fr: 'Mocktails',
          pt: 'Mocktails',
          en: 'Mocktails',
        },
        drinks: [
          {
            name: {
              text: {
                fr: 'Caipirinha classique sans alcool',
                pt: 'Caipirinha clássica sem álcool',
                en: 'Classic caipirinha without alcohol',
              },
              bold: true,
            },
            description: {
              text: {
                fr: '(citron vert, eua gazeuse, sucre de canne et glaçons)',
                pt: '(limão verde, água com gás, açúcar de cana e gelo)',
                en: '(lime, sparkling water, cane sugar and ice)',
              },
            },
            price: 7,
          },
          {
            name: {
              text: {
                fr: 'Caipirinha de maracuja sans alcool',
                pt: 'Caipirinha de maracujá sem álcool',
                en: 'Passion fruit caipirinha without alcohol',
              },
              bold: true,
            },
            description: {
              text: {
                fr: '(citron vert, fruit de la passion, eua gazeuse, sucre de canne et glaçons)',
                pt: '(limão verde, maracujá, água com gás, açúcar de cana e gelo)',
                en: '(lime, passion fruit, sparkling water, cane sugar and ice)',
              },
            },
            price: 8,
          },
          {
            name: {
              text: {
                fr: 'Maracuja sunset',
                pt: 'Maracuja sunset',
                en: 'Maracuja sunset',
              },
              bold: true,
            },
            description: {
              text: {
                fr: '(purée de fruit de la passion, jus d\'orange et sirop de grenadine)',
                pt: '(purê de maracujá, suco de laranja e xarope de grenadine)',
                en: '(passion fruit puree, orange juice and grenadine syrup)',
              },
            },
            price: 7,
          },
        ],
      },
      {
        category: {
          fr: 'Softs',
          pt: 'Softs',
          en: 'Softs',
        },
        drinks: [
          {
            name: {
              text: {
                fr: 'Guaraná 33 cl',
                pt: 'Guaraná 33 cl',
                en: 'Guaraná 33 cl',
              },
            },
            description: {
              text: {
                fr: 'Soda brésilien fabriqué à partir du fruit guarana, typique de l\'Amazonie.',
                pt: 'Refrigerante brasileiro feito a partir do fruto guaraná, típico da Amazônia.',
                en: 'Brazilian soda made from the guarana fruit, typical of the Amazon.',
              },
              small: true,
            },
            price: 4,
          },
          {
            name: {
              text: {
                fr: 'Guaraná zero 33 cl',
                pt: 'Guaraná zero 33 cl',
                en: 'Guaraná zero 33 cl',
              },
            },
            price: 4,
          },
          {
            name: {
              text: {
                fr: 'Coca-cola 33 cl',
                pt: 'Coca-cola 33 cl',
                en: 'Coca-cola 33 cl',
              },
            },
            price: 3.5,
          },
          {
            name: {
              text: {
                fr: 'Coca-cola zero 33 cl',
                pt: 'Coca-cola zero 33 cl',
                en: 'Coca-cola zero 33 cl',
              },
            },
            price: 3.5,
          },
          {
            name: {
              text: {
                fr: 'Fusetea 25 cl',
                pt: 'Fusetea 25 cl',
                en: 'Fusetea 25 cl',
              },
            },
            price: 3.5,
          },
          {
            name: {
              text: {
                fr: 'Orangina 25 cl',
                pt: 'Orangina 25 cl',
                en: 'Orangina 25 cl',
              },
            },
            price: 3.5,
          },
          {
            name: {
              text: {
                fr: 'Sirop à la fraise',
                pt: 'Xarope de morango',
                en: 'Strawberry syrup',
              },
            },
            price: 2.5,
          },
        ],
      },
      {
        category: {
          fr: 'Jus de fruits',
          pt: 'Sucos',
          en: 'Juices',
        },
        note: {
          text: {
            fr: '(non préssé sur place, mais toujours bien frais)',
            pt: '(não espremido no local, mas sempre bem fresco)',
            en: '(not pressed on site, but always fresh)',
          },
          inline: true,
          bold: true,
        },
        drinks: [
          {
            name: {
              text: {
                fr: 'Jus d\'orange 25 cl',
                pt: 'Suco de laranja 25 cl',
                en: 'Orange juice 25 cl',
              },
            },
            price: 3.5,
          },
          {
            name: {
              text: {
                fr: 'Jus d\'ananas 25 cl',
                pt: 'Suco de abacaxi 25 cl',
                en: 'Pineapple juice 25 cl',
              },
            },
            price: 3.5,
          },
        ],
      },
      {
        category: {
          fr: 'Eaux',
          pt: 'Águas',
          en: 'Waters',
        },
        drinks: [
          {
            name: {
              text: {
                fr: 'San Pellegrino 50 cl (eau pétillante)',
                pt: 'San Pellegrino 50 cl (água com gás)',
                en: 'San Pellegrino 50 cl (sparkling water)',
              },
            },
            price: 3.5,
          },
          {
            name: {
              text: {
                fr: 'Evian 50 cl',
                pt: 'Evian 50 cl',
                en: 'Evian 50 cl',
              },
            },
            price: 3.5,
          },
        ],
      },
      {
        category: {
          fr: 'Café',
          pt: 'Café',
          en: 'Coffee',
        },
        drinks: [
          {
            name: {
              text: {
                fr: 'Café du Brésil',
                pt: 'Café do Brasil',
                en: 'Brazilian coffee',
              },
            },
            price: 2,
          },
        ],
      },
    ],
  },
  {
    lastUpdated: lastUpdatedDate,
    title: {
      fr: 'Boissons alcoolisées',
      pt: 'Bebidas alcoólicas',
      en: 'Alcoholic beverages',
    },
    items: [
      {
        category: {
          fr: 'Caipirinhas',
          pt: 'Caipirinhas',
          en: 'Caipirinhas',
        },
        drinks: [
          {
            name: {
              text: {
                fr: 'Classique',
                pt: 'Clássica',
                en: 'Classic',
              },
              bold: true,
            },
            description: {
              text: {
                fr: 'cachaça, citron et sucre de canne.',
                pt: 'cachaça, limão e açúcar de cana.',
                en: 'cachaça, lime and cane sugar.',
              },
              position: 'inline',
            },
            price: 10,
          },
          {
            name: {
              text: {
                fr: 'Maracuja',
                pt: 'Maracujá',
                en: 'Passion fruit',
              },
              bold: true,
            },
            description: {
              text: {
                fr: 'cachaça, fruit de la passion, citron et sucre de canne.',
                pt: 'cachaça, maracujá, limão e açúcar de cana.',
                en: 'cachaça, passion fruit, lime and cane sugar.',
              },
              position: 'inline',
            },
            price: 11,
          },
        ],
      },
      {
        category: {
          fr: 'Caipiroska',
          pt: 'Caipiroska',
          en: 'Caipiroska',
        },
        drinks: [
          {
            name: {
              text: {
                fr: 'Classique',
                pt: 'Clássica',
                en: 'Classic',
              },
              bold: true,
            },
            description: {
              text: {
                fr: 'Vodka, citron et sucre de canne.',
                pt: 'Vodka, limão e açúcar de cana.',
                en: 'Vodka, lime and cane sugar.',
              },
              position: 'inline',
            },
            price: 10,
          },
          {
            name: {
              text: {
                fr: 'Maracuja',
                pt: 'Maracujá',
                en: 'Passion fruit',
              },
              bold: true,
            },
            description: {
              text: {
                fr: 'Vodka, fruit de la passion, citron et sucre de canne.',
                pt: 'Vodka, maracujá, limão e açúcar de cana.',
                en: 'Vodka, passion fruit, lime and cane sugar.',
              },
              position: 'inline',
            },
            price: 11,
          },
        ],
      },
      {
        category: {
          fr: 'Bières',
          pt: 'Cervejas',
          en: 'Beers',
        },
        drinks: [
          {
            name: {
              text: {
                fr: 'Super Bock et Sagres',
                pt: 'Super Bock e Sagres',
                en: 'Super Bock and Sagres',
              },
            },
            description: {
              text: {
                fr: 'Bières portugaises (selon disponibilité)',
                pt: 'Cervejas portuguesas (conforme disponibilidade)',
                en: 'Portuguese beers (according to availability)',
              },
              position: 'top',
              bold: true,
            },
            price: 4.5,
          },
          {
            name: {
              text: {
                fr: 'Brahma (blonde pilsen) PRAYA (blonde) et PRAYA (lager artisanale).',
                pt: 'Brahma (pilsen clara) PRAYA (clara) e PRAYA (lager artesanal).',
                en: 'Brahma (light pilsen) PRAYA (light) and PRAYA (craft lager).',
              },
            },
            description: {
              text: {
                fr: 'Bières brésiliennes (selon disponibilité)',
                pt: 'Cervejas brasileiras (conforme disponibilidade)',
                en: 'Brazilian beers (according to availability)',
              },
              position: 'top',
              bold: true,
            },
            price: 6.5,
          },
        ],
      },
      {
        category: {
          fr: 'Vin rouge brésilien',
          pt: 'Vinho tinto brasileiro',
          en: 'Brazilian red wine',
        },
        inline: true,
        note: {
          text: {
            fr: 'Vin rouge brésilien selon arrivage et disponibilité.',
            pt: 'Vinho tinto brasileiro conforme chegada e disponibilidade.',
            en: 'Brazilian red wine according to arrival and availability.',
          },
          bold: true,
        },
        drinks: [
          {
            name: {
              text: {
                fr: 'Verre 12,5 cl',
                pt: 'Taça 12,5 cl',
                en: 'Glass 12.5 cl',
              },
            },
            price: 5.5,
          },
          {
            name: {
              text: {
                fr: 'Bouteille 75 cl',
                pt: 'Garrafa 75 cl',
                en: 'Bottle 75 cl',
              },
            },
            price: 30,
          },
        ],
      },
      {
        category: {
          fr: 'Vin blanc',
          pt: 'Vinho branco',
          en: 'White wine',
        },
        inline: true,
        note: {
          text: {
            fr: 'Vin blanc Costières de Nîmes',
            pt: 'Vinho branco Costières de Nîmes',
            en: 'White wine Costières de Nîmes',
          },
          bold: true,
        },
        drinks: [
          {
            name: {
              text: {
                fr: 'Verre 12,5 cl',
                pt: 'Taça 12,5 cl',
                en: 'Glass 12.5 cl',
              },
            },
            price: 5,
          },
          {
            name: {
              text: {
                fr: 'Bouteille 75 cl',
                pt: 'Garrafa 75 cl',
                en: 'Bottle 75 cl',
              },
            },
            price: 24,
          },
        ],
      },
      {
        category: {
          fr: 'Vin rosé',
          pt: 'Vinho rosé',
          en: 'Rosé wine',
        },
        inline: true,
        note: {
          text: {
            fr: 'Vin rosé Mas de Valériole, Bio',
            pt: 'Vinho rosé Mas de Valériole, Bio',
            en: 'Rosé wine Mas de Valériole, Organic',
          },
          bold: true,
        },
        drinks: [
          {
            name: {
              text: {
                fr: 'Verre 12,5 cl',
                pt: 'Taça 12,5 cl',
                en: 'Glass 12.5 cl',
              },
            },
            price: 5,
          },
          {
            name: {
              text: {
                fr: 'Bouteille 75 cl',
                pt: 'Garrafa 75 cl',
                en: 'Bottle 75 cl',
              },
            },
            price: 24,
          },
        ],
      },
      {
        category: {
          fr: 'Digestifs',
          pt: 'Digestivos',
          en: 'Digestifs',
        },
        drinks: [
          {
            name: {
              text: {
                fr: 'Cachaça Ypioca 5 cl',
                pt: 'Cachaça Ypioca 5 cl',
                en: 'Cachaça Ypioca 5 cl',
              },
              bold: true,
            },
            price: 7,
          },
          {
            name: {
              text: {
                fr: 'Vodka 5 cl',
                pt: 'Vodka 5 cl',
                en: 'Vodka 5 cl',
              },
              bold: true,
            },
            price: 7,
          },
          {
            name: {
              text: {
                fr: 'Cachaça arrangée mangue et piment 5 cl',
                pt: 'Cachaça aromatizada manga e pimenta 5 cl',
                en: 'Cachaça flavored mango and pepper 5 cl',
              },
              bold: true,
            },
            price: 8.5,
          },
          {
            name: {
              text: {
                fr: 'Cachaça vieillie Ypioca 150 5 cl',
                pt: 'Cachaça envelhecida Ypioca 150 5 cl',
                en: 'Aged cachaça Ypioca 150 5 cl',
              },
              bold: true,
            },
            description: {
              text: {
                fr: 'Distillée à partir de jus de canne à sucre, a été vieillie pendant six ans, trois ans en fûts de baume et trois ans en fûts de chêne, ce qui lui confère un goût et des saveurs incomparables.',
                pt: 'Destilada a partir do suco de cana-de-açúcar, foi envelhecida por seis anos, três anos em barris de bálsamo e três anos em barris de carvalho, o que lhe confere um sabor e sabores incomparáveis.',
                en: 'Distilled from sugarcane juice, it was aged for six years, three years in balsam barrels and three years in oak barrels, which gives it an incomparable taste and flavors.',
              },
              small: true,
            },
            price: 8.5,
          },
          {
            name: {
              text: {
                fr: 'Cachaça Brazilian Kiss 5 cl',
                pt: 'Cachaça Brazilian Kiss 5 cl',
                en: 'Cachaça Brazilian Kiss 5 cl',
              },
              bold: true,
            },
            description: {
              text: {
                fr: 'Distillée de manière artisanale dans un alambic en cuivre à repasse, cette cachaça exceptionnelle est infusée avec le Jambu, une plante emblématique de l\'Amazonie, réputée pour ses vertus anesthésiante, rafraîchissante et aphrodisiaque.',
                pt: 'Destilada artesanalmente em um alambique de cobre de repasse, esta excepcional cachaça é infundida com Jambu, uma planta emblemática da Amazônia, conhecida por suas propriedades anestésicas, refrescantes e afrodisíacas.',
                en: 'Distilled artisanally in a copper pot still, this exceptional cachaça is infused with Jambu, an emblematic plant of the Amazon, known for its anesthetic, refreshing and aphrodisiac properties.',
              },
              small: true,
            },
            price: 8.5,
          },
        ],
      },
    ],
  },
];

export { drinkPages };