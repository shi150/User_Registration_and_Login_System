document.addEventListener('DOMContentLoaded', function() {
    const x = document.getElementById('signUp');
    const y = document.getElementById('signIn');
    const z = document.getElementById('container');


    x.addEventListener('click', function() {
        z.classList.add("anim-effect");
    });


    y.addEventListener('click', function() {
        z.classList.remove("anim-effect");
    });
});
function register()
    {
        let name=document.getElementById('sname').value;
        let phone = document.getElementById('sphone').value;
        let pattern1 = /^[6-9][0-9]{9}$/;
        let email=document.getElementById('semail').value;
        let password=document.getElementById('spassword').value;
        let confirmpassword=document.getElementById('sconfirmpassword').value;
        let pattern =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{8,}$/;
        
        if(name == null || name ==""){
        alert('Name cant be empty or null');
        return false;
        }
        if(!pattern1.test(phone))
            {
                alert("enter valid 10 digits mobile number");
                return false;
            }
            
            if(email == null || email ==""){
       alert('email cant be empty or null');
       return false;
            }
         if(!pattern.test(password))
       {
        alert('password must be 8 char long with atleast 1 uppercase,lowercase,number,specialcase');
        return false;
       }
       if(password !==confirmpassword)
       {
       alert("password not matching");
       return false;
       }
       // get existing users from local storage
       
       let users = JSON.parse(localStorage.getItem('users')) || [];

       //check email existance
       for(let i=0;i<users.length;i++)
       {
        if(users[i].email === email)
        {
            alert('EMAIL ALREADY REGISTERED,PLEASE USE ANOTHER EMAIL');
            return false;
        }
        if(users[i].phone === phone)
        {
            alert('PHONE NUMBER ALREADY REGISTERED,PLEASE USE ANOTHER PHONE NUMBER ')
        }
       }

       // add new user to local 

       users.push({name:name,phone:phone,email:email,password:password});
       localStorage.setItem('users',JSON.stringify(users));
       alert(' ACCOUNT REGISTRATION IS SUCCESSFULL');
       window.location.href='index.html';
       return false;  
    }
    //===========ADMIN DASHBOARD==============//
    function showallusers()
        {
            let users = JSON.parse(localStorage.getItem('users'))  || [];
            let table =document.getElementById('userTable');

            table.innerHTML=`
            <tr>
              <th>NAME</th>
              <th>PHONE</th>
             <th>EMAIL</th>
             <th>ACTION</th>
             </tr>
              `;
         
           for(let i=0; i<users.length; i++)
           {
            table.innerHTML +=`
             <tr>
                   <td>${users[i].name}</td>
                   <td>${users[i].phone}</td>
                   <td>${users[i].email}</td>
                   <td>
                   <button onclick='deleteUser(${i})'>DELETE</button>
                   </td>    
             </tr>
                `;
            
           }

         }        
       
        //==============DELETEUSER===================//
        function deleteUser(index)
        {
           let users = JSON.parse(localStorage.getItem('users'))  || [];
           users.splice(index,1);  

           localStorage.setItem("users",JSON.stringify(users));

           showallusers();
        }

        //============search users===============//
        function searchUser()
        {
            let search =document.getElementById('searchEmail').value;
            let users = JSON.parse(localStorage.getItem('users')) || [];
            let table =document.getElementById('userTable');

            table.innerHTML=`
            <tr>
               <th>NAME</th>
              <th>PHONE</th>
             <th>EMAIL</th>
             <th>ACTION</th>
             </tr>
              `;
          for(let i=0; i<users.length;i++)
            {
            if(users[i].email.includes(search))
            {
                table.innerHTML=`
                <tr>
                <td>${users[i].name}</td>
                <td>${users[i].phone}</td>
                 <td>${users[i].email}</td>
                   <td>
                <button onclick='deleteUser(${i})'>DELETE</button>
                 </td>    
              </tr>   
               `;
            }
          }    
        }
    
    /*==================singin============*/

    function login()
    {
        let email = document.getElementById('lemail').value;
        let password = document.getElementById('lpassword').value;

        //=====================ADMIN LOGIN CREDENTIALS======================//

        if(email === 'shivaniadmin@gmail.com' && password === 'Admin@123')
        {
            window.location.href='admin.html';
            return false;
        }


//===================USER LOGIN===============================//
        let users = JSON.parse(localStorage.getItem('users')) || [];
    for(let i=0;i<users.length;i++)
    {
        if(users[i].email === email && users[i].password === password)
        {
            localStorage.setItem("currentUser",JSON.stringify(users[i]));
            window.location.href='welcome.html';
            return false;
        }
    }
        alert("Invalid login email & password");
        return false;
    
    }
// ===========welcome page==============//
function showUser()
{
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if(user)
    {
      document.getElementById('wuser').innerText=user.name;
      document.getElementById('wname').innerText=user.name;
      document.getElementById('wemail').innerText=user.email;
      document.getElementById('wphone').innerText=user.phone;

    }
}

//=============logout=================//

function logout()
{
    localStorage.removeItem("currentUser");
    window.location.href="index.html";
}