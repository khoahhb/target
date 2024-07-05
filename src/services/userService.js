// userService.js

const USER_STORAGE_KEY = 'users'

// Lấy danh sách người dùng từ Local Storage
const getUsersFromLocalStorage = () => {
    const users = localStorage.getItem(USER_STORAGE_KEY)
    return users ? JSON.parse(users) : []
}

// Giả lập dữ liệu trước
export const seedingData = () => {
    const users = localStorage.getItem(USER_STORAGE_KEY)
    if (!users)
        saveUsersToLocalStorage([
            {
                key: '1',
                hoten: 'Huỳnh Hữu Bảo Khoa',
                gioiTinh: 'Nam',
                email: 'khoa@gmail.com',
                ngaySinh: '14/11/2001',
                ngheNghiep: 'Lập trình viên',
            },
            {
                key: '2',
                hoten: 'Nguyễn Văn A',
                gioiTinh: 'Nam',
                email: 'nva@gmail.com',
                ngaySinh: '11/02/2000',
                ngheNghiep: 'Giáo viên',
            },
            {
                key: '3',
                hoten: 'Nguyễn Lê Đoan Thùy',
                gioiTinh: 'Nữ',
                email: 'nldt@gmail.com',
                ngaySinh: '09/09/2001',
                ngheNghiep: 'Giáo viên',
            },
            {
                key: '4',
                hoten: 'Hồ Vĩnh Duy',
                gioiTinh: 'Nam',
                email: 'hvd@gmail.com',
                ngaySinh: '01/12/1999',
                ngheNghiep: 'Kỹ sư',
            },
            {
                key: '5',
                hoten: 'Châu Nhuận Phát',
                gioiTinh: 'Nam',
                email: 'cnphat@gmail.com',
                ngaySinh: '12/02/2003',
                ngheNghiep: 'Kỹ sư',
            },
            {
                key: '6',
                hoten: 'Châu Ngọc Hùng',
                gioiTinh: 'Nam',
                email: 'cnhung@gmail.com',
                ngaySinh: '20/06/2004',
                ngheNghiep: 'Giáo viên',
            },
            {
                key: '7',
                hoten: 'Nguyễn Lâm Đình Khoa',
                gioiTinh: 'Nữ',
                email: 'nldkhoa@gmail.com',
                ngaySinh: '28/04/2000',
                ngheNghiep: 'Lập trình viên',
            },
            {
                key: '8',
                hoten: 'Lâm Phúc',
                gioiTinh: 'Nam',
                email: 'lphuc@gmail.com',
                ngaySinh: '04/02/2001',
                ngheNghiep: 'Lập trình viên',
            },
            {
                key: '9',
                hoten: 'Hồ Minh Nhật',
                gioiTinh: 'Nam',
                email: 'hmnhat@gmail.com',
                ngaySinh: '11/18/1997',
                ngheNghiep: 'Lập trình viên',
            },
            {
                key: '10',
                hoten: 'Huỳnh Nguyễn Diễm Trang',
                gioiTinh: 'Nữ',
                email: 'hndtrang@gmail.com',
                ngaySinh: '07/07/2007',
                ngheNghiep: 'Giáo viên',
            },
        ])
}

// Lưu danh sách người dùng vào Local Storage
const saveUsersToLocalStorage = (users) => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users))
}

const checkFilter = (item, filterData) => {
    if (Array.isArray(filterData)) {
        return filterData.some((keyword) =>
            item.toLowerCase().includes(keyword.toLowerCase())
        )
    } else {
        console.log('vo2')

        return item.toLowerCase().includes(filterData.toLowerCase())
    }
}

// Lấy danh sách người dùng với phân trang và lọc
export const getUsers = (page = 1, pageSize = 10, filters = {}) => {
    let users = getUsersFromLocalStorage()
    // Áp dụng bộ lọc nếu có
    if (
        filters.hoten ||
        filters.ngaySinh ||
        filters.email ||
        filters.ngheNghiep ||
        filters.gioiTinh
    ) {
        users = users.filter((user) => {
            return (
                (filters.hoten && checkFilter(user.hoten, filters.hoten)) ||
                (filters.ngaySinh && user.ngaySinh === filters.ngaySinh) ||
                (filters.email && checkFilter(user.email, filters.email)) ||
                (filters.ngheNghiep &&
                    checkFilter(user.ngheNghiep, filters.ngheNghiep)) ||
                (filters.gioiTinh &&
                    checkFilter(user.gioiTinh, filters.gioiTinh))
            )
        })
    }

    const total = users.length
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    users = users.slice(startIndex, endIndex)

    return {
        data: users,
        total,
        page,
        pageSize,
    }
}

// Lấy thông tin người dùng theo ID
export const getUserById = (key) => {
    const users = getUsersFromLocalStorage()
    return users.find((user) => user.key === key)
}

// Thêm người dùng mới
export const addUser = (user) => {
    const users = getUsersFromLocalStorage()
    user.key = new Date().getTime() // Tạo ID duy nhất
    users.push(user)
    saveUsersToLocalStorage(users)
    return user
}

// Cập nhật thông tin người dùng
export const updateUser = (updatedUser) => {
    const users = getUsersFromLocalStorage()
    const index = users.findIndex((user) => user.key === updatedUser.key)
    if (index !== -1) {
        users[index] = updatedUser
        saveUsersToLocalStorage(users)
        return updatedUser
    }
    return null
}

// Xóa người dùng
export const deleteUser = (key) => {
    let users = getUsersFromLocalStorage()
    users = users.filter((user) => user.key !== key)
    saveUsersToLocalStorage(users)
    return key
}

// Xóa người nhiều dùng
export const deleteManyUser = (selectedRowKeys) => {
    let users = getUsersFromLocalStorage()
    users = users.filter((item) => !selectedRowKeys.includes(item.key))
    saveUsersToLocalStorage(users)
    return selectedRowKeys
}
