/* Conteúdo do site da Dra. Letícia Arthuso.
   Os textos dos procedimentos estão aqui, separados do comportamento (site.js).
   Para mudar um texto, edite só este arquivo.

   Campos de cada procedimento:
     id  nome curto, usado nos arquivos de foto (assets/fotos/proc-<id>.webp)
     t   título            c  subtítulo do mosaico
     r   resumo            l  lista de pontos      n  observação (pode ficar vazia)
     i   ícone em SVG (desenho de 64x64)
     x,y posição do ponto no rosto, em % da foto; z = nome do ponto (opcional) */
window.LA=window.LA||{};
(function(){
  /* Conteúdo tirado das legendas publicadas pela Letícia. x/y = ponto no rosto, em % da foto. */
  var P=[
    {id:'labios',t:'Preenchimento labial',c:'Contorno, proporção e hidratação',x:50.5,y:66,z:'Lábios',
     i:'<path d="M8 32c8-9 15-13 20-12 2 .5 3 3 4 3s2-2.500 4-3c5-1 12 3 20 12-7 11-15 16-24 16S15 43 8 32Z"/><path d="M8 32c9 1 17-1 24 1 7-2 15 0 24-1"/>',
     r:'A intenção nunca é criar outros lábios, e sim cuidar dos seus, respeitando o formato e a sua identidade.',
     l:['Realça o contorno e define o arco do cupido','Equilibra os lábios superior e inferior','Traz projeção, volume e hidratação na medida certa'],
     n:'Nos primeiros dias os lábios ficam mais inchados e sensíveis. Isso faz parte da recuperação e não é o resultado final.'},
    {id:'botox',t:'Botox',c:'Linhas de expressão',x:52,y:20,z:'Testa',
     i:'<ellipse cx="32" cy="34" rx="19" ry="25"/><path d="M21 19c7-3 15-3 22 0M22 25c6-2 14-2 20 0"/><path d="M22 35c2-2 5-2 7 0M35 35c2-2 5-2 7 0M28 49c3 2 5 2 8 0"/>',
     r:'Toxina botulínica para suavizar as linhas sem tirar as suas expressões.',
     l:['Suaviza as marcas que já apareceram','Ajuda a prevenir que as linhas se aprofundem','Deixa a aparência mais leve e descansada'],
     n:'Mais importante do que a idade é entender se ele é indicado para você neste momento.'},
    {id:'bio',t:'Bioestimulador de colágeno',c:'Firmeza e sustentação',x:66,y:52,z:'Firmeza da pele',
     i:'<path d="M14 8c12 8-10 16 2 24s-10 16 2 24M32 8c12 8-10 16 2 24s-10 16 2 24M50 8c12 8-10 16 2 24s-10 16 2 24"/>',
     r:'Estimula a produção natural de colágeno, de forma gradual.',
     l:['Melhora a firmeza e a sustentação','Melhora a qualidade da pele','Pode ajudar nas mudanças da pele depois de um emagrecimento, conforme avaliação'],
     n:'O resultado continua evoluindo nos meses seguintes. Quem quer chegar em dezembro com a pele bonita começa em setembro.'},
    {id:'skin',t:'Skinbooster',c:'Hidratação profunda e viço',
     i:'<path d="M32 7c10 14 18 22 18 32a18 18 0 0 1-36 0c0-10 8-18 18-32Z"/><path d="M23 40a9 9 0 0 0 9 9"/>',
     r:'Para quem busca hidratação profunda e uma pele com mais viço.',
     l:['Mais hidratação e maciez','Melhora a textura da pele','Pode ser associado ao bioestimulador, quando indicado'],n:''},
    {id:'face',t:'Preenchimentos faciais',c:'Volume e contorno',x:39,y:49,z:'Volume e contorno',
     i:'<path d="M32 8c-13 0-21 10-21 23 0 15 11 26 21 26s21-11 21-26C53 18 45 8 32 8Z"/><circle cx="20" cy="37" r="1.300"/><circle cx="25" cy="42" r="1.300"/><circle cx="19" cy="44" r="1.300"/><circle cx="44" cy="37" r="1.300"/><circle cx="39" cy="42" r="1.300"/><circle cx="45" cy="44" r="1.300"/><path d="M26 49c4 2 8 2 12 0"/>',
     r:'Ajudam a devolver volume e contorno ao rosto, sempre respeitando a anatomia.',
     l:['Planejamento feito para o seu rosto','Busca equilíbrio entre os traços','Sem excessos'],n:''},
    {id:'rino',t:'Rinomodelação',c:'Contorno do nariz',x:51,y:48,z:'Nariz',
     i:'<path d="M28 7c0 13-5 25-12 35-3 4 1 7 7 7 4 0 6 2 10 2 5 0 8-3 7-7"/><path d="M45 14l6-4M47 24h7M45 34l6 4"/>',
     r:'Indicada depois de avaliar as proporções do seu rosto, em busca de harmonia com os demais traços.',
     l:['Faz parte do planejamento individual','Respeita as características do seu rosto'],n:''},
    {id:'pdrn',t:'PDRN e microagulhamento',c:'Qualidade e renovação da pele',
     i:'<path d="M42 8l14 14M49 15l-7 7M45 19L21 43l-6-6 24-24M21 43l-9 9"/><circle cx="14" cy="24" r="1.300"/><circle cx="22" cy="20" r="1.300"/><circle cx="40" cy="44" r="1.300"/><circle cx="46" cy="38" r="1.300"/><circle cx="48" cy="48" r="1.300"/>',
     r:'O PDRN estimula os mecanismos naturais de regeneração da pele, de forma progressiva.',
     l:['Mais hidratação e viço','Melhora a textura e a elasticidade','Estímulo à produção de colágeno','Pode ser combinado com botox e peeling retinoico'],n:''},
    {id:'pele',t:'Gerenciamento de pele',c:'Acompanhamento em cada fase',
     i:'<path d="M24 8h16v8H24zM22 16h20l4 8v28a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V24l4-8Z"/><path d="M18 34c5-3 9 3 14 0s9 3 14 0"/>',
     r:'Cuidar da pele no momento certo, de acordo com o que ela precisa em cada fase.',
     l:['Rotina personalizada para a sua pele','Cuidados em casa e procedimentos no consultório','Acompanhamento e manutenção'],n:''}
  ];

  /* Descrição de cada foto do mosaico (texto alternativo, para leitores de tela) */
  var FOTO={"labios": {"a": "Lábios depois do preenchimento, com a mão de luva da Letícia ajustando o rosto da paciente"}, "botox": {"a": "Letícia segurando um frasco de toxina botulínica, com a logo LA dourada na parede"}, "bio": {"a": "Antes e depois de bioestimulador de colágeno em uma paciente"}, "skin": {"a": "Retrato da Letícia com a pele iluminada"}, "face": {"a": "Letícia aplicando um procedimento no rosto de uma paciente"}, "rino": {"a": "Nariz de paciente logo após o procedimento, com gaze"}, "pdrn": {"a": "Letícia aplicando PDRN no rosto de uma paciente"}, "pele": {"a": "Letícia cuidando da pele em frente ao espelho de mão com a logo LA"}};
  var ORDEM=["labios", "botox", "bio", "skin", "face", "rino", "pdrn", "pele"];

  window.LA.P=P;window.LA.FOTO=FOTO;window.LA.ORDEM=ORDEM;
})();
