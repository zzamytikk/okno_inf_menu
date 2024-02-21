var z = {
  $:q => {
    //document.querySelectorAll('#id')[0].innerHTML='querySelectorAll';
    //console.error('querySelector', document.querySelector('#id'));//.innerHTML='querySelector';
    //document.getElementById('id').innerHTML='123';
    
    //console.error();
    
    $('#id').html('321');
  }
};//z.$();

var Oinf = {
  id: '#Oinf',//<div id="Oinf"></div>
  y: 50,//px Отступ Верх || Низ
  /*  s: {string},//Сторона поивления (left/right)
      s:undefined,//Окно полностью закрыто
  */
  /* 
  Oinf.$({//Запуск
    i: {string}, //*id сообщения || 
      i: 'load',   //•id Для удаления сообщений || Замена на новое

    a: {number},//*Автозакрытие
           //           •Через:   •Цвет:
      a: 0,//•Ошибка     •15сек    •Красный
      a: 1,//•Хорошо     •10сек    •Зелёный
      a: 2,//•Сообшение  •10сек    •Жёлтый
      a: 3,//•Оповещение •15сек    •Оранжевый
      a: 4,//•
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
    
    if(q.t && q.i){//Текст сообщения && id сообщения
      if($(O.id)[0]) {//Открыто
        O.sms.$(q);//Добовляем сообщение
      } else {//Закрыто полностью! Создаём
        O.s=!q.s || q.s%2?'left':'right';//Сторона поивления
      
        $('body').append(//Создаём html
        $('<div id="'+O.id.replace('#','')+'">').css({
          [q.s<3?'top':'bottom']: O.y,//px Отступ Верх/Низ
          [O.s]: '-102%'//Скрываем анимацию
        })
      );
  
        O.sms.$(q);//Добовляем сообщение
  
        setTimeout(() => {//Задержка для начала анимации открытия
        $(O.id).css({//Открываем
          opacity:1,
          [O.s]: 0//Открываем анимацию
        });
      }, 50);
      }
    }
  },
  sms: {//Добовляем/Удоляем сообщение
    //i: 0,//id сообщений для автоудаления
    /* Oinf.sms(
      q,//Настройки
    ); */
    $: function(q) {//Добовляем сообщение || Заменим на новое
      let O = this;

      if ($(Oinf.id+' > [data-oinf="'+q.i+'"]')[0]) {//Нашли старое сообшение
        O.X(q.i, 1);//Удалим
      }
      $(Oinf.id).append(//Добавляем сообщение
        //'<div class="Oinf'+(q.a>=0?q.a:'L')+'" data-oinf="'+(i || O.i)+'">'+q.t+'</div>'
        $('<div>').attr({
          class: 'Oinf'+(q.a>=0?q.a:'L'),
          'data-oinf': q.i
        }).css(Oinf.s, '-102%')
        .html('<span>'+q.t+'</span>')
      );
      setTimeout(() => {//Для анимации
        $(Oinf.id+' > [data-oinf="'+q.i+'"]')
        .css(Oinf.s, 0)
        .find('span').slideDown(300)
      },50);
    },
    /* Oinf.sms.X(//Удоляем сообщение
      'load'//id сообщения
    );
    Oinf.sms.X(//Запускается из Oinf.sms.$
      '{string}', //id сообщения
      1, //Не закрывать окно
    ); */
    X: (i, x) => {//Удоляем сообщение
      let b=$(Oinf.id+' > [data-oinf="'+i+'"]');//Поиск сообщения
      
      if(b[0]){//Нашли сообщение для удаления
        //Не из Oinf.sms.$ && 1 сообщение
        if(!x && !$(Oinf.id+' > div')[1]) {      //Последние сообщение
          Oinf.X();//Закроем всё окно
        } else {//-1
          b.remove();
        }
      }
    }
  },
  /* Oinf.X();//Закрываем окно с удалением его */
  X: () => {//Закрываем окно с удалением его
    let O = Oinf;

    $(O.id).css({//анимация
      opacity: 0,
      [O.s]: '-102%'
    });
    T = setTimeout(() => {//Удалим полностью
      delete O.sms.i;
      $(O.id).remove();
    }, 350);
  }
};
console.log(
  typeof $('#Oinf'),
  3%2?'left':'right'
);