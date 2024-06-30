import style from './CreatePost.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

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
                <button className='btn'>Cadastrar</button>
                {/* {error && <p className='error'>{error}</p>}
                {!loading && <button className='btn'>Cadastrar</button>}
                {loading && <button className='btn' disabled>Aguarde...</button>} */}
            </form>
        </div>
    );
};

export default CreatePost;
