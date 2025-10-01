import { MenuDocumentPageProps } from '@/app/[locale]/menu/_components/Menu/MenuDocumentPage';
import type { NextRequest } from 'next/server'

// const menuPages: MenuDocumentPageProps[] = [
//   {
//     title: 'Entrées ou tapas à partager',
//     category: 'starters',
//     items: [
//       {
//         name: 'Pão de queijo',
//         description: '3 petits pains moelleux et dorés à base de farine de manioc et de fromage.',
//         price: 5
//       },
//       {
//         name: 'Mini coxinhas vegetarianas',
//         description: '6 croquettes au fromage emmental, poireau et oignon, enveloppées dans une pâte croustillante et dorée accompagnées de sa sauce Brésil (curry et ananas).',
//         price: 7.5
//       },
//       {
//         name: 'Coxinhas de frango',
//         description: [
//           '3 croquettes au poulet enveloppées dans une pâte croustillante et dorée.',
//           'Sauce au choix : sauce Brésil (curry et ananas) ou sauce barbecue.'
//         ],
//         price: 7.5
//       },
//       {
//         name: 'Coxinhas de carne',
//         description: [
//           '3 croquettes au bœuf enveloppées dans une pâte croustillante et dorée.',
//           'Sauce au choix : sauce Brésil (curry et ananas) ou sauce barbecue.'
//         ],
//         price: 7.5
//       },
//       {
//         name: 'Mandioca frita',
//         description: [
//           'Frites de manioc.',
//           'Sauce au choix : sauce Brésil (curry et ananas) ou sauce barbecue.'
//         ],
//         price: 7.5
//       },
//       {
//         name: 'Batata doce frita',
//         description: [
//           'Frites de patate douce.',
//           'Sauce au choix : sauce Brésil (curry et ananas) ou sauce barbecue.'
//         ],
//         price: 5.5
//       },
//     ],
//     footer: {
//       notes: [],
//       generalNote: 'La liste des allergènes présents dans nos plats est disponible sur demande.'
//     }
//   },
//   {
//     title: 'Plats',
//     category: 'mainCourses',
//     items: [
//       {
//         name: 'Menu enfant',
//         description: [
//           '- Tenders de poulet ou fillet de collin. Accompagnement : riz ou frites ou salade.',
//           'Dessert : gâteau au chocolat ou deux boules de glace (demandez les saveurs disponibles).',
//         ],
//         price: 10
//       },
//       {
//         name: 'Plat du moment',
//         description: 'Decouvrez le plat du moment et son prix sur l\'ardoise',
//         price: null
//       },
//       {
//         name: 'Feijoada',
//         description: 'Haricots noirs mijotés avec du jarret de bœuf, de l\'échine de porc et de la saucisse fumée servi avec du riz, de la farofa (farine de manioc croustillante), vinaigrette à la brésilienne et des tranches d\'orange.',
//         price: 20
//       },
//       {
//         name: 'Moqueca de peixe e camarão',
//         description: [
//           'Plat originaire de Bahia à base de dos de cabillaud, crevettes et légumes, cuisiné dans une sauce au lait de coco et dendê.',
//           'Servi avec du riz et de la farofa (farine de manioc).',
//         ],
//         price: 23
//       },
//       {
//         name: 'Moqueca vegana',
//         description: [
//           'Version vegane de la moqueca, préaprée avec de la banane plantain, des légumes frais, infusés des mêmes arômes riches de lait de coco et dendê.',
//           'Servi avec du riz et de la farofa (farine de manioc).',
//         ],
//         price: 17
//       },
//       {
//         name: 'Picanha de race Angus d\'exception*',
//         description: [
//           'Une délice pour les amoureux de la viande de bœuf, ce morceau de la pointe de la surlonge offre une tendreté exceptionnelle et une saveur riche, sublimée par sa couverture de gras persillé avec de la vinaigrette à la brésilienne, salade et farofa (farine de manioc croustillante).',
//           'Accompagnement et sauce au choix : riz ou frites (classique ou patate douce).',
//           'Sauce barbecue ou sauce Brésil (curry et ananas).',
//         ],
//         price: 26
//       },
//     ],
//     footer: {
//       notes: ['Viande origine Argentine'],
//       generalNote: 'La liste des allergènes présents dans nos plats est disponible sur demande.'
//     }
//   },
//   {
//     title: 'Desserts',
//     category: 'desserts',
//     items: [
//       {
//         name: 'Mousse de maracuja',
//         description: 'Mousse légère et acidulée aux fruits de la passion, base ganache au chocolat.',
//         price: 7
//       },
//       {
//         name: 'Pudim de leite',
//         description: 'Flan crémeux et délicatement sucré au caramel.',
//         price: 7
//       },
//       {
//         name: 'Cheesecake',
//         description: 'Gatêau au fromage frais, coulis au choix (fruits exotiques ou fruits rouges).',
//         price: 5.5
//       },
//       {
//         name: 'Petit gatêau e sorvete de doce de leite',
//         description: 'Cœur coulant au chocolat avec sa boule de glace à la confiture de lait.',
//         price: 6
//       },
//     ],
//     footer: {
//       notes: [],
//       generalNote: 'La liste des allergènes présents dans nos plats est disponible sur demande.'
//     }
//   }
// ];
const menuPages: MenuDocumentPageProps[] = [
  {
    title: {
      fr: 'Entrées ou tapas à partager',
      pt: 'Entradas ou tapas para compartilhar',
      en: 'Starters or tapas to share',
    },
    category: 'starters',
    items: [
      {
        name: 'Pão de queijo',
        description: {
          fr: '3 petits pains moelleux et dorés à base de farine de manioc et de fromage.',
          pt: '3 pãezinhos macios e dourados feitos com farinha de mandioca e queijo.',
          en: '3 soft and golden breads made with cassava flour and cheese.',
        },
        price: 5
      },
      {
        name: 'Mini coxinhas vegetarianas',
        description: {
          fr: '6 croquettes au fromage emmental, poireau et oignon, enveloppées dans une pâte croustillante et dorée accompagnées de sa sauce Brésil (curry et ananas).',
          pt: '6 croquetes de queijo emmental, alho-poró e cebola, envoltos em uma massa crocante e dourada, acompanhados de molho Brasil (curry e abacaxi).',
          en: '6 croquettes of emmental cheese, leek and onion, wrapped in a crispy and golden dough, accompanied by Brazil sauce (curry and pineapple).',
        },
        price: 7.5
      },
      {
        name: 'Coxinhas de frango',
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
        name: 'Coxinhas de carne',
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
        name: 'Mandioca frita',
        description: {
          fr: [
            'Frites de manioc.',
            'Sauce au choix : sauce Brésil (curry et ananas) ou sauce barbecue.'
          ],
          pt: [
            'Mandioca frita.',
            'Molho à escolha: molho Brasil (curry e abacaxi) ou molho barbecue.'
          ],
          en: [
            'Fried cassava.',
            'Sauce of your choice: Brazil sauce (curry and pineapple) or barbecue sauce.'
          ],
        },
        price: 7.5
      },
      {
        name: 'Batata doce frita',
        description: {
          fr: [
            'Frites de patate douce.',
            'Sauce au choix : sauce Brésil (curry et ananas) ou sauce barbecue.'
          ],
          pt: [
            'Batata doce frita.',
            'Molho à escolha: molho Brasil (curry e abacaxi) ou molho barbecue.'
          ],
          en: [
            'Fried sweet potato.',
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
        name: 'Menu enfant',
        description: {
          fr: [
            'Tenders de poulet ou fillet de collin. Accompagnement : riz ou fristes ou salade.',
            'Dessert : gâteau au chocolat ou deux boules de glace (demandez les saveurs disponibles).',
          ],
          pt: [
            'Tenders de frango ou filé de collin. Acompanhamento: arroz ou fritas ou salada.',
            'Sobremesa: bolo de chocolate ou duas bolas de sorvete (pergunte pelos sabores disponíveis).',
          ],
          en: [
            'Chicken tenders or collin fillet. Side dish: rice or fries or salad.',
            'Dessert: chocolate cake or two scoops of ice cream (ask for available flavors).',
          ],
        },
        price: 10
      },
      {
        name: 'Plat du moment',
        description: {
          fr: 'Decouvrez le plat du moment et son prix sur l\'ardoise',
          pt: 'Descubra o prato do momento e seu preço no quadro',
          en: 'Discover the dish of the moment and its price on the board',
        },
        price: null
      },
      {
        name: 'Feijoada',
        description: {
          fr: 'Haricots noirs mijotés avec du jarret de bœuf, de l\'échine de porc et de la saucisse fumée servi avec du riz, de la farofa (farine de manioc croustillante), vinaigrette à la brésilienne et des tranches d\'orange.',
          pt: 'Feijão preto cozido com músculo bovino, lombo de porco e linguiça defumada, servido com arroz, farofa (farinha de mandioca crocante), vinagrete à brasileira e fatias de laranja.',
          en: 'Black beans stewed with beef shank, pork loin and smoked sausage, served with rice, farofa (crispy cassava flour), Brazilian vinaigrette and orange slices.',
        },
        price: 20
      },
      {
        name: 'Moqueca de peixe e camarão',
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
        name: 'Moqueca vegana',
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
        name: 'Picanha de race Angus d\'exception*',
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
        price: 26
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
        name: 'Mousse de maracuja',
        description: {
          fr: 'Mousse légère et acidulée aux fruits de la passion, base ganache au chocolat.',
          pt: 'Mousse leve e azeda de maracujá, base de ganache de chocolate.',
          en: 'Light and tangy passion fruit mousse, chocolate ganache base.',
        },
        price: 7
      },
      {
        name: 'Pudim de leite',
        description: {
          fr: 'Flan crémeux et délicatement sucré au caramel.',
          pt: 'Pudim cremoso e delicadamente adoçado com caramelo.',
          en: 'Creamy flan delicately sweetened with caramel.',
        },
        price: 7
      },
      {
        name: 'Cheesecake',
        description: {
          fr: 'Gatêau au fromage frais, coulis au choix (fruits exotiques ou fruits rouges).',
          pt: 'Bolo de queijo fresco, calda à escolha (frutas exóticas ou frutas vermelhas).',
          en: 'Fresh cheese cake, sauce of your choice (exotic fruits or red fruits).',
        },
        price: 5.5
      },
      {
        name: 'Petit gatêau e sorvete de doce de leite',
        description: {
          fr: 'Cœur coulant au chocolat avec sa boule de glace à la confiture de lait.',
          pt: 'Bolo de chocolate com recheio cremoso e uma bola de sorvete de doce de leite.',
          en: 'Chocolate cake with creamy filling and a scoop of dulce de leche ice cream.',
        },
        price: 6
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

const GET = async (request: NextRequest) => {
  return new Response(
    JSON.stringify(menuPages),
    { status: 200 }
  );
};

export { GET };