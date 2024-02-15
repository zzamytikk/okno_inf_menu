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
  /*  s: {number},//Сторона поивления
      s:undefined,//Окно полностью закрыто
  */
  /* 
  Oinf.$({
    s: {number}, //*Сторона поивления
      s: 1, //•Верх слева
      s: 2, //•Верх справа
      s: 3, //•Низ слева
      s: 4, //•Низ справа
      s: undefined, //•Низ слева
  
  }); */
  $: q => {//Запуск
    if($(Oinf.id)[0]) {//Открыто
      
    } else {//Закрыто полностью! Создаём
      Oinf.s=!q.s || q.s%2?'left':'right';//Сторона поивления
      
      $('body').append(//Создаём html
        $('<div id="'+Oinf.id.replace('#','')+'"></div>').css({
          [q.s<3?'top':'bottom']: 90,
          [Oinf.s]: '-102%'
        })
      );
      setTimeout(() => {//Задержка для начала анимации открытия
        $(Oinf.id).css({//Открываем
          opacity:1,
          [Oinf.s]: 0
        });
      }, 50);
    }
  },
  X: () => {//Убрать
    $(Oinf.id).css({//Закрываем окно (анимация)
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