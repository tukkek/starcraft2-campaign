import * as card from './card.js'
import * as sidebar from './sidebar.js'

export const CARDS=document.querySelector('#info #cards')
const DRAW=document.querySelector('#info #cards button#draw');
const CARD=CARDS.querySelector('template.card').content.childNodes[0]

function showcard(c){
  let div=CARD.cloneNode(true)
  div.querySelector('.text').innerHTML=c.text+'.'
  let claim=div.querySelector('.claim')
  if(c.reward>0) claim.innerHTML+=` (+$${c.reward})`
  else if(c.reward<0) claim.innerHTML+=` ($${c.reward})`
  claim.onclick=()=>{
    if(c.reward>0) sidebar.addcredits(c.reward)
    else if(!sidebar.spend(-c.reward)) return false
    if(!c.sticky){
      c.discard()
      update()
    }
  }
  div.querySelector('.sell').onclick=()=>{
    sidebar.addcredits(1)
    c.discard()
    update()
  }
  let sticky=div.querySelector('input.sticky')
  sticky.checked=false
  sticky.onclick=()=>{
    if(c.sticky||!confirm('Spend $10 to turn this into a permanent goal?')||
      !sidebar.spend(10)) return false
    c.sticky=true
    return true
  }
  CARDS.insertBefore(div,CARDS.firstChild)
}

function update(){
  for(let c of CARDS.querySelectorAll('#info #cards > .card'))
    c.remove()
  for(let h of card.hand) showcard(h)
}

function setup(){
  DRAW.onclick=()=>{
    if(sidebar.spend(2)){
      card.draw()
      update()
    }
  }
  update()
}

setup()