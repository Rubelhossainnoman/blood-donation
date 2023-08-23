class Utility {
    // Check email here..
    static isEmail (email){
        const pattern = /^[a-z0-9\.]{5,20}@[a-z]{2,6}.[a-z]{2,5}$/i;
        return pattern.test(email);
    }

    // Check phone here..
    static isPhone (phone){
        const pattern = /^(\+8801|8801|01)[0-9]{9}$/i;
        return pattern.test(phone)
    }

    // Check phone here..
    static isPass (pass){
        let msg;
        let status;
        if (pass.length >= 0 && pass.length <= 5) {
            return {msg : `Password is Weak!`, status : false}
        }else{
            return {msg,status};
        }
    }

    static formData (value){
        const data = new FormData(value);
        return Object.fromEntries(data.entries());
    }
}