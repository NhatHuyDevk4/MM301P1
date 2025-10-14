import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../../styles/Login'
import { useNavigation } from '@react-navigation/native'
import { saveToken } from '../../untils/tokenManager'
import { Ionicons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import { authApi } from '../../service/authApi'

const Register = () => {

    const [authenform, setAuthenform] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [emailFocused, setEmailFocused] = useState(false)
    const [passwordFocused, setPasswordFocused] = useState(false)
    const navigation = useNavigation()
    const [showPassword, setShowPassword] = useState(false)
    const [confirmShowPassword, setConfirmShowPassword] = useState(false)

    // Xử lý đăng nhập

    const handleLogin = async () => {
        if (!authenform.email || !authenform.password || !authenform.name) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ email và mật khẩu')
            return
        }

        console.log("authenform", authenform)

        try {
            const data = await authApi.registerAuth(authenform)
            console.log("data", data)

            if (!data) {
                Toast.show({
                    type: 'error',
                    text1: 'Đăng ký thất bại',
                    text2: 'Vui lòng thử lại sau.'
                })
                return;
            }

            if (data.success === false) {
                Toast.show({
                    type: 'error',
                    text1: 'Đăng ký thất bại',
                    text2: data.message || 'Vui lòng thử lại sau.'
                })
                return;
            }
            if (data.success === true) {
                // Lưu token vào AsyncStorage
                await saveToken(data.accessToken)
                Toast.show({
                    type: 'success',
                    text1: 'Đăng ký thành công',
                    text2: 'Chúc mừng bạn đã đăng ký thành công.'
                })
                navigation.navigate('Login' as never) //
            }
        } catch (error) {
            console.log("error", error)
            Toast.show({
                type: 'error',
                text1: 'Đăng ký thất bại',
                text2: 'Vui lòng thử lại sau.'
            })
        }
    }

    console.log("authenform", authenform.email, authenform.password, authenform.name)

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

                        <Text style={styles.subTitle}>
                            Đăng ký để bắt đầu sử dụng ứng dụng ngay nào!
                        </Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Tên người dùng</Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    emailFocused && styles.inputFocused
                                ]}
                                placeholder="Nhập tên người dùng"
                                placeholderTextColor="#9CA3AF"
                                value={authenform.name}
                                onChangeText={(text) => setAuthenform({ ...authenform, name: text })}
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(false)}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

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
                                value={authenform.email}
                                onChangeText={(text) => setAuthenform({ ...authenform, email: text })}
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
                                    passwordFocused && styles.inputFocused,
                                    { paddingRight: 40 } // Để tránh chữ nhập bị che bởi icon
                                ]}
                                placeholder="Nhập mật khẩu"
                                placeholderTextColor="#9CA3AF"
                                value={authenform.password}
                                onChangeText={(text) => setAuthenform({ ...authenform, password: text })}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                secureTextEntry={!showPassword} // Hiện/ẩn mật khẩu
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                            >
                                <Ionicons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={24}

                                    color="gray"
                                    onPress={() => setShowPassword(!showPassword)}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Xác nhận mật khẩu</Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    passwordFocused && styles.inputFocused
                                ]}
                                placeholder="Nhập lại mật khẩu"
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry={!confirmShowPassword} // Hiện/ẩn mật khẩu
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                            >
                                <Ionicons
                                    name={confirmShowPassword ? 'eye-off' : 'eye'}
                                    size={24}
                                    color="gray"
                                    onPress={() => setConfirmShowPassword(!confirmShowPassword)}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Login Button */}
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleLogin}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.loginButtonText}>Đăng ký</Text>
                        </TouchableOpacity>

                        {/* Sign up link */}
                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>Bạn đã có tài khoản</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
                                <Text style={styles.signupLink}>Đăng nhập ngay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Register

// KeyboardAvoidingView : Giúp tránh bị che bởi bàn phím ảo khi nhập liệu
// Tức là khi bàn phím ảo hiện lên,
// nó sẽ đẩy nội dung lên trên để tránh bị che khuất bởi bàn phím.

// behavior = { Platform.OS === 'ios' ? 'padding' : 'height' }
// - Nếu trên iOS, sử dụng 'padding' để
// thêm khoảng đệm vào dưới cùng của view khi bàn phím xuất hiện.
// - Nếu trên Android, sử dụng 'height'
// để thay đổi chiều cao của view khi bàn phím xuất hiện.