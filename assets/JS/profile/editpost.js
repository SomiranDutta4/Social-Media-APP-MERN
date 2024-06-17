const editbutts=document.querySelectorAll('.editbutton');
let editcontainer=document.querySelector('#editcontainer')
const userdetails=document.querySelectorAll('.userdetails')
const allposts=document.querySelectorAll('.allposts')


const blurout=()=>{
    let mainprofilecontainers=document.querySelectorAll('.mainprofilecontainers');
    mainprofilecontainers.forEach(div=>{
        div.style.filter='blur(3px)';
    })
}
const bluroff=()=>{
    let mainprofilecontainers=document.querySelectorAll('.mainprofilecontainers');
    mainprofilecontainers.forEach(div=>{
        div.style.filter='blur(0)';
    })
}

const clickedEdit=(i)=>{
    var editingcontent=false;
    let posttext=document.querySelectorAll('.postcontent')[i].innerText
    let images=document.querySelectorAll('.postimages')
    let postimg;
    if(images[i]!=undefined){
        postimg=images[i].src;
    }else{
        postimg=null
    }
    // let postimg=document.querySelectorAll('.postimages')[i].src
    // let posttext=postc[].innerText

    editcontainer.setAttribute('class','showEditedContainer')
    editcontainer.style.display='flex'
    let editclosebutt= document.createElement('button')
    editclosebutt.setAttribute('class','editclosebutt')
    editclosebutt.innerText='✕'
    let editpage= document.createElement('div');
    editpage.setAttribute('class','editpage')
    let editimagediv= document.createElement('div');
    editimagediv.setAttribute('class','editimagediv')
    let editpostimage= document.createElement('img')
    editpostimage.setAttribute('class','editpostimage')
    if(postimg){editpostimage.src=postimg;}

    let editpostcontentdiv= document.createElement('div');
    editpostcontentdiv.setAttribute('class','editpostcontentdiv')
    let editpostcontent= document.createElement('span')

    let editpostcontentbutt=document.createElement('button')
    editpostcontentbutt.setAttribute('class','editpostcontentbutt');
    editpostcontentbutt.innerText='edit'

    let editpostcontentinput=document.createElement('input')
    editpostcontentinput.setAttribute('class','editpostcontentinput')
    editpostcontentinput.value=posttext
    editpostcontentinput.name='newpostcontent'

    let editpostcontentsetbutt=document.createElement('button')
    editpostcontentsetbutt.setAttribute('class','editpostcontentsetbutt');
    editpostcontentsetbutt.innerText='set'
    editpostcontentsetbutt.type='submit'

    let editpostcontentclosebutt=document.createElement('button')
    editpostcontentclosebutt.setAttribute('class','editpostcontentclosebutt');
    editpostcontentclosebutt.innerText='✕'

    editpostcontent.setAttribute('class','editpostcontent')
    editpostcontent.innerText=posttext

    editpostcontentdiv.appendChild(editpostcontent)
    editpostcontentdiv.appendChild(editpostcontentbutt)

    
    let submitform=document.createElement('form')
    submitform.method='post'
    submitform.action=`/profile/edit/content/?uid=${userdetails[1].innerText}&index=${allposts[i].getAttribute('id')}`
    submitform.appendChild(editpostcontentinput)
    submitform.appendChild(editpostcontentsetbutt)
    submitform.appendChild(editpostcontentclosebutt)


    editimagediv.appendChild(editpostimage)
    editpage.appendChild(editimagediv)
    editpage.appendChild(editpostcontentdiv)
    editcontainer.appendChild(editclosebutt)
    editcontainer.appendChild(editpage)


    let deleteform=document.createElement('form')
    deleteform.method='post';
    deleteform.action=`/profile/delete/post/?uid=${userdetails[1].innerText}&index=${allposts[i].getAttribute('id')}`
    let deletebtn=document.createElement('button')
    // deletebtn.innerText='DELETE POST'
    deletebtn.type='submit'
    deletebtn.setAttribute('class','deletepostbtn fa fa-trash-o')
    deleteform.appendChild(deletebtn)
    editpostcontentdiv.appendChild(deleteform)

    editclosebutt.addEventListener('click',()=>{
        closeEdit()
    })
    editpostcontentbutt.addEventListener('click',()=>{
        editpostcontentdiv.innerHTML=''
        // editpostcontentdiv.appendChild(editpostcontentinput)
        // editpostcontentdiv.appendChild(editpostcontentsetbutt)
        // editpostcontentdiv.appendChild(editpostcontentclosebutt)
        editpostcontentdiv.appendChild(submitform)
        editpostcontentdiv.appendChild(deleteform)
        editingcontent=true
    })
    editpostcontentclosebutt.addEventListener('click',()=>{
        editpostcontentdiv.innerHTML=''
        editpostcontentdiv.appendChild(editpostcontent)
        editpostcontentdiv.appendChild(editpostcontentbutt)
        editpostcontentdiv.appendChild(deleteform)
        editingcontent=true
    })


    blurout()
}


const closeEdit=()=>{
    editcontainer.innerHTML=''
    editcontainer.style.display='none'
    editcontainer.setAttribute('class','hideEditedContainer')
    bluroff()
}