import { FoodMenuPageData } from "@/types/FoodMenuPageData";

const lastUpdatedDate = new Date('2024-06-01T00:00:00Z');

const foodPages: FoodMenuPageData[] = [
  {
    lastUpdated: lastUpdatedDate,
    title: {
      fr: 'Entrées ou tapas à partager',
      pt: 'Entradas ou tapas para compartilhar',
      en: 'Starters or tapas to share',
    },
    items: [
      {
        name: {
          fr: 'Pain au fromage',
          pt: 'Pão de queijo',
          en: 'Cheese bread'
        },
        description: {
          fr: ['3 petits pains moelleux et dorés à base de farine de manioc et de fromage.'],
          pt: ['3 pãezinhos macios e dourados feitos com farinha de mandioca e queijo.'],
          en: ['3 soft and golden breads made with cassava flour and cheese.'],
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
          fr: ['6 croquettes au fromage emmental, poireau et oignon, enveloppées dans une pâte croustillante et dorée accompagnées de sa sauce Brésil (curry et ananas).'],
          pt: ['6 croquetes de queijo emmental, alho-poró e cebola, envoltos em uma massa crocante e dourada, acompanhados de molho Brasil (curry e abacaxi).'],
          en: ['6 croquettes of emmental cheese, leek and onion, wrapped in a crispy and golden dough, accompanied by Brazil sauce (curry and pineapple).'],
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
          fr: ['4 petits cubes croustillants à base de tapioca et fromage, sauce aigre-douce.'],
          pt: ['4 pequenos cubos crocantes feitos com tapioca e queijo, molho agridoce.'],
          en: ['4 small crispy cubes made with tapioca and cheese, sweet and sour sauce.'],
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
    lastUpdated: lastUpdatedDate,
    title: {
      fr: 'Plats',
      pt: 'Pratos',
      en: 'Main Courses',
    },
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
          fr: ['Decouvrez le plat du moment et son prix sur l\'ardoise'],
          pt: ['Descubra o prato do momento e seu preço no quadro'],
          en: ['Discover the dish of the moment and its price on the board'],
        },
      },
      {
        name: {
          fr: 'Feijoada',
          pt: 'Feijoada',
          en: 'Feijoada',
        },
        description: {
          fr: ['Haricots noirs mijotés avec du jarret de bœuf, de l\'échine de porc et de la saucisse fumée servi avec du riz, de la farofa (farine de manioc croustillante), vinaigrette à la brésilienne et des tranches d\'orange.'],
          pt: ['Feijão preto cozido com músculo bovino, lombo de porco e linguiça defumada, servido com arroz, farofa (farinha de mandioca crocante), vinagrete à brasileira e fatias de laranja.'],
          en: ['Black beans stewed with beef shank, pork loin and smoked sausage, served with rice, farofa (crispy cassava flour), Brazilian vinaigrette and orange slices.'],
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
        fr: ['* Viande origine Argentine'],
        pt: ['* Carne de origem Argentina'],
        en: ['* Meat of Argentine origin'],
      },
      generalNote: {
        fr: 'La liste des allergènes présents dans nos plats est disponible sur demande.',
        pt: 'A lista de alérgenos presentes em nossos pratos está disponível mediante solicitação.',
        en: 'The list of allergens present in our dishes is available upon request.',
      }
    }
  },
  {
    lastUpdated: lastUpdatedDate,
    title: {
      fr: 'Desserts',
      pt: 'Sobremesas',
      en: 'Desserts',
    },
    items: [
      {
        name: {
          fr: 'Mousse de maracuja',
          pt: 'Mousse de maracujá',
          en: 'Passion fruit mousse',
        },
        description: {
          fr: ['Mousse légère et acidulée aux fruits de la passion, base ganache au chocolat.'],
          pt: ['Mousse leve e azeda de maracujá, base de ganache de chocolate.'],
          en: ['Light and tangy passion fruit mousse, chocolate ganache base.'],
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
          fr: ['Flan crémeux et délicatement sucré au caramel.'],
          pt: ['Pudim cremoso e delicadamente adoçado com caramelo.'],
          en: ['Creamy flan delicately sweetened with caramel.'],
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
          fr: ['Gatêau au fromage frais, coulis au choix (fruits exotiques ou fruits rouges).'],
          pt: ['Bolo de queijo fresco, calda à escolha (frutas exóticas ou frutas vermelhas).'],
          en: ['Fresh cheese cake, sauce of your choice (exotic fruits or red fruits).'],
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

export { foodPages };