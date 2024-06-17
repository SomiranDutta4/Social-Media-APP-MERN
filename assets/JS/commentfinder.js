const commentsection=document.querySelectorAll('.commentcontainer')
const commentbutt=document.querySelectorAll('.commentbutt')
let allpostsdivs=document.querySelectorAll('.allposts')
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

            if(currentcomment!=-1){
                commentsection[currentcomment].setAttribute('class','commentcontainer show')
            }else{
                commentsection[butt].setAttribute('class','commentcontainer hide')
            }

            console.log(currentcomment);
        })
    }
}
seecomment();

const likebtns=document.querySelectorAll('.likebtns')
const numoflikes=document.querySelectorAll('.numoflikes')

const clickedlike=(i)=>{

    let numberoflikesNow=parseInt(numoflikes[i].innerText)
    if(likebtns[i].classList.contains('likepostbtnno')){
        numoflikes[i].innerText=numberoflikesNow+1;
        likebtns[i].classList.add('likepostbtnyes')
        likebtns[i].classList.remove('likepostbtnno')
    }else{
            likebtns[i].classList.remove('likepostbtnyes')
            likebtns[i].classList.add('likepostbtnno')
            numoflikes[i].innerText=numberoflikesNow-1;
        }

    let likestatus=likebtns[i].classList[likebtns[i].classList.length-1]
    let postID=allpostsdivs[i].getAttribute('id')

    // const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
    fetch('/profile/like/post/?id=' + postID+'&status='+likestatus,{
        method:'DELETE',
        headers:{
            // 'csrf-token':csrf
        }
    }).then(result=>{
        return result.json()
    }).catch(err=>{
        console.log(err)
    })

}


// let numberoflikesNow=parseInt(numoflikes[i].innerText)
// if(likebtns[i].classList.contains('likepostbtnno')){
//     numoflikes[i].innerText=numberoflikesNow+1;
//     likebtns[i].classList.add('likepostbtnyes')}else{
//         likebtns[i].classList.remove('likepostbtnyes')
//         likebtns[i].classList.add('likepostbtnno')
//         numoflikes[i].innerText=numberoflikesNow-1;
//     }