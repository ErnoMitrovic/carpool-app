import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button, HelperText, SegmentedButtons, Text, TextInput, useTheme } from 'react-native-paper'
import { Role, signUp, SignUpRequest } from '@/services/auth';
import { Controller, useForm } from 'react-hook-form';
import { StatusBar } from 'expo-status-bar';
import IconSymbol from '@/components/ui/IconSymbol';
import { PhoneInput } from '@/components/PhoneInput';
import { Link, useRouter } from 'expo-router';

type SignUpData = {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    role: Role;
}


const SignUp = () => {
    const theme = useTheme();
    const router = useRouter();

    const REGEX = {
        password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/
    }

    const ERROR_MESSAGES = {
        required: 'This field is required',
        validPassword: 'The password must contain at least one uppercase letter\nOne lowercase letter\nOne number\nOne special character',
        passwordLength: 'The password must be at least 6 characters long',
        passwordMatch: 'The passwords do not match'
    }

    const { control,
        formState: { errors, isValid },
        handleSubmit,
        watch } = useForm<SignUpData>({
            mode: 'onChange',
            defaultValues: {
                name: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
                role: Role.USER
            }
        });

    const passwordValue = watch("password");
    const submit = async (data: SignUpData) => {
        const { name, email, phone, password, role } = data;
        await signUp({
            name,
            email,
            phone,
            password,
            universityId: 1
        }, role)
        router.navigate('/')
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <StatusBar hidden={true} />
            <Text variant='titleLarge' style={styles.title}>Sign Up</Text>
            <Controller
                control={control}
                name='name'
                rules={{
                    required: { value: true, message: ERROR_MESSAGES.required }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            placeholder='Name'
                            onBlur={onBlur}
                            value={value}
                            onChangeText={onChange}
                        />
                        <HelperText type='error'>{errors.name?.message}</HelperText>
                    </>
                )}
            />

            <Controller control={control}
                name='email'
                rules={{
                    required: { value: true, message: ERROR_MESSAGES.required }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            placeholder='Email'
                            onBlur={onBlur}
                            value={value}
                            onChangeText={onChange}
                            autoCapitalize='none'
                        />
                        <HelperText type='error'>{errors.email?.message}</HelperText>
                    </>
                )}
            />

            <Controller control={control}
                name='phone'
                rules={{
                    required: { value: true, message: ERROR_MESSAGES.required }
                }}
                render={({ field: { onChange, value, onBlur } }) => (
                    <>
                        <PhoneInput phone={value} onBlur={onBlur} onChangePhone={onChange} />
                        <HelperText type='error'>{errors.phone?.message}</HelperText>
                    </>
                )}
            />

            <Controller control={control}
                name='password'
                rules={{
                    required: { value: true, message: ERROR_MESSAGES.required },
                    minLength: { value: 6, message: ERROR_MESSAGES.passwordLength },
                    pattern: { value: REGEX.password, message: ERROR_MESSAGES.validPassword }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            placeholder='Password'
                            onBlur={onBlur}
                            value={value}
                            onChangeText={onChange}
                            secureTextEntry
                        />
                        <HelperText type='error'>{errors.password?.message}</HelperText>
                    </>
                )}
            />

            <Controller control={control}
                name='confirmPassword'
                rules={{
                    required: { value: true, message: ERROR_MESSAGES.required },
                    validate: (value) => value === passwordValue || ERROR_MESSAGES.passwordMatch
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TextInput
                            placeholder='Confirm Password'
                            onBlur={onBlur}
                            value={value}
                            onChangeText={onChange}
                            secureTextEntry
                        />
                        <HelperText type='error'>{errors.confirmPassword?.message}</HelperText>
                    </>
                )}
            />

            <Controller control={control}
                name='role'
                rules={{
                    required: { value: true, message: ERROR_MESSAGES.required }
                }}
                render={({ field: { onChange, value } }) => (
                    <>
                        <SegmentedButtons value={value}
                            onValueChange={onChange}
                            buttons={[
                                {
                                    label: 'User', value: Role.USER,
                                    icon: ({ color, size }) => <IconSymbol name='person.fill' size={size} color={color} />
                                },
                                {
                                    label: 'Driver', value: Role.DRIVER,
                                    icon: ({ color, size }) => <IconSymbol name='car.fill' size={size} color={color} />
                                }
                            ]}>
                        </SegmentedButtons>
                        <HelperText type='error'>{errors.role?.message}</HelperText>
                    </>
                )}
            />
            <View style={styles.signUpContainer}>
                <Text>Already have an account?</Text>
                <Link href='/(auth)/login' style={[styles.signUpText, { color: theme.colors.primary }]}>Sign in</Link>
            </View>
            <Button
                mode='contained'
                onPress={handleSubmit(submit)}
                disabled={!isValid}
            >Submit</Button>

        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16
    },
    title: {
        marginBottom: 16
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16
    },
    signUpText: {
        fontWeight: 'bold',
        marginLeft: 4,
        textDecorationLine: 'underline'
    },
})