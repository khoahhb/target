const ADMIN_STORAGE_KEY = 'admins'

// Giả lập dữ liệu admin
export const seedingAdmin = () => {
    const admins = localStorage.getItem(ADMIN_STORAGE_KEY)
    if (!admins) {
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify([
            {
                username: 'admin',
                password: 'Admin@123'
            }
        ]))
    }
}

// Đăng nhập admin
export const loginAdmin = (username, password) => {
    const admins = JSON.parse(localStorage.getItem(ADMIN_STORAGE_KEY)) || []
    const admin = admins.find(admin => admin.username === username)
    if (admin) {
        if (admin.password === password) {
            return { status: true }
        } else {
            return { status: false, message: 'Tài khoản hoặc mật khẩu không đúng' }
        }
    } else {
        return { status: false, message: 'Tài khoản hoặc mật khẩu không đúng' }
    }
}
