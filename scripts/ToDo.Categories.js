class NavElement  {
    constructor(id, icon, title, activeClass='none', subTitile = null){
        
        
        this.id = id;
        this.src = document.getElementById(id);
        this.active = activeClass;
        this.icon = icon;
        this.title = title;
        this.sub = subTitile;

    }
}

class Catigories extends NavElement {
    constructor(obj) {
        super(obj['id'])
        this.id = obj['id']
        this.src = document.getElementById(obj['id'])
        this.title =  obj['title'];
        this.flag =   obj['flag'];
        this.iconId = obj['iconId'];
        this.color = obj['color'];
        this.titleColor = obj['titleColor']

        if(obj['count'] == 0 || obj['count'] == undefined){
            this.count = '';
        } else{
            this.count = obj['count'];
        }

        this.active = 'left__item--active';
        
        this.template = `<div  id="${this.id}" class="left__item active__category" data-color="${this.color}">
                            <div class="item__inner" data-text="${this.titleColor}">
                                <div class="left_item_flag" date-flag="${this.flag}"></div>
                                <svg class="icon__left_section">
                                    <use xlink:href="#${this.iconId}"></use>
                                </svg>
                                <div class="item__name">${this.title}</div>
                            </div>
                            <div class="item__count">${this.count}</div>
                        </div>`;
    }
}

class UserList extends NavElement {
    constructor(obj) {
        super(obj['id'])
        this.id = obj['id']
        this.src = document.getElementById(obj['id'])
        this.title =  obj['title'];

        if(obj['count'] == 0 || obj['count'] == undefined){
            this.count = '';
        } else{
            this.count = obj['count'];
        }

        this.active = 'left__item__list--active';

        this.template = `<div class="left__item ">
                            <div class="item__inner">
                                <div class="">
                                    <svg class="icon__left_section">
                                        <use xlink:href="#user-list_icon"></use>
                                    </svg>
                                </div>
                                <div class="item__name">${this.title}</div>
                            </div>
                            <div class="item__count">${this.count}</div>
                        </div>`;
    }
    

}

class innerBox {
    constructor(id){
        this.id = id;
        this.addElement = function (item){
            document.getElementById(this.id).innerHTML += item.template
        }
    }
}



const colors = ['dark-blue-major','dark-blue-minor']

                    //       id,                        title,                      FlagColor,            iconId,                ActiveColor,           count 
const DEFCategories = [
                       {'id':'my_day--cat',      'title':'Мой день',       'titleColor':'#fff','flag':'dark-blue-major','iconId':'sun_icon','color':'#f8f9fa','count':0},
                       {'id':'favorit--cat',     'title':'Важно',          'titleColor':'#fff','flag':'dark-blue-major','iconId':'star_icon','color':'dark-blue-minor','count':0},
                       {'id':'planered--cat',    'title':'Запланированно', 'titleColor':'#fff','flag':'dark-blue-major','iconId':'calendar_icon','color':'dark-blue-minor','count':0},
                       {'id':'Assign-2-you--cat','title':'Назначенные вам','titleColor':'#fff','flag':'dark-blue-major','iconId':'user_icon','color':'dark-blue-minor','count':0},
                       {'id':'Tasks--cat',       'title':'Задачи',         'titleColor':'#fff','flag':'dark-blue-major','iconId':'house_icon','color':'dark-blue-minor','count':0}
                      ]

const Categories = [];
const userLists = [];

const innerCategore = new innerBox('left-Categories');
const innerUserList = new innerBox('left-UserList');

function createDEFCategories (){
    for(let i = 0; i < DEFCategories.length; i++){
        Categories[i] = new Catigories(DEFCategories[i])
        innerCategore.addElement(Categories[i])
    }
}

const TestList = new UserList({'id':'list1','title':'Мой список'})
innerUserList.addElement(TestList)

createDEFCategories()



