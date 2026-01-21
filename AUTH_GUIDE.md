# Authentication System Documentation

## Overview
Aplikasi ini menggunakan Context API untuk mengelola state autentikasi user dengan informasi username dan role.

## Credentials
- **Username**: `admin-warehouse`
- **Password**: `password`
- **Role**: `warehouse`

## Struktur User State
```javascript
{
  username: 'admin-warehouse',
  role: 'warehouse'
}
```

## Drawer Menu
Aplikasi menggunakan hamburger menu drawer yang slide dari kiri dengan fitur:
- **Profile Section**: Menampilkan username dan role
- **Pengaturan**: Konfigurasi IP Address dan Port server
- **Logout**: Keluar dari aplikasi

### Server Settings
Settings IP dan Port disimpan di `localStorage`:
- Key: `serverIp` (default: `192.168.1.1`)
- Key: `serverPort` (default: `8080`)

## Cara Menggunakan di Halaman Lain

### 1. Import useAuth Hook
```javascript
import { useAuth } from '../context/AuthContext';
```

### 2. Akses User Data
```javascript
export default function YourPage() {
  const { user, logout } = useAuth();
  
  // Akses username
  console.log(user.username); // 'admin-warehouse'
  
  // Akses role
  console.log(user.role); // 'warehouse'
  
  // Logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div>
      <p>Welcome, {user?.username}</p>
      <p>Role: {user?.role}</p>
    </div>
  );
}
```

### 3. Akses Server Settings
```javascript
import { useServerSettings } from '../hooks/useServerSettings';

export default function YourPage() {
  const { getServerUrl, getIp, getPort } = useServerSettings();
  
  // Dapatkan full URL
  const serverUrl = getServerUrl(); // 'http://192.168.1.1:8080'
  
  // Atau akses individual
  const ip = getIp();     // '192.168.1.1'
  const port = getPort(); // '8080'
  
  // Contoh penggunaan untuk API call
  const fetchData = async () => {
    const response = await fetch(`${getServerUrl()}/api/data`);
    const data = await response.json();
    return data;
  };
}
```

### 4. Conditional Rendering Berdasarkan Role
```javascript
export default function SomePage() {
  const { user } = useAuth();
  
  return (
    <div>
      {user?.role === 'warehouse' && (
        <div>Konten khusus warehouse</div>
      )}
    </div>
  );
}
```

## File yang Sudah Diupdate
- ✅ `src/context/AuthContext.jsx` - Context provider untuk auth state
- ✅ `src/components/Drawer.jsx` - Drawer menu dengan profile dan settings
- ✅ `src/hooks/useServerSettings.js` - Hook untuk akses server settings
- ✅ `src/App.jsx` - Wrapped dengan AuthProvider
- ✅ `src/pages/LoginPage.jsx` - Login dengan admin-warehouse/password
- ✅ `src/pages/MenuPage.jsx` - Hamburger menu dan drawer integration

## Persistence
- User state disimpan di `localStorage` dengan key `user`
- Server settings disimpan di `localStorage` dengan key `serverIp` dan `serverPort`
- Semua data tetap tersimpan meskipun page di-refresh

