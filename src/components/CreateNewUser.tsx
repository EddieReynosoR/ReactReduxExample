import { Badge, Button, Card, TextInput, Title} from '@tremor/react'
import { useUserActions } from "../hooks/useUsersActions";
import { FormEvent, useState} from 'react';

export function CreateNewUser () {

    const {addUser} = useUserActions()

    // Estado Local
    const [result, setResult] = useState<'ok' | 'ko' | null>(null)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setResult(null)

        const form = event.target

        const formElement = form as HTMLFormElement

        const formData = new FormData(formElement)

        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const github = formData.get('github') as string


        if (!name || !email || !github){
            return setResult('ko') // Return para salir
        }

        addUser({name, email, github})
        setResult('ok')
        formElement.reset() // Resetear el form
    }

    return(
        <Card style={{marginTop: '16px'}}>
            <Title>Create New User</Title>

            <form onSubmit={handleSubmit} className=''>
                <TextInput
                name='name'
                placeholder='Aqui el nombre'
                />
                <TextInput
                name='email'
                placeholder='Aqui el email'
                />
                <TextInput
                name='github'
                placeholder='Aqui el usuario de Github'
                />

                <div>
                    <Button
                    type='submit'
                    style={{marginTop: '16px'}}
                    >
                        Crear usuario
                    </Button>
                    <span>
                        {result === 'ok' && <Badge color='green'>Guardado correctamente</Badge>}
                        {result === 'ko' && <Badge color='red'>Hay un error en los campos</Badge>}
                    </span>
                </div>
            </form>
        </Card>
    )
}