function DSNV() {
    this.arr = [];

    this.themNV = function(nv) {
        this.arr.push(nv);
    }

    this.searchIndexNV = function(taiKhoan) {
        var index = -1;

        this.arr.forEach(function(nv, i) {
            if (nv.taiKhoan == taiKhoan) {
                index = i;
            }
        });

        return index;
    };

    this.deleteNV = function(taiKhoan) {
        var index = this.searchIndexNV(taiKhoan)
        if (index !== -1) {
            this.arr.splice(index, 1)
        };
    };

    this.getAllInfoNV = function(taiKhoan) {
        var index = this.searchIndexNV(taiKhoan);

        if(index !== -1) {
            return this.arr[index];
        }
        return null;
    }

    this.updateNV = function (nv) { 
        var index = this.searchIndexNV(nv.taiKhoan);

        if (index !== -1) {
            this.arr[index] = nv;
        }
    }

    this.searchNV = function (keyword) {
        var arrSearch = [];

        

        this.arr.forEach(function(nv) {
            var loaiNV = toLowerCaseNonAccentVietnamese(nv.xepLoai);
            var search = toLowerCaseNonAccentVietnamese(keyword);
            if(loaiNV.indexOf(search) !== -1) {
                arrSearch.push(nv);
            }
        });
        return arrSearch;
    }
};

function toLowerCaseNonAccentVietnamese(str) {
    str = str.toLowerCase();

    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
};
