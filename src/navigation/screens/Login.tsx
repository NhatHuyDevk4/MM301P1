import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../../styles/Login'
import { useNavigation } from '@react-navigation/native'
import { saveRefreshToken, saveToken } from '../../untils/tokenManager'
import { authApi } from '../../service/authApi'
import Toast from 'react-native-toast-message'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailFocused, setEmailFocused] = useState(false)
    const [passwordFocused, setPasswordFocused] = useState(false)
    const navigation = useNavigation()

    // Xử lý đăng nhập

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ email và mật khẩu')
            return
        }

        try {
            const data = await authApi.loginAuth({ email, password })
            // console.log("RES", res)
            if (data.success === true) {
                console.log("data", data)
                // Lưu token vào AsyncStorage
                await saveToken(data.accessToken)
                await saveRefreshToken(data.refreshToken)
                Alert.alert('Thành công', 'Đăng nhập thành công')
                Toast.show({
                    type: 'success',
                    text1: 'Đăng nhập thành công',
                })
                navigation.navigate('HomeTabs' as never) //
            }

        } catch (error) {
            console.log("error", error)
            Alert.alert('Lỗi', 'Đăng nhập thất bại. Vui lòng thử lại sau.')
        }
    }

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <View style={styles.gradient} />

                    <View style={styles.content}>
                        {/* Logo */}
                        <View style={styles.logo}>
                            <Text style={styles.logoText}>📱 MyApp</Text>
                        </View>

                        {/* Title */}
                        <Text style={styles.title}>
                            Chào mừng trở lại!
                        </Text>
                        <Text style={styles.subTitle}>
                            Đăng nhập để tiếp tục sử dụng ứng dụng
                        </Text>

                        {/* Email Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    emailFocused && styles.inputFocused
                                ]}
                                placeholder="Nhập email của bạn"
                                placeholderTextColor="#9CA3AF"
                                value={email}
                                onChangeText={setEmail}
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(false)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Mật khẩu</Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    passwordFocused && styles.inputFocused
                                ]}
                                placeholder="Nhập mật khẩu"
                                placeholderTextColor="#9CA3AF"
                                value={password}
                                onChangeText={setPassword}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        {/* Login Button */}
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleLogin}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.loginButtonText}>Đăng nhập</Text>
                        </TouchableOpacity>

                        {/* Forgot Password */}
                        <TouchableOpacity onPress={() => Alert.alert('Quên mật khẩu', 'Chức năng đang phát triển')}>
                            <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
                        </TouchableOpacity>

                        {/* Sign up link */}
                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>Chưa có tài khoản?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register' as never)}>
                                <Text style={styles.signupLink}>Đăng ký ngay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Login

// KeyboardAvoidingView : Giúp tránh bị che bởi bàn phím ảo khi nhập liệu
// Tức là khi bàn phím ảo hiện lên,
// nó sẽ đẩy nội dung lên trên để tránh bị che khuất bởi bàn phím.

// behavior = { Platform.OS === 'ios' ? 'padding' : 'height' }
// - Nếu trên iOS, sử dụng 'padding' để
// thêm khoảng đệm vào dưới cùng của view khi bàn phím xuất hiện.
// - Nếu trên Android, sử dụng 'height'
// để thay đổi chiều cao của view khi bàn phím xuất hiện.