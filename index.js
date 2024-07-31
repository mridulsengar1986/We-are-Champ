import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push , remove, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://fir-628b8-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const champions = ref(database, "Champ_db")
let input_El = document.getElementById("text-el")
let display_El = document.getElementById("display-input")
const publish_El = document.getElementById("publish")
const messageParagraph = document.getElementById("message");

publish_El.addEventListener("click" , function(){
    if(input_El.value == 0)
    {
    messageParagraph.textContent = "please provide some feedback"
    }
    else{
let input = input_El.value
 push(champions, input)
 //input_Array(input)
clean_inputFromTextArea()
    }
})
onValue(champions, function(snapshot) {
    if(snapshot.exists()){
      let input_arr = Object.entries(snapshot.val())
      //console.log(input_arr) 
    clearInputlist()
    for (let i = 0; i < input_arr.length; i++) {
        let currentItem = input_arr[i]
        let currentValue = currentItem[0]
        let currentID    = currentItem[1]
        appendingItem(currentItem)
    }
}
else{
    display_El.innerHTML="No Comments.. yet!"
}
})
function appendingItem(item){
    let itemID =item[0]
    let itemValue = item[1]
    let newEl =document.createElement("li")
    newEl.textContent = itemValue
    const likeEmojispan = document.createElement('span');
    likeEmojispan.textContent = '\u{1F44D}' // Add the "thumbs up" emoji
    likeEmojispan.classList.add('like-emoji') // Add the class for styling
     newEl.appendChild(likeEmojispan);
      let likecount =0
       likeEmojispan.addEventListener('click', function() {
           likecount++
           let Arr = []
           Arr.push(likecount)
           for(let i=0;i<Arr.length;i++)
           likeEmojispan.textContent = "\u{1F44D}" + Arr[i]
        })
    newEl.addEventListener("dblclick", function(){
        let exactLocationindb = ref(database, `Champ_db/${itemID}`)
        remove(exactLocationindb)
     })
   display_El.append(newEl)
 }
   

function clean_inputFromTextArea(){
     
    input_El.value = " "
}
function clearInputlist()
{
    display_El.innerHTML = " "
}