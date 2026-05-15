import { FoodMenuPageData } from '@/types/FoodMenuPageData';

const lastUpdatedDate = new Date('2026-05-12T00:00:00.000Z');

const foodPages: FoodMenuPageData[] = [
  {
    title: {
      fr: "Entrées ou tapas à partager",
      en: "Starters or tapas to share",
      pt: "Entradas ou tapas para compartilhar"
    },
    lastUpdated: lastUpdatedDate,
    items: [
      {
        name: {
          fr: "Acarajé (disponible tous les samedis soir)",
          en: "Acarajé (available every Saturday night)",
          pt: "Acarajé (disponível todo sábado à noite)"
        },
        description: {
          fr: [
            "Un beignet de haricot blanc frit, garni de vatapá (crème à base de crevettes, lait de coco et cacahuètes) et de caruru (préparation de gombos aux épices). Légèrement épicé."
          ],
          en: [
            "A deep-fried white bean fritter, topped with vatapá (a cream made from shrimp, coconut milk and peanuts) and caruru (a spiced okra preparation). Mildly spicy."
          ],
          pt: [
            "Bolinho de feijão branco frito, coberto com vatapá (um creme feito com camarão, leite de coco e amendoim) e caruru (um prato de quiabo temperado). Levemente picante."
          ]
        },
        price: 12
      },
      {
        name: {
          fr: "Pain au fromage",
          en: "Cheese bread",
          pt: "Pão de queijo"
        },
        description: {
          fr: [
            "3 petits pains moelleux et dorés à base de farine de manioc et de fromage."
          ],
          en: [
            "3 soft and golden breads made with cassava flour and cheese."
          ],
          pt: [
            "3 pãezinhos macios e dourados feitos com farinha de mandioca e queijo."
          ]
        },
        price: 6
      },
      {
        name: {
          fr: "Mini coxinhas végétariennes",
          en: "Mini vegetarian coxinhas",
          pt: "Mini coxinhas vegetarianas"
        },
        description: {
          fr: [
            "6 croquettes au fromage emmental, poireau et oignon, enveloppées dans une pâte croustillante et dorée accompagnées de sa sauce Brésil (curry et ananas)."
          ],
          en: [
            "6 croquettes of emmental cheese, leek and onion, wrapped in a crispy and golden dough, accompanied by Brazil sauce (curry and pineapple)."
          ],
          pt: [
            "6 croquetes de queijo emmental, alho-poró e cebola, envoltos em uma massa crocante e dourada, acompanhados de molho Brasil (curry e abacaxi)."
          ]
        },
        price: 7.5
      },
      {
        name: {
          fr: "Coxinhas de poulet",
          en: "Chicken coxinhas",
          pt: "Coxinhas de frango"
        },
        description: {
          fr: [
            "3 croquettes au poulet enveloppées dans une pâte croustillante et dorée, accompagnées de sa sauce Brésil (curry et ananas)."
          ],
          en: [
            "3 chicken croquettes wrapped in a crispy and golden dough, accompanied by Brazilian sauce (curry and pineapple)."
          ],
          pt: [
            "3 croquetes de frango envoltos em uma massa crocante e dourada, acompanhados de molho brasileiro (curry e abacaxi)."
          ]
        },
        price: 7.5
      },
      {
        name: {
          fr: "Coxinhas de viande",
          en: "Beef coxinhas",
          pt: "Coxinhas de carne"
        },
        description: {
          fr: [
            "3 croquettes au bœuf enveloppées dans une pâte croustillante et dorée, accompagnées de sa sauce Brésil (curry et ananas)."
          ],
          en: [
            "3 beef croquettes wrapped in a crispy and golden dough, accompanied by Brazilian sauce (curry and pineapple)."
          ],
          pt: [
            "3 croquetes de carne envoltos em uma massa crocante e dourada, acompanhados de molho brasileiro (curry e abacaxi)."
          ]
        },
        price: 7.5
      },
      {
        name: {
          fr: "Dadinhos de tapioca",
          en: "Tapioca cubes",
          pt: "Dadinhos de tapioca"
        },
        description: {
          fr: [
            "4 petits cubes croustillants à base de tapioca et fromage, accompagnés de sa sauce aigre-douce."
          ],
          en: [
            "4 small crispy cubes made with tapioca and cheese, accompanied by its sweet and sour sauce."
          ],
          pt: [
            "4 pequenos cubos crocantes feitos com tapioca e queijo, acompanhados de molho agridoce."
          ]
        },
        price: 7.5
      },
      {
        name: {
          fr: "Trio de tapas brésiliennes",
          en: "Trio of Brazilian tapas",
          pt: "Trio de tapas brasileiros"
        },
        description: {
          fr: [
            "1 pain au frommage, 1 dadinho de tapioca et 1 coxinha (poulet ou bœuf ou végétarienne)."
          ],
          en: [
            "1 cheese bread, 1 dadinho de tapioca and 1 coxinha (chicken or beef or vegetarian)."
          ],
          pt: [
            "1 pão de queijo, 1 dadinho de tapioca e 1 coxinha (frango ou carne ou vegetariana)."
          ]
        },
        price: 7
      },
      {
        name: {
          fr: "Frites de patate douce ou classiques",
          en: "Sweet or classic potato fries",
          pt: "Batata doce frita ou fritas"
        },
        description: {
          fr: [
            "Frites de patates douces ou frite classiques.",
            "Sauce au choix : sauce Brésil (curry et ananas) ou sauce barbecue."
          ],
          en: [
            "Sweet potato fries or classic fries.",
            "Sauce of your choice: Brazil sauce (curry and pineapple) or barbecue sauce."
          ],
          pt: [
            "Batata doce frita ou batatas fritas clássicas.",
            "Molho à escolha: molho Brasil (curry e abacaxi) ou molho barbecue."
          ]
        },
        price: 5.5
      }
    ],
    footer: {
      notes: {
        fr: [],
        en: [],
        pt: []
      },
      generalNote: {
        fr: "La liste des allergènes présents dans nos plats est disponible sur demande.",
        en: "The list of allergens present in our dishes is available upon request.",
        pt: "A lista de alérgenos presentes em nossos pratos está disponível mediante solicitação."
      }
    }
  },
  {
    title: {
      fr: "Plats",
      en: "Main Courses",
      pt: "Pratos"
    },
    lastUpdated: lastUpdatedDate,
    items: [
      {
        name: {
          fr: "Menu enfant",
          en: "Kids menu",
          pt: "Menu infantil"
        },
        description: {
          fr: [
            "Tenders de poulet ou fillet de collin. Accompagnement : riz ou frites ou salade.",
            "Ou demi-portion de feijoada.",
            "Dessert : gâteau au chocolat ou une boule de glace (demandez les saveurs disponibles)."
          ],
          en: [
            "Chicken tenders or collin fillet. Side dish: rice or fries or salad.",
            "Or half portion of feijoada.",
            "Dessert: chocolate cake or one scoop of ice cream (ask for available flavors)."
          ],
          pt: [
            "Tenders de frango ou filé de collin. Acompanhamento: arroz ou fritas ou salada.",
            "Ou meia porção de feijoada.",
            "Sobremesa: bolo de chocolate ou uma bola de sorvete (pergunte pelos sabores disponíveis)."
          ]
        },
        price: 10
      },
      {
        name: {
          fr: "Poulet à la sauce aux fruits de la passion et au gombo",
          en: "Chicken in passion fruit and okra sauce",
          pt: "Frango ao molho de maracujá e quiabo"
        },
        description: {
          fr: [
            "Filet de poulet tendre nappé d'une sauce au fruit de la passion, accompagné de gombo et d'une polenta onctueuse. Plat délicatement pimenté."
          ],
          en: [
            "Tender chicken fillet topped with a passion fruit sauce, accompanied by okra and creamy polenta. Delicately spiced dish."
          ],
          pt: [
            "Filé de frango macio coberto com molho de maracujá, acompanhado de quiabo e polenta cremosa. Prato delicadamente apimentado."
          ]
        },
        price: 19
      },
      {
        name: {
          fr: "Feijoada",
          en: "Feijoada",
          pt: "Feijoada"
        },
        description: {
          fr: [
            "Haricots noirs mijotés avec du jarret de bœuf, de l'échine de porc et de la saucisse fumée.",
            "Servi avec du riz, de la farofa (farine de manioc croustillante), vinaigrette à la brésilienne et des tranches d'orange."
          ],
          en: [
            "Black beans stewed with beef shank, pork loin and smoked sausage",
            "Served with rice, farofa (crispy cassava flour), Brazilian vinaigrette and orange slices."
          ],
          pt: [
            "Feijão preto cozido com músculo bovino, lombo de porco e linguiça defumada"
            ,"Servido com arroz, farofa (farinha de mandioca crocante), vinagrete à brasileira e fatias de laranja."
          ]
        },
        price: 21
      },
      {
        name: {
          fr: "Moqueca de poisson et crevettes",
          en: "Fish and shrimp moqueca",
          pt: "Moqueca de peixe e camarão"
        },
        description: {
          fr: [
            "Plat originaire de Bahia à base de dos de cabillaud, crevettes et légumes, cuisiné dans une sauce au lait de coco et dendê.",
            "Servi avec du riz et de la farofa (farine de manioc)."
          ],
          en: [
            "Dish originating from Bahia made with cod fillet, shrimp and vegetables, cooked in a coconut milk and dendê sauce.",
            "Served with rice and farofa (cassava flour)."
          ],
          pt: [
            "Prato originário da Bahia feito com filé de bacalhau, camarão e legumes, cozido em um molho de leite de coco e dendê.",
            "Servido com arroz e farofa (farinha de mandioca)."
          ]
        },
        price: 23
      },
      {
        name: {
          fr: "Moqueca de banane plantain",
          en: "Plantain moqueca",
          pt: "Moqueca de banana-da-terra"
        },
        description: {
          fr: [
            "Version vegane de la moqueca, préaprée avec de la banane plantain, des légumes frais, cuisinés dans une sauce au lait de coco et dendê.",
            "Servi avec du riz et de la farofa (farine de manioc)."
          ],
          en: [
            "Vegan version of moqueca, prepared with plantain banana, fresh vegetables and cooked in coconut milk and dendê sauce.",
            "Served with rice and farofa (cassava flour)."
          ],
          pt: [
            "Versão vegana da moqueca, preparada com banana-da-terra, legumes frescos e cozida em leite de coco e azeite de dendê.",
            "Servido com arroz e farofa (farinha de mandioca)."
          ]
        },
        price: 17
      },
      {
        name: {
          fr: "Picanha de race Angus d'exception*",
          en: "Exceptional Angus beef rump cap*",
          pt: "Picanha de raça Angus excepcional*"
        },
        description: {
          fr: [
            "Pièce de bœuf emblématique du Brésil, réputée pour sa tendreté et sa saveur intense, sublimée par sa fine couche de gras. Servi avec de la vinaigrette à la brésilienne, salade et farofa (farine de manioc croustillante).",
            "Accompagnement et sauce au choix : riz ou frites ou frites de patate douce.",
            "Sauce barbecue ou sauce Brésil (curry et ananas).",
            "Supplément : portion de feijāo (haricots noirs) - 3 euros"
          ],
          en: [
            "A delight for beef lovers, this cut from the tip of the sirloin offers exceptional tenderness and a rich flavor, enhanced by its marbled fat covering with Brazilian vinaigrette, salad and farofa (crispy cassava flour).",
            "Side dish and sauce of your choice: rice or classic fries or sweet potato fries.",
            "Barbecue sauce or Brazil sauce (curry and pineapple).",
            "Extra: portion of black beans - 3 euros"
          ],
          pt: [
            "Um corte icônico de carne bovina do Brasil, conhecido por sua maciez e sabor intenso, realçado por sua fina camada de gordura. Servido com vinagrete brasileiro, salada e farofa.",
            "Acompanhamento e molho à escolha: arroz ou batatas fritas (clássicas ou batata doce).",
            "Molho barbecue ou molho Brasil (curry e abacaxi).",
            "Suplemento: porção de feijão preto - 3 euros"
          ]
        },
        price: 30
      }
    ],
    footer: {
      notes: {
        fr: [
          "* Viande origine Argentine"
        ],
        en: [
          "* Meat of Argentine origin"
        ],
        pt: [
          "* Carne de origem Argentina"
        ]
      },
      generalNote: {
        fr: "La liste des allergènes présents dans nos plats est disponible sur demande.",
        en: "The list of allergens present in our dishes is available upon request.",
        pt: "A lista de alérgenos presentes em nossos pratos está disponível mediante solicitação."
      }
    }
  },
  {
    title: {
      fr: "Desserts",
      en: "Desserts",
      pt: "Sobremesas"
    },
    lastUpdated: lastUpdatedDate,
    items: [
      {
        name: {
          fr: "Mousse de maracuja",
          en: "Passion fruit mousse",
          pt: "Mousse de maracujá"
        },
        description: {
          fr: [
            "Mousse légère et acidulée aux fruits de la passion, base ganache au chocolat."
          ],
          en: [
            "Light and tangy passion fruit mousse, chocolate ganache base."
          ],
          pt: [
            "Mousse leve e azeda de maracujá, base de ganache de chocolate."
          ]
        },
        price: 7
      },
      {
        name: {
          fr: "Paçoca cremosa",
          en: "Creamy paçoca",
          pt: "Paçoca cremosa"
        },
        description: {
          fr: [
            "Dessert composé de couches de crème à la paçoca (spécialité brésilienne à base de cacahuètes), de doce de leite (confiture de lait) et de chocolat."
          ],
          en: [
            "Dessert made from layers of paçoca cream (Brazilian specialty made with peanuts), doce de leite (dulce de leche) and chocolate."
          ],
          pt: [
            "Sobremesa composta por camadas de creme de paçoca (especialidade brasileira feita com amendoim), doce de leite e chocolate."
          ]
        },
        price: 8
      },
      {
        name: {
          fr: "Gatêau de brigadeiro",
          en: "Brigadeiro cake",
          pt: "Bolo de brigadeiro"
        },
        description: {
          fr: [
            "Gâteau brésilien au chocolat, moelleux et gourmand, nappé de brigadeiro, une crème au chocolat à base de lait concentré."
          ],
          en: [
            "Brazilian chocolate cake, soft and flavorous, topped with brigadeiro, a chocolate cream made from condensed milk."
          ],
          pt: [
            "Bolo de chocolate brasileiro, macio e saboroso, coberto com brigadeiro, um creme de chocolate feito com leite condensado."
          ]
        },
        price: 7
      }
    ],
    footer: {
      notes: {
        fr: [],
        en: [],
        pt: []
      },
      generalNote: {
        fr: "La liste des allergènes présents dans nos plats est disponible sur demande.",
        en: "The list of allergens present in our dishes is available upon request.",
        pt: "A lista de alérgenos presentes em nossos pratos está disponível mediante solicitação."
      }
    }
  }
];

export { foodPages };