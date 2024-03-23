/*  ✪ https://zam.usite.pro/publ/
    ✫ Версия 1.0.0
    © Copyright Плюшки для сайтов 2023
*/
var Oinf = {
  id: '#Oinf',//<div id="Oinf"></div>
  Z: 'Уведомления',//Заголовок
  y: '1.5rem',// Отступ Верх || Низ
  //y: 40,      //px {number}
  //y: '2.5rem',//{string}
  S: 1,//Сторона поивления окна по умолчанию
  /* 1, //•Верх слева
     2, //•Верх справа
     3, //•Низ слева
     4, //•Низ справа */
  v: [//сек задержка
    15,//сек •Ошибка     •Красный   ✗
    10,//сек •Хорошо     •Зелёный   ✓
    15,//сек •Сообшение  •Жёлтый    ✉ 
    15 //сек •Оповещение •Оранжевый ⚠
  ],
  d: 30,//сек до автозакрытие окна (При 30 секундном бездействии окна) Новое смс обновит тайме
  /*  При старте программы создаётся переменная:
        s: {string},//Сторона поивления (left/right)
        s:undefined,//Окно полностью закрыто
  */
  /*
  Oinf.$({//★ Добавляем сообщение:
    id: {string}, //*id сообщения || 
      id: 'html',   //•id Для удаления сообщений || Замена на новое

    x: {number},//*Автозакрытие/Тип смс
           //           •Через:   •Цвет:
      x: 0,//✗ Ошибка     •15сек    •Красный
      x: 1,//✓ Хорошо     •10сек    •Зелёный
      x: 2,//✉ Сообшение  •15сек    •Жёлтый
      x: 3,//★ Оповещение •15сек    •Оранжевый 
      x: undefined,//•Загрузка (Закрываем сами через Oinf.sms.X())
    
    s: {number}, //*Сторона поивления
      s: 1, //•Верх слева
      s: 2, //•Верх справа
      s: 3, //•Низ слева
      s: 4, //•Низ справа
      s: undefined, //• S:3; по умолчанию
  
    t: {string/html}, //*Содержание сообщения
      t: '<b>Загрузка</b>', //•
        ° <i> = Выделит текст синим
  });
    Oinf.$('html');//★ Удоляем сообщение!
    ////Oinf.$(undefined);//Не реагирует! if(q){...}
  */
  $: q => {//Запуск
    //if (q) {//q = undefined => Не реагируем!
      let O = Oinf;//Сократим
      console.error(typeof q == 'string'?'ЗАКРЫВАЕМ! Oinf.$('+q+');':'СТАРТУЕМ! Oinf.$();', typeof q == 'string'?'':q);
      
      if(q.t && q.id){//Текст сообщения && id сообщения
        if($(O.id)[0]) {//Окно открыто
          console.error('Окно открыто! Всего смс:', $(O.id+' > div[data-oinf]').length);
          O.sms.$(q);//Добовляем сообщение
        } else {//Окно закрыто полностью! Создаём
          O.s=(q.s || (q.s = O.S))%2?'left':'right';//Сторона поивления
          console.error('Создаём окно! css({ '+(q.s<3?'top':'bottom')+': '+O.y+', '+O.s+': -100% })');
  
          $('body').append(//Создаём html
          $('<div id="'+O.id.replace('#','')+'">')
            .css({
              [q.s<3?'top':'bottom']: O.y,//px Отступ Верх/Низ
              [O.s]: '-100%'//Скрываем анимацию
            }).html('<h3>'+O.Z+'</h3>')//Заголовок
          );
    
          O.sms.$(q, 1);//Добовляем сообщение
    
          setTimeout(() => {//Задержка для начала анимации открытия
            $(O.id).css({[O.s]: -1});
          }, 1);
        }
      } else if(typeof q == 'string') {//Удоляем сообщение!
        O.sms.X(q);
      } else {
        console.error('if(q.t['+q.t+'] && ['+q.id+']q.id)//Текст сообщения && id сообщения');
      }
    //}
  },
  sms: {//Добовляем/Удоляем сообщение
    //T:0,//clearTimeout Автозакрытие окна через 30сек
    /* Oinf.sms.$(
      q//Настройки
    );
    Oinf.sms.$(Запуск из Oinf.$
      q,//Настройки
      1 //Первое открытие окна (Убераем анимацию поивления сообщения)
    ); */
    $: function(q,X) {//Добовляем сообщение?. || Заменим на новое
      console.error('Oinf.sms.$(); Начинаем добавлять сообщение!'+(X?' Запуск из Oinf.$':''), q);
      
      let O = Oinf, r, b;//Сократим
      clearTimeout(O.T);//Отмена удаление окна
      clearTimeout(this.T);//Автозакрытие окна через 30сек

      if ($(O.id+' > [data-oinf="'+q.id+'"]')[0]) {//Нашли старое сообшение
        console.error('Нашли старое сообшение! Удалим его.');
        this.X(q.id, 1);//Удалим без закрытия окна
        r=1;//Не закрывали окно
      }

      if(!r && !X && !$(O.id+' > div[data-oinf]')[0]){//0 смс! удалили последнее
        console.error('Вернём окно! Стало смс', $(O.id+' > div[data-oinf]').length);
        b=$(O.id).css({[O.s]: -1})//Вернём окно
          .children('div').not('[data-oinf]');//Нашли старое смс
        this.aX(b);//Анимация закрытия смс и удоление.
      }

      $(O.id).append(//Добавляем сообщение
        $('<div>').attr({
          class: 'Oinf'+(q.x>=0?q.x:'L'),
          'data-oinf': q.id
        }).css({[O.s]: X?0:'-100%', filter:'blur('+(X?0:20)+'px)'})//left || right, Показываем первое сообщение
          .html('<div'+(X?' style="display:block"':'')+'>'+q.t+'</div>'+(q.x>=0?'<span></span>':''))
          //display: block;//Для 1-го открытия окна
      );
      console.error('+1 сообщение! Всего смс:', $(O.id+' > div[data-oinf]').length);
      Oinf.A.$(q, b=$(O.id+' > [data-oinf="'+q.id+'"]').eq(-1));//Автозакрытие сообщений

      if(!X){//Не первое сообщение
        setTimeout(() => {//Поивление сообщения. анимации
          b.css(O.s, 0)//left || right
            .children('div').show(300)
            .parent().css('filter','blur(0)')
        },1);
      }
      
      this.T=setTimeout(() => {//Автозакрытие окна через 30сек
        console.error('!!! Сработало принудительное закрытие окна! 30сек');
        O.X();//Закрываем окно с удалением его
      }, O.d+'000');
    },
    /* Oinf.sms.X(//Удоляем сообщение
      'load'//id сообщения
    );
    Oinf.sms.X(//Запускается из Oinf.sms.$
      '{string,$()}', //id сообщения
      1, //Не закрывать окно. Заменим старое смс на новое
    ); */
    X: (i, x) => {//Удоляем сообщение
      let O = Oinf,//Сократим
        b = $(O.id+' > [data-oinf="'+i+'"]').eq(0);//Поиск сообщения для удаления
      
      console.error('Oinf.sms.X(); Начинаем удоления сообщения data-oinf='+i+'! Всего смс:', $(O.id+' > div[data-oinf]').length);
      
      if(b[0]){//Нашли сообщение для удаления
        b.removeAttr('data-oinf');
        if(O.A.a[i]){//Остановим автосмс
          console.error('Остановим автосмс', O.A.a);
          clearTimeout(O.A.a[i]);
          delete O.A.a[i];
        }

        if(!x && !$(O.id+' > div[data-oinf]')[0]){//Последние сообщение удаляем
          O.X();//Закроем всё окно
        } else {//-1
          O.sms.aX(b);//Анимация закрытия смс и удоление.
        }
      }else{
        console.error('Не нашли смс data-oinf='+i);
      }
    },
    /* Oinf.sms.aX(//Анимация закрытия смс и удоление.
      $('id')//id смс
    );
    O.sms.aX(b);//Анимация закрытия смс и удоление. */
    aX: b => {//Анимация закрытия смс и удоление.
      console.error('-1 сообщение. Всего смс:', $(Oinf.id + ' > div[data-oinf]').length);

      b=(b.css('padding',0)//Убераем тря
        .children('div')).animate({height:0},600, () => {
        b.animate({width:0},600, () => {
          b.parent().remove();
        })
      });
    }
  },
  A:{//Автозакрытие сообщений
    a: { //Список действующих сообщений
      //id смс: setTimeout Для остановки и замены смс
      //'errsms': 0
    },
    /*
      Oinf.A.$(//Автозакрытие сообщений
        q,//Настройки
        b//$() id до смс
      );
      a: 0,//✗ Ошибка     •15сек    •Красный
      a: 1,//✓ Хорошо     •10сек    •Зелёный
      a: 2,//✉ Сообшение  •10сек    •Жёлтый
      a: 3,//⚠ Оповещение •15сек    •Оранжевый
    */
    $: function (q,b) {
      let O=Oinf, S=this;

      if(O.v[q.x]){//смс для автозакрытия
        clearTimeout(S.a[q.id]);
        console.error('Oinf.A.$(); Автозакрытие сообщений! id для записи='+q.id+'. Установим задержку на', O.v[q.x],'сек.');
        
        setTimeout(() => {
          b.children('span').css({transition: (O.v[q.x]+2)+'s',height:0,'border-color':'#f00'});
        }, 1);
        
        S.a[q.id]=setTimeout(()=>{//Удалим через
          delete S.a[q.id];
          Oinf.sms.X(q.id);//Удоляем сообщение
          console.error('Список автоудаления', S.a);
        }, O.v[q.x]+'000');
      }
    }
  },
  //T:0,//clearTimeout
  /* Oinf.X();//Закрываем окно с удалением его */
  X: () => {//Закрываем окно с удалением его
    let O = Oinf;
    console.error('Oinf.X(); Начинаем закрывать окно с удалением его!', $(O.id+' > div[data-oinf]').length);
    
    clearTimeout(O.T);
    clearTimeout(O.sms.T);//Автозакрытие окна через 30сек
    O.T = setTimeout(() => {//Помогает когда окно неуспело открытся и пришло закрыть его
      let x=$(O.id).css({[O.s]: '-100%'})//анимация
      .children('div[data-oinf]')
      .removeAttr('data-oinf');//Корекция для остановки закрытия окна
      
      O.T = setTimeout(() => {//Удалим полностью после закрытия анимации
        $(O.id).remove();
        console.error('Окно удалено!', $(O.id+' > div[data-oinf]').length);
        //O.sms.n=0;
      }, 999);//После закрытия анимации
    }, 999);//Даёт возможность показать быстро закрытое смс и не ломает анимацию закрытия когда окно ещё открывается
  }
};Oinf.$({id:'html',t:'Формирование страницы!'});
