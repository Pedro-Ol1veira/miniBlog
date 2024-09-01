import styles from './Home.module.css';

import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import PostDetails from '../../components/postDetails/PostDetails';

const Home = () => {

    const [querry, setQuerry] = useState('');
    const { documents: posts, loading } = useFetchDocuments("posts");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(querry) {
            return navigate(`/search?q=${querry}`);
        }orderBy("createAt", "desc")
    };

    return (
        <div className={styles.home}>
            <h1>Veja os nossos posts mais recentes</h1>
            <form onSubmit={handleSubmit} className={styles.search_form}>
                <input type="text" placeholder='Ou busque por tags'
                    onChange={(e) => setQuerry(e.target.value)}
                />
                <button className='btn btn-dark'>Pesquisar</button>
            </form>
            <div>
                {loading && <p>Carregando...</p>}
                {posts && posts.map((post) => (
                    <PostDetails key={post.id} post={post} />
                ))}
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>Não foram encontrados posts</p>
                        <Link to='/posts/create' className='btn'>Criar primeiro post</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
