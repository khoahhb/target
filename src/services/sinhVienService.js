const SV_STORAGE_KEY = 'sinhvien'

// Lấy danh sách sinh viên từ Local Storage
const getSinhVienFromLocalStorage = () => {
    const sinhviens = localStorage.getItem(SV_STORAGE_KEY)
    seedingSinhVien()
    return sinhviens ? JSON.parse(sinhviens) : []
}

// Giả lập dữ liệu trước
export const seedingSinhVien = () => {
    const sinhviens = localStorage.getItem(SV_STORAGE_KEY)
    if (!sinhviens)
        saveSinhVienToLocalStorage([
            {
                key: '1',
                stt: 1,
                mssv: 'B200001',
                hoten: 'Nguyễn Văn A',
                gioiTinh: 'Nam',
                diaChi: 'Cần Thơ',
                dienThoai: '0917437731',
                email: 'nva@gmail.com',
                tinhTrang: 'Còn học',
            },
            {
                key: '2',
                stt: 2,
                mssv: 'B200002',
                hoten: 'Nguyễn Văn B',
                gioiTinh: 'Nam',
                diaChi: 'Cần Thơ',
                dienThoai: '0917437732',
                email: 'nvb@gmail.com',
                tinhTrang: 'Còn học',
            },
            {
                key: '3',
                stt: 3,
                mssv: 'B200003',
                hoten: 'Nguyễn Văn C',
                gioiTinh: 'Nữ',
                diaChi: 'Cần Thơ',
                dienThoai: '0917437733',
                email: 'nvc@gmail.com',
                tinhTrang: 'Còn học',
            },
            {
                key: '4',
                stt: 4,
                mssv: 'B200004',
                hoten: 'Nguyễn Văn D',
                gioiTinh: 'Nam',
                diaChi: 'Cần Thơ',
                dienThoai: '0917437734',
                email: 'nvd@gmail.com',
                tinhTrang: 'Tốt nghiệp',
            },
            {
                key: '5',
                stt: 5,
                mssv: 'B200005',
                hoten: 'Nguyễn Văn E',
                gioiTinh: 'Nam',
                diaChi: 'Cần Thơ',
                dienThoai: '0917437735',
                email: 'nve@gmail.com',
                tinhTrang: 'Tạm dừng',
            },
         
        ])
}

// Lưu danh sách sinh viên vào Local Storage
const saveSinhVienToLocalStorage = (sinhviens) => {
    localStorage.setItem(SV_STORAGE_KEY, JSON.stringify(sinhviens))
}

const checkFilter = (item, filterData) => {
    if (Array.isArray(filterData)) {
        return filterData.some((keyword) =>
            item.toLowerCase().includes(keyword.toLowerCase())
        )
    } else {
        return item.toLowerCase().includes(filterData.toLowerCase())
    }
}

// Lấy danh sách sinh viên với phân trang và lọc
export const getSinhVien = (page = 1, pageSize = 10, filters = {}) => {
    let sinhviens = getSinhVienFromLocalStorage()
    // Áp dụng bộ lọc nếu có
    if (
        filters.stt ||
        filters.mssv ||
        filters.hoten ||
        filters.gioiTinh ||
        filters.diaChi ||
        filters.dienThoai ||
        filters.email ||
        filters.tinhTrang
    ) {
        sinhviens = sinhviens.filter((sinhvien) => {
            return (
                (filters.stt && checkFilter(sinhvien.stt, filters.stt)) ||
                (filters.mssv && checkFilter(sinhvien.mssv, filters.mssv)) ||
                (filters.hoten && checkFilter(sinhvien.hoten, filters.hoten)) ||
                (filters.gioiTinh && checkFilter(sinhvien.gioiTinh, filters.gioiTinh)) ||
                (filters.diaChi && checkFilter(sinhvien.diaChi, filters.diaChi)) ||
                (filters.dienThoai && checkFilter(sinhvien.dienThoai, filters.dienThoai)) ||
                (filters.email && checkFilter(sinhvien.email, filters.email)) ||
                (filters.tinhTrang &&
                    checkFilter(sinhvien.tinhTrang, filters.tinhTrang)) 
            )
        })
    }

    const total = sinhviens.length
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    sinhviens = sinhviens.slice(startIndex, endIndex)

    return {
        data: sinhviens,
        total,
        page,
        pageSize,
    }
}

// Lấy thông tin sinh viên theo ID
export const getSinhVienById = (key) => {
    const sinhviens = getSinhVienFromLocalStorage()
    return sinhviens.find((sinhvien) => sinhvien.key === key)
}

// Thêm sinh viên mới
export const addSinhVien = (sinhvien) => {
    const sinhviens = getSinhVienFromLocalStorage()
    sinhvien.key = new Date().getTime() // Tạo ID duy nhất
    sinhvien.stt = sinhviens.length  === 0 ? 0 : sinhviens[sinhviens.length - 1 ].stt + 1
    sinhvien.tinhTrang = 'Còn học'
    sinhviens.push(sinhvien)
    saveSinhVienToLocalStorage(sinhviens)
    return sinhvien
}

// Cập nhật thông tin sinh viên
export const updateSinhVien = (updatedSinhVien) => {
    const sinhviens = getSinhVienFromLocalStorage()
    const index = sinhviens.findIndex((sinhvien) => sinhvien.key === updatedSinhVien.key)
    if (index !== -1) {
        sinhviens[index] = {...updatedSinhVien, stt: sinhviens[index].stt, tinhTrang:  sinhviens[index].tinhTrang }
        saveSinhVienToLocalStorage(sinhviens)
        return updatedSinhVien
    }
    return null
}

// Cập nhật tình trạng sinh viên
export const updateSinhVienStatus = (updatedSinhVien) => {
    const sinhviens = getSinhVienFromLocalStorage()
    const index = sinhviens.findIndex((sinhvien) => sinhvien.key === updatedSinhVien.key)
    if (index !== -1) {
        sinhviens[index] = {...sinhviens[index], tinhTrang: updatedSinhVien.tinhTrang }
        saveSinhVienToLocalStorage(sinhviens)
        return updatedSinhVien
    }
    return null
}

// Xóa sinh viên
export const deleteSinhVien = (key) => {
    let sinhviens = getSinhVienFromLocalStorage()
    sinhviens = sinhviens.filter((sinhvien) => sinhvien.key !== key)
    saveSinhVienToLocalStorage(sinhviens)
    return key
}

// Xóa nhiều sinh viên
export const deleteManySinhVien = (selectedRowKeys) => {
    let sinhviens = getSinhVienFromLocalStorage()
    sinhviens = sinhviens.filter((item) => !selectedRowKeys.includes(item.key))
    saveSinhVienToLocalStorage(sinhviens)
    return selectedRowKeys
}

export const useSVServices = (getData, setData) => { 

    // Giả lập dữ liệu trước
    const seedingSinhVien = () => {
        const sinhviens = getData()
        if (!sinhviens)
            setData([
                {
                    key: '1',
                    stt: 1,
                    mssv: 'B200001',
                    hoten: 'Nguyễn Văn A',
                    gioiTinh: 'Nam',
                    diaChi: 'Cần Thơ',
                    dienThoai: '0917437731',
                    email: 'nva@gmail.com',
                    tinhTrang: 'Còn học',
                },
                {
                    key: '2',
                    stt: 2,
                    mssv: 'B200002',
                    hoten: 'Nguyễn Văn B',
                    gioiTinh: 'Nam',
                    diaChi: 'Cần Thơ',
                    dienThoai: '0917437732',
                    email: 'nvb@gmail.com',
                    tinhTrang: 'Còn học',
                },
                {
                    key: '3',
                    stt: 3,
                    mssv: 'B200003',
                    hoten: 'Nguyễn Văn C',
                    gioiTinh: 'Nữ',
                    diaChi: 'Cần Thơ',
                    dienThoai: '0917437733',
                    email: 'nvc@gmail.com',
                    tinhTrang: 'Còn học',
                },
                {
                    key: '4',
                    stt: 4,
                    mssv: 'B200004',
                    hoten: 'Nguyễn Văn D',
                    gioiTinh: 'Nam',
                    diaChi: 'Cần Thơ',
                    dienThoai: '0917437734',
                    email: 'nvd@gmail.com',
                    tinhTrang: 'Tốt nghiệp',
                },
                {
                    key: '5',
                    stt: 5,
                    mssv: 'B200005',
                    hoten: 'Nguyễn Văn E',
                    gioiTinh: 'Nam',
                    diaChi: 'Cần Thơ',
                    dienThoai: '0917437735',
                    email: 'nve@gmail.com',
                    tinhTrang: 'Tạm dừng',
                },
            
            ])
    }

    // Lưu danh sách sinh viên vào Local Storage
    const saveSinhVienToLocalStorage = (sinhviens) => {
        setData(sinhviens)
    }

    const checkFilter = (item, filterData) => {
        if (Array.isArray(filterData)) {
            return filterData.some((keyword) =>
                item.toLowerCase().includes(keyword.toLowerCase())
            )
        } else {
            return item.toLowerCase().includes(filterData.toLowerCase())
        }
    }

    // Lấy danh sách sinh viên với phân trang và lọc
    const getSinhVien = (page = 1, pageSize = 10, filters = {}) => {
        let sinhviens = getSinhVienFromLocalStorage()
        // Áp dụng bộ lọc nếu có
        if (
            filters.stt ||
            filters.mssv ||
            filters.hoten ||
            filters.gioiTinh ||
            filters.diaChi ||
            filters.dienThoai ||
            filters.email ||
            filters.tinhTrang
        ) {
            sinhviens = sinhviens.filter((sinhvien) => {
                return (
                    (filters.stt && checkFilter(sinhvien.stt, filters.stt)) ||
                    (filters.mssv && checkFilter(sinhvien.mssv, filters.mssv)) ||
                    (filters.hoten && checkFilter(sinhvien.hoten, filters.hoten)) ||
                    (filters.gioiTinh && checkFilter(sinhvien.gioiTinh, filters.gioiTinh)) ||
                    (filters.diaChi && checkFilter(sinhvien.diaChi, filters.diaChi)) ||
                    (filters.dienThoai && checkFilter(sinhvien.dienThoai, filters.dienThoai)) ||
                    (filters.email && checkFilter(sinhvien.email, filters.email)) ||
                    (filters.tinhTrang &&
                        checkFilter(sinhvien.tinhTrang, filters.tinhTrang)) 
                )
            })
        }

        const total = sinhviens.length
        const startIndex = (page - 1) * pageSize
        const endIndex = startIndex + pageSize
        sinhviens = sinhviens.slice(startIndex, endIndex)

        return {
            data: sinhviens,
            total,
            page,
            pageSize,
        }
    }

    // Lấy thông tin sinh viên theo ID
    const getSinhVienById = (key) => {
        const sinhviens = getSinhVienFromLocalStorage()
        return sinhviens.find((sinhvien) => sinhvien.key === key)
    }

    // Thêm sinh viên mới
    const addSinhVien = (sinhvien) => {
        const sinhviens = getSinhVienFromLocalStorage()
        sinhvien.key = new Date().getTime() // Tạo ID duy nhất
        sinhvien.stt = sinhviens.length  === 0 ? 0 : sinhviens[sinhviens.length - 1 ].stt + 1
        sinhvien.tinhTrang = 'Còn học'
        sinhviens.push(sinhvien)
        saveSinhVienToLocalStorage(sinhviens)
        return sinhvien
    }

    // Cập nhật thông tin sinh viên
    const updateSinhVien = (updatedSinhVien) => {
        const sinhviens = getSinhVienFromLocalStorage()
        const index = sinhviens.findIndex((sinhvien) => sinhvien.key === updatedSinhVien.key)
        if (index !== -1) {
            sinhviens[index] = {...updatedSinhVien, stt: sinhviens[index].stt, tinhTrang:  sinhviens[index].tinhTrang }
            saveSinhVienToLocalStorage(sinhviens)
            return updatedSinhVien
        }
        return null
    }

    // Cập nhật tình trạng sinh viên
    const updateSinhVienStatus = (updatedSinhVien) => {
        const sinhviens = getSinhVienFromLocalStorage()
        const index = sinhviens.findIndex((sinhvien) => sinhvien.key === updatedSinhVien.key)
        if (index !== -1) {
            sinhviens[index] = {...sinhviens[index], tinhTrang: updatedSinhVien.tinhTrang }
            saveSinhVienToLocalStorage(sinhviens)
            return updatedSinhVien
        }
        return null
    }

    // Xóa sinh viên
    const deleteSinhVien = (key) => {
        let sinhviens = getSinhVienFromLocalStorage()
        sinhviens = sinhviens.filter((sinhvien) => sinhvien.key !== key)
        saveSinhVienToLocalStorage(sinhviens)
        return key
    }

    // Xóa nhiều sinh viên
    const deleteManySinhVien = (selectedRowKeys) => {
        let sinhviens = getSinhVienFromLocalStorage()
        sinhviens = sinhviens.filter((item) => !selectedRowKeys.includes(item.key))
        saveSinhVienToLocalStorage(sinhviens)
        return selectedRowKeys
    }

    return { getSinhVien,
        addSinhVien,
        updateSinhVien,
        updateSinhVienStatus,
        deleteSinhVien,
        deleteManySinhVien}
}
