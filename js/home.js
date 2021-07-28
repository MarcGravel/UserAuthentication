let loginToken = Cookies.get('loginToken');

//Checks to see if user is logged in
if (loginToken == undefined) {
    //warning message
    let noLoginWarning = document.createElement('h1');
    noLoginWarning.style.color = "red";
    noLoginWarning.style.display = "block";
    noLoginWarning.innerText = "No one is Logged in, click button below to go login.";
    document.getElementById('loginMessage').appendChild(noLoginWarning);

    //redirect button with function and event listner
    let redirectBtn = document.createElement('button');
    redirectBtn.innerText = "Click Here"

    function redirect() {
        window.location.href = "index.html"
    }

    redirectBtn.addEventListener('click', redirect);
    document.getElementById('loginMessage').appendChild(redirectBtn);
} else {

    //Welcome Message
    let welcomeMessage = document.createElement('h1');
    welcomeMessage.style.display = "block";
    welcomeMessage.style.fontSize = "3em";
    welcomeMessage.innerText = "Welcome! You are now logged in!";
    document.getElementById('loginMessage').appendChild(welcomeMessage);

    //logout function
    function clearSessionCookie() {
        Cookies.remove('loginToken')
        window.location.href = "index.html";
    }

    //creates button and adds style class + inner text
    let logoutBtn = document.createElement('button');
    logoutBtn.classList.add('logoutBtnStyle');
    logoutBtn.innerText = "Logout";

    logoutBtn.addEventListener('click', clearSessionCookie);
    document.querySelector('body').append(logoutBtn);


    //get request for color array
    axios.request({
        method: "GET",
        url: "https://reqres.in/api/unknown"
    }).then(getColors).catch(getColorsFail);

    //uses data from color array to create elements and inject data into correct elements
    function getColors(response) {
        console.log(response);

        //iterates through array to get all color data required 
        for(let i=0; i<response.data.data.length; i++) {
            let newDiv = document.createElement('div');

            let colorName = document.createElement('p');
            colorName.innerText = response.data.data[i].name;
            colorName.style.fontSize = "1.5em";

            let colorYear = document.createElement('p');
            colorYear.innerText = response.data.data[i].year;

            let colorLook = document.createElement('div');
            colorLook.style.width = "50px";
            colorLook.style.height = "50px";
            colorLook.style.backgroundColor = response.data.data[i].color;
            
            newDiv.appendChild(colorName);
            newDiv.appendChild(colorYear);
            newDiv.appendChild(colorLook);

            document.getElementById('extraInfo').appendChild(newDiv);
        }
    }

    //failure fuction if color array GET was not successful
    function getColorsFail(error) {
        console.log(error);

        let colorFail = document.createElement('p');
        colorFail.innerText = "Something went wrong, try reloading the page";
        document.getElementById('extraInfo').append(colorFail);
    }
}