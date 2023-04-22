const inputIcon = document.querySelector(".input-icon");
inputIcon.addEventListener("click",toggleVisibility);
function toggleVisibility(){
    const input = document.querySelector("#password");
    const toggleIcon = document.querySelector(".input-icon i");
    if(input.type==="password"){
        input.type="text";
        toggleIcon.className="fa fa-eye";
    }
    else{
        input.type="password";
        toggleIcon.className="fa fa-eye-slash";
    }
}