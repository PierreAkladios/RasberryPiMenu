let focused = false;

/*Take user's entries of recipient email, the subject and the content of the email. Then calls the sending function
*/ 
function copy() {
    var message_text = document.querySelector("#message").value;
    var email_entry = document.getElementById("email_address").value;
    var subject = document.getElementById("subject").value
    actionsend(email_entry, subject, message_text) 
}

function actionsend(email,subject, text){
    var form = document.getElementById("emailtarget")
    form.action = `mailto:${email}?subject=${subject}&body=${text}`
}


textarea = document.getElementById("message"); 
textarea.addEventListener('input', autoResize, false); 
function autoResize() { 
    this.style.height = 'auto'; 
    this.style.height = this.scrollHeight + 'px'; 
} 

function chgfocus(){
    if (focused == false){
        focused = true
        document.getElementById("shorts").innerHTML = "SHORTCUTS DISABLED";

    }else{
        focused = false
        document.getElementById("shorts").innerHTML = "SHORTCUTS ENABLED : B = 'BACK' ; TAB = 'NAVIGATING'";
    }
}

function clear_input() {
    approve = confirm("YOUR ENTRY WILL BE CLEARED")
    if (approve == true) {
        document.getElementById("email_address").value = ''
        document.getElementById("subject").value = ''
        document.getElementById("message").value = ''
    }
}


window.addEventListener("keydown", checkKey, false);

function checkKey(key) {
    if (key.keyCode == "66" && focused == false) {
        //On press of 'b' returns to main menu
        
        window.location.href = "../Menu/Menu.html"
    }
}



