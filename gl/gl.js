var gl = {
  $:() => {//Запуск
    /* gl.m.$({ //Меню
      htm: [ //Список <button>
        { //0
          n: 'Фон Светлый/Тёмный (body)', //Название
          t: '', //Теги <...
    
          
        }
      ]
    }); */
    gl.M.$();//Кнопки перед меню
    
  },
  M: {//Кнопки перед меню
    $: function () {
      let O = this;
      $('header').append('<div id="M">' +
        O.font.t() +//font-size html
        O.bodyS.t() +//Добавим полосу прокрутки
        O.tema.t() +//Смена фона body
        //'<button id="m">☰</button>'+
      '</div>');
      
      O.tema.t$();//Смена фона body click + при загрузке установить body class
      
      $('#font').on('change', function() {
        gl.M.font.$(this); //font-size html
      });
    },
    font: { //font-size html
      $: e => {
        $('html').css('font-size', $(e).val() + 'pt')
      },
      t: () => { //кнопки <select
        let t = '<select id="font">';
    
        [8, 10, 12, 14, 16, 18].forEach(v => {
          t += '<option value="' + v + '"' +
            (v == 12 ? ' selected' : '') + '>' + v;
        });
    
        return t + '</select>'
      }
    },
    bodyS: { //Добавим полосу прокрутки
      $: () => {
        $('body').toggleClass('bodyS');
      },
      t: () => {
        return '<button onclick="gl.M.bodyS.$()">scrol</button>'
      }
    },
    tema: { //Смена фона body
      //e = this <select
      $: function(e) {
        this.c($(e).val()); //Вырезаем из списка class tema[0-9- и заменим на новый
      },
      c: C => { //Вырезаем из списка class tema[0-9- и заменим на новый tema
        localStorage.tema = C;

        let t=($('body').attr('class') || '')
          .replace(/(^| )tema[0-9-]+( |$)/, '$1')
          .replace(/ $/,'');

        $('body').attr('class', (t?t+' ':'') + 'tema'+C);//и заменим на новый
      },
      t: () => {//кнопки <select
        let k, s=localStorage.tema,
          a=[//class,color,name
            ['4-2','012','Тёмно синий'],
            [8,'fff','Белый'],
            [9,'000','Чёрный']
          ], t = '<select id="tema">';

        a.forEach(v => {
          t += '<option value="' + v[0] + '" ' +
            (v[0] == s ? ' selected' : '') + '>'+v[2]
        });

        return t + '</select>'
      },
      t$: () => {//click + при загрузке установить body class
        let l=localStorage.getItem('tema');
        
        if(l){//запись фона
          $('body').addClass('tema'+l)
        }
        
        $('#tema').on('change', function() {
          gl.M.tema.$(this); //Смена фона
        });
      }
    },
  },
  m: { //Меню
    id: '#m', //id <bottom id="m">
    $: function(q) { //Создаём
      let O = this,
        t = '';

      $(O.id).click(e => { shablon.m.X() }); //Открыть/Закрыть

      q.htm.forEach(e => {
        t += '<button>' + e.n + '</button>';
      });

      $('nav').html(t + '<hr>чтото');

    },
    X: q => { //Открыть/Закрыть

    }
  },
  f: {//function
    ls: {//LocalStorage, sessionStorage
      /*
        localStorage.
          • Этот объект один на все вкладки и окна в рамках источника (один и тот же домен/протокол/порт).
          • Данные не имеют срока давности, по которому истекают и удаляются. Сохраняются после перезапуска браузера и даже ОС.
        sessionStorage.
          • Существует только в рамках текущей вкладки браузера.
          • Другая вкладка с той же страницей будет иметь другое хранилище.
          • Но оно разделяется между ифреймами на той же вкладке (при условии, что они из одного и того же источника).
          • Данные продолжают существовать после перезагрузки страницы, но не после закрытия/открытия вкладки.

        localStorage.setItem(key, value) – сохранить пару ключ/значение.
        localStorage.getItem(key) – получить данные по ключу key.  || null
          Для проверки: (! всё {string})
            • if(localStorage.getItem('key')!==null)
            • if(localStorage.getItem('key')==='val')
        localStorage.removeItem(key) – удалить данные с ключом key.
        localStorage.clear() – удалить всё.
        localStorage.key(index) – получить ключ на заданной позиции.
        localStorage.length – количество элементов в хранилище.
          
        Сохраним:
          localStorage.setItem('key', 'val');//val Переделает в {string}
          localStorage.key = 'val';
        
        Получить:
          localStorage.getItem('key');
          localStorage.key;
 
        ---------------
        localStorage.user = JSON.stringify({name: "John"});
        // немного позже
        let user = JSON.parse( localStorage.user );
        alert( user.name ); // John
        // для JSON.stringify добавлены параметры форматирования, чтобы объект выглядел лучше
        alert( JSON.stringify(localStorage, null, 2) );
      */
    }
  }
};
