const commentsection=document.querySelectorAll('.commentcontainer')
const commentbutt=document.querySelectorAll('.commentbutt')
let allpostsdivs=document.querySelectorAll('.allposts')
let currentcomment=-1;
const uidOfUser=document.getElementById('uiddiv').innerText

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

let postComment=(post_id)=>{
    let inputElement = document.querySelector(`input[post_id='${post_id}']`);
    let parent=document.getElementById(`${post_id}`)
    let postComments=parent.lastElementChild.lastElementChild
    
    fetch(`/profile/post/comment/?uid=${uidOfUser}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json' // Assuming you are sending JSON data
        },
        body:JSON.stringify({
            id:post_id,
            comment:inputElement.value
        })})
        .then(result=>{
            return result.json()
    }).then(returned=>{
        let commentsectiondivs=document.createElement('div')
        commentsectiondivs.setAttribute('class','commentsectiondivs')
        let newComment=`
        <p class="actualcomment second">
                ${returned.author}:
              </p>
              <p class="actualcomment first">
                ${returned.body}
              </p>
              `
              commentsectiondivs.innerHTML=newComment
              postComments.prepend(commentsectiondivs)
        console.log(returned)
        inputElement.value=''
    }).catch(err=>{
        console.log(err)
    })
}
let timeCreated=document.querySelectorAll('.timeCreated')
timeCreated.forEach(div=>{

    var postTime=div.getAttribute('id')
    postTime=postTime.split(' ')
    postTime=postTime[1]+' '+postTime[2]+' '+postTime[3]
    div.innerText=postTime
})
// let numberoflikesNow=parseInt(numoflikes[i].innerText)
// if(likebtns[i].classList.contains('likepostbtnno')){
//     numoflikes[i].innerText=numberoflikesNow+1;
//     likebtns[i].classList.add('likepostbtnyes')}else{
//         likebtns[i].classList.remove('likepostbtnyes')
//         likebtns[i].classList.add('likepostbtnno')
//         numoflikes[i].innerText=numberoflikesNow-1;
//     }