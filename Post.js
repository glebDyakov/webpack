export default class Post{
    constructor(title,img){
        this.title=title
        this.img=img
        this.date=new Data()
    }
    toString(){
        JSON.stringify({
            title:this.title,
            date:this.date.toJSON(),
        },null,2)
    }
    getUpperccaseTitle(){
        return this.title.toUpperCase()
    }
}