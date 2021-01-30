
db = firebase.firestore();
auth = firebase.auth();
const coll = "advice";
const collPremiun = "works";
const DAY = 86400000;
var isFelip = false;
var userState;
var ids;
var nuke = [];
var emojisExp = /(:ayayaghost:|:corazon:|:cursed:|:good:|:huaso:|:pepe:|:pogchamp:|:pou:)/g;
var emojis = {
    [':ayayaghost:']:{
        name:":ayayaghost:",
        url:"emojis/ayayag.PNG"
},
    [':corazon:']:{
        name:":corazon:",
        url:"emojis/corazon.PNG"
},
[':cursed:']:{
        name:":cursed:",
        url:"emojis/cursed.PNG"
},
[':good:']:{
        name:":good:",
        url:"emojis/good.PNG"
},
[':huaso:']:{
        name:":huaso:",
        url:"emojis/huaso.PNG"
},
[':pepe:']:{
        name:":pepe:",
        url:"emojis/pepe.PNG"
},
[':pogchamp:']:{
        name:":pogchamp:",
        url:"emojis/pogchamp.PNG"
},
[':pou:']:{
        name:":pou:",
        url:"emojis/pou.PNG"
}
    };
    
const post = document.getElementById("post");
const form = document.getElementById("form");
const box = document.querySelector(".Get-msg");
const boxPro = document.querySelector(".Get-premium");
const btnInp = document.querySelector(".emoji-input");
const btnTa = document.querySelector(".emoji-textarea");
const tbl = document.getElementById("tablon");

const formSignUp = document.getElementById("form-modal-sign-up");
const formSignIn = document.getElementById("form-modal-sign-in");
const signOption = document.querySelectorAll(".sign-option");
const signOptionOther = document.querySelectorAll(".sign-option-2");
const signInLink = document.getElementById("sign-in");
const signUpLink = document.getElementById("sign-up");
const radioPost = document.getElementById("radio-post");
const radioUrl = document.getElementById("radio-url");
const btnNames = document.querySelector(".change-name");
const nameInp = document.querySelector(".input-modal");
const postName = document.getElementById("post-name");
const btnDel = document.querySelector(".btn-del");
var eachDate = new Date();
var dateFirst = Date.now();
var dateFinal;



const openWindow=(windowName)=>{
    $(function(){
        document.querySelector(windowName).style.display ="flex";
        $(windowName).show(200);
    })
}

const closeWindow =(windowName)=>{
    $(function(){
        var modal = $(windowName);
        modal.hide(300);
    });
}



postName.addEventListener("submit", (e)=>{
e.preventDefault();
CNames.setName(postName["input-name"].value);
closeWindow(".shadow-3");
}
)

const firstName=()=>{
    var name = CNames.getName();
   if(name === null){
       openWindow(".shadow-3");
       CNames.setName("anonimo");
   }
}


class CollControl{
    constructor(collName){
        this.name = collName;
    }
    send(data){
        db.collection(this.name).doc().set(data);
    }
    getData(){
        var data = db.collection(this.name).get();
        return data;
    }
    update(func){
        db.collection(this.name).onSnapshot(func);
    }
    removeMsg(id){
        db.collection(this.name).doc(id).delete();
        
    }
}


var fireChat = new CollControl("advice");
var fireChatPro = new CollControl("advice-premium");


const emoji_btns=()=>{
    for(let i in emojis){
    btnInp.innerHTML += `<img data-id="${emojis[i].name}" id="select-emoji-input" src="${emojis[i].url}" alt="emoji">`;
    btnTa.innerHTML += `<img data-id="${emojis[i].name}" id="select-emoji-textarea" src="${emojis[i].url}" alt="emoji">`;
    }
    
}
emoji_btns();
const btnEmoji = document.querySelectorAll("#select-emoji-input");
const btnEmoji2 = document.querySelectorAll("#select-emoji-textarea");
btnEmoji.forEach(btns=>{
    btns.addEventListener("click", e=>{
        e.preventDefault();
        const title = form["title"];
        title.value += `<img src="${e.target.src}" alt="emoji">`;

    });
})

btnEmoji2.forEach(btns2=>{
    btns2.addEventListener("click", e=>{
        e.preventDefault();
        const desc = form["desc"];
        desc.value += `<img src="${e.target.src}" alt="emoji">`;
        
       
    });
})
class ControlName{
    constructor(localName){
        this.localName = localName;
    }
    setName(name){
        localStorage.setItem(this.localName, name);
    }
    getName(){
        var name = localStorage.getItem(this.localName);
        return name;
    }

    }

class controlFelip extends ControlName{
    constructor(localName){
    super(localName);
    this.name = localName;
    }
    
    
}
var CNames = new ControlName("names");
var Cfelip = new controlFelip("fe");

firstName();


document.addEventListener("DOMContentLoaded", e=>{
    fireChat.update(async(e)=>{
        const data = await fireChat.getData();
        
        box.innerHTML = "";
        data.forEach(elem => {
            let despacketElements = elem.data();
            nuke.push(elem.id);
            /*
            var patternTitle = emojisExp.exec(despacketElements.title);
            var patternDesc = emojisExp.exec(despacketElements.desc);
            var textTitle = "";
            var textDesc = "";
            if(patternTitle == null){
               textTitle = despacketElements.title;
            }else{
             patternTitle.forEach(ele=>{
                 textTitle = despacketElements.title.replace(emojisExp, `<img src="${emojis[ele].url}" alt="emoji">`);
             })
            }
            if(patternDesc == null){
                textDesc = despacketElements.desc;
             }else{
              patternDesc.forEach(ele=>{
                  textDesc = despacketElements.desc.replace(emojisExp, `<img src="${emojis[ele].url}" alt="emoji">`);
                  
              })
             }
             */
            box.innerHTML+= `<div class="Post">
            <mark>${despacketElements.name}</mark>
            
            <article>
            <strong>${despacketElements.title}</strong>
                <p>${despacketElements.desc}</p>
            </article>
            
        </div>`;
        
        });
            btnDel.addEventListener("click", async()=>{
               if(Cfelip.getName() == "felipetrigo725@gmail.com"){
                nuke.forEach(n=>{
                    fireChat.removeMsg(n);
                   })
               }
                
            })
        
    });

        fireChatPro.update(async(e)=>{
        const dataPro = await fireChatPro.getData();
            
        boxPro.innerHTML = "";
     
        dataPro.forEach(elemPro => {
            let despacketElementsPro = elemPro.data();
            nuke.push(elemPro.id);
            
            boxPro.innerHTML+= `<div class="Post-pro">
            <p>${despacketElementsPro.name}<img src="source/premium.png" alt="premiumsign"></p>
            
            <article>
            <strong>${despacketElementsPro.title}</strong>
                <p>${despacketElementsPro.desc}</p>
            </article>
            
        </div>`;
        
        })
        btnDel.addEventListener("click", async()=>{
            if(Cfelip.getName() == "felipetrigo725@gmail.com"){
             nuke.forEach(n=>{
                 fireChatPro.removeMsg(n);
                })
            }
             
         })
    })
});
        
const changeNav =(state)=>{
    
if(state){
  signOption.forEach(options=> options.style.display = "none");
  signOptionOther.forEach(options=> options.style.display = "block");
}else{
    signOption.forEach(options=> options.style.display = "block");
    signOptionOther.forEach(options=> options.style.display = "none");
    
}

}

auth.onAuthStateChanged(async (user)=>{
if(user){
 await changeNav(user);
 userState = true;
}else{
 await changeNav(user);
 userState = false;
}


})

form.addEventListener("submit", async(e)=>{
    e.preventDefault();
    const title = form["title"].value;
    const desc = form["desc"].value;
    const name = CNames.getName();
    if(userState){
        fireChatPro.send({title, desc, name});
    }else{
        fireChat.send({title, desc, name});
    }
    
    form.reset();
    form["title"].focus();
 
 })

const SignOutLink = document.getElementById("sign-out");
formSignUp.addEventListener("submit", (e)=>{
   e.preventDefault();
   const user = formSignUp["user"].value;
   const pass = formSignUp["password"].value;

   auth.createUserWithEmailAndPassword(user, pass)
       .then((credentials)=>{
           Cfelip.setName(credentials.user.email);
         $(function(){
             var modal = $(".shadow");
             modal.hide(300);
         })
         formSignIn.reset();
       })
       .catch(error=>{
           alert(error.message);
       })
  
})

formSignIn.addEventListener("submit", e=>{
    e.preventDefault();
    const user = formSignIn["user"].value;
    const pass = formSignIn["password"].value;
    auth.signInWithEmailAndPassword(user, pass)
    .then(credentials=>{
        Cfelip.setName(credentials.user.email);
        $(function(){
            var modal = $(".shadow-2");
            modal.hide(300);
        })
    })
    .catch(error=>{
     alert(error);
    })
})

document.addEventListener("click",(e)=>{
    
    
    switch(e.target.className){
        case "shadow":
            closeWindow(".shadow");
            break;
        case "shadow-2":
            closeWindow(".shadow-2");
            break;
            break;
        case "shadow-3":
            closeWindow(".shadow-3");
            break;
    }
    
});

SignOutLink.addEventListener("click", e=>{
    e.preventDefault();
    auth.signOut()
    .then(()=>{
 
    })
})

signUpLink.addEventListener("click", e=>{
    e.preventDefault();
    openWindow(".shadow");
})

signInLink.addEventListener("click", e=>{
    e.preventDefault();
    openWindow(".shadow-2");
})

btnNames.addEventListener("click", e=>{
    e.preventDefault();
    openWindow(".shadow-3");
})
