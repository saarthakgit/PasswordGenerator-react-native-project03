import { StyleSheet, Text, View } from 'react-native'
import React, { useState }  from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";

// form validation
import * as Yup from 'yup'
const passSchema = Yup.object().shape({
  passwordLength : Yup.number().required('Required!').min(4,'Password Length too short!').max(16,'Password too long!')
})
const App = () => {
  const [password,setPassword] = useState('')
  const [isPassGenerated , setisPassGenerated] = useState(false)
  const [isLowerCase , setisLowerCase] = useState(false)
  const [isUpperCase , setisUpperCase] = useState(false)
  const [includeSymbol , setincludeSymbol] = useState(false)
  const [includeNums , setincludeNums] = useState(false)

  const CharsforCreation = (passwordLength : number)=>{
    let charList = ''
    const UpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const LowerCase = 'abcdefghijklmnopqrstuvwxyz'
    const nums = '0123456789'
    const symbols = '!@#$%&*_-+=^'

    if (includeNums){
      charList+=nums
    }
    if(includeSymbol){
      charList+=symbols
    }
    if(isLowerCase){
      charList+=LowerCase
    }
    if(isUpperCase){
      charList+=UpperCase
    }
    const finalPassword = createPassword(charList , passwordLength)

    setPassword(finalPassword)
    setisPassGenerated(true)
    // return finalPassword
  }

  const createPassword = (characters : string , passwordLength : number)=>{ 
    let result = ''
    for (let index = 0; index < passwordLength; index++) {
      const charIndex = Math.ceil(Math.random()*characters.length)
      result += characters.charAt(charIndex)
    }
    return result 
  }

  const resetPassword = ()=>{
    setPassword('');
    setincludeNums(false);
    setincludeSymbol(false);
    setisLowerCase(false);
    setisUpperCase(false);
  }
  return (
    <View>
      <View style = {styles.titleCard}>
         <Text style={styles.titleText}>Password Generator</Text>
      </View>
    </View>
    

  )
}

export default App

const styles = StyleSheet.create({
  titleText : {
     color : "#FFFFFF",
        fontWeight: "bold",
        fontSize : 25,

  },
  titleCard : {
    flex : 1,
    backgroundColor : '#000000ff',
    justifyContent : 'center',
    alignItems : 'center',
    margin: 'auto',
    marginTop : 50,
    borderRadius : 30,
    width : '90%'
  }
});
