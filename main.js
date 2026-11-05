(function(){
  if('scrollRestoration' in history)history.scrollRestoration='manual';
  var WA='5531991169590';
  var reduz=matchMedia('(prefers-reduced-motion:reduce)').matches;
  function linkWa(t){return 'https://wa.me/'+WA+'?text='+encodeURIComponent(t)}
  function svg(i){return '<svg class="ic" viewBox="0 0 64 64" aria-hidden="true">'+i+'</svg>'}

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

  /* Monta lista, chips, pontos e opções do formulário */
  var lista=document.getElementById('fazLista'),chips=document.getElementById('chips'),foto=document.getElementById('mapaFoto'),sel=document.getElementById('f-int'),painel=document.getElementById('painel');
  P.forEach(function(p,n){
    var li=document.createElement('li');li.dataset.r=n%2?'right':'left';li.style.setProperty('--d',(n%4)*.06+'s');
    li.innerHTML='<button class="faz-item" type="button" data-vai="'+n+'">'+svg(p.i)+'<span><span class="faz-nome">'+p.t+'</span><span class="faz-sub">'+p.c+'</span></span><svg aria-hidden="true"><use href="#i-seta"/></svg></button>';
    lista.appendChild(li);
    var c=document.createElement('button');c.className='chip';c.type='button';c.role='tab';c.textContent=p.t;c.dataset.p=n;chips.appendChild(c);
    if(p.x){
      var b=document.createElement('button');b.className='ponto';b.type='button';b.dataset.p=n;b.style.left=p.x+'%';b.style.top=p.y+'%';
      b.setAttribute('aria-label',p.z+': '+p.t);b.innerHTML='<i>'+p.z+'</i>';foto.appendChild(b);
    }
    var o=document.createElement('option');o.value=p.t;o.textContent=p.t;sel.appendChild(o);
  });

  var atual=-1;
  function seleciona(n){
    if(n===atual)return;
    var volta=n<atual;atual=n;var p=P[n];
    painel.innerHTML='<div class="painel-in'+(volta?' volta':'')+'">'+svg(p.i)+'<h3>'+p.t+'</h3><p>'+p.r+'</p><ul>'+p.l.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul>'+(p.n?'<p class="painel-nota">'+p.n+'</p>':'')+'<a class="btn btn-bordo" target="_blank" rel="noopener" href="'+linkWa('Olá, Dra. Letícia! Gostaria de agendar uma avaliação sobre '+p.t.toLowerCase()+'.')+'"><svg><use href="#i-wa"/></svg>Quero avaliar '+(p.id==='pele'||p.id==='pdrn'?'minha pele':'isso')+'</a></div>';
    chips.querySelectorAll('.chip').forEach(function(c){
      var on=+c.dataset.p===n;c.setAttribute('aria-selected',on);
      if(on&&chips.scrollWidth>chips.clientWidth)chips.scrollTo({left:c.offsetLeft-chips.offsetLeft-24,behavior:reduz?'auto':'smooth'});
    });
    foto.querySelectorAll('.ponto').forEach(function(b){b.setAttribute('aria-pressed',+b.dataset.p===n)});
  }
  seleciona(0);
  chips.addEventListener('click',function(e){var b=e.target.closest('.chip');if(b)seleciona(+b.dataset.p)});
  foto.addEventListener('click',function(e){var b=e.target.closest('.ponto');if(b)seleciona(+b.dataset.p)});
  lista.addEventListener('click',function(e){
    var b=e.target.closest('[data-vai]');if(!b)return;
    seleciona(+b.dataset.vai);
    document.getElementById('procedimentos').scrollIntoView({behavior:reduz?'auto':'smooth'});
  });

  /* WhatsApp com mensagem pronta */
  document.querySelectorAll('[data-wa]').forEach(function(a){
    a.href=linkWa('Olá, Dra. Letícia! Vi seu site e gostaria de agendar uma avaliação.');a.target='_blank';a.rel='noopener';
  });

  /* Títulos letra por letra */
  document.querySelectorAll('[data-split]').forEach(function(h){
    h.setAttribute('aria-label',h.textContent.replace(/\s+/g,' ').trim());
    var i=0;
    (function anda(no){
      Array.prototype.slice.call(no.childNodes).forEach(function(f){
        if(f.nodeType===1){if(f.tagName!=='BR')anda(f);return}
        if(f.nodeType!==3)return;
        var frag=document.createDocumentFragment();
        f.textContent.split(/(\s+)/).forEach(function(par){
          if(!par)return;
          if(/^\s+$/.test(par)){frag.appendChild(document.createTextNode(' '));return}
          var w=document.createElement('span');w.className='palavra';w.setAttribute('aria-hidden','true');
          Array.from(par).forEach(function(ch){var s=document.createElement('span');s.className='letra';s.style.setProperty('--i',i++);s.textContent=ch;w.appendChild(s)});
          frag.appendChild(w);
        });
        no.replaceChild(frag,f);
      });
    })(h);
  });

  /* Entrada ao rolar */
  var alvos=document.querySelectorAll('[data-r],[data-split]');
  function mostra(el){el.classList.add(el.hasAttribute('data-split')?'in-split':'in')}
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){mostra(e.target);io.unobserve(e.target)}})},{threshold:.1,rootMargin:'0px 0px -5% 0px'});
    alvos.forEach(function(a){io.observe(a)});
  } else alvos.forEach(mostra);

  /* Abertura: cortinas, monograma, foto e nome */
  var ent=document.getElementById('inicio');
  function abrir(){ent.classList.add('pronta')}
  var img=ent.querySelector('.figura');
  if(img.complete)requestAnimationFrame(function(){requestAnimationFrame(abrir)});
  else{img.addEventListener('load',abrir);img.addEventListener('error',abrir);setTimeout(abrir,1800)}

  /* Rolagem: monograma cresce, foto sobe mais devagar, texto some */
  var mono=ent.querySelector('.mono'),txt=ent.querySelector('.entrada-txt'),wa=document.querySelector('.wa-flutuante'),pendente=false;
  function rola(){
    pendente=false;
    var y=window.scrollY,h=ent.offsetHeight,k=Math.min(y/h,1);
    if(!reduz){
      mono.style.setProperty('--ms',1+k*.28);mono.style.setProperty('--my',(k*-70)+'px');
      img.style.setProperty('--fy',(k*h*.16)+'px');txt.style.setProperty('--to',Math.max(0,1-k*1.8));
    }
    wa.classList.toggle('ver',y>h*.7);
  }
  addEventListener('scroll',function(){if(!pendente){pendente=true;requestAnimationFrame(rola)}},{passive:true});
  rola();

  /* Antes e depois */
  var cmp=document.getElementById('compara'),rng=cmp.querySelector('input');
  rng.addEventListener('input',function(){cmp.style.setProperty('--pos',rng.value+'%')});

  /* Carrossel: arrastar com o mouse */
  var car=document.getElementById('carrossel'),ini=0,sc=0,desc=false,moveu=0;
  car.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;desc=true;moveu=0;ini=e.clientX;sc=car.scrollLeft});
  addEventListener('pointermove',function(e){if(!desc)return;var d=e.clientX-ini;moveu=Math.abs(d);if(moveu>6)car.classList.add('puxando');car.scrollLeft=sc-d});
  addEventListener('pointerup',function(){desc=false;setTimeout(function(){car.classList.remove('puxando')},0)});
  car.addEventListener('dragstart',function(e){e.preventDefault()});

  /* Gaveta lateral com o vídeo do Instagram */
  var gav=document.getElementById('gaveta'),veu=document.getElementById('veu'),box=document.getElementById('gavVideo'),tit=document.getElementById('gav-tit'),fec=gav.querySelector('.fechar'),origem=null,aberta=false;
  function abreVideo(b){
    if(moveu>6)return;
    origem=b;aberta=true;tit.textContent=b.dataset.tit;
    box.innerHTML='<img src="'+b.querySelector('img').getAttribute('src')+'" alt=""><a class="btn btn-rosa" target="_blank" rel="noopener" href="https://www.instagram.com/reel/'+b.dataset.reel+'/">Assistir no Instagram</a>';
    gav.hidden=false;veu.hidden=false;document.body.classList.add('travado');
    requestAnimationFrame(function(){requestAnimationFrame(function(){gav.classList.add('on');veu.classList.add('on');fec.focus()})});
  }
  function fecha(){
    if(!aberta)return;aberta=false;
    gav.classList.remove('on');veu.classList.remove('on');document.body.classList.remove('travado');
    setTimeout(function(){gav.hidden=true;veu.hidden=true;box.innerHTML=''},reduz?0:620);
    if(origem)origem.focus({preventScroll:true});
  }
  car.addEventListener('click',function(e){var b=e.target.closest('[data-reel]');if(b)abreVideo(b)});
  fec.addEventListener('click',fecha);veu.addEventListener('click',fecha);
  addEventListener('keydown',function(e){
    if(!aberta)return;
    if(e.key==='Escape')return fecha();
    if(e.key==='Tab'){
      var a=gav.querySelector('.btn');
      if(e.shiftKey&&document.activeElement===fec){e.preventDefault();a.focus()}
      else if(!e.shiftKey&&document.activeElement===a){e.preventDefault();fec.focus()}
    }
  });

  /* Formulário abre o WhatsApp com a mensagem pronta */
  var form=document.getElementById('form'),nome=document.getElementById('f-nome'),erro=document.getElementById('f-erro');
  nome.addEventListener('input',function(){erro.hidden=true;nome.removeAttribute('aria-invalid')});
  form.addEventListener('submit',function(e){
    e.preventDefault();var n=nome.value.trim();
    if(!n){erro.hidden=false;nome.setAttribute('aria-invalid','true');nome.focus();return}
    var t='Olá, Dra. Letícia! Meu nome é '+n+'. '+(sel.value?'Gostaria de agendar uma avaliação sobre '+sel.value.toLowerCase()+'.':'Gostaria de orientação para agendar uma avaliação.');
    var url=linkWa(t);if(!window.open(url,'_blank','noopener'))location.href=url;
  });
})();
