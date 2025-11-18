import type { DrinkMenuPageData } from '@/types/DrinkMenuPageData';
import type { FoodMenuPageData } from '@/types/FoodMenuPageData';

export type MenuApiResponse = {
  drinkPages: DrinkMenuPageData[];
  foodPages: FoodMenuPageData[];
};

const drinkPages: DrinkMenuPageData[] = [
  {
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

const foodPages: FoodMenuPageData[] = [
  {
    title: {
      fr: 'Entrées ou tapas à partager',
      pt: 'Entradas ou tapas para compartilhar',
      en: 'Starters or tapas to share',
    },
    category: 'starters',
    items: [
      {
        name: {
          fr: 'Pain au fromage',
          pt: 'Pão de queijo',
          en: 'Cheese bread'
        },
        description: {
          fr: '3 petits pains moelleux et dorés à base de farine de manioc et de fromage.',
          pt: '3 pãezinhos macios e dourados feitos com farinha de mandioca e queijo.',
          en: '3 soft and golden breads made with cassava flour and cheese.',
        },
        price: 6
      },
      {
        name: {
          fr: 'Mini coxinhas végétariennes',
          pt:'Mini coxinhas vegetarianas',
          en: 'Mini vegetarian coxinhas',
        },
        description: {
          fr: '6 croquettes au fromage emmental, poireau et oignon, enveloppées dans une pâte croustillante et dorée accompagnées de sa sauce Brésil (curry et ananas).',
          pt: '6 croquetes de queijo emmental, alho-poró e cebola, envoltos em uma massa crocante e dourada, acompanhados de molho Brasil (curry e abacaxi).',
          en: '6 croquettes of emmental cheese, leek and onion, wrapped in a crispy and golden dough, accompanied by Brazil sauce (curry and pineapple).',
        },
        price: 7.5
      },
      {
        name: {
          fr: 'Coxinhas de poulet',
          pt: 'Coxinhas de frango',
          en: 'Chicken coxinhas',
        },
        description: {
          fr: [
            '3 croquettes au poulet enveloppées dans une pâte croustillante et dorée.',
            'Sauce au choix : sauce Brésil (curry et ananas) ou sauce barbecue.'
          ],
          pt: [
            '3 croquetes de frango envoltos em uma massa crocante e dourada.',
            'Molho à escolha: molho Brasil (curry e abacaxi) ou molho barbecue.'
          ],
          en: [
            '3 chicken croquettes wrapped in a crispy and golden dough.',
            'Sauce of your choice: Brazil sauce (curry and pineapple) or barbecue sauce.'
          ],
        },
        price: 7.5
      },
      {
        name: {
          fr: 'Coxinhas de viande',
          pt: 'Coxinhas de carne',
          en: 'Beef coxinhas',
        },
        description: {
          fr: [
            '3 croquettes au bœuf enveloppées dans une pâte croustillante et dorée.',
            'Sauce au choix : sauce Brésil (curry et ananas) ou sauce barbecue.'
          ],
          pt: [
            '3 croquetes de carne envoltos em uma massa crocante e dourada.',
            'Molho à escolha: molho Brasil (curry e abacaxi) ou molho barbecue.'
          ],
          en: [
            '3 beef croquettes wrapped in a crispy and golden dough.',
            'Sauce of your choice: Brazil sauce (curry and pineapple) or barbecue sauce.'
          ],
        },
        price: 7.5
      },
      {
        name: {
          fr: 'Dadinhos de tapioca',
          pt: 'Dadinhos de tapioca',
          en: 'Tapioca cubes',
        },
        description: {
          fr: '4 petits cubes croustillants à base de tapioca et fromage, sauce aigre-douce.',
          pt: '4 pequenos cubos crocantes feitos com tapioca e queijo, molho agridoce.',
          en: '4 small crispy cubes made with tapioca and cheese, sweet and sour sauce.',
        },
        price: 7.5
      },
      {
        name: {
          fr: 'Frites de patate douce ou classiques',
          pt: 'Batata doce frita ou fritas',
          en: 'Sweet or classic potato fries',
        },
        description: {
          fr: [
            'Frites de patates douces ou frite classiques.',
            'Sauce au choix : sauce Brésil (curry et ananas) ou sauce barbecue.'
          ],
          pt: [
            'Batata doce frita ou batatas fritas clássicas.',
            'Molho à escolha: molho Brasil (curry e abacaxi) ou molho barbecue.'
          ],
          en: [
            'Sweet potato fries or classic fries.',
            'Sauce of your choice: Brazil sauce (curry and pineapple) or barbecue sauce.'
          ],
        },
        price: 5.5
      },
    ],
    footer: {
      notes: {},
      generalNote: {
        fr: 'La liste des allergènes présents dans nos plats est disponible sur demande.',
        pt: 'A lista de alérgenos presentes em nossos pratos está disponível mediante solicitação.',
        en: 'The list of allergens present in our dishes is available upon request.',
      }
    }
  },
  {
    title: {
      fr: 'Plats',
      pt: 'Pratos',
      en: 'Main Courses',
    },
    category: 'mainCourses',
    items: [
      {
        name: {
          fr: 'Menu enfant',
          pt: 'Menu infantil',
          en: 'Kids menu',
        },
        description: {
          fr: [
            'Tenders de poulet ou fillet de collin. Accompagnement : riz ou frites ou salade.',
            'Ou demi-portion de feijoada.',
            'Dessert : gâteau au chocolat ou deux boules de glace (demandez les saveurs disponibles).',
          ],
          pt: [
            'Tenders de frango ou filé de collin. Acompanhamento: arroz ou fritas ou salada.',
            'Ou meia porção de feijoada.',
            'Sobremesa: bolo de chocolate ou duas bolas de sorvete (pergunte pelos sabores disponíveis).',
          ],
          en: [
            'Chicken tenders or collin fillet. Side dish: rice or fries or salad.',
            'Or half portion of feijoada.',
            'Dessert: chocolate cake or two scoops of ice cream (ask for available flavors).',
          ],
        },
        price: 10
      },
      {
        name: {
          fr: 'Plat du moment',
          pt: 'Prato do momento',
          en: 'Dish of the moment',
        },
        description: {
          fr: 'Decouvrez le plat du moment et son prix sur l\'ardoise',
          pt: 'Descubra o prato do momento e seu preço no quadro',
          en: 'Discover the dish of the moment and its price on the board',
        },
        price: null
      },
      {
        name: {
          fr: 'Feijoada',
          pt: 'Feijoada',
          en: 'Feijoada',
        },
        description: {
          fr: 'Haricots noirs mijotés avec du jarret de bœuf, de l\'échine de porc et de la saucisse fumée servi avec du riz, de la farofa (farine de manioc croustillante), vinaigrette à la brésilienne et des tranches d\'orange.',
          pt: 'Feijão preto cozido com músculo bovino, lombo de porco e linguiça defumada, servido com arroz, farofa (farinha de mandioca crocante), vinagrete à brasileira e fatias de laranja.',
          en: 'Black beans stewed with beef shank, pork loin and smoked sausage, served with rice, farofa (crispy cassava flour), Brazilian vinaigrette and orange slices.',
        },
        price: 20
      },
      {
        name: {
          fr: 'Moqueca de poisson et crevettes',
          pt: 'Moqueca de peixe e camarão',
          en: 'Fish and shrimp moqueca',
        },
        description: {
          fr: [
            'Plat originaire de Bahia à base de dos de cabillaud, crevettes et légumes, cuisiné dans une sauce au lait de coco et dendê.',
            'Servi avec du riz et de la farofa (farine de manioc).',
          ],
          pt: [
            'Prato originário da Bahia feito com filé de bacalhau, camarão e legumes, cozido em um molho de leite de coco e dendê.',
            'Servido com arroz e farofa (farinha de mandioca).',
          ],
          en: [
            'Dish originating from Bahia made with cod fillet, shrimp and vegetables, cooked in a coconut milk and dendê sauce.',
            'Served with rice and farofa (cassava flour).',
          ],
        },
        price: 23
      },
      {
        name: {
          fr: 'Moqueca vegane',
          pt: 'Moqueca vegana',
          en: 'Vegan moqueca',
        },
        description: {
          fr: [
            'Version vegane de la moqueca, préaprée avec de la banane plantain, des légumes frais, infusés des mêmes arômes riches de lait de coco et dendê.',
            'Servi avec du riz et de la farofa (farine de manioc).',
          ],
          pt: [
            'Versão vegana da moqueca, preparada com banana-da-terra, legumes frescos, infundidos com os mesmos aromas ricos de leite de coco e dendê.',
            'Servido com arroz e farofa (farinha de mandioca).',
          ],
          en: [
            'Vegan version of moqueca, prepared with plantain, fresh vegetables, infused with the same rich aromas of coconut milk and dendê.',
            'Served with rice and farofa (cassava flour).',
          ],
        },
        price: 17
      },
      {
        name: {
          fr: 'Picanha de race Angus d\'exception*',
          pt: 'Picanha de raça Angus excepcional*',
          en: 'Exceptional Angus beef rump cap*',
        },
        description: {
          fr: [
            'Une délice pour les amoureux de la viande de bœuf, ce morceau de la pointe de la surlonge offre une tendreté exceptionnelle et une saveur riche, sublimée par sa couverture de gras persillé avec de la vinaigrette à la brésilienne, salade et farofa (farine de manioc croustillante).',
            'Accompagnement et sauce au choix : riz ou frites (classique ou patate douce).',
            'Sauce barbecue ou sauce Brésil (curry et ananas).',
          ],
          pt: [
            'Uma delícia para os amantes de carne bovina, este corte da ponta da alcatra oferece uma maciez excepcional e um sabor rico, sublimado por sua cobertura de gordura marmorizada com vinagrete à brasileira, salada e farofa (farinha de mandioca crocante).',
            'Acompanhamento e molho à escolha: arroz ou batatas fritas (clássicas ou batata doce).',
            'Molho barbecue ou molho Brasil (curry e abacaxi).',
          ],
          en: [
            'A delight for beef lovers, this cut from the tip of the sirloin offers exceptional tenderness and a rich flavor, enhanced by its marbled fat covering with Brazilian vinaigrette, salad and farofa (crispy cassava flour).',
            'Side dish and sauce of your choice: rice or fries (classic or sweet potato).',
            'Barbecue sauce or Brazil sauce (curry and pineapple).',
          ],
        },
        price: 28
      },
    ],
    footer: {
      notes: {
        fr: ['Viande origine Argentine'],
        pt: ['Carne de origem Argentina'],
        en: ['Meat of Argentine origin'],
      },
      generalNote: {
        fr: 'La liste des allergènes présents dans nos plats est disponible sur demande.',
        pt: 'A lista de alérgenos presentes em nossos pratos está disponível mediante solicitação.',
        en: 'The list of allergens present in our dishes is available upon request.',
      }
    }
  },
  {
    title: {
      fr: 'Desserts',
      pt: 'Sobremesas',
      en: 'Desserts',
    },
    category: 'desserts',
    items: [
      {
        name: {
          fr: 'Mousse de maracuja',
          pt: 'Mousse de maracujá',
          en: 'Passion fruit mousse',
        },
        description: {
          fr: 'Mousse légère et acidulée aux fruits de la passion, base ganache au chocolat.',
          pt: 'Mousse leve e azeda de maracujá, base de ganache de chocolate.',
          en: 'Light and tangy passion fruit mousse, chocolate ganache base.',
        },
        price: 7
      },
      {
        name: {
          fr: 'Pudim de lait',
          pt: 'Pudim de leite',
          en: 'Milk flan',
        },
        description: {
          fr: 'Flan crémeux et délicatement sucré au caramel.',
          pt: 'Pudim cremoso e delicadamente adoçado com caramelo.',
          en: 'Creamy flan delicately sweetened with caramel.',
        },
        price: 7
      },
      {
        name: {
          fr: 'Cheesecake',
          pt: 'Cheesecake',
          en: 'Cheesecake',
        },
        description: {
          fr: 'Gatêau au fromage frais, coulis au choix (fruits exotiques ou fruits rouges).',
          pt: 'Bolo de queijo fresco, calda à escolha (frutas exóticas ou frutas vermelhas).',
          en: 'Fresh cheese cake, sauce of your choice (exotic fruits or red fruits).',
        },
        price: 5.5
      },
    ],
    footer: {
      notes: {},
      generalNote: {
        fr: 'La liste des allergènes présents dans nos plats est disponible sur demande.',
        pt: 'A lista de alérgenos presentes em nossos pratos está disponível mediante solicitação.',
        en: 'The list of allergens present in our dishes is available upon request.',
      }
    }
  }
];

const GET = async () => {
  const response: MenuApiResponse = {
    drinkPages,
    foodPages,
  };

  return new Response(
    JSON.stringify(response),
    { status: 200 }
  );
};

export { GET };