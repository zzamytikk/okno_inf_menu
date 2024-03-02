var Oinf = {
  id: '#Oinf',//<div id="Oinf"></div>
  Z: 'Уведомления',//Заголовок
  y: '1.5rem',// Отступ Верх || Низ
  /*y: 40,      //px {number}
    y: '2.5rem',//{string} */
  /*  s: {string},//Сторона поивления (left/right)
      s:undefined,//Окно полностью закрыто */
  /*
  Oinf.$({//Запуск
    i: {string}, //*id сообщения || 
      i: 'load',   //•id Для удаления сообщений || Замена на новое

    a: {number},//*Автозакрытие
           //           •Через:   •Цвет:
      a: 0,//✗ Ошибка     •15сек    •Красный
      a: 1,//✓ Хорошо     •10сек    •Зелёный
      a: 2,//✉ Сообшение  •10сек    •Жёлтый
      a: 3,//⚠ Оповещение •15сек    •Оранжевый
      a: 4,//★ 
      a: undefined,//•Загрузка (Закрываем сами через Oinf.sms.X())
    
    s: {number}, //*Сторона поивления
      s: 1, //•Верх слева
      s: 2, //•Верх справа
      s: 3, //•Низ слева
      s: 4, //•Низ справа
      s: undefined, //•Низ слева
  
    t: {string/html}, //*Содержание сообщения
      t: '<b>Загрузка</b>', //•
  }); */
  $: (q={}) => {//Запуск
    let O = Oinf;//Сократим
    console.error('СТАРТУЕМ! Oinf.$();', q);
    
    if(q.t && q.i){//Текст сообщения && id сообщения
      if($(O.id)[0]) {//Окно открыто
        console.error('Окно открыто! Всего смс:', $(O.id+' > div[data-oinf]').length);
        O.sms.$(q);//Добовляем сообщение
      } else {//Окно закрыто полностью! Создаём
        O.s=!q.s || q.s%2?'left':'right';//Сторона поивления
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
          $(O.id).css({//Открываем
            opacity:1,
            [O.s]: -1//Открываем анимацию
          });
        }, 1);
      }
    } else {
      console.error('if(q.t['+q.t+'] && ['+q.i+']q.i)//Текст сообщения && id сообщения');
    }
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
      //clearTimeout(O.T);

      if ($(O.id+' > [data-oinf="'+q.i+'"]')[0]) {//Нашли старое сообшение
        console.error('Нашли старое сообшение! Удалим его.');
        this.X(q.i, 1);//Удалим без закрытия окна
        r=1;//Не закрывали окно
      }

      if(!r && !X && !$(O.id+' > div[data-oinf]')[0]){//0 смс! удалили последнее
        console.error('Вернём окно! Стало смс', $(O.id+' > div[data-oinf]').length);
        clearTimeout(O.T);//Отмена удаление окна
        b=$(O.id).css({[O.s]: -1,opacity: 1})//Вернём окно
          .children('div').not('[data-oinf]');//Нашли старое смс
        this.aX(b);//Анимация закрытия смс и удоление.
      }

      $(O.id).append(//Добавляем сообщение
        $('<div>').attr({
          class: 'Oinf'+(q.a>=0?q.a:'L'),
          'data-oinf': q.i
        }).css(O.s, X?0:'-100%')//left || right
          .html('<div'+(X?' style="display:block"':'')+'>'+q.t+'</div>')
          //display: block;//Для 1-го открытия окна
      );
      console.error('+1 сообщение! Всего смс:', $(O.id+' > div[data-oinf]').length);
      Oinf.A.$(q, b=$(O.id+' > [data-oinf="'+q.i+'"]').eq(-1));//Автозакрытие сообщений

      if(!X){//Не первое сообщение
        setTimeout(() => {//Поивление сообщения. анимации
          b.css(O.s, 0)//left || right
            .find('div').show(600)
        },1);
      }
      
      this.T=setTimeout(() => {//Автозакрытие окна через 30сек
        console.error('!!! Сработало принудительное закрытие окна! 30сек');
        O.X();//Закрываем окно с удалением его
      }, 30000);
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

      b.css(Oinf.s, '-100%')//left/right
        .find('div').animate({width:0, height:0},900, () => {
          b.remove();
        });
    }
  },
  A:{//Автозакрытие сообщений
    /*
    Oinf.A.$(//Автозакрытие сообщений
      q//Настройки
    );
           //           •Через:   •Цвет:
      a: 0,//✗ Ошибка     •15сек    •Красный
      a: 1,//✓ Хорошо     •10сек    •Зелёный
      a: 2,//✉ Сообшение  •10сек    •Жёлтый
      a: 3,//⚠ Оповещение •15сек    •Оранжевый
    */
    a:{//Список действующих сообщений
      //id смс: setTimeout Для остановки и замены смс
      //'errsms': 0
    },
    v: [15,10,10,15],//сек задержка
    $: function (q) {
      let S=this;

      if(S.v[q.a]){//смс для автозакрытия
        clearTimeout(S.a[q.i]);
        console.error('Oinf.A.$(); Автозакрытие сообщений! id для записи='+q.i+'. Установим задержку на', S.v[q.a],'сек.');
        
        S.a[q.i]=setTimeout(()=>{//Удалим через
          delete S.a[q.i];
          Oinf.sms.X(q.i);//Удоляем сообщение
          console.error('Список автоудаления', S.a);
        }, S.v[q.a]+'000');
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
    
    let x=$(O.id).css({//анимация
      opacity: 0,
      [O.s]: '-100%'
    }).children('div[data-oinf]').removeAttr('data-oinf');//Корекция для остановки закрытия окна

    O.T = setTimeout(() => {//Удалим полностью
      //$(O.id).remove();
      console.error('Окно удалено!', $(O.id+' > div[data-oinf]').length);
      //O.sms.n=0;
    }, 600);
  }
};