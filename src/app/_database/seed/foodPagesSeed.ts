import { FoodMenuPageData } from '@/types/FoodMenuPageData';

const lastUpdatedDate = new Date('2026-08-01T11:58:34.533Z');

const foodPages: FoodMenuPageData[] = [
  {
    "title": {
      "fr": "Entrées ou tapas à partager",
      "en": "Starters or tapas to share",
      "pt": "Entradas ou tapas para compartilhar"
    },
    "lastUpdated": lastUpdatedDate,
    "items": [
      {
        "name": {
          "fr": "Pão de queijo",
          "en": "Pão de queijo",
          "pt": "Pão de queijo"
        },
        "description": {
          "fr": [
            "3 petits pains moelleux et dorés à base de farine de manioc et de fromage."
          ],
          "en": [
            "3 soft and golden breads made with cassava (manioc) flour and cheese."
          ],
          "pt": [
            "3 pãezinhos macios e dourados feitos com farinha de mandioca e queijo."
          ]
        },
        "allergens": ["eggs", "milk"],
        "price": 6
      },
      {
        "name": {
          "fr": "Mini coxinhas vegetarianas",
          "en": "Mini coxinhas vegetarianas",
          "pt": "Mini coxinhas vegetarianas"
        },
        "description": {
          "fr": [
            "6 croquettes au fromage emmental, poireau et oignon, enveloppées dans une pâte croustillante et dorée accompagnées de sa sauce Brésil (curry et ananas)."
          ],
          "en": [
            "6 croquettes of emmental cheese, leek and onion, wrapped in a crispy and golden dough, served with Brazil sauce (curry and pineapple)."
          ],
          "pt": [
            "6 croquetes de queijo emmental, alho-poró e cebola, envoltos em uma massa crocante e dourada, acompanhados de molho Brasil (curry e abacaxi)."
          ]
        },
        "allergens": ["eggs", "gluten", "milk"],
        "price": 7.5
      },
      {
        "name": {
          "fr": "Coxinhas de frango",
          "en": "Coxinhas de frango",
          "pt": "Coxinhas de frango"
        },
        "description": {
          "fr": [
            "3 croquettes au poulet enveloppées dans une pâte croustillante et dorée, accompagnées de sa sauce Brésil (curry et ananas)."
          ],
          "en": [
            "3 chicken croquettes with a crispy, golden crust and a savory shredded chicken filling, served with Brazil sauce (curry and pineapple)."
          ],
          "pt": [
            "3 croquetes de frango envoltos em uma massa crocante e dourada, acompanhados de molho brasileiro (curry e abacaxi)."
          ]
        },
        "allergens": ["eggs", "gluten"],
        "allergenTraces": ["milk"],
        "price": 7.5
      },
      {
        "name": {
          "fr": "Coxinhas de carne",
          "en": "Coxinhas de carne",
          "pt": "Coxinhas de carne"
        },
        "description": {
          "fr": [
            "3 croquettes au bœuf enveloppées dans une pâte croustillante et dorée, accompagnées de sa sauce Brésil (curry et ananas)."
          ],
          "en": [
            "3 beef croquettes with a crispy, golden crust and a savory shredded beef filling, served with Brazil sauce (curry and pineapple)."
          ],
          "pt": [
            "3 croquetes de carne envoltos em uma massa crocante e dourada, acompanhados de molho brasileiro (curry e abacaxi)."
          ]
        },
        "allergens": ["eggs", "gluten"],
        "allergenTraces": ["milk"],
        "price": 7.5
      },
      {
        "name": {
          "fr": "Dadinhos de tapioca",
          "en": "Tapioca cubes",
          "pt": "Dadinhos de tapioca"
        },
        "description": {
          "fr": [
            "4 petits cubes croustillants à base de tapioca et fromage, accompagnés de sa sauce aigre-douce."
          ],
          "en": [
            "Brazilian tapioca cheese cubes with a crispy golden crust, served with a sweet and sour sauce."
          ],
          "pt": [
            "4 pequenos cubos crocantes feitos com tapioca e queijo, acompanhados de molho agridoce."
          ]
        },
        "allergens": ["milk"],
        "price": 7.5
      },
      {
        "name": {
          "fr": "Trio de tapas do BRASIL",
          "en": "Trio of Brazilian tapas",
          "pt": "Trio de tapas brasileiros"
        },
        "description": {
          "fr": [
            "1 pão de queijo, 1 dadinho de tapioca et 1 coxinha au choix : poulet ou bœuf ou végétarienne."
          ],
          "en": [
            "1 pão de queijo (cheese bread), 1 dadinho de tapioca and 1 coxinha (chicken or beef or vegetarian)."
          ],
          "pt": [
            "1 pão de queijo, 1 dadinho de tapioca e 1 coxinha (frango ou carne ou vegetariana)."
          ]
        },
        "allergens": ["eggs", "gluten", "milk"],
        "price": 7
      },
      {
        "name": {
          "fr": "Frites de patate douce ou classiques",
          "en": "Sweet or classic potato fries",
          "pt": "Batata doce frita ou fritas"
        },
        "description": {
          "fr": [
            "Frites de patates douces ou frite classiques.",
            "Sauce au choix : sauce Brésil (curry et ananas) ou sauce barbecue."
          ],
          "en": [
            "Sweet potato fries or classic fries.",
            "Sauce of your choice: Brazil sauce (curry and pineapple) or barbecue sauce."
          ],
          "pt": [
            "Batata doce frita ou batatas fritas clássicas.",
            "Molho à escolha: molho Brasil (curry e abacaxi) ou molho barbecue."
          ]
        },
        "price": 5.5
      }
    ],
    "footer": {
      "notes": {
        "fr": [],
        "en": [],
        "pt": []
      },
      "generalNote": {
        "fr": "La liste des allergènes présents dans nos plats est disponible sur demande.",
        "en": "The list of allergens present in our dishes is available upon request.",
        "pt": "A lista de alérgenos presentes em nossos pratos está disponível mediante solicitação."
      }
    }
  },
  {
    "title": {
      "fr": "Plats",
      "en": "Main Courses",
      "pt": "Pratos"
    },
    "lastUpdated": lastUpdatedDate,
    "items": [
      {
        "name": {
          "fr": "Menu enfant",
          "en": "Kids menu",
          "pt": "Menu infantil"
        },
        "description": {
          "fr": [
            "Tenders de poulet ou filet de colin. Accompagnement : riz ou frites ou salade.",
            "Ou demi-portion de feijoada.",
            "Dessert : gâteau au chocolat ou une boule de glace (demandez les saveurs disponibles)."
          ],
          "en": [
            "Chicken tenders or colin filet. Side dish: rice or fries or salad.",
            "Or half portion of feijoada.",
            "Dessert: chocolate cake or one scoop of ice cream (ask for available flavors)."
          ],
          "pt": [
            "Tenders de frango ou filé de colin. Acompanhamento: arroz ou fritas ou salada.",
            "Ou meia porção de feijoada.",
            "Sobremesa: bolo de chocolate ou uma bola de sorvete (pergunte pelos sabores disponíveis)."
          ]
        },
        "allergens": ["fish", "eggs", "gluten", "milk"],
        "price": 10
      },
      {
        "name": {
          "fr": "Picadinho de porco",
          "en": "Picadinho de porco",
          "pt": "Picadinho de porco"
        },
        "description": {
          "fr": [
            "Émincé de porc mijoté, servi avec un pirão de leite (préparation brésilienne onctueuse à base de lait et de farine de manioc) et des morceaux d'ananas caramélisés.  ",
            "Origine viande : France"
          ],
          "en": [
            "Slow-cooked sliced pork, served with pirão de leite (a traditional Brazilian creamy side dish made with milk and cassava flour) and caramelized pineapple pieces."
          ],
          "pt": [
            "Picadinho de porco cozido lentamente, servido com pirão de leite e pedaços de abacaxi caramelizados."
          ]
        },
        "allergens": ["celery", "milk", "sulphites"],
        "allergenTraces": ["mustard"],
        "price": 18
      },
      {
        "name": {
          "fr": "Feijoada",
          "en": "Feijoada",
          "pt": "Feijoada"
        },
        "description": {
          "fr": [
            "Haricots noirs mijotés avec du jarret de bœuf, de l'échine de porc et de la saucisse fumée.",
            "Servi avec du riz, de la farofa (farine de manioc croustillante), vinaigrette à la brésilienne et des tranches d'orange.",
            "Origine viande : France"
          ],
          "en": [
            "Slow-cooked black beans with beef shank, pork shoulder, and smoked sausage. ",
            "Served with rice, farofa (toasted cassava flour), Brazilian vinaigrette, and orange slices."
          ],
          "pt": [
            "Feijão preto cozido com músculo bovino, lombo de porco e linguiça defumada",
            "Servido com arroz, farofa (farinha de mandioca crocante), vinagrete à brasileira e fatias de laranja."
          ]
        },
        "allergens": ["gluten", "soybeans", "sulphites"],
        "allergenTraces": ["celery", "eggs", "milk", "mustard", "nuts"],
        "price": 21
      },
      {
        "name": {
          "fr": "Moqueca de peixe e camarão",
          "en": "Moqueca de peixe e camarão",
          "pt": "Moqueca de peixe e camarão"
        },
        "description": {
          "fr": [
            "Plat originaire de Bahia à base de dos de cabillaud, crevettes et légumes, cuisiné dans une sauce au lait de coco et dendê.",
            "Servi avec du riz et de la farofa (farine de manioc)."
          ],
          "en": [
            "Dish originating from Bahia made with cod fillet, shrimp and vegetables, cooked in a coconut milk and dendê sauce.",
            "Served with rice and farofa (toasted cassava flour)."
          ],
          "pt": [
            "Prato originário da Bahia feito com filé de bacalhau, camarão e legumes, cozido em um molho de leite de coco e dendê.",
            "Servido com arroz e farofa (farinha de mandioca)."
          ]
        },
        "allergens": ["crustaceans", "fish", "soybeans"],
        "price": 24
      },
      {
        "name": {
          "fr": "Moqueca de banana-da-terra",
          "en": "Moqueca de banana-da-terra",
          "pt": "Moqueca de banana-da-terra"
        },
        "description": {
          "fr": [
            "Version vegane de la moqueca, préparée avec de la banane plantain, des légumes frais, cuisinés dans une sauce au lait de coco et dendê.",
            "Servi avec du riz et de la farofa (farine de manioc)."
          ],
          "en": [
            "Vegan version of moqueca, prepared with plantain banana, fresh vegetables and cooked in coconut milk and dendê sauce.",
            "Served with rice and farofa (toasted cassava flour)."
          ],
          "pt": [
            "Versão vegana da moqueca, preparada com banana-da-terra, legumes frescos e cozida em leite de coco e azeite de dendê.",
            "Servido com arroz e farofa (farinha de mandioca)."
          ]
        },
        "allergens": ["soybeans"],
        "price": 18
      },
      {
        "name": {
          "fr": "Picanha de race Angus d'exception*",
          "en": "Exceptional Angus beef rump cap*",
          "pt": "Picanha de raça Angus excepcional*"
        },
        "description": {
          "fr": [
            "Pièce de bœuf emblématique du Brésil (250g), réputée pour sa tendreté et sa saveur intense, sublimée par sa fine couche de gras. Servi avec de la vinaigrette à la brésilienne, salade et farofa (farine de manioc croustillante).",
            "Accompagnement et sauce au choix : riz ou frites ou frites de patate douce.",
            "Sauce barbecue ou sauce Brésil (curry et ananas).",
            "Supplément : portion de feijāo (haricots noirs) - 3 euros"
          ],
          "en": [
            "Iconic Brazilian beef cut (250g), renowned for its tenderness and rich flavor, enhanced by a delicate layer of fat. Served with Brazilian-style vinaigrette, salad, and farofa (toasted cassava flour).",
            "Choice of side and sauce: rice, fries, or sweet potato fries.",
            "Barbecue sauce or Brazilian sauce (curry and pineapple).",
            "Extra: portion of feijão (black beans) – €3."
          ],
          "pt": [
            "Um corte icônico de carne bovina do Brasil (250g), conhecido por sua maciez e sabor intenso, realçado por sua fina camada de gordura. Servido com vinagrete brasileiro, salada e farofa.",
            "Acompanhamento e molho à escolha: arroz ou batatas fritas (clássicas ou batata doce).",
            "Molho barbecue ou molho Brasil (curry e abacaxi).",
            "Suplemento: porção de feijão preto - 3 euros"
          ]
        },
        "allergens": ["soybeans"],
        "price": 30
      }
    ],
    "footer": {
      "notes": {
        "fr": [
          "* Viande origine Argentine"
        ],
        "en": [
          "* Meat of Argentine origin"
        ],
        "pt": [
          "* Carne de origem Argentina"
        ]
      },
      "generalNote": {
        "fr": "La liste des allergènes présents dans nos plats est disponible sur demande.",
        "en": "The list of allergens present in our dishes is available upon request.",
        "pt": "A lista de alérgenos presentes em nossos pratos está disponível mediante solicitação."
      }
    }
  },
  {
    "title": {
      "fr": "Desserts",
      "en": "Desserts",
      "pt": "Sobremesas"
    },
    "lastUpdated": lastUpdatedDate,
    "items": [
      {
        "name": {
          "fr": "Mousse de maracujá",
          "en": "Passion fruit mousse",
          "pt": "Mousse de maracujá"
        },
        "description": {
          "fr": [
            "Mousse légère et acidulée aux fruits de la passion, base ganache au chocolat."
          ],
          "en": [
            "Light and tangy passion fruit mousse, chocolate ganache base."
          ],
          "pt": [
            "Mousse leve e azeda de maracujá, base de ganache de chocolate."
          ]
        },
          "allergens": ["milk", "soybeans"],
          "allergenTraces": ["gluten", "nuts"],
        "price": 7
      },
      {
        "name": {
          "fr": "Paçoca cremosa",
          "en": "Creamy paçoca",
          "pt": "Paçoca cremosa"
        },
        "description": {
          "fr": [
            "Dessert composé de couches de crème à la paçoca (spécialité brésilienne à base de cacahuètes), de doce de leite (confiture de lait) et de chocolat."
          ],
          "en": [
            "Dessert made from layers of paçoca cream (Brazilian specialty made with peanuts), doce de leite (dulce de leche) and chocolate."
          ],
          "pt": [
            "Sobremesa composta por camadas de creme de paçoca (especialidade brasileira feita com amendoim), doce de leite e chocolate."
          ]
        },
        "allergens": ["gluten", "milk", "nuts", "peanuts"],
        "price": 8
      },
      {
        "name": {
          "fr": "PUDIM DE LEITE",
          "en": "PUDIM DE LEITE",
          "pt": "PUDIM DE LEITE"
        },
        "description": {
          "fr": [
            "Flan crémeux et délicatement sucré au caramel."
          ],
          "en": [
            "Creamy and delicately sweet caramel flan."
          ],
          "pt": [
            "Pudim de leite condensado."
          ]
        },
        "allergens": ["eggs", "milk"],
        "price": 7
      }
    ],
    "footer": {
      "notes": {
        "fr": [],
        "en": [],
        "pt": []
      },
      "generalNote": {
        "fr": "La liste des allergènes présents dans nos plats est disponible sur demande.",
        "en": "The list of allergens present in our dishes is available upon request.",
        "pt": "A lista de alérgenos presentes em nossos pratos está disponível mediante solicitação."
      }
    }
  }
];

export { foodPages };