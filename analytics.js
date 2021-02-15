import * as $ from 'jquery'
export default function createAnalytics(){
    let counter=0
    const listener=()=>counter++
    document.addEventListener('click',listener)
    return {
        destroy(){
            $(document).off('click',listener)
            destroyed=true

        },
        getClicks(
        ){
            if(destroyed){
                return 'Analytics is destroyed'

            }
            return counter
        }
    }
}
window.analytics=createAnalytics