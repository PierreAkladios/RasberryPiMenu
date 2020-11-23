let focused = false;
//Variable to determine if the user is in an input or a texarea

 
function copy() {
    //Take user's entries of recipient email, the subject and the content of the email. Then calls the sending function
    var message_text = document.querySelector("#message").value;
    var email_entry = document.getElementById("email_address").value;
    var subject = document.getElementById("subject").value
    actionsend(email_entry, subject, message_text) 
}


function actionsend(email,subject, text){
    //Using the mailto action of a html form, we insert the data collected previously
    var form = document.getElementById("emailtarget")
    form.action = `mailto:${email}?subject=${subject}&body=${text}`
}


textarea = document.getElementById("message"); 
textarea.addEventListener('input', autoResize, false); 
function autoResize() {
    //When text is written in the textarea, the height is constantly adjusted 
    this.style.height = 'auto'; 
    this.style.height = this.scrollHeight + 'px'; 
} 

function chgfocus(){
    /*When the user is in an input or a textarea, the focus changes to true, disabling the shortcuts so that special letters it the writting won't call unwanted functions. 
    
    If the user exits the input, the shortcuts are enabled again to allow calls.
    
    The header is modified to match the current state of the shortcuts*/
    if (focused == false){
        focused = true
        document.getElementById("shorts").innerHTML = "SHORTCUTS DISABLED";

    }else{
        focused = false
        document.getElementById("shorts").innerHTML = "SHORTCUTS ENABLED : B = 'BACK' ; S = 'SEND'; C = 'Clear' ; TAB = 'NAVIGATING'";
    }
}

function clear_input() {
    //A prompt is shown to ensure the user wanted to clear its entry. If so, the inputs and textarea are emptied. 
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
    else if (key.keyCode == "83" && focused == false){
        // 83 = 'S'
        document.getElementById("send").click()

    }
    else if (key.keyCode == "67" && focused==false){
        // 67 = 'C'
        document.getElementById("clear").click()
        
    }
}



