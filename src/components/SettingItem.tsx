import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export function SettingItem({
    icon,
    label,
    onPress }: {
        icon: React.ComponentProps<typeof Ionicons>['name'], // Tên icon từ Ionicons
        label: string,
        onPress?: () => void // Tùy chọn, hàm được gọi khi nhấn vào item
    }) {


    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.item}>
            <View style={styles.row}>
                <Ionicons name={icon} size={22} color="333" />
                <Text style={{ marginLeft: 20, fontSize: 16, color: '#333' }}>{label}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',

    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
