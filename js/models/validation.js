function Validation() {
    this.checkEmpty = function(value, error, mess) {
        if (value.trim() === '') {
            getEle(error).innerHTML = mess;
            getEle(error).style.display = "block";
            return false;
        }

        getEle(error).innerHTML = "";
        getEle(error).style.display = "none";
        return true;
    };

    this.checkLengthUsername = function (value, error, mess, min, max) {
        if (value.length >= min && value.length <= max) {
            getEle(error).innerHTML = "";
            getEle(error).style.display = "none";
            return true;
        }

        getEle(error).innerHTML = mess;
        getEle(error).style.display = "block";
        return false;
    }

    this.checkCharacterString = function (value, error, mess) {
        // a-z
        var letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"

        if (value.match(letter)) {
            getEle(error).innerHTML = "";
            getEle(error).style.display = "none";
            return true;
        }

        getEle(error).innerHTML = mess;
        getEle(error).style.display = "block";
        return false;
    }

    this.checkExistUsername = function (value, error, mess, arr) {
        var isExist = false;

        for(var i = 0; i < arr.length; i++) {
            var nv = arr[i];
            if (nv.taiKhoan === value) {
                isExist = true;
                break;
            }
        }
        
        if (isExist) {
            getEle(error).innerHTML = mess;
            getEle(error).style.display = "block";
            return false;
        }

        getEle(error).innerHTML = "";
        getEle(error).style.display = "none";
        return true;
    }

    this.checkEmail = function (value, error, mess) {
        var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (value.match(email)) {
            getEle(error).innerHTML = "";
            getEle(error).style.display = "none";
            return true;
        }

        getEle(error).innerHTML = mess;
        getEle(error).style.display = "block";
        return false;
    }

    this.checkPass = function (value, error, mess, min, max) {
        var pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;

        if (value.length >= min && value.length <= max && value.match(pass)) {
            getEle(error).innerHTML = "";
            getEle(error).style.display = "none";
            return true;
        }

        getEle(error).innerHTML = mess;
        getEle(error).style.display = "block";
        return false;
    }

    this.checkDate = function(value, error, mess) {
        var date = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

        if (value.match(date)) {
            getEle(error).innerHTML = "";
            getEle(error).style.display = "none";
            return true;
        }

        getEle(error).innerHTML = mess;
        getEle(error).style.display = "block";
        return false;
    }

    this.checkMoney = function(value, error, mess, min, max) {
        if (value >= min && value <= max) {
            getEle(error).innerHTML = "";
            getEle(error).style.display = "none";
            return true;
        }

        getEle(error).innerHTML = mess;
        getEle(error).style.display = "block";
        return false;
    }

    this.checkHourWork = function (value, error, mess, min, max) {
        if (value >= min && value <= max) {
            getEle(error).innerHTML = "";
            getEle(error).style.display = "none";
            return true;
        }

        getEle(error).innerHTML = mess;
        getEle(error).style.display = "block";
        return false;
    }
};