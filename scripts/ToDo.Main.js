
class element {                                     // Конструктор обьектов ToDo-list
    constructor(id){
        this.src = document.getElementById(id);     // Путь к элементу
        this.display = (value) => {                 // Управление значнием display
            this.src.style.display = value;
        };
        
        this.animate = (fn, time = 100)=>{                  // Метод для анимаций
            setTimeout(()=>{
                fn();                               // fn() = что должно произойти
            },time) //<= Задержка 
        };    //(без неё не работает)  :(

        this.addEvent = (fn, event = "click" )=>{   // Сокращённая запись 
            this.src.addEventListener(event, fn)    // element.addEventListener(event, fn)
        }

        this.contains = ((className) => {           // Проверяет наличие класса у обьекта
            return this.src.classList.contains(className)   
            // Возвращает true если className существует, false если не существует
       });

        this.remove = (className) => {              // Удалить класс у обьектa
            this.src.classList.remove(className);
        };
        this.add = (className) => {                 // Добавить класс к обьекту
            this.src.classList.add(className);
        };
        this.toggle = (className) => {              // Если у обьекта есть класс 
            this.src.classList.toggle(className);   // с именем "className", то удаляет
        };                                          // если нет, то добавляет класс "className"
    }
};

class SmartElement extends element {                // Класс панелей ToDo-list
    constructor( id, classForAction = null){
        // id(Адрес панели) classForAction(класс для закрытия,или любого динамического взаимодействия(не обязательно именно для "закрытия")) 
        super(id);          // Передаём аргументы Классу-Родителю

        this.classForAction = classForAction;       // Класс для динамического взаимодействия

        this.removeAction = (classForAction)=>{     // Синтаксический сахар     
            this.remove(classForAction);            // для упрощения читаемости
            this.display('block');
        };
        this.addAction = ()=>{                      // Синтаксический сахар 
            this.add(classForAction);               // для упрощения читаемости
            this.display('none');
        };
                            //  ------- Функция для прослушивания кнопок --------//
        this.toggleElement = ()=>{                  // Метод для динамического присвоения/удаления класса обьекта

            if(this.contains(classForAction)){      // Проверяем нет ли у обьекта данного класса
                this.openElement();                 // Если есть - Открываем
                
           } else {                                 // Если данного класса у обьекта не обнаруженн
                 this.closeElement()                // Если нет - Закрываем
           }
        };

        this.openElement = ()=>{
            this.display('block')                   // делаем обьект физическим
                this.animate(()=>{                  // Через метод анимации
        
                    this.remove(classForAction);    // И удаляем класс
            }) 
        };
        
        this.closeElement = ()=>{                   // Решил вынести добавление класса обьекту в оддельный метод       
            this.add(classForAction)                // Добавляем класс
                this.animate(()=>{                  // Затем через задержку
                    
                    this.display('none');           // Удаляем физические свойства
                })  
        }
    }
};
//  ================================= Основные обьекты =============================== //
// -------------------- Секции ----------------------//        Создаём обьекты
const middleSection =  new SmartElement('middle-section', 'middle-section__disable');
const leftSection   =  new SmartElement('left-section','left-section__disable');
const rightSection  =  new SmartElement('right-section','right-section__disable');
// --------- Кнопки управления секциями -------------//
const btnRightTog   =  new element('btn-right-toggle');
// const btnRightBack   =  new element('btn-right-back');
const btnLeftTog   =  new element('btn-left-toggle');
// const btnLeftBack   =  new element('btn-left-back');

function CheckSizeWindow (){                        // проверить размер окна
    if(window.innerWidth >= 1201){                  // Если окно больше 1200
        
        leftSection.openElement();                  
        rightSection.openElement();
} else if (window.innerWidth <= 1200 && window.innerWidth > 650){
        leftSection.openElement();
        rightSection.closeElement();
} else if (window.innerWidth <= 650){
        leftSection.closeElement();
        rightSection.closeElement();
}
}
window.onresize = function(){
    CheckSizeWindow ();
}

window.onload = function(){                          // Основная функция

// ----------- Проверяем размер окна ----------------//
CheckSizeWindow ();
// ----------- Прослушиватели кнопок ----------------//
// --------------- Правая панель --------------------//
btnRightTog.addEvent(()=>{                           // Открытие/закрытие правой панели
   rightSection.toggleElement();                     // По нажатию кнопки
   if(window.innerWidth <= 650){
    middleSection.toggleElement();
   } 
});


// ---------------- Левая панель --------------------//
btnLeftTog.addEvent(()=>{                            // Открытие/закрытие правой панели
    leftSection.toggleElement();                     // По нажатию кнопки 
});

// btnLeftBack.addEvent(()=>{                           // Закрытие правой понели
//     leftSection.closeElement();                      // По нажатию кнопки
// })
// ----------------- Свайпы -------------------------//
let touchXStart = 0;
let touchXEnd = 0;

leftSection.addEvent(event=>{                       // Если свайпнуть влево
    touchXStart = event.changedTouches[0].pageX;    // Запишется кордината
    console.log(1);
    
}, 'touchstart')

leftSection.addEvent(event=>{
    touchXEnd = event.changedTouches[0].pageX;
    if(touchXEnd < touchXStart -100){
        leftSection.closeElement(); 
    } 
}, 'touchend')

rightSection.addEvent(event=>{
    touchXStart = event.changedTouches[0].pageX; 
}, 'touchstart')

rightSection.addEvent(event=>{
    touchXEnd = event.changedTouches[0].pageX;
    if(touchXEnd > touchXStart +100){
        rightSection.closeElement(); 
    } 
    if(window.innerWidth <= 650){
        middleSection.toggleElement();
       } 
}, 'touchend')

}



