function copy() {
    var message_text = document.querySelector("#message");
    message_text.select()
    document.execCommand('copy');
    var email_entry = document.getElementById("email_adress").value;
    actionsend(email_entry)
    
}
function actionsend(email){
    var form = document.getElementById("emailtarget")
    form.action = `mailto:${email}`
}

textarea = document.getElementById("message"); 
textarea.addEventListener('input', autoResize, false); 
function autoResize() { 
    this.style.height = 'auto'; 
    this.style.height = this.scrollHeight + 'px'; 
} 
