import { useAuthentication } from '../../hooks/useAuthentication';
import styles from './Register.module.css';
import { useState, useEffect } from 'react';

const Register = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const {createUser, error: authError, loading} = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        const user = {
            displayName,
            email,
            password,
            confirmPassword
        };

        if(password !== confirmPassword) {
            setError("As senhas precisam ser iguais");
            return;
        };

        const res = await createUser(user);

    };

    useEffect(() => {
        if(authError) {
            setError(authError);  
        };
    }, [authError]);

    return (
        <div className={styles.register}>
            <h1>Cadastre-se para postar</h1>
            <p>Crie o seu usuario</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome:</span>
                    <input type="text"
                        name='displayName'
                        required
                        placeholder='Nome do usuario'
                        autoComplete='username'
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                </label>
                <label>
                    <span>E-mail:</span>
                    <input type="email"
                        name='email'
                        required
                        placeholder='E-mail do usuario'
                        autoComplete='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>Senha:</span>
                    <input type="password"
                        name='password'
                        required
                        placeholder='Insira a sua senha'
                        autoComplete='new-password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <label>
                    <span>Confirmação de senha:</span>
                    <input type="password"
                        name='confirmPassword'
                        required
                        placeholder='Confirme a sua senha'
                        autoComplete='new-password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
                {error && <p className='error'>{error}</p>}
                {!loading && <button className='btn'>Registrar</button>}
                {loading && <button className='btn' disabled>Aguarde...</button>}
            </form>
        </div>
    );
};

export default Register;