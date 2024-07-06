let now=Date()
now=now.split(' ')

let messagediv=document.querySelector('.messagediv')
const uiddiv=document.querySelector('#uiddiv').innerText
const Myname=document.querySelector('#nameDiv').innerText

var allChats=document.createElement('div');
allChats.setAttribute('class','allChats')
var particularChat=document.createElement('div');
particularChat.setAttribute('class','particularChat')

let messageclosebtn1=document.createElement('button')
messageclosebtn1.setAttribute('id','messageclosebtn')
messageclosebtn1.innerHTML='&#x2190;'

messageclosebtn1.addEventListener('click',()=>{
    messagediv.innerHTML=''
    messagediv.setAttribute('class','messagediv hide')
})



let messageclosebtn2=document.createElement('button')
messageclosebtn2.setAttribute('id','messageclosebtn')
messageclosebtn2.innerHTML='&#x2190;'
messageclosebtn2.addEventListener('click',()=>{
    messagediv.innerHTML=''
    messagediv.appendChild(allChats)
    messagediv.setAttribute('class','messagediv show')
})

allChats.appendChild(messageclosebtn1)
particularChat.appendChild(messageclosebtn2)


let findAll=()=>{
    if(messagediv.getAttribute('class')=='messagediv show'){
        messagediv.innerHTML=''
        messagediv.setAttribute('class','messagediv hide')
        return
    }else{
        messagediv.setAttribute('class','messagediv show')
    }
    if(allChats.children.length>1){
        messagediv.innerHTML=''
        messagediv.appendChild(allChats)
        return
    }
   
    fetch('/message/user/findAll',{
        method:'GET'
        // headers:{
        //     // 'Content-Type': 'application/json'
        // }
    }).then(result=>{
        return result.json()
    }).then(success=>{
      
        let searchdiv=document.createElement('div')
        let newHTML=`
            <input class="searchmsgBar" placeholder="search chat">
            <button class="searchbtn">Search</button>
        `
        searchdiv.innerHTML=newHTML
        // let searchmsgBar=document.createElement('input')
        // searchmsgBar.placeholder='search chat'
        // searchmsgBar.setAttribute('class',"searchmsgBar")
        // let searchbtn=document.createElement('button')
        // searchbtn.innerText='Search'
        // searchbtn.setAttribute('class','searchbtn')
        // searchdiv.appendChild(searchmsgBar)
        // searchdiv.appendChild(searchbtn)
        allChats.appendChild(searchdiv)

        // console.log("success",success.foundAllChats)

        success.foundAllChats.forEach(element => {
            appendNew(element.LatestMessage.Latestmessage,element.LatestMessage.sentAt,element.users)
            // let indChat=document.createElement('div')
            // indChat.setAttribute('class','indChat')
            // let pfpEle=document.createElement('div')
            // pfpEle.setAttribute('class','pfpEle')
            // let textDiv=document.createElement('div')
            // textDiv.setAttribute('class','textDiv')
            // let nameEle=document.createElement('p')
            // nameEle.setAttribute('class','nameEle')
            // let uidEle=document.createElement('p')
            // uidEle.setAttribute('class','uidEle')
            // let chatEle=document.createElement('p')
            // chatEle.setAttribute('class','chatEle')
            // let timeEle=document.createElement('p')
            // timeEle.setAttribute('class','timeEle')
            // textDiv.appendChild(nameEle)
            // textDiv.appendChild(uidEle)
            // textDiv.appendChild(chatEle)
            // indChat.appendChild(pfpEle)
            // indChat.appendChild(textDiv)
            // allChats.appendChild(indChat)
            // chatEle.innerText=element.LatestMessage.Latestmessage
            // chatEle.appendChild(timeEle)
            // timeEle.innerText=element.LatestMessage.sentAt

            // if(element.users.length==2){
            //     // element.users[0].userid==uiddiv?nameEle.innerText=element.users[1].userid:nameEle.innerText=element.users[0].useruid
            //     if(element.users[0].uid==uiddiv){
            //         uidEle.innerText=element.users[1].uid
            //         nameEle.innerText=element.users[1].name
            //     }else{
            //         uidEle.innerText=element.users[0].uid
            //         nameEle.innerText=element.users[0].name
            //     }
            // }
            // else{
            //     // nameEle.innerText=element.roomName
            // }
            // indChat.addEventListener('click',()=>{
            //     findOne(uidEle.innerText)
            // })
        });
        messagediv.appendChild(allChats)
        searchChat();

    }).catch(err=>{
        console.log(err)
    }) 
}
let findOne=(uid)=>{
    // if(particularChat.children.length>1){
    //     messagediv.innerHTML=''
    //     messagediv.appendChild(particularChat)
    //     document.querySelector('.ChatDiv').lastChild.scrollIntoView()
    //     return
    // }
    particularChat.innerHTML=''
    particularChat.appendChild(messageclosebtn2)

    messagediv.innerHTML=''
    fetch(`/message/user/findChat/?uid=${uid}`,{
        method:'GET',
        // headers:{
        //     'Content-Type': 'application/json'
        // }
    }).then(result=>{
        return result.json()
    }).then(fetchedChat=>{

        let headingDiv=document.createElement('div')
        headingDiv.setAttribute('class','headingDiv')
        let newHtMl=`
        <div class="pfpDiv"></div>
        <div class="detailsDiv">
            <p class="nameEle">${fetchedChat.ToName}</p>
            <p class="uidDivv">${fetchedChat.ToUid}</p>
        </div>`
        headingDiv.innerHTML=newHtMl
        // let pfpDiv=document.createElement('div')
        // pfpDiv.setAttribute('class','pfpDiv')
        // let detailsDiv=document.createElement('div')
        // detailsDiv.setAttribute('class','detailsDiv')
        // let nameEle=document.createElement('p')
        // nameEle.setAttribute('class','nameEle')
        // let uidDivv=document.createElement('p')
        // uidDivv.setAttribute('class','uidDivv')


        // detailsDiv.appendChild(nameEle)
        // detailsDiv.appendChild(uidDivv)
        // headingDiv.appendChild(pfpDiv)
        // headingDiv.appendChild(detailsDiv)
        particularChat.appendChild(headingDiv)
        // nameEle.innerText=fetchedChat.ToName
        // uidDivv.innerText=fetchedChat.ToUid
      
        let ChatDiv=document.createElement('div')
        ChatDiv.setAttribute('class','ChatDiv')
        if(fetchedChat.foundParticular){
        fetchedChat.foundParticular.messages.forEach(message=>{

            let indmessageDiv=document.createElement('div')
            indmessageDiv.setAttribute('class','indmessageDiv')
            // let indmessage=document.createElement('div')

            let HtmltoAdd=`
            <div class="indcontainer">
        <div class="indmessage">${message.body}</div>
        <div class="indTime">${message.time}</div>
    </div>`
            // let indTime=document.createElement('div')
            // indmessage.innerText=message.body
            // indTime.innerText=message.time
            // indmessage.setAttribute('class','indmessage')
            // indTime.setAttribute('class','indTime')
            // const indcontainer=document.createElement('div')
            // indcontainer.setAttribute('class','indcontainer')
            // indmessageDiv.appendChild(indcontainer)
            // indcontainer.appendChild(indmessage)
            // indcontainer.appendChild(indTime)
            indmessageDiv.innerHTML=HtmltoAdd
            ChatDiv.appendChild(indmessageDiv)
            let indcontainer=indmessageDiv.querySelector('.indcontainer')
            let indTime=indmessageDiv.querySelector('.indTime')

           
            if(message.sender==Myname){
                indcontainer.classList.add('byMe')
                indmessageDiv.classList.add('byMe')
                indTime.classList.add('byMe')
            }else{
                indmessageDiv.classList.add('NotbyMe')
                indcontainer.classList.add('NotbyMe')
                indTime.classList.add('NotbyMe')
            }
        })}
        particularChat.appendChild(ChatDiv)
        // messagediv.appendChild(ChatDiv)
        try {
            ChatDiv.lastChild.scrollIntoView()
        } catch (er){}

        let inputDiv=document.createElement('div')
        inputDiv.setAttribute('class','inputDiv')
        let newHtmltoAdd=`
        <input class="messageinput" placeholder="Type message">
        <button class="messagesend">SEND</button>`
        // let messageinput=document.createElement('input')
        // messageinput.setAttribute('class','messageinput')
        // messageinput.placeholder='Type message'
        // let messagesend=document.createElement('button')
        // messagesend.setAttribute('class','messagesend')
        // messagesend.innerText='SEND'
        // inputDiv.appendChild(messageinput)
        // inputDiv.appendChild(messagesend)
        inputDiv.innerHTML=newHtmltoAdd
        particularChat.appendChild(inputDiv)
        // messagediv.appendChild(inputDiv)
        let messagesend=inputDiv.querySelector('.messagesend')
        let nameEle=particularChat.querySelector('.nameEle')
        let uidDivv=particularChat.querySelector('.uidDivv')

        messagesend.addEventListener('click',()=>{
            sendMessage(messageinput.value,uidDivv.innerText,nameEle.innerText)
        })

        messagediv.appendChild(particularChat)

        // if(fetchedCha)
    }).catch(err=>{
        console.log(err)
    })
}

const sendMessage=(messagedata,uid,name)=>{
    if(!messagedata ||messagedata=='' || messagedata==undefined){
        return 
    }
   
    const message={
        msgBody:messagedata
    }
    fetch(`/message/user/send/?to=${uid}&name=${name}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json' // Assuming you are sending JSON data
        },
        body: JSON.stringify(message) // Convert JavaScript object to JSON string
    }).then(result=>{
        return result.json()
    }).then(sent=>{
        console.log(sent)

        let ChatDiv=document.querySelector('.ChatDiv')
        let indmessageDiv=document.createElement('div')
            indmessageDiv.setAttribute('class','indmessageDiv')
        let newHtml=`
        <div class="indmessageDiv">
        <div class="indcontainer">
            <div class="indmessage">${messagedata}</div>
            <div class="indTime">${Date().split(' ')[4]+' '+Date().split(' ')[1]+' '+Date().split(' ')[2]+' '+Date().split(' ')[3]}</div>
        </div>
    </div>
        `
        indmessageDiv.innerHTML=newHtml
            // let indmessage=document.createElement('div')
            // let indTime=document.createElement('div')
            // indmessage.innerText=messagedata
            // indTime.innerText=Date().split(' ')[4]+' '+Date().split(' ')[1]+' '+Date().split(' ')[2]+' '+Date().split(' ')[3]
            // indmessage.setAttribute('class','indmessage')
            // indTime.setAttribute('class','indTime')
            // const indcontainer=document.createElement('div')
            // indcontainer.setAttribute('class','indcontainer')
            // indmessageDiv.appendChild(indcontainer)
            // indcontainer.appendChild(indmessage)
            // indcontainer.appendChild(indTime)

            ChatDiv.appendChild(indmessageDiv)
           
            indcontainer.classList.add('byMe')
            indmessageDiv.classList.add('byMe')
            indTime.classList.add('byMe')

            indcontainer.scrollIntoView()
        let messageinput=document.querySelector('.messageinput')
        messageinput.value=''

        let uidEle=allChats.querySelectorAll('.uidEle')
        console.log(messagedata,uid)
        for(let i=0;i<uidEle.length;i++){
            if(uidEle[i].innerText==uid){
                allChats.querySelectorAll('.chatEle')[i].innerText=messagedata
            }
        }

        console.log(sent)

        if(sent.created){
            appendNew(sent.latestMsg,sent.time,sent.userarray)
        }
    }).catch(err=>{
        console.log(err)
    })
}

const searchChat=()=>{
    let searchmsgBar=document.querySelector('.searchmsgBar')
    let searchbtn=document.querySelector('.searchbtn')
    searchbtn.addEventListener('click',()=>{
        let searchedpf=searchmsgBar.value
        fetch(`/message/user/search/?name=${searchedpf}`,{
            method:'GET'
        }).then(result=>{
            return result.json()
        }).then(found=>{
            if(!found){
                return
            }

            
let messageclosebtn3=document.createElement('button')
messageclosebtn3.setAttribute('id','messageclosebtn')
messageclosebtn3.innerHTML='&#x2190;'
messageclosebtn3.addEventListener('click',()=>{
    messagediv.innerHTML=''
    messagediv.appendChild(allChats)
    messagediv.setAttribute('class','messagediv show')
})

            let searchDisplay=document.createElement('div')
            searchDisplay.appendChild(messageclosebtn3)
            searchDisplay.setAttribute('class','searchDisplay show')
            found.searchedOnes.forEach(pf=>{


                let indpf=document.createElement('div')
                indpf.setAttribute('class','indpf')

                let newHtml=`
                <div class="indpfpf"></div>
                <div class="inddetailsdiv">
                    <p class="indName">${pf.name}</p>
                    <p class="indUid">${pf.uid}</p>
                </div>
                `
                // let indpfpf=document.createElement('div')
                // indpfpf.setAttribute('class','indpfpf')
                // let inddetailsdiv=document.createElement('div')
                // inddetailsdiv .setAttribute('class','inddetailsdiv')

                // let indName=document.createElement('p')
                // indName.setAttribute('class','indName')
                // indName.innerText=pf.name
                // let indUid=document.createElement('p')
                // indUid.setAttribute('class','indUid')
                // indUid.innerText=pf.uid

                // inddetailsdiv.appendChild(indName)
                // inddetailsdiv.appendChild(indUid)

                // indpf.appendChild(indpfpf)
                // indpf.appendChild(inddetailsdiv)
                indpf.innerHTML=newHtml
                searchDisplay.appendChild(indpf)



                indpf.addEventListener('click',()=>{
                    findOne(pf.uid)
                })
            })

            messagediv.appendChild(searchDisplay)

        }).catch(err=>{
            console.log(err)
            return err
        })
    })
}

let appendNew=(latestMsg,time,userarray)=>{
    let indChat=document.createElement('div')
    indChat.setAttribute('class','indChat')
    let functionhtml=`
        <p class="nameEle"></p>
        <p class="uidEle"></p>
        <p class="chatEle">
            <p class="timeEle">${time}</p>
            ${latestMsg}
        </p>
    `
    let pfpEle=document.createElement('div')
    pfpEle.setAttribute('class','pfpEle')
    let textDiv=document.createElement('div')
    textDiv.setAttribute('class','textDiv')
    textDiv.innerHTML=functionhtml
    // let nameEle=document.createElement('p')
    // nameEle.setAttribute('class','nameEle')
    // let uidEle=document.createElement('p')
    // uidEle.setAttribute('class','uidEle')
    // let chatEle=document.createElement('p')
    // chatEle.setAttribute('class','chatEle')
    // let timeEle=document.createElement('p')
    // timeEle.setAttribute('class','timeEle')
    // textDiv.appendChild(nameEle)
    // textDiv.appendChild(uidEle)
    // textDiv.appendChild(chatEle)
    indChat.appendChild(pfpEle)
    indChat.appendChild(textDiv)
    allChats.appendChild(indChat)
    let uidEle=indChat.querySelector('.uidEle')
    let nameEle=indChat.querySelector('.nameEle')
    // chatEle.appendChild(timeEle)
    // timeEle.innerText=time
    // chatEle.innerText=latestMsg

    if(userarray.length==2){
        if(userarray[0].uid==uiddiv){
            uidEle.innerText=userarray[1].uid
            nameEle.innerText=userarray[1].name
        }else{
            uidEle.innerText=userarray[0].uid
            nameEle.innerText=userarray[0].name
        }
    }
    else{
        // nameEle.innerText=element.roomName
    }
    indChat.addEventListener('click',()=>{
        findOne(uidEle.innerText)
    })
}


