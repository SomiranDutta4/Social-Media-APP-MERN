const commentsection=document.querySelectorAll('.commentcontainer')
const commentbutt=document.querySelectorAll('.commentbutt')

// let hideall=()=>{
//     commentsection.forEach(section=>{
//         section.setAttribute('class','commentcontainer hide')
//     })
// }
let currentcomment=-1;

let seecomment=()=>{
    // let numberofcomment=0;
    for(let butt=0;butt<commentbutt.length;butt++){
        commentbutt[butt].addEventListener('click',()=>{
            if(currentcomment!=butt){
                currentcomment=butt;
            }else{currentcomment=-1}

        commentsection.forEach(section=>{
           section.setAttribute('class','commentcontainer hide') })


            //let toggleclass=commentsection[butt].getAttribute('class')
           // console.log(toggleclass) 
            // if(toggleclass=='commentcontainer show'){
            //     commentsection[butt].setAttribute('class','commentcontainer hide')
            // }else{ commentsection[butt].setAttribute('class','commentcontainer show')}

            // if(butt!=currentcomment){
            //     commentsection[butt].setAttribute('class','commentcontainer hide')
            // }
            if(currentcomment!=-1){
                commentsection[currentcomment].setAttribute('class','commentcontainer show')
            }else{
                commentsection[butt].setAttribute('class','commentcontainer hide')
            }

            console.log(currentcomment);
        })
        // if(butt!=currentcomment){
        //     commentsection[butt].setAttribute('class','commentcontainer hide')
        // }
        // for(let j=0;j<commentbutt.length;j++){
        //     // console.log(commentsection[j].getAttribute('class'))
        //     if(commentsection[j].getAttribute('class')=='commentcontainer show'){
        //         numberofcomment++;
        //     }
        // }
        // if(numberofcomment==0){
        //     commentsection[currentcomment].setAttribute('class','commentcontainer hide');
        //     currentcomment=-1;
        // }
    }
}
seecomment();