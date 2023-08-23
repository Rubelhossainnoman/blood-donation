// Get element here....
const memberRgForm = document.getElementById("memberRegistrationForm");
const memberLgForm = document.getElementById("memberLoginForm");
const rgMsg = document.getElementById("rgMsg");
const rgBtnClose = document.querySelector("#loginRegistraionModal button.btn-close");
const acBtn = document.querySelector(".acBtn");
const addNewMemberForm = document.getElementById("addNewMemberForm");
const addMemberModalClose = document.getElementById("addNewMemberModalCloseBtn");
const editMemberModalClose = document.getElementById("editMemberModalCloseBtn");

// Get addNewPatientForm here...
const patientForm = document.getElementById("addNewPatientForm");

// Edit Form here..
const editMemberForm = document.getElementById("editMemberForm");

// Show all member here...
MemberAssets.showAllMember();


// Member delete function
const deleteMemberBtn = (id) =>{
    MemberAssets.deleteMember(id);
    MemberAssets.showAllMember();
}

// Member single view function here...
const singleViewBtn = (id) =>{
    MemberAssets.singleView(id);
}

// Member edit function
const singleEditBtn = (id) =>{
    MemberAssets.singleEdit(id);
}

// Member registration form here...
if (memberRgForm) {
    memberRgForm.onsubmit = (e) =>{
        e.preventDefault();

        // Get form data here...
        const doObject = Utility.formData(e.target);

        // Data destructuring here...
        const {fname,lname,email,phone,blood,location,pass} = doObject;

        // Use valication here...
        if (!fname || !email || !phone || !blood || !location || !pass) {
            rgMsg.innerHTML = Alert.setAlert("All Fields Are Required!", "danger")
            rgMsg.style.transition = "all .3s ease-in-out";
            rgMsg.style.opacity = 1;
            rgMsg.style.visibility = "visible";
            rgMsg.style.height = 100 + "%";

            setTimeout(() =>{
                rgMsg.style.opacity = 0;
                rgMsg.style.visibility = "hidden";
                rgMsg.style.height = 0 + "px";
            },2000)
        } else if(!Utility.isEmail(email)){
            rgMsg.innerHTML = Alert.setAlert("Wrong Email Type!", "danger");
        } else if(!Utility.isPhone(phone)){
            rgMsg.innerHTML = Alert.setAlert("Wrong Phone Type!", "danger");
        } else if(Utility.isPass(pass).status == false){
            rgMsg.innerHTML = Alert.setAlert(Utility.isPass(pass).msg, "danger");
        } else{
            // Get data form ls here...
            const memberAuth = Stroage.getDataLs("memberAuth");

            // Check exiting use here...
            let existingEmail = [];
            let existingPhone = [];

            if (memberAuth.length > 0) {
                memberAuth.forEach(item => {
                    existingEmail.push(item.email);
                    existingPhone.push(item.phone);
                });
            }

            if (existingEmail.includes(email)) {
                rgMsg.innerHTML = Alert.setAlert("This Email already exits. Use another one.", "danger");
            } else if(existingPhone.includes(phone)){
                rgMsg.innerHTML = Alert.setAlert("This Phone already exits. Use another one.", "danger");
            }else{
                // Create unique id here...
                const id = Date.now() + Math.floor(Math.random() * 10000);
                        
                // Data push here...
                memberAuth.push({
                    id,
                    fname,lname,email,phone,blood,location,pass : pass + 1,
                    timestamps : Date.now()
                })

                // Set data in ls here...

                Stroage.sendDataLs("memberAuth", memberAuth);

                // Reset data now ....
                e.target.reset();
                rgBtnClose.click();
                acBtn.click();
            }
        }
    }
}

// Member login form here..
if (memberLgForm) {
    memberLgForm.onsubmit = (e) =>{
        e.preventDefault();
        alert(`This Feature Is Comming Soon! Now try to first registration.`)
    }
}

// Add student function here...
if (addNewMemberForm) {
    addNewMemberForm.onsubmit = (e) => {
        e.preventDefault();
        
        // Form data here...
        const data = Utility.formData(e.target);

        const sendData = new MemberAssets({fname : data.fname, lname : data.lname, email : data.email, age : data.age, phone : data.phone, blood : data.blood, location : data.location, gender : data.gender, photo : data.photo, skill : data.skill, lastDonate : data.lastDonate},{keyName : "members", reset : e.target, closeBtn : addMemberModalClose});

        sendData.sendData();
        MemberAssets.showAllMember();
    }
}


// Member id form here...
if (editMemberForm) {
    editMemberForm.onsubmit = (e) =>{
        e.preventDefault();

        // Form data here...
        const data = Utility.formData(e.target);
        // console.log(data);

        // MemberAssets intance here

        MemberAssets.updateData({fname : data.fname, lname : data.lname, email : data.email, age : data.age, phone : data.phone, blood : data.blood, location : data.location, gender : data.gender, photo : data.photo, skill : data.skill, lastDonate : data.lastDonate, id : data.id, fb : data.fb, lin : data.lin, twit : data.twit, youtu : data.youtu},{keyName : "members", reset : e.target, closeBtn : editMemberModalClose});

        MemberAssets.showAllMember();
    }
}

// Add patient here...
const addPatientBtn = (id) =>{
    MemberAssets.addPatient(id);
}

if (patientForm) {
    patientForm.onsubmit = (e) =>{
        e.preventDefault();
        // Manage form data here...
        const data = Utility.formData(e.target);
        // addDonnerClose 
        const addDonnerClose = document.getElementById("addDonnerClose");
        const msg = document.getElementById("patientMsg");
        // Get all members here...
        let allMembers = Stroage.getDataLs("members");

        // check valication here...
        if (!data.name || !data.phone || !data.location) {
            msg.innerHTML = Alert.setAlert("All Fields Are Required!", "danger")
            msg.style.transition = "all .3s ease-in-out";
            msg.style.opacity = 1;
            msg.style.visibility = "visible";
            msg.style.height = 100 + "%";

            setTimeout(() =>{
                msg.style.opacity = 0;
                msg.style.visibility = "hidden";
                msg.style.height = 0 + "px";
            },2000);
        } else if(!Utility.isPhone(data.phone)){
            msg.innerHTML = Alert.setAlert("Invalid Phone Type!", "danger")
            msg.style.transition = "all .3s ease-in-out";
            msg.style.opacity = 1;
            msg.style.visibility = "visible";
            msg.style.height = 100 + "%";

            setTimeout(() =>{
                msg.style.opacity = 0;
                msg.style.visibility = "hidden";
                msg.style.height = 0 + "px";
            },2000);
        }else {
            // single data here..
            let singleData = allMembers[allMembers.findIndex(member => member.id == data.id)].history;
            singleData.push({
                name : data.name, location : data.location, phone : data.phone , patientId : Date.now() + Math.floor(Math.random() * 100000)
            })

            // Find and replace singe member data...
            allMembers[allMembers.findIndex(member => member.id == data.id)] = {
                ...allMembers[allMembers.findIndex(member => member.id == data.id)],
                history : singleData,
                status : true
            }

            // Now set data in ls here...
            Stroage.sendDataLs("members", allMembers);
            // Reload data ...
            MemberAssets.showAllMember();
            e.target.reset();
            addDonnerClose.click();
        }
        
    }
}




