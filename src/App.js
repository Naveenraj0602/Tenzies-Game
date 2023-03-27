import React from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {


const generateNewDice = () =>{
    return{
      
        value: Math.ceil(Math.random() *6),
        isHeld : false,
        id:nanoid()
        
    }
   
}



const allNewDice = () =>{

  
    const newDice = []
  
    for(let i=0; i< 10 ;i++)
    {
      newDice.push(generateNewDice())
    }
  
    return newDice 

}


const [dice,setDice] = React.useState(allNewDice())

const [tenzies , setTenzies] = React.useState(false)


React.useEffect(()=>{
  const allHeld = dice.every(die => die.isHeld)
  const firstValue = dice[0].value
  const allSameValue = dice.every(die => die.value === firstValue)

  if(allHeld && allSameValue){
    setTenzies(true)
    console.log("you won")
  }
} ,[dice])



const newRollDice = () =>{
 if(!tenzies){
  setDice(oldRollDice => 
    oldRollDice.map(die => {
      return die.isHeld ? die : generateNewDice()
    })
  )
 }else{
  setTenzies(false)
  setDice(allNewDice())
 }
}


const holdDice = (id) =>{
  setDice(oldDice => 
    oldDice.map(die => {
      return die.id === id ? {...die, isHeld : !die.isHeld} : die
    })
  )
}


const diceElement = dice.map(die => <Die key={die.id} 
           value={die.value}  
         isHeld = {die.isHeld} 
         holdDice={ () => holdDice(die.id)}
            />)





  return (

    <main>

      {tenzies && <Confetti />}

       <div className="app--container">

       <div className='app--container--two'>

           <h1 className={tenzies ? "new--title" : "title"}>{tenzies ? "You won !!!" : "Tenzies"}</h1>

          <p className="instructions">{ tenzies ? "To continue the Game.Click on New Game Button" : "Roll until all dice are the same. Click each die to  freeze it at its current value between rolls."}</p>


        <div className="die--container">
         {diceElement}
         </div>


        <button className='roll-dice'
      onClick={newRollDice}>{tenzies ? "New Game" : "Roll"}</button>


</div>
</div>
    </main>
 
  );
}

export default App;
