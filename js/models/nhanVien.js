function NhanVien(_taiKhoan, _hoTen, _email, _pass, _ngayLam, _luongCB, _chucVu, _gioLam) {
    this.taiKhoan = _taiKhoan;
    this.hoTen = _hoTen;
    this.email = _email;
    this.pass = _pass;
    this.ngayLam = _ngayLam;
    this.luongCB = _luongCB;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.xepLoai = '';
    this.tinhLuong = function () {
        if (this.chucVu === 'Sếp') {
            this.tongLuong = this.luongCB * 3;
        } else if (this.chucVu === 'Trưởng Phòng') {
            this.tongLuong = this.luongCB * 2;
        } else if (this.chucVu === 'Nhân Viên') {
            this.tongLuong = this.luongCB;
        }   
    };

    this.phanLoai = function (){
        if (this.gioLam >= 192) {
            this.xepLoai = "Xuất sắc";
        } else if (this.gioLam >= 176) {
            this.xepLoai = "Giỏi";
        } else if (this.gioLam >= 160) {
            this.xepLoai = "Khá";
        } else if (this.gioLam < 160) {
            this.xepLoai = "Trung Bình";
        }
    };
} 