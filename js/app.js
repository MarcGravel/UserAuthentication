document.getElementById('submitBtn').addEventListener('click', loginAttempt);

function loginAttempt() {
    //gets values of input boxes
    let userEmail = document.getElementById('emailInput').value;
    let userPassword = document.getElementById('passwordInput').value;

    //handles if input boxes are blank
    if (userEmail == "" || userPassword == "") {
        //handles warning message not to reappear each submit click
        let alreadySubmitted = document.querySelector('p');
        if (alreadySubmitted != null) {
            alreadySubmitted.remove();
        }
        //creates warning message;
        let warning = document.createElement('p');
        warning.innerText = "Please fill out the form before submitting.";
        document.getElementById('messageBox').append(warning);
    } else {
        
        axios.request({
            method: "POST",
            url: "https://reqres.in/api/login",
            //headers tells receiving end how to read. in this case it tells its JSON
            headers:{
                "Content-type" : "application/json"
            },
            data:{
                email: userEmail,
                password: userPassword
            }
        }).then(success).catch(failure);

        function success(response) {
            console.log(response);
            Cookies.set('loginToken', response.data.token)
            window.location.href = "home.html";
        }
        
        function failure(error) {
            console.log(error);
            //handles warning message not to reappear each submit click
            let loginAlreadySubmitted = document.querySelector('p');
            if (loginAlreadySubmitted != null) {
                loginAlreadySubmitted.remove();
            }

            let invalid = document.createElement('p');
            invalid.innerText = "Login Invalid, try again";
            document.getElementById('messageBox').append(invalid);
        }
    }
}