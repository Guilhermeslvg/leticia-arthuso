/* Comportamento do site da Dra. Letícia Arthuso.
   Depende de js/conteudo.js (carregado antes). Partes, na ordem:
   mosaico "O que eu faço" > mapa do rosto e tour automático > modal dos procedimentos >
   ondas entre as seções > títulos letra por letra e entrada ao rolar > abertura com a logo >
   antes e depois > carrossel em onda > gaveta de vídeo > dúvidas que viram >
   vídeo de "Harmonização hoje" > consultório > como chegar (mapa Leaflet) > formulário do WhatsApp.
   Quem pede menos movimento no sistema (reduz) recebe tudo parado. */
(function(){
  if('scrollRestoration' in history)history.scrollRestoration='manual';
  var WA='5531991169590';
  var reduz=matchMedia('(prefers-reduced-motion:reduce)').matches;
  function linkWa(t){return 'https://wa.me/'+WA+'?text='+encodeURIComponent(t)}
  function svg(i){return '<svg class="ic" viewBox="0 0 64 64" aria-hidden="true">'+i+'</svg>'}

  /* Textos e fotos dos procedimentos ficam em js/conteudo.js */
  var P=window.LA.P,FOTO=window.LA.FOTO,ORDEM=window.LA.ORDEM;

  function porId(id){for(var i=0;i<P.length;i++)if(P[i].id===id)return i}

  /* Monta mosaico, chips, pontos e opções do formulário */
  var lista=document.getElementById('fazLista'),chips=document.getElementById('chips'),foto=document.getElementById('mapaFoto'),sel=document.getElementById('f-int'),painel=document.getElementById('painel');
  /* Mosaico em colunas desencontradas: cada coluna desce num ritmo na rolagem.
     a = alto, m = médio, b = baixo; o "arco" repete o espelho do consultório. */
  var COLS={
    largo:[[['labios','a arco'],['face','m']],[['botox','m'],['rino','a arco']],[['bio','b'],['pdrn','a']],[['skin','a arco'],['pele','m']]],
    estreito:[[['labios','a arco'],['bio','m'],['face','m'],['pdrn','a arco']],[['botox','m'],['skin','a arco'],['rino','m'],['pele','m']]]
  };
  var VEL={largo:[0,-70,40,-110],estreito:[0,-40]},mqMos=matchMedia('(min-width:760px)'),modo='',colunas=[];
  function montaMosaico(){
    var m=mqMos.matches?'largo':'estreito';if(m===modo)return;var primeira=!modo;modo=m;
    lista.innerHTML='';colunas=[];
    COLS[m].forEach(function(col,c){
      var ul=document.createElement('li');ul.className='mos-col';ul.innerHTML='<ul></ul>';var dentro=ul.firstChild;
      col.forEach(function(t,k){
        var id=t[0],n=porId(id),p=P[n],f=FOTO[id],li=document.createElement('li');
        li.className='tile '+t[1].split(' ').map(function(x){return 't-'+x}).join(' ');
        li.dataset.r='cortina';li.style.setProperty('--d',(c*.08+k*.12)+'s');if(!primeira)li.classList.add('in');
        li.innerHTML='<button class="tile-btn" type="button" data-vai="'+n+'" aria-label="Ver detalhes de '+p.t+'"><img src="assets/fotos/faz-'+id+'.webp" loading="lazy" alt="'+f.a+'"><span class="tile-mais" aria-hidden="true"></span><span class="tile-txt"><span class="tile-nome">'+p.t+'</span><span class="tile-sub">'+p.c+'</span><span class="tile-ver">Ver detalhes<svg><use href="#i-seta"/></svg></span></span></button>';
        dentro.appendChild(li);
      });
      lista.appendChild(ul);colunas.push(ul);
    });
    rolaMosaico();
  }
  function rolaMosaico(){
    if(reduz)return;var r=lista.getBoundingClientRect();if(r.bottom<-200||r.top>innerHeight+200)return;
    var k=(innerHeight-r.top)/(innerHeight+r.height)-.5;
    colunas.forEach(function(c,i){c.style.transform='translateY('+(k*VEL[modo][i]).toFixed(1)+'px)'});
  }
  montaMosaico();
  mqMos.addEventListener?mqMos.addEventListener('change',montaMosaico):mqMos.addListener(montaMosaico);
  var mosPend=false;addEventListener('scroll',function(){if(!mosPend){mosPend=true;requestAnimationFrame(function(){mosPend=false;rolaMosaico()})}},{passive:true});
  P.forEach(function(p,n){
    var c=document.createElement('button');c.className='chip';c.type='button';c.setAttribute('role','tab');c.textContent=p.t;c.dataset.p=n;chips.appendChild(c);
    if(p.x){
      var b=document.createElement('button');b.className='ponto';b.type='button';b.dataset.p=n;b.style.left=p.x+'%';b.style.top=p.y+'%';
      b.setAttribute('aria-label',p.z+': '+p.t);b.innerHTML='<i>'+p.z+'</i>';foto.appendChild(b);
    }
    var o=document.createElement('option');o.value=p.t;o.textContent=p.t;sel.appendChild(o);
  });

  var veu=document.getElementById('veu');

  /* Mapa do rosto: cada procedimento tem uma região desenhada em dourado, um zoom e uma luz.
     Coordenadas em pixels da foto (1080x837). z = zoom, l = abertura da luz. */
  var OVAL='<path d="M558 138C684 140 756 262 752 402C748 542 664 652 558 658C452 652 374 542 372 402C370 262 432 136 558 138Z"/>';
  var ZONA={
    labios:{x:549,y:548,z:2,l:9,d:'<path d="M478 546C505 512 530 514 549 522C568 512 595 510 620 538C598 572 575 582 549 582C522 582 500 574 478 546Z"/>'},
    botox:{x:545,y:245,z:1.7,l:13,d:'<path d="M438 205Q545 178 652 205"/><path d="M452 240Q545 216 640 240"/><path d="M527 282L533 304"/><path d="M563 282L557 304"/>'},
    bio:{x:560,y:520,z:1.3,l:22,d:'<path d="M392 465C408 560 470 632 556 652C642 640 702 570 726 465"/>'},
    skin:{x:556,y:435,z:1.5,l:18,d:'<ellipse cx="445" cy="440" rx="58" ry="46"/><ellipse cx="668" cy="425" rx="58" ry="46"/>'},
    face:{x:548,y:455,z:1.45,l:18,d:'<path d="M392 432Q426 458 472 446"/><path d="M612 440Q658 450 702 404"/><path d="M518 640Q556 657 596 638"/>'},
    rino:{x:540,y:400,z:1.9,l:10,d:'<path d="M526 318C526 368 518 408 500 440C516 470 560 472 582 444"/>'},
    pdrn:{x:560,y:410,z:1.15,l:30,d:OVAL,gotas:true},
    pele:{x:560,y:410,z:1.15,l:30,d:OVAL}
  };
  var GOTAS=(function(){var s='',k=0;[[445,440],[668,425]].forEach(function(c){for(var x=-66;x<=66;x+=22)for(var y=-52;y<=52;y+=22){if((x*x)/4900+(y*y)/3000>1)continue;s+='<circle class="gota" style="--k:'+(k++)+'" cx="'+(c[0]+x+(y%44?11:0))+'" cy="'+(c[1]+y)+'" r="3.5"/>'}});return s})();

  var cena=foto,giro=document.getElementById('mapaGiro'),zonas=document.getElementById('zonas'),marca=document.getElementById('chipMarca'),barra=document.getElementById('barra'),conta=document.getElementById('conta'),pIn=document.getElementById('painelIn');
  var atual=-1;
  function foca(id){
    var zn=ZONA[id],z=zn.z,px=zn.x/10.8,py=zn.y/8.37;
    var tx=Math.min(0,Math.max(100*(1-z),50-z*px)),ty=Math.min(0,Math.max(100*(1-z),50-z*py));
    cena.style.setProperty('--z',z);
    cena.style.transform='translate('+tx+'%,'+ty+'%) scale('+z+')';
    cena.style.setProperty('--lx',px+'%');cena.style.setProperty('--ly',py+'%');cena.style.setProperty('--lr',zn.l+'%');
    var velho=zonas.querySelector('g');if(velho){velho.classList.add('sai');setTimeout(function(){velho.remove()},500)}
    var g=document.createElementNS('http://www.w3.org/2000/svg','g');
    g.innerHTML=zn.d+(zn.gotas?GOTAS:'');
    g.querySelectorAll('path,ellipse').forEach(function(el,k){el.setAttribute('pathLength','1');el.classList.add('traco');el.style.setProperty('--k',k)});
    zonas.appendChild(g);
  }
  function moveMarca(c,suave){
    marca.style.transition=suave?'':'none';
    marca.style.width=c.offsetWidth+'px';marca.style.height=c.offsetHeight+'px';
    marca.style.transform='translate('+c.offsetLeft+'px,'+c.offsetTop+'px)';
  }
  function seleciona(n,volta){
    if(n===atual)return;
    if(volta===undefined)volta=n<atual;
    var primeira=atual<0;atual=n;var p=P[n];
    var novo=pIn.cloneNode(false);novo.style.setProperty('--dx',(volta?-40:40)+'px');
    novo.innerHTML=svg(p.i)+'<h3>'+p.t+'</h3><p>'+p.r+'</p><ul>'+p.l.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul>'+(p.n?'<p class="painel-nota">'+p.n+'</p>':'')+'<a class="btn btn-bordo" target="_blank" rel="noopener" href="'+linkWa('Olá, Dra. Letícia! Gostaria de agendar uma avaliação sobre '+p.t.toLowerCase()+'.')+'"><svg><use href="#i-wa"/></svg>Quero avaliar '+(p.id==='pele'||p.id==='pdrn'?'minha pele':'isso')+'</a>';
    Array.prototype.forEach.call(novo.children,function(el,k){el.style.setProperty('--k',k)});
    novo.querySelectorAll('li').forEach(function(el,k){el.style.setProperty('--k',k)});
    novo.querySelectorAll('.ic *').forEach(function(el){el.setAttribute('pathLength','1')});
    pIn.parentNode.replaceChild(novo,pIn);pIn=novo;
    conta.textContent=(n+1)+' de '+P.length;
    chips.querySelectorAll('.chip').forEach(function(c){
      var on=+c.dataset.p===n;c.setAttribute('aria-selected',on);c.tabIndex=on?0:-1;
      if(!on)return;
      moveMarca(c,!primeira);
      if(chips.scrollWidth>chips.clientWidth)chips.scrollTo({left:c.offsetLeft-24,behavior:reduz?'auto':'smooth'});
    });
    foto.querySelectorAll('.ponto').forEach(function(b){b.setAttribute('aria-pressed',+b.dataset.p===n)});
    foca(p.id);
    barra.style.animation='none';void barra.offsetWidth;barra.style.animation='';
  }
  function anda(d){seleciona((atual+d+P.length)%P.length,d<0)}

  /* Tour automático: passa sozinho enquanto a seção está na tela e para no primeiro toque da pessoa */
  var mapa=document.getElementById('procedimentos'),auto=!reduz;
  if(auto)painel.classList.add('auto');
  function assume(){if(!auto)return;auto=false;painel.classList.remove('auto');pIn.setAttribute('aria-live','polite')}
  barra.addEventListener('animationend',function(){if(auto)anda(1)});
  if('IntersectionObserver' in window)new IntersectionObserver(function(es){painel.classList.toggle('ver',es[0].isIntersecting)},{threshold:.45}).observe(mapa);
  [painel,giro].forEach(function(el){
    el.addEventListener('mouseenter',function(){painel.classList.add('pausa')});
    el.addEventListener('mouseleave',function(){painel.classList.remove('pausa')});
  });

  seleciona(0);
  chips.addEventListener('click',function(e){var b=e.target.closest('.chip');if(b){assume();seleciona(+b.dataset.p)}});
  chips.addEventListener('keydown',function(e){
    var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(!d)return;
    e.preventDefault();assume();anda(d);chips.querySelector('[aria-selected=true]').focus();
  });
  foto.addEventListener('click',function(e){var b=e.target.closest('.ponto');if(b){assume();seleciona(+b.dataset.p)}});
  document.getElementById('ant').addEventListener('click',function(){assume();anda(-1)});
  document.getElementById('prox').addEventListener('click',function(){assume();anda(1)});
  addEventListener('resize',function(){var c=chips.querySelector('[aria-selected=true]');if(c)moveMarca(c,false)});

  /* Arrastar o painel para o lado no celular */
  var sx=0,sy=0,toque=false;
  painel.addEventListener('pointerdown',function(e){if(e.pointerType==='mouse')return;toque=true;sx=e.clientX;sy=e.clientY});
  painel.addEventListener('pointercancel',function(){toque=false});
  painel.addEventListener('pointerup',function(e){
    if(!toque)return;toque=false;var dx=e.clientX-sx,dy=e.clientY-sy;
    if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.4){assume();anda(dx<0?1:-1)}
  });

  /* A foto inclina de leve acompanhando o mouse */
  if(!reduz){
    giro.addEventListener('pointermove',function(e){
      if(e.pointerType!=='mouse')return;
      var r=giro.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      giro.style.transform='rotateY('+(x*7)+'deg) rotateX('+(-y*7)+'deg)';
    });
    giro.addEventListener('pointerleave',function(){giro.style.transform=''});
  }
  /* Modal de cada procedimento */
  var modal=document.getElementById('modal'),mImg=document.getElementById('mod-img'),mTxt=document.getElementById('mod-txt'),mCta=document.getElementById('mod-cta'),mProx=document.getElementById('mod-prox'),mFec=modal.querySelector('.modal-fechar'),mOrigem=null,mAberto=false,mPos=0;
  function preenche(k,volta){
    mPos=k;var n=porId(ORDEM[k]),p=P[n],f=FOTO[ORDEM[k]],prox=P[porId(ORDEM[(k+1)%ORDEM.length])];
    mImg.src='assets/fotos/faz-'+ORDEM[k]+'.webp';mImg.alt=f.a;
    var novo=mTxt.cloneNode(false);novo.className='modal-txt'+(volta?' volta':'');
    novo.innerHTML='<h2 id="mod-tit">'+p.t+'</h2><p>'+p.r+'</p><ul>'+p.l.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul>'+(p.n?'<p class="modal-nota">'+p.n+'</p>':'');
    mTxt.parentNode.replaceChild(novo,mTxt);mTxt=novo;
    mCta.href=linkWa('Olá, Dra. Letícia! Gostaria de agendar uma avaliação sobre '+p.t.toLowerCase()+'.');
    mProx.textContent='Próximo: '+prox.t;
    modal.scrollTop=0;
  }
  function abreModal(b){
    mOrigem=b;mAberto=true;preenche(ORDEM.indexOf(P[+b.dataset.vai].id));
    modal.hidden=false;veu.hidden=false;document.body.classList.add('travado');
    requestAnimationFrame(function(){requestAnimationFrame(function(){modal.classList.add('on');veu.classList.add('on');mFec.focus()})});
  }
  function fechaModal(){
    if(!mAberto)return;mAberto=false;
    modal.classList.remove('on');veu.classList.remove('on');document.body.classList.remove('travado');
    setTimeout(function(){modal.hidden=true;veu.hidden=true},reduz?0:700);
    if(mOrigem)mOrigem.focus({preventScroll:true});
  }
  lista.addEventListener('click',function(e){var b=e.target.closest('[data-vai]');if(b)abreModal(b)});
  mFec.addEventListener('click',fechaModal);
  mProx.addEventListener('click',function(){preenche((mPos+1)%ORDEM.length)});
  addEventListener('keydown',function(e){
    if(!mAberto)return;
    if(e.key==='Escape')return fechaModal();
    if(e.key==='ArrowRight')return preenche((mPos+1)%ORDEM.length);
    if(e.key==='ArrowLeft')return preenche((mPos-1+ORDEM.length)%ORDEM.length,true);
    if(e.key==='Tab'){
      if(e.shiftKey&&document.activeElement===mFec){e.preventDefault();mProx.focus()}
      else if(!e.shiftKey&&document.activeElement===mProx){e.preventDefault();mFec.focus()}
    }
  });

  /* Divisas em onda entre as seções: a de cima cai em curva sobre a de baixo e balança devagar */
  var ONDA_A=['M0 0C300 120 1140 120 1440 0V120H0Z','M0 14C380 128 1080 96 1440 4V120H0Z','M0 4C260 100 1180 132 1440 12V120H0Z'];
  var ONDA_B=['M0 0C340 86 1100 86 1440 0V120H0Z','M0 6C300 98 1120 70 1440 14V120H0Z','M0 12C420 70 1060 100 1440 2V120H0Z'];
  function vai(v,k){return v.slice(k).concat(v.slice(0,k),[v[k]]).join(';')}
  function anima(v,k,dur){return reduz?'':'<animate attributeName="d" dur="'+dur+'s" repeatCount="indefinite" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1;.45 0 .55 1" values="'+vai(v,k)+'"/>'}
  document.querySelectorAll('[data-onda]').forEach(function(o,n){
    var cor='var(--'+o.dataset.onda+')',linha=ONDA_A.map(function(d){return d.replace('V120H0Z','')});
    o.setAttribute('aria-hidden','true');
    o.innerHTML='<svg viewBox="0 0 1440 120" preserveAspectRatio="none"'+(o.hasAttribute('data-vira')?' style="transform:scaleX(-1)"':'')+'>'
      +'<path fill="'+cor+'" opacity=".45" d="'+ONDA_B[n%3]+'">'+anima(ONDA_B,n%3,11)+'</path>'
      +'<path fill="'+cor+'" d="'+ONDA_A[0]+'">'+anima(ONDA_A,0,9)+'</path>'
      +'<path class="onda-fio" d="'+linha[0]+'">'+anima(linha,0,9)+'</path></svg>';
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

  /* Abertura: a logo se desenha no centro da tela e desliza para trás da foto */
  var ent=document.getElementById('inicio'),logo=document.getElementById('logoG'),img=ent.querySelector('.figura'),txt=ent.querySelector('.entrada-txt'),wa=document.querySelector('.wa-flutuante');
  function centraLogo(){
    var r=logo.getBoundingClientRect(),alvo=Math.min(innerWidth*.62,innerHeight*.5);
    logo.style.setProperty('--lx',(innerWidth/2-(r.left+r.width/2))+'px');
    logo.style.setProperty('--ly',(innerHeight/2-(r.top+r.height/2))+'px');
    logo.style.setProperty('--ls',alvo/r.width);
  }
  function solta(){
    ent.classList.add('pronta');
    logo.style.setProperty('--lx','0px');logo.style.setProperty('--ly','0px');logo.style.setProperty('--ls',1);
    setTimeout(function(){ent.classList.add('solta')},reduz?0:3200);
  }
  function abrir(){
    if(reduz||scrollY>40){solta();return}
    centraLogo();
    requestAnimationFrame(function(){requestAnimationFrame(function(){ent.classList.add('desenha');setTimeout(solta,1500)})});
  }
  if(reduz){var br=document.getElementById('brilho');if(br)br.remove()}
  abrir();

  /* Rolagem: a logo gira de leve, a foto sobe mais devagar e o texto some */
  var pendente=false;
  function rola(){
    pendente=false;
    var y=window.scrollY,h=ent.offsetHeight,k=Math.min(y/h,1);
    if(!reduz&&ent.classList.contains('solta')){
      logo.style.setProperty('--lr',(k*28)+'deg');logo.style.setProperty('--ls',1+k*.18);
      img.style.setProperty('--fy',(k*h*.14)+'px');txt.style.setProperty('--to',Math.max(0,1-k*2));
    }
    wa.classList.toggle('ver',y>h*.7);
  }
  addEventListener('scroll',function(){if(!pendente){pendente=true;requestAnimationFrame(rola)}},{passive:true});
  rola();

  /* Antes e depois */
  var cmp=document.getElementById('compara'),rng=cmp.querySelector('input'),mexeu=false;
  function posCmp(v){cmp.style.setProperty('--pos',v+'%');cmp.style.setProperty('--va',Math.min(1,v/30));cmp.style.setProperty('--vd',Math.min(1,(100-v)/30))}
  rng.addEventListener('input',function(){mexeu=true;posCmp(rng.value)});
  /* Ao aparecer, o controle passeia uma vez para mostrar que dá para arrastar */
  if(!reduz&&'IntersectionObserver' in window){
    var ioCmp=new IntersectionObserver(function(es){
      if(!es[0].isIntersecting)return;ioCmp.disconnect();
      var t0=0,dur=2600;
      setTimeout(function(){requestAnimationFrame(function passo(t){
        if(mexeu)return;if(!t0)t0=t;var k=Math.min(1,(t-t0)/dur);
        var v=50+Math.sin(k*Math.PI*2)*28*(1-k*.3);if(k===1)v=50;
        posCmp(v);rng.value=v;if(k<1)requestAnimationFrame(passo);
      })},700);
    },{threshold:.6});
    ioCmp.observe(cmp);
  }

  /* Carrossel: passa sozinho devagar, com os cartões subindo e descendo numa onda.
     Para no mouse, no toque e no teclado; arrastar continua funcionando. */
  var car=document.getElementById('carrossel'),ini=0,sc=0,desc=false,moveu=0;
  var originais=Array.prototype.slice.call(car.children);
  originais.forEach(function(li){
    var c=li.cloneNode(true);c.setAttribute('aria-hidden','true');c.classList.add('clone');
    c.querySelectorAll('button,a').forEach(function(b){b.tabIndex=-1});car.appendChild(c);
  });
  var itens=Array.prototype.slice.call(car.children),parado=0,carVis=false;
  function metade(){return car.children[originais.length].offsetLeft-originais[0].offsetLeft}
  function dobra(){var m=metade();if(car.scrollLeft>=m){car.scrollLeft-=m;sc-=m}else if(car.scrollLeft<=0){car.scrollLeft+=m;sc+=m}}
  car.addEventListener('pointerdown',function(e){parado=Date.now()+2500;if(e.pointerType!=='mouse')return;desc=true;moveu=0;ini=e.clientX;sc=car.scrollLeft});
  addEventListener('pointermove',function(e){if(!desc)return;var d=e.clientX-ini;moveu=Math.abs(d);if(moveu>6)car.classList.add('puxando');car.scrollLeft=sc-d;dobra()});
  addEventListener('pointerup',function(){if(desc)parado=Date.now()+1500;desc=false;setTimeout(function(){car.classList.remove('puxando')},0)});
  car.addEventListener('dragstart',function(e){e.preventDefault()});
  car.addEventListener('touchmove',function(){parado=Date.now()+2500},{passive:true});
  car.addEventListener('scroll',function(){if(!desc)dobra()},{passive:true});
  var carHover=false;car.addEventListener('mouseenter',function(){carHover=true});car.addEventListener('mouseleave',function(){carHover=false});
  if('IntersectionObserver' in window)new IntersectionObserver(function(es){carVis=es[0].isIntersecting},{rootMargin:'100px'}).observe(car);
  if(!reduz){
    var resto=0;
    (function anima(){
      if(carVis){
        var anda=!carHover&&!desc&&Date.now()>parado&&!car.contains(document.activeElement)&&!aberta;
        if(anda){resto+=.45;var px=Math.floor(resto);if(px){car.scrollLeft+=px;resto-=px;dobra()}}
        var w=innerWidth;
        itens.forEach(function(li){
          var r=li.getBoundingClientRect(),x=(r.left+r.width/2)/w;if(x<-.3||x>1.3)return;
          var f=x*Math.PI*2.2;li.style.transform='translateY('+(Math.sin(f)*22).toFixed(1)+'px) rotate('+(Math.cos(f)*1.6).toFixed(2)+'deg)';
        });
      }
      requestAnimationFrame(anima);
    })();
  }

  /* Gaveta lateral com o vídeo do Instagram */
  var gav=document.getElementById('gaveta'),box=document.getElementById('gavVideo'),tit=document.getElementById('gav-tit'),fec=gav.querySelector('.fechar'),origem=null,aberta=false,vidTok=0;
  function abreVideo(b){
    if(moveu>6)return;
    origem=b;aberta=true;tit.textContent=b.dataset.tit;
    var capa=b.querySelector('img').getAttribute('src'),ig='https://www.instagram.com/reel/'+b.dataset.reel+'/';
    box.innerHTML='<img src="'+capa+'" alt="">';
    /* Se o vídeo estiver em assets/videos/<código do reel>.mp4, ele toca aqui. Senão, vai para o Instagram. */
    var v=document.createElement('video');v.src='assets/videos/'+b.dataset.reel+'.mp4';v.poster=capa;v.controls=true;v.playsInline=true;v.setAttribute('playsinline','');v.preload='auto';
    var tok=++vidTok;
    v.addEventListener('loadeddata',function(){if(!aberta||tok!==vidTok)return;box.innerHTML='';box.appendChild(v);var p=v.play();if(p&&p.catch)p.catch(function(){})},{once:true});
    v.addEventListener('error',function(){if(!aberta||tok!==vidTok)return;box.insertAdjacentHTML('beforeend','<a class="btn btn-rosa" target="_blank" rel="noopener" href="'+ig+'">Assistir no Instagram</a>')},{once:true});
    gav.hidden=false;veu.hidden=false;document.body.classList.add('travado');
    requestAnimationFrame(function(){requestAnimationFrame(function(){gav.classList.add('on');veu.classList.add('on');fec.focus()})});
  }
  function fecha(){
    if(!aberta)return;aberta=false;
    gav.classList.remove('on');veu.classList.remove('on');document.body.classList.remove('travado');
    vidTok++;var vv=box.querySelector('video');if(vv)vv.pause();
    setTimeout(function(){gav.hidden=true;veu.hidden=true;box.innerHTML=''},reduz?0:620);
    if(origem)origem.focus({preventScroll:true});
  }
  document.addEventListener('click',function(e){var b=e.target.closest('[data-reel]');if(!b)return;if(!car.contains(b))moveu=0;abreVideo(b)});
  fec.addEventListener('click',fecha);veu.addEventListener('click',function(){fecha();fechaModal()});
  addEventListener('keydown',function(e){
    if(!aberta)return;
    if(e.key==='Escape')return fecha();
    if(e.key==='Tab'){
      var a=gav.querySelector('.btn');
      if(e.shiftKey&&document.activeElement===fec){e.preventDefault();a.focus()}
      else if(!e.shiftKey&&document.activeElement===a){e.preventDefault();fec.focus()}
    }
  });

  /* Dúvidas: tocar na frase risca o mito em dourado e abre a resposta (uma aberta por vez).
     A primeira se abre sozinha quando a seção aparece, para mostrar como funciona. */
  var mitos=document.getElementById('mitos'),mitoBtns=mitos.querySelectorAll('.mito-btn'),mitoMexeu=false;
  function abreMito(b){
    mitoBtns.forEach(function(x){var on=x===b&&x.getAttribute('aria-expanded')!=='true';x.setAttribute('aria-expanded',on);x.parentNode.classList.toggle('aberto',on)});
  }
  mitos.addEventListener('click',function(e){var b=e.target.closest('.mito-btn');if(b){mitoMexeu=true;abreMito(b)}});
  if('IntersectionObserver' in window){
    var ioMito=new IntersectionObserver(function(es){
      if(!es[0].isIntersecting)return;ioMito.disconnect();
      setTimeout(function(){if(!mitoMexeu)abreMito(mitoBtns[0])},reduz?0:900);
    },{threshold:.3});
    ioMito.observe(mitos);
  } else abreMito(mitoBtns[0]);

  /* Vídeo de "Harmonização hoje": toca sem som quando aparece na tela; o botão liga o som
     e tocar no vídeo pausa ou continua. Sai da tela, pausa. */
  var hv=document.getElementById('hojeVideo');
  if(hv){
    var hvV=hv.querySelector('video'),hvB=hv.querySelector('.hv-som'),hvR=hv.querySelector('.hv-rot'),hvP=hv.querySelector('.hv-barra i');
    function hvToca(){var p=hvV.play();if(p&&p.catch)p.catch(function(){})}
    function hvSom(on){hvV.muted=!on;hvB.setAttribute('aria-pressed',on);hvR.textContent=on?'Pausar':'Ouvir';if(on)hvToca()}
    hvB.addEventListener('click',function(e){e.stopPropagation();if(hvV.muted){hvV.currentTime=0;hvSom(true)}else if(hvV.paused){hvToca();hvR.textContent='Pausar';hvB.setAttribute('aria-pressed','true')}else{hvV.pause();hvR.textContent='Continuar';hvB.setAttribute('aria-pressed','false')}});
    hv.querySelector('.hv-tela').addEventListener('click',function(){hvB.click()});
    hvV.addEventListener('timeupdate',function(){hvP.style.transform='scaleX('+(hvV.currentTime/(hvV.duration||1)).toFixed(3)+')'});
    if('IntersectionObserver' in window&&!reduz){
      new IntersectionObserver(function(es){if(es[0].isIntersecting){hvV.preload='auto';hvToca()}else if(!hvV.paused){hvV.pause();if(!hvV.muted){hvR.textContent='Continuar';hvB.setAttribute('aria-pressed','false')}}},{threshold:.5}).observe(hv);
    } else hvV.preload='metadata';
  }

  /* Consultório: a foto anda dentro do arco e o fio dourado se desenha */
  var consImg=document.getElementById('consImg'),cons=document.querySelector('.cons');
  if('IntersectionObserver' in window){
    var ioCons=new IntersectionObserver(function(es){if(es[0].isIntersecting){cons.classList.add('desenha');ioCons.disconnect()}},{threshold:.3});
    ioCons.observe(cons);
  } else cons.classList.add('desenha');
  if(!reduz)addEventListener('scroll',function(){
    var r=cons.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;
    consImg.style.transform='translateY('+(((innerHeight-r.top)/(innerHeight+r.height)-.5)*-60).toFixed(1)+'px) scale(1.12)';
  },{passive:true});

  /* Como chegar: mapa Leaflet com as cores da marca. Carrega perto da tela, voa da cidade até o
     consultório e só aceita arrastar/zoom depois de um toque, para não prender a rolagem da página. */
  var CONS=[-21.1293609,-44.2385126],cMapa=document.getElementById('chegarMapa'),tela=document.getElementById('mapaTela'),
      ativa=document.getElementById('mapaAtiva'),dist=document.getElementById('mapaDist'),mapa=null,pino=null,voce=null,linha=null,voou=false;
  function css(h){var l=document.createElement('link');l.rel='stylesheet';l.href=h;document.head.appendChild(l)}
  function js(h,cb){var e=document.createElement('script');e.src=h;e.onload=cb;e.onerror=falhou;document.head.appendChild(e)}
  function falhou(){cMapa.classList.add('sem-mapa');tela.innerHTML='<a class="btn btn-bordo" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query='+CONS.join('%2C')+'">Abrir o mapa</a>'}
  function montaMapa(){
    if(mapa||!window.L)return;
    mapa=L.map(tela,{center:[-21.1355,-44.2600],zoom:13,zoomControl:false,scrollWheelZoom:false,dragging:false,touchZoom:false,doubleClickZoom:false,boxZoom:false,keyboard:false,tap:false,attributionControl:true});
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'}).addTo(mapa);
    mapa.attributionControl.setPrefix(false);
    var icone=L.divIcon({className:'',html:'<div class="pino pino-cai"><span class="pino-onda"></span><span class="pino-ponto"><svg viewBox="0 0 400 400" aria-hidden="true"><use href="#logo"/></svg></span></div>',iconSize:[64,72],iconAnchor:[32,66]});
    pino=L.marker(CONS,{icon:icone,keyboard:false,title:'Consultório da Dra. Letícia Arthuso'});
    if(reduz)voa();
  }
  function voa(){
    if(!mapa||voou)return;voou=true;
    if(reduz){mapa.setView(CONS,17);pino.addTo(mapa);return}
    mapa.flyTo(CONS,17,{duration:2.6,easeLinearity:.2});
    mapa.once('moveend',function(){pino.addTo(mapa)});
  }
  function libera(){
    if(!mapa)return;cMapa.classList.add('mapa-livre');
    ['dragging','touchZoom','doubleClickZoom','scrollWheelZoom','keyboard'].forEach(function(h){mapa[h].enable()});
  }
  ativa.addEventListener('click',libera);
  cMapa.querySelector('.mapa-ctrl').addEventListener('click',function(e){
    var b=e.target.closest('button');if(!b||!mapa)return;var z=+b.dataset.z;
    if(z)mapa.setZoom(mapa.getZoom()+z);else if(linha)mapa.flyToBounds(linha.getBounds(),{padding:[60,60],duration:1.2});else mapa.flyTo(CONS,17,{duration:1.2});
  });
  function carrega(){
    if(window.L){montaMapa();return}
    css('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css');
    js('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js',function(){montaMapa();if(perto)voa()});
  }
  var perto=false;
  if('IntersectionObserver' in window){
    var ioPre=new IntersectionObserver(function(es){if(es[0].isIntersecting){carrega();ioPre.disconnect()}},{rootMargin:'700px'});
    ioPre.observe(cMapa);
    var ioVoa=new IntersectionObserver(function(es){if(es[0].isIntersecting){perto=true;voa();if(mapa)ioVoa.disconnect()}},{threshold:.45});
    ioVoa.observe(cMapa);
  } else {perto=true;carrega()}
  /* distância em linha reta até quem está vendo (só se a pessoa permitir a localização) */
  var bDist=document.getElementById('distancia');
  bDist.addEventListener('click',function(){
    if(!navigator.geolocation){bDist.textContent='Seu navegador não informa a localização';return}
    bDist.textContent='Procurando você…';
    navigator.geolocation.getCurrentPosition(function(p){
      var eu=[p.coords.latitude,p.coords.longitude];
      bDist.textContent='Ver a distância até você';
      if(!mapa)return;
      var km=mapa.distance(eu,CONS)/1000;
      if(voce)voce.remove();if(linha)linha.remove();
      voce=L.marker(eu,{icon:L.divIcon({className:'',html:'<span class="voce"></span>',iconSize:[18,18],iconAnchor:[9,9]}),keyboard:false}).addTo(mapa);
      linha=L.polyline([eu,CONS],{color:'#9A6E2B',weight:2.5,dashArray:'2 8',lineCap:'round'}).addTo(mapa);
      if(!pino._map)pino.addTo(mapa);voou=true;
      mapa.flyToBounds(linha.getBounds(),{padding:[70,70],maxZoom:17,duration:1.6});
      dist.innerHTML=(km<1?Math.round(km*1000)+' m':km.toLocaleString('pt-BR',{maximumFractionDigits:1})+' km')+' até o consultório<small>em linha reta, a partir de onde você está</small>';
      dist.hidden=false;
    },function(){bDist.textContent='Não consegui sua localização'},{enableHighAccuracy:true,timeout:10000});
  });
  var copiar=document.getElementById('copiar');
  copiar.addEventListener('click',function(){
    var t='Av. Josué de Queirós, 349, Matozinhos, São João del Rei/MG';
    function ok(){copiar.textContent='Endereço copiado';copiar.classList.add('ok');setTimeout(function(){copiar.textContent='Copiar endereço';copiar.classList.remove('ok')},2400)}
    if(navigator.clipboard)navigator.clipboard.writeText(t).then(ok,function(){copiar.textContent=t});else copiar.textContent=t;
  });

  /* Formulário abre o WhatsApp com a mensagem pronta */
  var form=document.getElementById('form'),nome=document.getElementById('f-nome'),erro=document.getElementById('f-erro');
  nome.addEventListener('input',function(){erro.hidden=true;nome.removeAttribute('aria-invalid')});
  form.addEventListener('submit',function(e){
    e.preventDefault();var n=nome.value.trim();
    if(!n){erro.hidden=false;nome.setAttribute('aria-invalid','true');nome.focus();return}
    var t='Olá, Dra. Letícia! Meu nome é '+n+'. '+(sel.value?'Gostaria de agendar uma avaliação sobre '+sel.value.toLowerCase()+'.':'Gostaria de orientação para agendar uma avaliação.');
    var url=linkWa(t),janela=window.open(url,'_blank');
    if(janela)janela.opener=null;else location.href=url;
  });
})();
