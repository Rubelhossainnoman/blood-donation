class MemberAssets{
    constructor(data, key){
        this.fname = data.fname;
        this.lname = data.lname;
        this.email = data.email;
        this.age = data.age;
        this.phone = data.phone;
        this.blood = data.blood;
        this.location = data.location;
        this.gender = data.gender;
        this.photo = data.photo;
        this.skill = data.skill;
        this.lastDonate = data.lastDonate;
        
        this.key = key.keyName;
        this.reset = key.reset;
        this.btn = key.closeBtn;

        this.sendData = function(){
            const msg = document.getElementById("msg")
            if (!this.fname || !this.email || !this.age || !this.phone || !this.blood || !this.location || !this.gender || !this.photo || !this.skill || !this.lastDonate) {
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

            } else if(!Utility.isEmail(this.email)){
                msg.innerHTML = Alert.setAlert("Wrong Email Type!", "danger");
                msg.style.transition = "all .3s ease-in-out";
                msg.style.opacity = 1;
                msg.style.visibility = "visible";
                msg.style.height = 100 + "%";
    
                setTimeout(() =>{
                    msg.style.opacity = 0;
                    msg.style.visibility = "hidden";
                    msg.style.height = 0 + "px";
                },2000);

            } else if(!Utility.isPhone(this.phone)){
                msg.innerHTML = Alert.setAlert("Wrong Phone Type!", "danger");
                msg.style.transition = "all .3s ease-in-out";
                msg.style.opacity = 1;
                msg.style.visibility = "visible";
                msg.style.height = 100 + "%";
    
                setTimeout(() =>{
                    msg.style.opacity = 0;
                    msg.style.visibility = "hidden";
                    msg.style.height = 0 + "px";
                },2000);

            } else{
                // Get data form ls here...
                const allMembers = Stroage.getDataLs(this.key);
    
                // Check exiting use here...
                let existingEmail = [];
                let existingPhone = [];
    
                if (allMembers.length > 0) {
                    allMembers.forEach(item => {
                        existingEmail.push(item.email);
                        existingPhone.push(item.phone);
                    });
                }
    
                if (existingEmail.includes(this.email)) {
                    msg.innerHTML = Alert.setAlert("This Email already exits. Use another one.", "danger");
                    msg.style.transition = "all .3s ease-in-out";
                    msg.style.opacity = 1;
                    msg.style.visibility = "visible";
                    msg.style.height = 100 + "%";
        
                    setTimeout(() =>{
                        msg.style.opacity = 0;
                        msg.style.visibility = "hidden";
                        msg.style.height = 0 + "px";
                    },2000);

                } else if(existingPhone.includes(this.phone)){
                    msg.innerHTML = Alert.setAlert("This Phone already exits. Use another one.", "danger");
                    msg.style.transition = "all .3s ease-in-out";
                    msg.style.opacity = 1;
                    msg.style.visibility = "visible";
                    msg.style.height = 100 + "%";
        
                    setTimeout(() =>{
                        msg.style.opacity = 0;
                        msg.style.visibility = "hidden";
                        msg.style.height = 0 + "px";
                    },2000);

                }else{
                    // Create unique id here...
                    const id = Date.now() + Math.floor(Math.random() * 10000);
                            
                    // Data push here...
                    allMembers.push({
                        ...data,
                        id,
                        history : [],
                        status : false,
                        fb : null,
                        lin : null,
                        twit : null,
                        youtu : null
                    })
    
                    // Set data in ls here...
    
                    Stroage.sendDataLs(this.key, allMembers);
    
                    // Reset data now ....
                    this.reset.reset();
                    this.btn.click();
                }
            }
        }
    }

    // Member show modal here...
    static showAllMember = function(){
        // Get table body here...
        const allDonateMembers = document.getElementById("allDonner");
        const latestMembers = document.getElementById("latestMembers");
        
        let content = '';
        let members = '';

        // Get all members here..
        const allMembers = Stroage.getDataLs("members");

        // Now use conditon here...
        if (allMembers.length < 1) {
            content += `<tr class="text-center"><td colspan="9"><h4 class="m-0 py-2">Data Not Found!</h4></td></tr>`;
            members += `
                <div class="col-lg-3 col-md-4 col-sm-6 col-12">
                    <div class="member_box">
                        <div class="member_image">
                            <img src="./image/avatar.jpg" alt="Rubel Hossain">
                            <div class="social_icons">
                                <ul>
                                    <li><a href="/"><ion-icon name="logo-facebook"></ion-icon></a></li>
                                    <li><a href="/"><ion-icon name="logo-linkedin"></ion-icon></a></li>
                                    <li><a href="/"><ion-icon name="logo-twitter"></ion-icon></a></li>
                                    <li><a href="/"><ion-icon name="logo-youtube"></ion-icon></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="member_info">
                            <h4 class="m-0">Example Name</h4>
                            <p class="mb-0">Example Skill</p>
                            <p class="mb-0">Blood : Example</p>
                            <div class="details">
                                <a href="#"><ion-icon name="arrow-redo-outline"></ion-icon></a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Now use map here...
            allMembers.map((member,index)=>{
                // SocailFuction here..
                const socialData = (member) =>{
                    let fb = '';
                    let lin = '';
                    let twit = '';
                    let youtu = '';

                    if (member.fb) {
                        fb = `<a href="${member.fb}"><ion-icon name="logo-facebook"></ion-icon></a>`
                    }
                    if(member.lin){
                        lin = `<a href="${member.lin}"><ion-icon name="logo-linkedin"></ion-icon></a>`
                    } 
                    if(member.twit){
                        twit = `<a href="${member.twit}"><ion-icon name="logo-twitter"></ion-icon></a>`
                    } 
                    if(member.youtu){
                        youtu = `<a href="${member.youtu}"><ion-icon name="logo-youtube"></ion-icon></a>`
                    }

                    return {fb,lin,twit,youtu}
                }

                content += `
                    <tr>
                        <th>${index + 1}</th>
                        <td>
                            <img class="shadow-lg" src="${member.photo}" alt="">
                        </td>
                        <td>${member.fname} ${member.lname}</td>
                        <td><a class="email" href="mailto:${member.email}">${member.email}</a></td>
                        <td>${member.age}</td>
                        <td>${member.blood}</td>
                        <td>${member.lastDonate}</td>
                        <td>${member.location}</td>
                        <td>${member.status == false ? `<button class="btn btn-warning">Pending</button>` : `<button class="btn btn-success">Success</button>`}</td>
                        <td class="memberAction">
                            <a onclick={singleViewBtn(${member.id})} data-bs-target="#donnerSingleProfileModal" data-bs-toggle="modal" class="btn btn-info"><ion-icon name="eye-outline"></ion-icon></a>
                            <a onclick={singleEditBtn(${member.id})} data-bs-toggle="modal" data-bs-target="#memberEditModal" class="btn btn-warning"><ion-icon name="create-outline"></ion-icon></a>
                            <a onclick={deleteMemberBtn(${member.id})} class="btn btn-danger"><ion-icon name="trash-outline"></ion-icon></a>
                            <a onclick={addPatientBtn(${member.id})}  title="Donate" data-bs-toggle="modal" data-bs-target="#addPatient" class="btn btn-primary"><span class="material-symbols-outlined"> bloodtype </span></a>
                            <a title="Contact" href="tel:${member.phone}" class="btn btn-info"><ion-icon name="call-outline"></ion-icon></ion-icon></a>
                        </td>
                    </tr>
                `;
                members += `
                    <div class="col-lg-3 col-md-4 col-sm-6 col-12">
                        <div class="member_box">
                            <div class="member_image">
                                <img src="${member.photo}" alt="${member.fname} ${member.lname}">
                                <div class="social_icons">
                                    <ul>
                                        <li>${socialData(member).fb}</li>
                                        <li>${socialData(member).lin}</li>
                                        <li>${socialData(member).twit}</li>
                                        <li>${socialData(member).youtu}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="member_info">
                                <h4 class="m-0">${member.fname} ${member.lname}</h4>
                                <p class="mb-0">${member.skill}</p>
                                <p class="mb-0">Blood : ${member.blood}</p>
                                <div class="details">
                                    <a href=""><ion-icon name="arrow-redo-outline"></ion-icon></a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            })
        }

        if (allDonateMembers) {
            allDonateMembers.innerHTML = content;
        }else{
            latestMembers.innerHTML = members;
        }       
    }

    // Member delete modal here...
    static deleteMember = function(id){
        // Gell all member here..
        const allMember = Stroage.getDataLs("members").filter(data => data.id != id);
        
        // Take confirmation here..
        const confi = confirm(`Hello ${Stroage.getDataLs("members").find(data => data.id == id).fname}, Are you sure to delete this profile? It's not recoverable.`);

        if (confi) {
            Stroage.sendDataLs("members", allMember)
        }
    }

    // Member single view modal here...
    static singleView = function(id) {
        // Get element here....
        const donnerSingle = document.getElementById("donnerSingleProfileContent");
        // Get single member here...
        const singleMember = Stroage.getDataLs("members").find(data => data.id == id);

        const historyData = () =>{
            if (singleMember.history.length >= 1) {
                let patientData = '';
                singleMember.history.map((patient,index) =>{
                    patientData += `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${patient.name}</td>
                            <td>${patient.location}</td>
                            <td><a href="tel:${patient.phone}">${patient.phone}</a></td>
                        </tr>
                    `;
                })
                return patientData;
            } else {
                return `<tr class="text-center"><td colspan="9"><h6 class="m-0 py-2">Data Not Found!</h6></td></tr>`;
            }
        }
        donnerSingle.innerHTML = `
            <div class="modal-header">
                <h5 class="m-0">Single Donner Profile</h2>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="donner_profile_box">
                    <div class="profile_image">
                        <img class="shadow" src="${singleMember.photo}" alt="">
                    </div>
                    <div class="profile_info">
                        <h6 class="m-0 name"> Name : ${singleMember.fname} ${singleMember.lname}</h6>
                        <p class="m-0"> Phone : ${singleMember.phone}</p>
                        <p class="m-0"> Email : <a href="mailto:${singleMember.email}">${singleMember.email}</a></p>
                        <p class="m-0"> Location : ${singleMember.location}</p>
                        <p class="m-0"> Age : ${singleMember.age}</p>
                        <p class="m-0"> Blood Group : ${singleMember.blood}</p>
                    </div>
                </div>
                <div class="donation">
                    <div class="title">
                        <h4 class="m-0 py-3 text-center">Donation <span style="color: #fe3c47;">History</span></h4>
                    </div>
                    <div class="donation_info">
                        <table class="table table-responsive table-hover table-bordered">
                            <thead>
                                <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Number</th>
                                </tr>
                            </thead>
                            <tbody>${historyData()}
                                <!-- <tr>
                                <th>1</th>
                                <td>Rubel Hossain</td>
                                <td>Thakurgaon</td>
                                <td><a href="tel:+8801774217461">+8801774217461</a></td>
                                </tr> -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    // Member single edit modal here..
    static singleEdit = function(id){
        // Get element here..
        const editSingleMember = document.getElementById("editMemberForm");

        // Get single member here...
        const data = Stroage.getDataLs("members").find(data=> data.id == id);

        editSingleMember.innerHTML = `
            <div class="mb-3 half">
                <label for="fname">First Name <span>*</span></label>
                <input type="text" value="${data.fname}" name="fname" placeholder="Your First Name" id="fname" class="form-control">
                <input hidden type="text" value="${data.id}" name="id">
            </div>
            <div class="mb-3 half">
                <label for="lname">Last Name</label>
                <input type="text" value="${data.lname}" name="lname" placeholder="Your Last Name" id="lname" class="form-control">
            </div>
            <div class="mb-3 half">
                <label for="email">Email <span>*</span></label>
                <input type="text" value="${data.email}" name="email" placeholder="Your Email" id="email" class="form-control">
            </div>
            <div class="mb-3 half">
                <label for="phone">Phone <span>*</span></label>
                <input type="text" value="${data.phone}" name="phone" placeholder="Your Phone" id="phone" class="form-control">
            </div>
            <div class="mb-3 half">
                <label for="age">Donner Age <span>*</span></label>
                <select id="age" name="age" class="form-select">
                <option>Select Your Age</option>
                <option ${data.age == 18 ? `selected` : ''} value="18">18</option>
                <option ${data.age == 19 ? `selected` : ''} value="19">19</option>
                <option ${data.age == 20 ? `selected` : ''} value="20">20</option>
                <option ${data.age == 21 ? `selected` : ''} value="21">21</option>
                <option ${data.age == 22 ? `selected` : ''} value="22">22</option>
                <option ${data.age == 23 ? `selected` : ''} value="23">23</option>
                <option ${data.age == 24 ? `selected` : ''} value="24">24</option>
                <option ${data.age == 25 ? `selected` : ''} value="25">25</option>
                <option ${data.age == 26 ? `selected` : ''} value="26">26</option>
                <option ${data.age == 27 ? `selected` : ''} value="27">27</option>
                <option ${data.age == 28 ? `selected` : ''} value="28">28</option>
                <option ${data.age == 29 ? `selected` : ''} value="29">29</option>
                <option ${data.age == 30 ? `selected` : ''} value="30">30</option>
                <option ${data.age == 31 ? `selected` : ''} value="31">31</option>
                <option ${data.age == 32 ? `selected` : ''} value="32">32</option>
                <option ${data.age == 33 ? `selected` : ''} value="33">33</option>
                <option ${data.age == 34 ? `selected` : ''} value="34">34</option>
                <option ${data.age == 35 ? `selected` : ''} value="35">35</option>
                </select>
            </div>
            <div class="mb-3 half">
                <label for="blood">Blood Group <span>*</span></label>
                <select id="blood" name="blood" class="form-select">
                <option>Select your blood group</option>
                <option ${data.blood == "A+" ? `selected` : ''} value="A+">A+</option>
                <option ${data.blood == "A-" ? `selected` : ''} value="A-">A-</option>
                <option ${data.blood == "B+" ? `selected` : ''} value="B+">B+</option>
                <option ${data.blood == "B-" ? `selected` : ''} value="B-">B-</option>
                <option ${data.blood == "O+" ? `selected` : ''} value="O+">O+</option>
                <option ${data.blood == "O-" ? `selected` : ''} value="O-">O-</option>
                <option ${data.blood == "AB+" ? `selected` : ''} value="AB+">AB+</option>
                <option ${data.blood == "AB-" ? `selected` : ''} value="AB-">AB-</option>
                </select>
            </div>
            <div class="mb-3 half">
                <label for="location">Location (Division) <span>*</span></label>
                <select id="location" name="location" class="form-select">
                <option>Select your blood group</option>
                <option ${data.location == "Barisal" ? `selected` : ''} value="Barisal">Barisal</option>
                <option ${data.location == "Chittagong" ? `selected` : ''} value="Chittagong">Chittagong</option>
                <option ${data.location == "Dhaka" ? `selected` : ''} value="Dhaka">Dhaka</option>
                <option ${data.location == "Khulna" ? `selected` : ''} value="Khulna">Khulna</option>
                <option ${data.location == "Rajshahi" ? `selected` : ''} value="Rajshahi">Rajshahi</option>
                <option ${data.location == "Rangpur" ? `selected` : ''} value="Rangpur">Rangpur</option>
                <option ${data.location == "Sylhet" ? `selected` : ''} value="Sylhet">Sylhet</option>
                </select>
            </div>
            <div class="mb-3 half">
                <label for="gender" class="mb-2">Gender <span>*</span></label> </br>
                <input type="radio" ${data.gender == "male" ? `checked` : ''} checked name="gender" id="" value="male"> Male
                <input type="radio" ${data.gender == "female" ? `checked` : ''} name="gender" id="" value="female"> Female
                <input type="radio" ${data.gender == "Others" ? `checked` : ''} name="gender" id="" value="Others"> Others
            </div>
            <div class="mb-3 half">
                <label for="skill">Skill <span>*</span></label>
                <input type="text" value="${data.skill}"name="skill" placeholder="Your Skill" id="skill" class="form-control">
            </div>
            <div class="mb-3 half">
                <label for="lastDonate">Date <span>*</span></label>
                <input type="date" value="${data.lastDonate}" name="lastDonate" id="lastDonate" class="form-control">
            </div>
            <div class="mb-3 squer">
                <label for="fb">Facebook <span>*</span></label>
                <input type="text" value="${data.fb == undefined ? '' : data.fb}" placeholder="Facebook URL" name="fb" id="fb" class="form-control">
            </div>
            <div class="mb-3 squer">
                <label for="lin">Linkedin </label>
                <input type="text" value="${data.lin == undefined ? "" : data.lin}" placeholder="Linkedin URL" name="lin" id="lin" class="form-control">
            </div>
            <div class="mb-3 squer">
                <label for="twit">Twitter </label>
                <input type="text" value="${data.twit == undefined ? "" : data.twit}" placeholder="Twitter URL" name="twit" id="twit" class="form-control">
            </div>
            <div class="mb-3 squer">
                <label for="youtu">Youtube </label>
                <input type="text" value="${data.youtu == undefined ? "" : data.youtu}" placeholder="Youtube URL" name="youtu" id="youtu" class="form-control">
            </div>
            <div class="mb-3 full">
                <label for="photo">Photo <span>*</span></label>
                <input type="text" value="${data.photo}" name="photo" placeholder="Your Photo URL" id="photo" class="form-control">
            </div>
            <!-- <div class="mb-3 full" id="imageFile">
                <label for="photo" class="mb-2">Photo <span>*</span>
                    <div class="selectImage shadow" style="background-image: url(./image/camera_image.jpg);"></div>
                </label> </br>
                <input hidden type="file" name="photo" id="photo" class="form-control inputPhoto">
                <div class="previewImageParent d-flex justify-content-start align-items-center gap-3">
                    <div class="images shadow">
                        <img class="previewImage" src="./image/Rubel Hossain.png" alt="">
                    </div>
                </div>
            </div> -->
            <div class="m-0 full">
                <input type="submit" value="Update Your Information" class="btn btn-primary w-100">
            </div>
        `;
    }

    // Update data here...
    static updateData = function(data,key){
        const msg = document.getElementById("upMsg");

        if (!data.fname || !data.email || !data.age || !data.phone || !data.blood || !data.location || !data.gender || !data.photo || !data.skill || !data.lastDonate || !data.fb) {
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

        } else if(!Utility.isEmail(data.email)){
            msg.innerHTML = Alert.setAlert("Wrong Email Type!", "danger");
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
            msg.innerHTML = Alert.setAlert("Wrong Phone Type!", "danger");
            msg.style.transition = "all .3s ease-in-out";
            msg.style.opacity = 1;
            msg.style.visibility = "visible";
            msg.style.height = 100 + "%";

            setTimeout(() =>{
                msg.style.opacity = 0;
                msg.style.visibility = "hidden";
                msg.style.height = 0 + "px";
            },2000);

        } else{

            // Take confirmation here..
            const confi = confirm(`Hello ${Stroage.getDataLs("members").find(member => member.id == data.id).fname}, Are you sure to delete this profile? It's not recoverable.`);

            if (confi) {
                // Get data form ls here...
                let allMembers = Stroage.getDataLs(key.keyName);
                
                // Replace data here....
                allMembers[allMembers.findIndex(member => member.id == data.id)] = {
                    ...allMembers[allMembers.findIndex(member => member.id == data.id)],
                    ...data,
                }

                // Set data in ls here...
                Stroage.sendDataLs(key.keyName, allMembers);

                // Reset data now ....
                key.reset.reset();
                key.closeBtn.click();
            } else {
                key.reset.reset();
                key.closeBtn.click();
            }
            
        }
    }

    static addPatient = function(id){
        // Get element here...
        const addPatientForm = document.getElementById("addNewPatientForm");

        addPatientForm.innerHTML = `
            <div class="mb-3 full">
                <label for="fname">Name <span>*</span></label>
                <input type="text" name="name" placeholder="Your Full Name" id="fname" class="form-control">
            </div>
            <div hidden class="mb-3 full">
                <input type="text" value="${id}" name="id">
            </div>
            <div class="mb-3 full">
                <label for="location">Location <span>*</span></label>
                <input type="text" name="location" placeholder="Your Location" id="location" class="form-control">
            </div>
            <div class="mb-3 full">
                <label for="phone">Phone <span>*</span></label>
                <input type="text" name="phone" placeholder="Your Phone" id="phone" class="form-control">
            </div>
            <div class="m-0 full">
                <input type="submit" value="Add New Patient" class="btn btn-primary w-100">
            </div>
        `;
    }

}