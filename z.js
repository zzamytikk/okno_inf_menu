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
  y: 50,//px Отступ Верх/Низ
  /*  s: {number},//Сторона поивления
      s:undefined,//Окно полностью закрыто
  */
  /* 
  Oinf.$({//Запуск
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
    
    if($(O.id)[0]) {//Открыто
      
    } else {//Закрыто полностью! Создаём
      O.s=!q.s || q.s%2?'left':'right';//Сторона поивления
      
      $('body').append(//Создаём html
        $('<div id="'+O.id.replace('#','')+'">').css({
          [q.s<3?'top':'bottom']: O.y,//px Отступ Верх/Низ
          [O.s]: '-102%'//Скрываем анимацию
        })
      );
  
      O.sms.$(q, $(O.id));//Добовляем сообщение
  
      setTimeout(() => {//Задержка для начала анимации открытия
        $(O.id).css({//Открываем
          opacity:1,
          [O.s]: 0//Открываем анимацию
        });
      }, 50);
    }
  },
  sms: {//Добовляем/Удоляем сообщение
    /* Oinf.sms(
      q,//Настройки
      b //$(#Oinf)
    ); */
    $: (q, b) => {//Добовляем сообщение
      b.append('<div>'+q.t+'</div>');
    },
    X: q => {//Удоляем сообщение
      
    }
  },
  /* Oinf.X(); */
  X: () => {//Закрываем окно
    $(Oinf.id).css({//анимация
      opacity: 0,
      [Oinf.s]: '-102%'
    });
    T = setTimeout(() => {//Удалим полностью
      $(Oinf.id).remove();
    }, 350);
  }
};
console.log(
  typeof $('#Oinf'),
  3%2?'left':'right'
);