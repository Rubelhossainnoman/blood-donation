const searchForm = document.getElementById("searchForm");
const searchResultArea = document.getElementById("searchResultArea");
const notFoundText = document.querySelector("#searchResultArea .not_found_reset");
const resetButton = document.getElementById("resetButton");

// For showing all data here...
// Get all donner here...
const allDonner = Stroage.getDataLs("members");

let resultData = '';

const showAllDonner = () =>{
    allDonner.map((donner)=>{
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
        resultData += `
            <div class="col-lg-3 col-md-4 col-sm-6 col-12">
                <div class="member_box">
                    <div class="member_image">
                        <img src="${donner.photo}" alt="${donner.fname} ${donner.lname}">
                        <div class="social_icons">
                            <ul>
                                <li>${socialData(donner).fb}</li>
                                <li>${socialData(donner).lin}</li>
                                <li>${socialData(donner).twit}</li>
                                <li>${socialData(donner).youtu}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="member_info">
                        <h4 class="m-0">${donner.fname} ${donner.lname} (${donner.age})</h4>
                        <p class="mb-0">${donner.skill}</p>
                        <p class="mb-0">Blood : ${donner.blood}</p>
                        <p class="mb-0">Location : ${donner.location}</p>
                        <div class="details">
                            <a href=""><ion-icon name="arrow-redo-outline"></ion-icon></a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        searchResultArea.innerHTML = resultData;
    })
}
showAllDonner();



if (searchForm) {
    searchForm.onsubmit = (e) =>{
        e.preventDefault();
        // Manage data here...
        const data = Utility.formData(e.target);

        // Get all donner here...
        const allDonner = Stroage.getDataLs("members");

        // Take empty variable here...
        let result = '';

        // Get search result here...
        const searchResult = allDonner.filter(donner => donner.location == data.location || donner.blood == data.blood || donner.age == data.age);

        // Use condition now here...
        if (searchResult.length >= 1) {
            searchResult.map((donner,index) =>{
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
                result += `
                    <div class="col-lg-3 col-md-4 col-sm-6 col-12">
                        <div class="member_box">
                            <div class="member_image">
                                <img src="${donner.photo}" alt="${donner.fname} ${donner.lname}">
                                <div class="social_icons">
                                    <ul>
                                        <li>${socialData(donner).fb}</li>
                                        <li>${socialData(donner).lin}</li>
                                        <li>${socialData(donner).twit}</li>
                                        <li>${socialData(donner).youtu}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="member_info">
                                <h4 class="m-0">${donner.fname} ${donner.lname} (${donner.age})</h4>
                                <p class="mb-0">${donner.skill}</p>
                                <p class="mb-0">Blood : ${donner.blood}</p>
                                <p class="mb-0">Location : ${donner.location}</p>
                                <div class="details">
                                    <a href=""><ion-icon name="arrow-redo-outline"></ion-icon></a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            })
        } else {
            result = `
                <div class="col-12">
                    <h4 class="m-0 text-center not_found_result">Opps! Donner Not Found. Please search by another Options. Or Double check if you forget to select. </h4>
                </div>
            `;
        }

        // Set data now to result area here...
        searchResultArea.innerHTML = result;

    }   
}

if (resetButton) {
    resetButton.onclick = () =>{
        searchForm.reset();
        searchResultArea.innerHTML = resultData;
    }
}