import { StyleSheet, Text, View , Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState }  from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ImageBackground } from "react-native";
import { Formik } from 'formik';

// form validation
import * as Yup from 'yup'
import { SafeAreaView } from 'react-native-safe-area-context';

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
    if (characters ==''){
      result +='0'
    }else{
      for (let index = 0; index < passwordLength; index++) {
        const charIndex = Math.ceil(Math.random()*characters.length)
        result += characters.charAt(charIndex)
    }
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
    <SafeAreaView style={styles.App}>
      <View style = { styles.titleCard }>
        
          <ImageBackground source = {{uri : 'https://cdn.dribbble.com/userupload/37360802/file/original-3f641d6c06f293f8d0a3513607123124.png?resize=1200x900&vertical=center'}} style = {styles.titlebg}>
          <View style = {styles.imagecontainer}>
             <Image source = {{uri : 'https://i.pinimg.com/736x/9a/41/bf/9a41bfd23244fbb5266ec8872908601c.jpg'}} style = {styles.lockimage}/> 
          </View>
          <View style = {styles.textcontainer}>
            <Text style={styles.titleText}>Password <Text style = {{color : '#ff3c00ff',  fontSize : 30,
               fontFamily : 'Tiny5Regular',
               backgroundColor : '#000000',
               marginBottom : 0}}>Gen</Text>erator</Text>
          </View>
        </ImageBackground>
      </View>
      <View style = {styles.userInteraction}>
          <Formik
       initialValues={{passwordLength : ''}}
       validationSchema={passSchema}
       onSubmit={
        values => CharsforCreation(Number(values.passwordLength))}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleReset,
         handleSubmit,
         handleBlur, 
         
         /* and other goodies */
       }) => (
         <>
         <View style = {styles.inputWrapper}>
          <View style = {styles.lencontainer}>
            <Text style = {styles.inputlabellength}>Password Length : </Text>
          
            {touched.passwordLength && errors.passwordLength && (
              <Text style =  {styles.errors}>{errors.passwordLength}</Text>
          
          
          )}
          </View>
          
          <TextInput
          value={values.passwordLength} 
          onChangeText = {handleChange('passwordLength')}
          placeholder = 'Ex. 8'
          keyboardType = 'numeric'
          style = {styles.leninput}
          multiline = {false}
          numberOfLines={1} 
          scrollEnabled = {false}
          onBlur={handleBlur('passwordLength')} />
         </View>
         <View style = {styles.inputWrapper}>
          <Text style = {styles.inputlabel}> Include Lowercase : </Text>
          <BouncyCheckbox isChecked = {isLowerCase} onPress={()=>setisLowerCase(!isLowerCase)} fillColor='#ff3c00ff' unFillColor='#000000ff' />
         </View>
         <View style = {styles.inputWrapper}>
          <Text style = {styles.inputlabel}> Include Uppercase : </Text>
          <BouncyCheckbox isChecked = {isUpperCase} onPress={()=>setisUpperCase(!isUpperCase)} fillColor='#ff3c00ff' unFillColor='#000000ff' />
         </View>
         <View style = {styles.inputWrapper}>
          <Text style = {styles.inputlabel}> Include Symbols : </Text>
          <BouncyCheckbox isChecked = {includeSymbol} onPress={()=>setincludeSymbol(!includeSymbol)} fillColor='#ff3c00ff' unFillColor='#000000ff' />
         </View>
         <View style = {styles.inputWrapper}>
          <Text style = {styles.inputlabel}> Include Numbers : </Text>
          <BouncyCheckbox isChecked= {includeNums} onPress={()=>setincludeNums(!includeNums) } fillColor='#ff3c00ff' unFillColor='#000000ff'/>
         </View>
         <View style = {styles.actionButtons}>
          <TouchableOpacity disabled = {!isValid} style = {styles.genbutton} onPress={handleSubmit}><Text style = {styles.btnlabel}>Generate Password</Text></TouchableOpacity>
          <TouchableOpacity style = {styles.resetbtn} onPress={()=>{handleReset();
            resetPassword();
          }}>
            <Text style = {styles.btnlabel}>Reset Password</Text>
          </TouchableOpacity>
         </View>
         </>
       )}
          </Formik>          
        
        {isPassGenerated && password!='0' ? (
          <View style = {styles.abspasscontainer}>
          <View style = {styles.passwordContainer}>
            <Image source = {{uri : 'https://i.pinimg.com/1200x/ff/61/e8/ff61e895405a4bf20ba8f0ccf475d332.jpg'}} style ={{height : 80 , width : 80}}/>
            <Text style = { {fontSize : 18, fontFamily : 'PixelifySans-SemiBold' , color : '#000000' , margin : 10} }>⚡ Password built instantly!</Text>
            <Text selectable={true} style = {{fontSize : 15, fontWeight: 'bold' , color : '#000000' , marginBottom : 15}} >{password}</Text>
            <Text style = {{fontSize : 8, color : '#000000'}}> Long Press to Copy </Text>
          <TouchableOpacity style = {styles.resetbtn1} onPress={()=>{resetPassword(); setisPassGenerated(false)
          }}>
            <Text style = {styles.btnlabel}>Reset Password</Text>
          </TouchableOpacity>
          </View>
          </View>
        ) : null }
        { isPassGenerated == true && password == '0' ? (
          <View style = {styles.abspasscontainer}>
          <View style = {styles.passwordContainer}>
            <Image source = {{uri : 'https://i.pinimg.com/1200x/ff/61/e8/ff61e895405a4bf20ba8f0ccf475d332.jpg'}} style ={{height : 80 , width : 80}}/>
            <Text style = { {fontSize : 15, fontFamily : 'PixelifySans-SemiBold' , color : '#000000' , margin : 10 } }>Please check atleast one checkbox!</Text>
            
          <TouchableOpacity style = {styles.resetbtn1} onPress={()=>{resetPassword(); setisPassGenerated(false)
          }}>
            <Text style = {styles.btnlabel}>Reset Password</Text>
          </TouchableOpacity>
          </View>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
    

  )
}

export default App

const styles = StyleSheet.create({
  abspasscontainer : {
    flex : 1,
    position : 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  passwordContainer : {
    flex : 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : '#FFFFFF',
    width : 300,
    height : 200,
    borderRadius : 50,
  },
  lencontainer : {
    // borderWidth : 5,
    // borderColor : '#ff0000',
    width : '70%',
    height : 60,
    marginRight : 50,
    marginTop : 30
    
  },
  inputlabellength : {color : '#FFFFFF',
    fontFamily : 'PixelifySans-Medium',
    fontSize : 18,
    marginRight : 25,
    width : '80%'
  },
  btnlabel : {color : '#FFFFFF',
    fontFamily : 'PixelifySans-Medium',
    fontSize  : 15,
    margin : 'auto'
  },
  resetbtn : {
    backgroundColor : '#c7c7c7c6',
    padding : 10,
    borderRadius : 20,
    width : '70%',
    marginTop : 15
  },
  resetbtn1 : {
    backgroundColor : '#00000045',
    padding : 10,
    borderRadius : 20,
    marginTop : 20
  },
  genbutton:{  backgroundColor : '#ff3c00cd',
    padding : 10,
    borderRadius : 20,
    width : '70%'
  },
  inputlabel : {color : '#FFFFFF',
    fontFamily : 'PixelifySans-Medium',
    fontSize : 18,
    marginRight : 40,
    width : '80%'
  },
  errors : {
    color: '#ff0000ff',
  },
leninput:{
    borderWidth : 1,
    width : 50,
    height : 40,
    borderColor : '#ff3c0056',color : '#ffffffe2'
  },
  actionButtons :{
    flex : 0.3,
    width : '100%',
   // flexDirection : 'row',
    alignItems : 'center',
    padding : 10,
    //justifyContent : 'space-between'
  },
  inputWrapper : {
    flex : 0.15,
    width : '100%',
    flexDirection : 'row',
    alignItems : 'center',
    padding : 20,
  },

  App : {
    flex : 1,
    backgroundColor : '#282828ff',
    
  },
titleText : {
  fontSize : 30,
  fontFamily : 'Tiny5Regular',
  // marginLeft : 20,
  color : '#FFFFFF',
  backgroundColor : '#000000',
  marginBottom : 0
},
titleCard : {
  flex : 0.3,
 width : '100%',
//  paddingLeft : 20,
 backgroundColor : '#000000'

},
userInteraction : {
  flex : 0.7,
  //  borderWidth : 5,
  //   borderColor :'#f40000ff'
},
titlebg : {
  flex : 1,
  resizeMode : 'contain',
},
textcontainer : {
  flex : 0.4,
  width : '100%',
  justifyContent : 'flex-end',
  alignItems : 'flex-end',
  flexDirection : 'row'
  //  borderWidth : 5,
  // borderColor : '#c40f0fff'

},
imagecontainer : {
  flex : 1,
  width : '100%',
  justifyContent : 'flex-end',
  alignItems : 'flex-end',
  marginTop : 40,
  // borderWidth : 5,
  // borderColor : '#FFFFFF'
},
lockimage : {
  width : 80,
  height : 80,
  marginBottom : 20,
  marginRight : 20,
  borderRadius : 10
}

 
});
