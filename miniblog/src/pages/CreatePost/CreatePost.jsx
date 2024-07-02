import style from './CreatePost.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocuments';

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState('');
    const { insertDocument, response } = useInsertDocument("posts");
    const { user } = useAuthValue();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError('');

        try {
            new URL(image)
        } catch (error) {
            setFormError("A imagem precisa ser uma URL")
        };

        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

        if(!title || !image || !tags || !body) {
            setFormError("Por favor preencha todos os campos");
        }
        
        if(formError) {
            return;
        };
        
        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        });

        navigate('/');
    };

    return (
        <div className={style.create_post}>
            <h2>Criar post</h2>
            <p>Escreva sobre oque quiser</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Titulo:</span>
                    <input type="text" name='title' required placeholder='Pense num bom titulo...'
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>
                <label>
                    <span>URL da Imagem:</span>
                    <input type="text" name='image' required placeholder='Insira uma imagem ao seu post'
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                    />
                </label>
                <label>
                    <span>Conteudo:</span>
                    <textarea name="body"
                        required
                        placeholder='Insira o conteudo do post'
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                    ></textarea>
                </label>
                <label>
                    <span>Tags:</span>
                    <input type="text" name='tags' required placeholder='Insira as tags separadas por virguas'
                        onChange={(e) => setTags(e.target.value)}
                        value={tags}
                    />
                </label>
                {response.error && <p className='error'>{response.error}</p>}
                {formError && <p className='error'>{formError}</p>}
                {!response.loading && <button className='btn'>Criar Post</button>}
                {response.loading && <button className='btn' disabled>Aguarde...</button>}
            </form>
        </div>
    );
};

export default CreatePost;
