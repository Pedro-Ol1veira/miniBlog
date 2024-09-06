import style from './EditPost.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

const EditPost = () => {
    const { id } = useParams();
    const { document: post } = useFetchDocument("posts", id);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState('');
    const { updateDocument, response } = useUpdateDocument("posts");
    const { user } = useAuthValue();
    const navigate = useNavigate();

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setBody(post.body);
            setImage(post.image);
            
            const textTags = post.tagsArray.join(", ");
            setTags(textTags);
        }
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError('');

        try {
            new URL(image)
        } catch (error) {
            setFormError("A imagem precisa ser uma URL")
        };

        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

        if (!title || !image || !tags || !body) {
            setFormError("Por favor preencha todos os campos");
        }

        if (formError) {
            return;
        };
        const data = {
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        }
        updateDocument(id, data);

        navigate('/dashboard');
    };

    return (
        <div className={style.edit_post}>
            {post && (
                <>
                    <h2>Editando Post: {post.title}</h2>
                    <p>Altere os dados do post como desejar</p>
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
                        <p className={style.preview_title}>Preview da imagem atual:</p>
                        <img className={style.image_preview} src={post.image} alt={post.title}/>
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
                        {!response.loading && <button className='btn'>Editar</button>}
                        {response.loading && <button className='btn' disabled>Aguarde...</button>}
                    </form>
                </>
            )}
        </div>
    );
};

export default EditPost;
