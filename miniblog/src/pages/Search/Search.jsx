import styles from './Search.module.css';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useMemo } from 'react';
import { useQuerry } from '../../hooks/useQuerry';
import PostDetails from '../../components/postDetails/PostDetails';
import { Link } from 'react-router-dom';


const Search = () => {
    const querry = useQuerry();
    const search = querry.get("q");

    const { documents: posts } = useFetchDocuments("posts", search);

    return (
        <div className={styles.search_container}>
            <h2>Search</h2>
            <div>
                {posts && posts.length === 0 && (
                    <div className={styles.no_posts}>
                        <p>Não foram encontrados posts a partir da sua busca...</p>
                        <Link to="/" className='btn btn-dark'>Voltar</Link>
                    </div>
                )}
                {posts && posts.map((post) => (
                    <PostDetails key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Search;
