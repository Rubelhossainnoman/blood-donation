// Get element here...
const member_login_form = document.querySelector(".member_login_form");
const loginRegistrationHeader = document.querySelector(".loginRegistrationHeader");
const regButton = document.querySelector(".member_login_form .registrationButton");
const member_registration_form = document.querySelector(".member_registration_form");
const lgButton = document.querySelector(".member_registration_form .loginButton");
const rgHide = document.querySelector(".rgHide ion-icon");
const lgHide = document.querySelector(".lgHide ion-icon");
const lgPassField = document.querySelector(".lgPassField input");
const rgPassField = document.querySelector(".rgPassField input");
const lgmenu = document.querySelector(".lgmenu");
const lgmenu2 = document.querySelector(".lgmenu2");
const acmenu = document.querySelector(".acmenu");

// For image file here...
// const selectImage = document.querySelector(".selectImage");
// const previewImage = document.querySelector(".previewImage");
// const inputPhoto = document.querySelector(".inputPhoto");
// const previewImageChild = document.querySelector(".previewImageParent .images");


if (regButton) {
    regButton.onclick = () =>{
        member_registration_form.classList.add("active");
        member_login_form.classList.remove("active");
        loginRegistrationHeader.innerHTML = "Registration Form"
    }
}
if (lgButton) {
    lgButton.onclick = () =>{
        member_registration_form.classList.remove("active");
        member_login_form.classList.add("active");
        loginRegistrationHeader.innerHTML = "Login Form"
    }
}

if (rgHide) {
    rgHide.onclick = () => {
        if (rgPassField.type == "password") {
            rgPassField.type = "text";
            rgHide.name = "eye-outline";
            
        } else {
            rgPassField.type = "password";
            rgHide.name = "eye-off-outline"
        }
    };
}

if (lgHide) {
    lgHide.onclick = () => {
        lgHide.classList.toggle("active")
        if (lgPassField.type == "password") {
            lgPassField.type = "text";
            lgHide.name = "eye-outline";
        } else {
            lgPassField.type = "password";
            lgHide.name = "eye-off-outline"
        }
    };
}

window.onload = () =>{
    const memberAuth = Stroage.getDataLs("memberAuth");
    if (memberAuth.length > 0) {
        lgmenu.classList.add("hide");
        lgmenu2.classList.add("hide");
    } else {
        acmenu.classList.add("hide")
    }
}

// if (inputPhoto) {
//     inputPhoto.onchange = (e) =>{
//         // Create a url here...
//         const imageUrl = URL.createObjectURL(e.target.files[0])
//         selectImage.style.display = "none";
//         previewImageChild.style.display = "block"
//         previewImage.setAttribute("src", imageUrl)
//     }
// }

// if (previewImageChild) {
//     previewImageChild.addEventListener("click", function(){
//         inputPhoto.click()
//     })
// }


