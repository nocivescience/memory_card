const cardsContainer=document.getElementById('cards-container');
const btnPrev=document.getElementById('btn-prev');
const btnNext=document.getElementById('btn-next');
const btnAdd=document.getElementById('btn-add');
const currentEl=document.getElementById('current');
const btnYellow=document.getElementById('btn-yellow');
const btnHidden=document.getElementById('btn-hidden');
const sumContainer=document.getElementById('sum-container');
const sendEl=document.getElementById('add-card');
const cardsData=getCardsData();
let emailEl=document.getElementById('floatingInput');
let messageEl=document.getElementById('floatingPassword');
let cardsEl=[];
let currentActiveCard=0;
function createCards(){
    cardsData.forEach((data,index)=>createCard(data,index))
}
function createCard(data,index){
    const card=document.createElement('div');
    card.className='card';
    if(index===0){
        card.classList.add('active');
    }
    card.innerHTML=`
        <div class='inner-card'>
            <div class='inner-card-front'>
                ${data.email}
            </div>
            <div class='inner-card-back'>
                ${data.message}
            </div>
        </>
    `;
    card.addEventListener('click',()=>{
        card.classList.toggle('show-answer')
    })
    cardsEl.push(card)
    cardsContainer.appendChild(card);
    updateCurrentText();
}
createCards();
function setCardsData(cards){
    localStorage.setItem('cards',JSON.stringify(cards));
    window.location.reload();
}
function getCardsData(){
    const cards=JSON.parse(localStorage.getItem('cards'));
    return cards===null?[]:cards;
}
function updateCurrentText(){
    currentEl.textContent=`
        ${currentActiveCard+1}/${cardsEl.length}
    `;
}
btnYellow.addEventListener('click',()=>{
    sumContainer.classList.add('show');
});
btnHidden.addEventListener('click',()=>{
    sumContainer.classList.remove('show')
})
btnNext.addEventListener('click',()=>{
    cardsEl[currentActiveCard].className='card left';
    currentActiveCard++;
    if(currentActiveCard>cardsEl.length-1){
        currentActiveCard=cardsEl.length-1
    }
    cardsEl[currentActiveCard].className='card active';
    updateCurrentText();
})
btnPrev.addEventListener('click',()=>{
    cardsEl[currentActiveCard].className='card right'
    currentActiveCard--;
    if(currentActiveCard<0){
        currentActiveCard=0
    }
    cardsEl[currentActiveCard].className='card active';
    updateCurrentText();
})
sendEl.addEventListener('click',()=>{
    const email=emailEl.value;
    const message=messageEl.value;
    if(email.trim()&&message.trim()){
        const newCard={email,message};
        emailEl='';
        messageEl='';
        sumContainer.classList.remove('show');
        cardsData.push(newCard);
        setCardsData(cardsData);
    }
})