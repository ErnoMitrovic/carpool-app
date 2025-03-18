import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Button, HelperText, Text, TextInput, useTheme } from 'react-native-paper'
import { Controller, useForm } from 'react-hook-form';
import { Link, useRouter } from 'expo-router';
import { LoginRequest, signIn } from '@/services/auth';

const SignIn = () => {
    const theme = useTheme();
    const router = useRouter();

    const { control, handleSubmit, formState: { isValid, errors } } = useForm<LoginRequest>({
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data: LoginRequest) => {
        await signIn(data);
        router.replace('/(app)/index');
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text variant='titleLarge' style={styles.title}>Sign In</Text>
            <Controller
                control={control}
                name='email'
                rules={{
                    required: { value: true, message: 'Email is required' }
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
            <Controller
                control={control}
                name='password'
                rules={{
                    required: { value: true, message: 'Password is required' }
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
                )} />
            <View style={styles.signUpContainer}>
                <Text>Don't have an account?</Text>
                <Link href='/(auth)/signup' style={[styles.signUpText, { color: theme.colors.primary }]}>Sign up</Link>
            </View>
            <Button mode='contained' onPress={handleSubmit(onSubmit)} disabled={!isValid}>Sign In</Button>
        </View>
    )
}

export default SignIn

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