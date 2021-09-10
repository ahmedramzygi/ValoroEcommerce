import firebase  from 'firebase'; 

const firebaseConfig = {

    apiKey: "AIzaSyDlTsJYq69_4QW1j2bThdcO8wd4YVmkDkE",

    authDomain: "e-mobilescommerce.firebaseapp.com",

    projectId: "e-mobilescommerce",

    storageBucket: "e-mobilescommerce.appspot.com",

    messagingSenderId: "285832428678",

    appId: "1:285832428678:web:f1008afd6feeeab8aaa507"

  };
const fire = firebase.initializeApp(firebaseConfig);
export default fire;
