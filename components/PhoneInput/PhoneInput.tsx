import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CountryCode, countryCodes, PhoneInputProps } from './types'
import { List, Modal, Portal, TextInput, useTheme } from 'react-native-paper'

const PhoneInput: React.FC<PhoneInputProps> = ({ phone, onChangePhone, onBlur }) => {
    const theme = useTheme()
    const [modalVisible, setModalVisible] = React.useState(false)
    const [country, setCountry] = React.useState<CountryCode>({
        "name": "Germany",
        "dialCode": "+49",
        "code": "DE"
    })

    const showModal = () => setModalVisible(true)
    const hideModal = () => setModalVisible(false)

    const handleSelectedCountry = (countryCode: CountryCode) => {
        setCountry(countryCode)
        setModalVisible(false)
    }

    const handlePhoneChange = (phone: string) => {
        onChangePhone(phone)
    }

    return (
        <View>
            <TextInput
                onBlur={onBlur}
                placeholder='Phone number'
                keyboardType='phone-pad'
                value={phone.replace(country.dialCode, '')}
                onChangeText={handlePhoneChange}
                left={<TextInput.Icon onPress={showModal} icon={
                    ({ size }) => (
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Image
                                style={{ width: size, height: size }}
                                source={{ uri: `https://flagcdn.com/w40/${country.code.toLowerCase()}.png` }}
                            />
                        </TouchableOpacity>
                    )
                } />}
            />
            <Portal>
                <Modal style={[styles.modalContainer, { backgroundColor: theme.colors.surface }]} visible={modalVisible} dismissable onDismiss={hideModal}>
                    <FlatList
                        data={countryCodes}
                        keyExtractor={item => item.code}
                        renderItem={({ item }) => (
                            <List.Item
                                onPress={() => handleSelectedCountry(item)}
                                title={`${item.name} (${item.dialCode})`}
                                description={item.code}
                                left={props =>
                                    <List.Icon {...props}
                                        icon={({ size }) => (
                                            <Image
                                                style={{ width: size, height: size }}
                                                source={{ uri: `https://flagcdn.com/w40/${item.code.toLowerCase()}.png` }}
                                            />
                                        )}
                                    />} />)}
                    />
                </Modal>
            </Portal>
        </View>
    )
}

export default PhoneInput

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        padding: 20,
    },
})