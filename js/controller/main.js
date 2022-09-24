var dsnv = new DSNV();
var validation = new Validation();

getLocalStorage();

function getEle(id) {
    return document.getElementById(id);
};

// Lấy thông tin NV
function getInfoNV (isAdd) {
    var taiKhoan = getEle("tknv").value;
    var hoTen = getEle("name").value;
    var email = getEle("email").value;
    var pass = getEle("password").value;
    var ngayLam = getEle("datepicker").value;
    var luongCB = getEle("luongCB").value;
    var chucVu = getEle("chucvu").value;
    var gioLam = getEle("gioLam").value;

    // Check Validation
    var isValid = true;

    // taiKhoan
    if (isAdd) {
    isValid &= validation.checkEmpty(taiKhoan, "tbTKNV", "(*) Vui lòng nhập tài khoản") && validation.checkLengthUsername (taiKhoan, "tbTKNV", "(*) Tài khoản tối đa 4 - 6 ký tự", 4, 6) && validation.checkExistUsername (taiKhoan, "tbTKNV", "(*) Tài khoản đã tồn tại", dsnv.arr)
    };

    // hoTen
    isValid &= validation.checkEmpty(hoTen, "tbTen", "(*) Vui lòng nhập họ tên") && validation.checkCharacterString (hoTen, "tbTen", "(*) Vui lòng nhập họ tên hợp lệ");
    // email
    isValid &= validation.checkEmpty(email, "tbEmail", "(*) Vui lòng nhập email") && validation.checkEmail (email, "tbEmail", "(*) Email không hợp lệ");
    // pass
    isValid &= validation.checkEmpty(pass, "tbMatKhau", "(*) Vui lòng nhập mật khẩu") && validation.checkPass(pass, "tbMatKhau", "(*) Mật khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)", 6, 10);
    // ngayLam
    isValid &= validation.checkEmpty(ngayLam, "tbNgay", "(*) Vui lòng nhập ngày làm") && validation.checkDate(ngayLam, "tbNgay", "(*) Vui lòng nhập ngày làm hợp lệ (Định dạng: yyyy/mm/dd)");
    // luongCB
    isValid &= validation.checkEmpty(luongCB, "tbLuongCB", "(*) Vui lòng nhập lương cơ bản") && validation.checkMoney(luongCB, "tbLuongCB", "(*) Lương cơ bản từ 1 000 000 - 20 000 000", 1000000, 20000000);
    // chucVu
    if(chucVu === "chucVu") {
        getEle("tbChucVu").innerHTML = "(*) Vui lòng chọn chức vụ";
        getEle("tbChucVu").style.display = "block";
        isValid &= false;
    } else {
        getEle("tbChucVu").innerHTML = "";
        getEle("tbChucVu").style.display = "none";
        isValid &= true;
    }
    // gioLam
    isValid &= validation.checkEmpty(gioLam, "tbGiolam", "(*) Vui lòng nhập giờ làm") && validation.checkHourWork(gioLam, "tbGiolam", "(*) Giờ làm từ 80 - 200 giờ", 80, 200);


    if (isValid) {
        var nv = new NhanVien(taiKhoan, hoTen, email, pass, ngayLam, luongCB, chucVu, gioLam);
        nv.tinhLuong();
        nv.phanLoai();
        return nv;
    }
    return null;
};

// BTN Thêm NV
getEle("btnThemNV").addEventListener("click", function() {
    var nv = getInfoNV(true);
    if (nv) {
        dsnv.themNV(nv);
    
        renderTable(dsnv.arr);

        setLocalStorage();
        
    }
    

});

// Tạo bảng
function renderTable(data) {
    var content = '';

    data.forEach(function(nv) {
        content += `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.hoTen}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong}</td>
                <td>${(nv.xepLoai)}</td>
                <td class="d-flex ">
                    <button class='btn btn-warning mr-1' onclick="editNV('${nv.taiKhoan}')" data-toggle="modal" data-target="#myModal">Edit</button>
                    <button class='btn btn-danger' onclick="deleteNV('${nv.taiKhoan}')">Delete</button>
                </td>
            </tr>
        `;
    });
    getEle("tableDanhSach").innerHTML = content;
};

// Edit NV

function editNV(taiKhoan) {
    var nv = dsnv.getAllInfoNV(taiKhoan);
    
    if (nv) {
        getEle("tknv").value = nv.taiKhoan;
        getEle("tknv").disabled = true;
        getEle("name").value = nv.hoTen;
        getEle("email").value = nv.email;
        getEle("password").value = nv.pass;
        getEle("datepicker").value = nv.ngayLam;
        getEle("luongCB").value = nv.luongCB;
        getEle("chucvu").value = nv.chucVu;
        getEle("gioLam").value = nv.gioLam;
    }
    
    getEle("btnThemNV").style.display = "none";
    getEle("btnReset").style.display = "none";
    getEle("btnCapNhat").style.display = "inline-block";
    deleteErrorMess();
}

// Cập nhật NV
getEle("btnCapNhat").addEventListener("click", function() {
    var nv = getInfoNV(false);

    dsnv.updateNV(nv);
    renderTable(dsnv.arr);
    setLocalStorage();
});

// Thêm NV

getEle("btnThem").addEventListener("click", function() {
    getEle("btnThemNV").style.display = "inline-block";
    getEle("btnReset").style.display = "inline-block";
    getEle("btnCapNhat").style.display = "none";
    getEle("tknv").disabled = false;
    deleteErrorMess();
});

// Reset value

getEle("btnReset").addEventListener("click", function() {
    getEle("tknv").value = "";
    getEle("tknv").disabled = false;
    getEle("name").value = "";
    getEle("email").value = "";
    getEle("password").value = "";
    getEle("datepicker").value = "";
    getEle("luongCB").value = "";
    getEle("chucvu").value = "chucVu";
    getEle("gioLam").value = "";
    deleteErrorMess();
});

// deleteErrorMess

function deleteErrorMess () {
    getEle("tbTKNV").style.display = "none";
    getEle("tbTen").style.display = "none";
    getEle("tbEmail").style.display = "none";
    getEle("tbMatKhau").style.display = "none";
    getEle("tbNgay").style.display = "none";
    getEle("tbLuongCB").style.display = "none";
    getEle("tbChucVu").style.display = "none";
    getEle("tbGiolam").style.display = "none";
};


// Xóa NV
function deleteNV(taiKhoan) {
    dsnv.deleteNV(taiKhoan);
    renderTable(dsnv.arr);
    setLocalStorage()
};

// Search NV theo loại

getEle("searchName").addEventListener("keyup", function() {
    var keyword = getEle("searchName").value;
    var arrSearch = dsnv.searchNV(keyword);
    renderTable(arrSearch);
});


// Set Local Storage
function setLocalStorage() {
    var dataString = JSON.stringify(dsnv.arr)

    localStorage.setItem("DSNV", dataString)
}

//  Get Local Storage
function getLocalStorage() {
    if (localStorage.getItem("DSNV")) {
        var dataString = localStorage.getItem("DSNV");
        dsnv.arr = JSON.parse(dataString);
        renderTable(dsnv.arr)
    }
};

