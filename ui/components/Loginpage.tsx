import React, {useState} from 'react';

function Loginpage() {

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {setEmail(event.currentTarget.value)}
    const onPasswordHandler = (event) => {setPassword(event.currentTarget.value)}
    const onSubmitHandler=(event)=>{
    event.preventDefault();
        let body={email: Email, password: Password}
    } 

 
        return (
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', width: '100%', height:'100vh'}}>
            <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={onSubmitHandler}>
            <label>ID</label>
            <input type="email" value={Email} onChange={onEmailHandler} />
            <button>Login</button>

            <br />

            <label>PW</label>
            <input type="password" value={Password} onChange={onPasswordHandler} />
            </form>
        </div>
        );
    }
};

export default Loginpage;